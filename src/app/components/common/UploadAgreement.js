import React from "react";
import * as Icon from "react-feather";
import { Formik, Form } from "formik";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { messages } from "../../messages/merchantRegister";
import { agreementUploadSchema } from "../../utils/validationSchema";
import { ADD_PAY_BUTTON_REQUEST } from "../../redux/types/PayButton";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_AGREEMENT_REQUEST } from "../../redux/actions/AgreementAction";
import Images from "../../../assets/images/index";
const MiniLoader = React.lazy(() => import("./MiniLoader"));
const Dropzone = React.lazy(() => import("./forms/Dropzone"));

const UploadAgreement = () => {
    const initialValues = {
        merchant_application_agreement: "",
    };

    const [searchParams] = useSearchParams();
    let token = searchParams.get("token");
    let userId = searchParams.get("userId");

    const { search } = useLocation();
    const dispatch = useDispatch();
    const [params, setParams] = React.useState({});
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const state = useSelector((state) => state);

    React.useEffect(() => {
        // document.body.classList.remove("login");
        document.body.classList.add("main");
        const tempParams = {};
        decodeURIComponent(search)
            ?.split("?")?.[1]
            ?.split("&")
            ?.forEach((item) => {
                const [key, value] = item.split("=");
                tempParams[key] = value;
            });
        setParams(tempParams);
    }, [search]);

    const onSubmit = (values, formikBag) => {
        setIsLoading(true);
        const callBack = (status) => {
            if (status === "success") {
                setIsSubmitted(true);
            }
            setIsLoading(false);
        };

        const navigateState = () => {};

        const formData = new FormData();

        formData.append("token", token);
        formData.append("user_id", userId);
        formData.append("files", values.merchant_application_agreement[0]);

        dispatch({ type: UPLOAD_AGREEMENT_REQUEST, payload: formData, callBack, navigateState });
    };

    console.log("state", { state });

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[#1e3181]">
            <div className="flex justify-center items-center flex-col h-full">
                <div className="m-auto">
                    <img alt="Icewall Tailwind HTML Admin Template" className="w-[200px] mb-10 mx-auto" src={Images.logoImage} />
                    <div className="box p-[20px]">
                        {!isSubmitted && (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={agreementUploadSchema}
                                onSubmit={onSubmit}
                                enableReinitialize
                                validateOnMount>
                                {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                                    <Form className="px-5 border-slate-200/60 dark:border-darkmode-400">
                                        <div className="upload-agreement-dropzone intro-y col-span-12 sm:col-span-12">
                                            <Dropzone
                                                error={errors.merchant_application_agreement}
                                                touched={touched.merchant_application_agreement}
                                                setFieldValue={setFieldValue}
                                                name="merchant_application_agreement"
                                                placeholder={messages.placeholders.upload_agreement}
                                                values={values.merchant_application_agreement}
                                                accept="application/pdf"
                                                label={messages.placeholders.upload_agreement}
                                                isRequiredField={true}
                                            />
                                        </div>

                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                            <button className="btn btn-primary w-24 ml-2" disabled={false} onClick={handleSubmit}>
                                                Upload <MiniLoader isLoading={isLoading} />
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}

                        {isSubmitted && (
                            <div className="upload-agreement-dropzone intro-y col-span-12 sm:col-span-12 px-5">
                                <div className="intro-y col-span-12 text-center mt-5">
                                    <Icon.Mail size={100} className="mx-auto mb-5" color="rgb(30,58,138)" />
                                    <h2 className="text-3xl">Thank You!</h2>
                                    <p>Your submission has been received.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadAgreement;
