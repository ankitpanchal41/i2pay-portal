import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Form, Formik } from "formik";
import { connectorLimitSettings } from "../../utils/validationSchema";
import { messages } from "../../messages/settings";
import { GET_CONNECTOR_SETTINGS_REQUEST, UPDATE_CONNECTOR_SETTINGS_REQUEST } from "../../redux/actions/Connector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import Heading from "../../components/common/Heading";
import { removeRateLimitConnector } from "../../redux/services/Connector";

const Header = React.lazy(() => import("../../components/common/Header"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));

const Settings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [removeLimitLoading, setRemoveLimitLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { settings } = useSelector((state) => state.connector);
    const params = useParams();
    const [initialValues, setInitialValues] = useState({
        minimum_transaction_limit: "",
        maximum_transaction_limit: "",
        daily_transaction_limit: "",
    });

    useEffect(() => {
        setInitialValues({
            minimum_transaction_limit: settings.minimum_transaction_limit,
            maximum_transaction_limit: settings.maximum_transaction_limit,
            daily_transaction_limit: settings.daily_transaction_limit,
        });
        return true;
    }, [settings]);

    // Get Connectors
    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };
        setIsLoading(true);
        setIsSubmitting(false);

        dispatch({ type: GET_CONNECTOR_SETTINGS_REQUEST, payload: { connector_id: params.connector }, callBack });

        return true;
    }, []);

    const onClickBack = () => {
        navigate(`/connector`);
    };

    const onSubmit = async (values, formikBag) => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateState = () => {
            navigate(`/connector`);
        };

        // setIsLoading(true);
        setIsSubmitting(true);

        const payload = {
            connector_id: params.connector,
            minimum_transaction_limit: values.minimum_transaction_limit,
            maximum_transaction_limit: values.maximum_transaction_limit,
            daily_transaction_limit: values.daily_transaction_limit,
        };

        dispatch({
            type: UPDATE_CONNECTOR_SETTINGS_REQUEST,
            payload: payload,
            callBack,
            navigateState,
        });
    };

    const onClickRemoveRate = async () => {
        setRemoveLimitLoading(true);
        const payload = {
            connector_id: params.connector,
        };
        await removeRateLimitConnector(payload);
        const callBack = () => {
            setIsLoading(false);
        };
        setIsLoading(true);

        dispatch({ type: GET_CONNECTOR_SETTINGS_REQUEST, payload: { connector_id: params.connector }, callBack });
        setRemoveLimitLoading(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Limit Settings"}
                displayBackButton
                onClickBack={onClickBack}
                addButton={
                    <button
                        type="buttons"
                        onClick={onClickRemoveRate}
                        className={`py-2 px-4 text-sm font-medium text-white bg-primary rounded max-h-[38px] ml-2`}>
                        <Icon.Save size="16" className="block md:hidden lg:hidden" />
                        <span className="hidden md:block lg:block">
                            Remove Limits <MiniLoader isLoading={removeLimitLoading} />
                        </span>
                    </button>
                }
            />
        );
    };

    return (
        <>
            {/* END: Mobile Menu */}

            {/* BEGIN: Header */}
            <Header />
            {/* END: Header */}

            {/* BEGIN: Menu */}

            <div className="content">
                {_renderHeading()}
                {/* <div className="flex items-center mt-8">
                    <Icon.ChevronLeft className="mr-2 cursor-pointer" size={30} onClick={onClickBack} />
                    <h2 className="intro-y text-lg font-medium mr-auto">Settings</h2>
                </div> */}
                <div className="intro-y box-without-margin mt-5">
                    {!isLoading && (
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validationSchema={connectorLimitSettings}
                            onSubmit={onSubmit}
                            validateOnMount>
                            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                                <Form className="">
                                    <div className="font-medium text-base mb-1">{messages.formTitles.transactionLimit}</div>
                                    <hr />
                                    <div className="mt-3">Note: Transaction limit will be set in ₹(INR).</div>
                                    {/*  Transactions Limit */}
                                    <div className="grid grid-cols-12 gap-2 gap-y-5 mt-5">
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <div className="mb-1">{messages.placeholders.minimum_transaction_limit}</div>
                                            <Input
                                                type="number"
                                                className="intro-x login__input form-control py-2 px-3 block"
                                                placeholder={messages.placeholders.enter_amount_here}
                                                name="minimum_transaction_limit"
                                            />
                                        </div>
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <div className="mb-1">{messages.placeholders.maximum_transaction_limit}</div>
                                            <Input
                                                type="number"
                                                className="intro-x login__input form-control py-2 px-3 block"
                                                placeholder={messages.placeholders.enter_amount_here}
                                                name="maximum_transaction_limit"
                                            />
                                        </div>
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <div className="mb-1">{messages.placeholders.daily_transaction_limit}</div>
                                            <Input
                                                type="number"
                                                className="intro-x login__input form-control py-2 px-3 block"
                                                placeholder={messages.placeholders.enter_amount_here}
                                                name="daily_transaction_limit"
                                            />
                                        </div>
                                    </div>
                                    {/*  END: Transactions Limit */}

                                    <div className="grid grid-cols-12 gap-2 gap-y-5">
                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end my-5">
                                            <button
                                                type="buttons"
                                                disabled={isSubmitting}
                                                className="btn btn-primary w-24 ml-2"
                                                onClick={handleSubmit}>
                                                Save <MiniLoader isLoading={isSubmitting} />
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}

                    {isLoading && (
                        <div className="flex justify-center h-48 items-center">
                            <ClipLoader
                                loading={true}
                                color="#1e3a8a"
                                size={55}
                                css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Settings;
