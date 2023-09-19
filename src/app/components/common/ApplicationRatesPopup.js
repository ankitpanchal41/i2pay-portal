import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import MiniLoader from "./MiniLoader";
import {
    APPROVE_MERCHANT_APPLICATION_RATES_REQUEST,
    DETAIL_MERCHANT_APPLICATION_RATES_REQUEST,
    DECLINE_MERCHANT_APPLICATION_RATES_REQUEST,
} from "../../redux/types/MerchantApplicationRates";
const Input = React.lazy(() => import("./forms/Input"));
const Modal = React.lazy(() => import("./Modal"));

const ApplicationRatesPopup = ({ visible = true }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isAccepting, setIsAccepting] = useState(false);
    const { merchantApplicationRates } = useSelector((state) => state.rates);
    const { userData } = useSelector((state) => state.persist);
    const [declineRateModalVisible, setDeclineRateModalVisible] = useState(false);
    const [declineButtonLoading, setDeclineButtonLoading] = useState(false);
    const navigate = useNavigate();

    const [declinedModalInitialValues, setDeclinedModalInitialValues] = useState({});
    const [declineModalFormValidationState, setDeclineModalFormValidationState] = useState({});

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [visible]);

    useEffect(() => {
        navigate("/");
    }, [userData?.data?.is_rate_sent != 1]);

    useEffect(() => {
        let payload = {};

        const callBack = () => {
            setIsLoading(false);
        };

        setIsLoading(true);
        dispatch({ type: DETAIL_MERCHANT_APPLICATION_RATES_REQUEST, payload, callBack });
    }, []);

    const acceptRates = () => {
        setIsAccepting(true);

        let payload = {};

        const callBack = () => {
            // dispatch(detailStart(userData?.data?.token));
            // window.location.href("/");
            // navigate(`/`);
            setIsAccepting(false);
        };

        // const navigateState = () => {
        //     dispatch(changeRateStatus("2"));
        // };

        dispatch({ type: APPROVE_MERCHANT_APPLICATION_RATES_REQUEST, payload, callBack });
    };

    const onCloseDeclineModal = () => {
        setDeclineRateModalVisible(!declineRateModalVisible);
    };

    const showDeclineMerchantRatesModal = () => {
        setDeclineRateModalVisible(true);
        setDeclinedModalInitialValues({ rate_decline_reason: "" });

        let validationObject = {};
        validationObject.rate_decline_reason = Yup.string().required(`Please enter reason.`);
        let validationState = Yup.object().shape(validationObject);
        setDeclineModalFormValidationState(validationState);
    };

    const declineRates = async (value) => {
        setDeclineButtonLoading(true);

        let payload = {
            rate_decline_reason: value.rate_decline_reason,
        };

        const callBack = () => {
            // dispatch(detailStart(userData?.data?.token));
            setDeclineRateModalVisible(false);
            // navigate(`/`);
            // window.location.href("/");
            setIsAccepting(false);
            setDeclineButtonLoading(false);
        };

        // const navigateState = () => {
        //     dispatch(changeRateStatus("3"));
        // };

        dispatch({ type: DECLINE_MERCHANT_APPLICATION_RATES_REQUEST, payload, callBack });
    };

    const _renderDeclineMerchantRateModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    heading={"Decline Rates"}
                    visible={declineRateModalVisible}
                    onClose={onCloseDeclineModal}
                    onClickSave={declineRates}
                    onClickCancel={onCloseDeclineModal}
                    useFormik
                    initialValues={declinedModalInitialValues}
                    validationState={declineModalFormValidationState}
                    modalMinWidth={"50%"}
                    buttonLoading={declineButtonLoading}
                    cancelButtonText={`Cancel`}>
                    <Input
                        type="text"
                        className="intro-x login__input form-control py-2 px-3 block"
                        containerClassName="mt-3"
                        placeholder="Enter Reason"
                        name="rate_decline_reason"
                        label="Reason"
                        isRequiredField={true}
                    />
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    if (visible) {
        return (
            <>
                {_renderDeclineMerchantRateModal()}

                <div
                    className="modal  show mt-0 ml-0 pl-0 z-[998] justify-center items-center flex  fixed inset-0 outline-none focus:outline-none modal-dialog"
                    data-tw-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true">
                    <div className="modal-dialog min-w-[50%]" onClick={(e) => e.stopPropagation()}>
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none focus:outline-none max-h-[100vh]">
                            <div className="modal-header">
                                <h2 className="font-medium text-base mr-auto">Fee Schedule</h2>
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center h-48 items-center">
                                    <ClipLoader
                                        loading={true}
                                        color="#1e3a8a"
                                        size={55}
                                        css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="modal-body overflow-y-auto">
                                        <p className="text-big font-bold dark:text-white">Congratulations...</p>
                                        <p className="mt-3 dark:text-white">
                                            Your account has been <strong>'Approved'</strong> with the below mentioned rates.
                                        </p>
                                        <p className="dark:text-white">
                                            Please click strong <strong>Accept</strong> to proceed.
                                        </p>

                                        <div className="py-3">
                                            <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                                <div className="col-span-12 sm:col-span-12 xl:col-span-6 flex flex-col">
                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-200 py-5 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-12">
                                                            <strong>MDR/TDR</strong>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Credit Cards(Domestic)</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.credit_cards_domestic || 0.0} %
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Credit Card(International)</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.credit_card_international || 0.0} %
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Debit Cards</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.debit_cards || 0.0} %
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Debit Cards (Rupay Cards)</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.debit_cards_rupay_cards || 0.0} %
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Net Banking</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.net_banking || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">UPI</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.upi || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Wallet</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.wallet || 0.0} %
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Prepaid Cards/Virtual Cards</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.prepaid_virtual_cards || 0.0} %
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">EMI</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.emi || 0.0} %
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">BNPL</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            {merchantApplicationRates?.bnpl || 0.0} %
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-12 xl:col-span-6 flex flex-col">
                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-200 py-5 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-12">
                                                            <strong>Fees</strong>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Transaction Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            ₹ {merchantApplicationRates?.transaction_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Setup Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            ₹ {merchantApplicationRates?.setup_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Gateway Direct Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            ₹ {merchantApplicationRates?.gateway_direct_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Gateway Monthly Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            ₹ {merchantApplicationRates?.gateway_monthly_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-100 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9">Gateway Transaction Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right">
                                                            ₹ {merchantApplicationRates?.gateway_transaction_fee || 0.0}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="grid grid-cols-12 gap-4 gap-y-3">
                                                <div className="col-span-12 sm:col-span-12 xl:col-span-6 flex flex-col">
                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2 flex-1">
                                                        <div className="col-span-12 sm:col-span-9  font-bold">Rolling Service (%)</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right  font-bold">
                                                            ₹ {merchantApplicationRates?.rolling_reserve_paercentage || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2 flex-1">
                                                        <div className="col-span-12 sm:col-span-9 font-bold">Transaction Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right font-bold">
                                                            ₹ {merchantApplicationRates?.transaction_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2 flex-1">
                                                        <div className="col-span-12 sm:col-span-9 font-bold">Refund Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right font-bold">
                                                            ₹ {merchantApplicationRates?.refund_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2 flex-1">
                                                        <div className="col-span-12 sm:col-span-9 font-bold">Chargeback Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right font-bold">
                                                            ₹ {merchantApplicationRates?.chargeback_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2 flex-1">
                                                        <div className="col-span-12 sm:col-span-9 font-bold">
                                                            Suspicious Transaction Fee
                                                        </div>
                                                        <div className="col-span-12 sm:col-span-3 text-right font-bold">
                                                            ₹ {merchantApplicationRates?.flagged_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2 flex-1">
                                                        <div className="col-span-12 sm:col-span-9 font-bold">Retrieval Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right font-bold">
                                                            ₹ {merchantApplicationRates?.retrieval_fee || 0.0}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-12 xl:col-span-6 flex flex-col">
                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9  font-bold">Gateway Direct Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right font-bold">
                                                            ₹ {merchantApplicationRates?.gateway_direct_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9  font-bold">Gateway Monthly Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right  font-bold">
                                                            ₹ {merchantApplicationRates?.gateway_monthly_fee || 0.0}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 font-normal bg-slate-300 dark:bg-darkmode-300 py-3 px-3 mb-2">
                                                        <div className="col-span-12 sm:col-span-9  font-bold">Gateway Transaction Fee</div>
                                                        <div className="col-span-12 sm:col-span-3 text-right  font-bold">
                                                            ₹ {merchantApplicationRates?.gateway_transaction_fee || 0.0}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button className="btn btn-primary w-24 mr-2" onClick={() => acceptRates()}>
                                            Accept
                                            <MiniLoader isLoading={isAccepting} />
                                        </button>
                                        <button className="btn btn-danger w-24" onClick={() => showDeclineMerchantRatesModal()}>
                                            Decline
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return false;
    }
};

export default ApplicationRatesPopup;
