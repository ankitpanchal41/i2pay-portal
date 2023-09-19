import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DETAIL_INVOICE_REQUEST } from "../../redux/types/Invoice";
import { ClipLoader } from "react-spinners";
import { downloadInvoice, sendInvoice } from "../../redux/services/Invoice";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceDetails = React.lazy(() => import("../../components/common/InvoiceDetails"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const InvoiceDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [invoiceDetails, setInvoiceDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [invoiceDownloadLoading, setInvoiceDownloadLoading] = useState(false);
    const state = useSelector((state) => state);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        setIsLoading(true);
        const array = window.location?.pathname?.split("/");
        const id = array[array?.length - 1];

        const navigateListing = () => {
            navigate("/invoice");
        };

        dispatch({ type: DETAIL_INVOICE_REQUEST, payload: { invoice_id: id }, callBack, navigateListing });
    }, []);

    const onDownloadPDF = async (item) => {
        setInvoiceDownloadLoading(true);
        const payload = {
            invoice_id: item?.id,
        };

        const data = await downloadInvoice(payload);
        setInvoiceDownloadLoading(false);
        if (data?.responseCode === 200) {
            window.location.href = data?.data?.invoice_path;
        }
    };

    React.useEffect(() => {
        if (Object.keys(state?.invoice?.invoiceDetail).length) {
            const initialData = {
                ...state?.invoice?.invoiceDetail,
                productList: JSON.parse(state?.invoice?.invoiceDetail?.productList),
            };

            setInvoiceDetails(initialData);
        }
    }, [state?.invoice?.invoiceDetail]);

    const _renderHeading = () => {
        return (
            <Heading
                title={"Invoice Detail"}
                displayBackButton
                onClickBack={() => navigate("/invoice")}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <button
                            disabled={invoiceDownloadLoading}
                            className="btn btn-primary w-24 ml-2 h-[46px]"
                            onClick={() => {
                                onDownloadPDF(invoiceDetails);
                            }}>
                            <Icon.Download size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Download</span>
                            <ClipLoader
                                loading={invoiceDownloadLoading}
                                color="#1e3a8a"
                                size={15}
                                css="border-width: 2px;border-bottom-color: white !important; margin-left: 5px;"
                            />
                        </button>

                        <button
                            onClick={() => navigate(`/invoice/edit/${invoiceDetails?.id}`)}
                            className="btn btn-primary w-24 ml-2 h-[46px]">
                            <Icon.Edit size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Edit</span>
                        </button>
                    </div>
                }
            />
        );
    };

    return (
        <div className="content">
            {_renderHeading()}
            <div className="intro-y box overflow-hidden mt-5">
                {isLoading ? (
                    <div className="flex justify-center h-48 items-center">
                        {/* BEGIN: Step Loading */}
                        <ClipLoader
                            loading={true}
                            color="#1e3a8a"
                            size={55}
                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                        />

                        {/* END: Step Loading */}
                    </div>
                ) : (
                    <InvoiceDetails data={invoiceDetails} />    
                )}
            </div>
        </div>
    );
};

export default InvoiceDetail;
