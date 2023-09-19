import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { messages } from "../../../messages/merchantRegister";
import {
    EmailIcon,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import Images from "../../../../assets/images";
import * as Icon from "react-feather";
import { userDetailPaymentPageData } from "../../../redux/services/PaymentPage";
import { decode } from "js-base64";
import PageNotFound from "../../../components/common/errors/404";
import { ClipLoader } from "react-spinners";
const PaymentBoxUser = React.lazy(() => import("../PaymentBoxUser"));

const PaymentPageCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues = {
        title: "",
        description: "",
        mobile: "",
        email: "",
        terms_conditions: "",
    };

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [isVisibleSocialMedia, setIsVisibleSocialMedia] = useState(false);
    const [paymentData, setPaymentData] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        const data = await userDetailPaymentPageData({ slug: id });

        setPaymentData(data?.data);
        setIsLoading(false);
    };

    const onSubmit = (values) => {
        if (isSubmiting) return;

        // setIsSubmiting(true);

        // const callBack = () => {
        //     setIsSubmiting(false);
        // };

        // const navigateState = () => {
        //     navigate(`/payment-links`);
        // };

        // const payload = {
        //     ...values,
        //     country_code: values?.country_code?.value,
        // };

        // dispatch({ type: ADD_PAYMENT_LINK_REQUEST, payload, callBack, navigateState });
    };

    return (
        <>
            {/* BEGIN: Content */}

            {isLoading ? (
                <div className="h-[100vh] flex justify-center items-center">
                    <ClipLoader
                        loading={true}
                        color="#FFFFFF"
                        size={55}
                        css="border-width: 6px;border-color: #FFFFFF !important;border-bottom-color: transparent !important;"
                    />
                </div>
            ) : !paymentData ? (
                <PageNotFound />
            ) : (
                <div className="bg-slate-100">
                    <div className="intro-y">
                        <div className="overflow-x-auto scrollbar-hidden">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12 overflow-x-auto overflow-hidden relative">
                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                        <div className="col-span-12 xl:col-span-10">
                                            <div className="box p-5 unset-important min-h-[100vh]">
                                                <div className="grid grid-cols-12 gap-4 gap-y-5 px-10">
                                                    <div className="intro-y col-span-12 xl:col-span-8">
                                                        {paymentData?.logo &&
                                                            (paymentData?.logo_type === "banner" ? (
                                                                <img
                                                                    alt="Icewall Tailwind HTML Admin Template"
                                                                    className="w-[100%]"
                                                                    src={paymentData?.logo}
                                                                />
                                                            ) : (
                                                                <img
                                                                    alt="Icewall Tailwind HTML Admin Template"
                                                                    className="w-[150px]"
                                                                    src={paymentData?.logo}
                                                                />
                                                            ))}

                                                        <div className="text-primary dark:text-white font-semibold text-3xl mt-5">
                                                            {paymentData?.title}
                                                        </div>

                                                        <div className="mt-5">
                                                            {paymentData?.description && (
                                                                <span
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: decode(paymentData?.description),
                                                                    }}></span>
                                                            )}
                                                        </div>
                                                        {paymentData?.social_sharing === 1 && (
                                                            <div className="mt-8">
                                                                <label className="form-label">{messages.paymentPage.share_this}:</label>
                                                                <div className="flex items-center">
                                                                    <FacebookShareButton
                                                                        url={window.location?.href}
                                                                        quote={
                                                                            `Checkout ` +
                                                                            `${paymentData?.title}` +
                                                                            ` Payment Page built with I2pay.`
                                                                        }
                                                                        separator=":: "
                                                                        className="Demo__some-network__share-button mr-2">
                                                                        <FacebookIcon size={25} round={true} />
                                                                    </FacebookShareButton>

                                                                    <TelegramShareButton
                                                                        url={window.location?.href}
                                                                        title={`Payment Page built with I2pay.`}
                                                                        separator=":: "
                                                                        className="Demo__some-network__share-button mr-2">
                                                                        <TelegramIcon size={25} round={true} />
                                                                    </TelegramShareButton>

                                                                    <TwitterShareButton
                                                                        url={window.location?.href}
                                                                        title={
                                                                            `Checkout ` +
                                                                            `${paymentData?.title}` +
                                                                            ` Payment Page built with I2pay.`
                                                                        }
                                                                        via={
                                                                            `Checkout ` +
                                                                            `${paymentData?.title}` +
                                                                            ` Payment Page built with I2pay.`
                                                                        }
                                                                        separator=":: "
                                                                        className="Demo__some-network__share-button mr-2">
                                                                        <img
                                                                            className="h-[25px] w-[25px] rounded-full"
                                                                            src={Images.XLogoTwitter}
                                                                        />
                                                                    </TwitterShareButton>

                                                                    <WhatsappShareButton
                                                                        url={window.location?.href}
                                                                        title={
                                                                            `Checkout *` +
                                                                            `${paymentData?.title}` +
                                                                            `* Payment Page built with I2pay.`
                                                                        }
                                                                        separator=":: "
                                                                        className="Demo__some-network__share-button mr-2">
                                                                        <WhatsappIcon size={25} round={true} />
                                                                    </WhatsappShareButton>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="mt-8">
                                                            <label className="form-label">{messages.paymentPage.contactUs}:</label>
                                                            <div className="flex items-center">
                                                                <Icon.Mail className="mr-2" />
                                                                <a href={`mailto: ${paymentData?.email}`}>{paymentData?.email}</a>
                                                            </div>
                                                            <div className="flex items-center mt-2">
                                                                <Icon.Phone className="mr-2" />
                                                                <a href={`tel:${paymentData?.country_code}${paymentData?.mobile}`}>
                                                                    {paymentData?.country_code}
                                                                    {paymentData?.mobile}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="mt-8">
                                                            <label className="form-label">{messages.paymentPage.termsAndConditions}:</label>
                                                            {paymentData?.terms_conditions && (
                                                                <p className="mb-3">{paymentData?.terms_conditions}</p>
                                                            )}
                                                            <p>
                                                                You agree to share information entered on this page with Payment For
                                                                I2pay (owner of this page) and I2pay, adhering to applicable laws.
                                                            </p>
                                                        </div>
                                                        <div className="mt-5 pt-5 border-t-2">
                                                            <img
                                                                alt="Icewall Tailwind HTML Admin Template"
                                                                className="w-[150px]"
                                                                src={Images.LogoPrimary}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="intro-y col-span-12 xl:col-span-4 absolute-important right-4 z-index-important w-full xl:w-[40%]">
                                                        <PaymentBoxUser data={paymentData} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="intro-y col-span-12 sm:col-span-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* END: Content */}
            {/* </MainMenu> */}
            {/* END: Menu */}
        </>
    );
};

export default PaymentPageCreate;
