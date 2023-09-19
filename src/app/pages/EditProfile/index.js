import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { editProfileSchema, otpValidation } from "../../utils/validationSchema";
import { store } from "../../redux/store";
import { countryCodes } from "../../utils/countryCode";
import { showToastMessage } from "../../utils/methods";
import {editProfile, emailVerify, resendOtp, verifyMobileOtp} from "../../redux/services/Profile";
import { detailStart } from "../../redux/actions/PersistActions";
import * as Yup from "yup";
import { messages } from "../../messages/validations";
import * as Icon from "react-feather";

const OTPInput = React.lazy(() => import("otp-input-react"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const PhoneInput = React.lazy(() => import("../../components/common/forms/PhoneInput"));

let initialValuesObj = {};

const VerifyOTP = (props) => {
    const dispatch = useDispatch();

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isSubmitingResendEmail, setIsSubmitingResendEmail] = useState(false);
    const [isSubmitingResendMobile, setIsSubmitingResendMobile] = useState(false);
    const [validationState, setValidationState] = useState({});
    const [initialValuesOTP, setInitialValuesOTP] = useState(initialValuesObj);

    const [oldData, setOldData] = useState("");
    const { data } = useSelector((state) => state?.persist?.userData);
    const { userData } = store.getState()?.persist;

    const initialValues = {
        name: data?.name,
        email: data?.email,
        mobile_num: data?.mobile_no,
        countryCode: countryCodes?.find((c) => c?.value === data?.country_code),
    };

    const [isOTPEnabled, setIsOTPEnabled] = useState(false);
    // const [otpResponse, setOtpResponse] = useState(null);
    const [mobileSysOtp, setMobileSysOtp] = useState(false);
    const [emailSysOtp, setEmailSysOtp] = useState(false);
    const [mobileOTP, setMobileOTP] = useState(false);
    const [emailOTP, setEmailOTP] = useState(false);

    const [timeRemainingEmail, setTimeRemainingEmail] = useState(60);
    const [timeRemainingMobile, setTimeRemainingMobile] = useState(60);

    const intervalRefEmail = useRef(null);
    const intervalRefMobile = useRef(null);
    const counterRefEmail = useRef(60);
    const counterRefMobile = useRef(60);

    const onSubmitOTP = async (value) => {
        if (isSubmiting) return;
        setIsSubmiting(true);
        const payload = {
            email: oldData?.email,
            mobile_no: oldData?.mobile_num,
            name: oldData?.name,
            country_code: oldData?.countryCode?.value,
            otp: value?.email_otp || undefined,
            sys_otp: emailSysOtp || undefined,
            mobile_otp: value?.mobile_otp || undefined,
            mobile_sys_otp: mobileSysOtp || undefined,
        };


        try {
            if(payload?.otp && payload?.sys_otp) {
                const data = await emailVerify(payload);
                if (data?.responseCode === 200) {
                    // setOtpResponse(null);
                    setIsOTPEnabled(false);
                    setMobileOTP(false);
                    setEmailOTP(false);
                    dispatch(detailStart(userData?.data?.token, () => {}));
                }
            }

            if(payload?.mobile_otp && payload?.mobile_sys_otp) {
                const data = await verifyMobileOtp(payload);
                if (data?.responseCode === 200) {
                    // setOtpResponse(null);
                    setIsOTPEnabled(false);
                    setMobileOTP(false);
                    setEmailOTP(false);
                    dispatch(detailStart(userData?.data?.token, () => {}));
                }
            }



        } catch (error) {
        } finally {
            setIsSubmiting(false);
        }
    };

    const cancelOtp = () => {
        setIsOTPEnabled(false);
        setMobileOTP(false);
        setEmailOTP(false);
        setEmailSysOtp(false);
        setMobileSysOtp(false);
        setInitialValuesOTP({});
        setValidationState({});
        clearTimerEmail();
        clearTimerMobile();
    };

    const getOTPMobile = async () => {
        setIsSubmitingResendMobile(true);

        try {
            const payload = {
                mobile_no: oldData?.mobile_num,
                type: "mobile",
            };

            const data = await resendOtp(payload);

            if (data?.responseCode === 200) {
                setMobileSysOtp(data?.data?.otp_mobile);
                setTimeRemainingMobile(60);
                counterRefMobile.current = 60;
                startTimerMobile();
            }
        } catch (error) {
        } finally {
            setIsSubmitingResendMobile(false);
        }
    };

    const getOTPEmail = async () => {
        setIsSubmitingResendEmail(true);

        try {
            const payload = {
                email: oldData?.email,
                type: "email",
            };

            const data = await resendOtp(payload);

            if (data?.responseCode === 200) {
                setEmailSysOtp(data?.data?.otp);
                setTimeRemainingEmail(60);
                counterRefEmail.current = 60;
                startTimerEmail();
            }
        } catch (error) {
        } finally {
            setIsSubmitingResendEmail(false);
        }
    };

    const timerEmail = () => {
        if (counterRefEmail.current <= 1) {
            clearTimerEmail();
        }
        setTimeRemainingEmail((t) => counterRefEmail.current - 1);
        counterRefEmail.current = counterRefEmail.current - 1;
    };

    const timerMobile = () => {
        if (counterRefMobile.current <= 1) {
            clearTimerMobile();
        }
        setTimeRemainingMobile((t) => counterRefMobile.current - 1);
        counterRefMobile.current = counterRefMobile.current - 1;
    };

    const clearTimerEmail = () => {
        clearInterval(intervalRefEmail.current);
    };

    const startTimerEmail = () => {
        if (intervalRefEmail.current) {
            clearTimerEmail();
        }

        intervalRefEmail.current = setInterval(timerEmail, 1000);
    };

    const clearTimerMobile = () => {
        clearInterval(intervalRefMobile.current);
    };

    const startTimerMobile = () => {
        if (intervalRefMobile.current) {
            clearTimerMobile();
        }

        intervalRefMobile.current = setInterval(timerMobile, 1000);
    };

    let validationObject = {};

    const onSubmit = async (values, formikBag) => {
        if (isSubmiting) return;
        try {
            setIsSubmiting(true);
            const payload = {
                email: values.email,
                mobile_no: values.mobile_num,
                name: values.name,
                country_code: values.countryCode?.value,
            };

            const data = await editProfile(payload);

            setOldData(values);
            if (data?.responseCode === 200) {
                showToastMessage(data?.response, data?.responseCode);
                if (data?.data?.is_update) {
                    if (data?.data?.is_mobile_update === 1) {
                        setMobileOTP(true);
                        setMobileSysOtp(data?.data?.otp_mobile);
                        initialValuesObj["mobile_otp"] = "";
                        validationObject["mobile_otp"] = Yup.string().required(messages.otp.required).length(6, messages.otp.invalid);
                    }

                    if (data?.data?.is_email_update === 1) {
                        setEmailOTP(true);
                        setEmailSysOtp(data?.data?.otp);
                        initialValuesObj["email_otp"] = "";
                        validationObject["email_otp"] = Yup.string().required(messages.otp.required).length(6, messages.otp.invalid);
                    }

                    setValidationState(Yup.object().shape(validationObject));
                    setInitialValuesOTP(initialValuesObj);

                    // setOtpResponse(data?.data?.otp);
                    setIsOTPEnabled(true);
                    setTimeRemainingEmail(60);
                    counterRefEmail.current = 60;
                    startTimerEmail();

                    setTimeRemainingMobile(60);
                    counterRefMobile.current = 60;
                    startTimerMobile();
                } else {
                    dispatch(detailStart(userData?.data?.token, () => {}));
                }
            }
        } catch (error) {
        } finally {
            setIsSubmiting(false);
        }
    };

    return (
        <>
            {isOTPEnabled ? (
                <Formik
                    initialValues={initialValuesOTP}
                    validationSchema={validationState}
                    onSubmit={onSubmitOTP}
                    enableReinitialize={true}>
                    {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                        <Form>
                            <div className="intro-y mt-12">
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 sm:col-span-12">
                                        <h2 className="intro-x font-bold text-xl xl:text-xl text-center xl:text-left">Verify OTP</h2>
                                        {emailOTP && (
                                            <div className="mt-3">
                                                <div className="form-label">
                                                    Email OTP <span className="text-danger">*</span>
                                                </div>
                                                <div className="flex">
                                                    <OTPInput
                                                        // value={OTP}
                                                        // onChange={setOTP}
                                                        value={values.email_otp}
                                                        onChange={(otp) => setFieldValue("email_otp", otp)}
                                                        autoFocus
                                                        OTPLength={6}
                                                        otpType="number"
                                                        disabled={false}
                                                        // secure
                                                        inputClassName="intro-x form-control block"
                                                        className="intro-x mt-0 flex-1 items-center justify-between"
                                                        inputStyles={{ width: 40, height: 40, marginRight: 0 }}
                                                    />
                                                    <button
                                                        className="btn py-3 px-4 w-auto mt-3 xl:mt-0 align-top flex items-center border-0 bg-[#F4F5F8] ml-3"
                                                        onClick={getOTPEmail}
                                                        disabled={isSubmitingResendEmail || timeRemainingEmail}>
                                                        <Icon.RefreshCcw color="#1E3A8A" size={22} />
                                                        {timeRemainingEmail !== 0 && (
                                                            <span className="ml-2 text-[#3B4863] text-[12px] font-normal">
                                                                {timeRemainingEmail}
                                                            </span>
                                                        )}
                                                        <MiniLoader isLoading={isSubmitingResendEmail} />
                                                    </button>
                                                </div>

                                                {errors.email_otp && touched.email_otp ? (
                                                    <p className="text-red-500 mt-2 ml-1">{errors.email_otp}</p>
                                                ) : null}
                                            </div>
                                        )}
                                        {mobileOTP && (
                                            <div className="mt-3">
                                                <div className="form-label">
                                                    Mobile OTP <span className="text-danger">*</span>
                                                </div>
                                                <div className="flex">
                                                    <OTPInput
                                                        // value={OTP}
                                                        // onChange={setOTP}
                                                        value={values.mobile_otp}
                                                        onChange={(otp) => setFieldValue("mobile_otp", otp)}
                                                        autoFocus
                                                        OTPLength={6}
                                                        otpType="number"
                                                        disabled={false}
                                                        // secure
                                                        inputClassName="intro-x form-control block"
                                                        className="intro-x mt-0 flex-1 items-center justify-between"
                                                        inputStyles={{ width: 40, height: 40, marginRight: 0 }}
                                                    />
                                                    <button
                                                        className="btn py-3 px-4 w-auto mt-3 xl:mt-0 align-top flex items-center border-0 bg-[#F4F5F8] ml-3"
                                                        onClick={getOTPMobile}
                                                        disabled={isSubmitingResendMobile || timeRemainingMobile}>
                                                        <Icon.RefreshCcw color="#1E3A8A" />
                                                        {timeRemainingMobile !== 0 && (
                                                            <span className="ml-2 text-[#3B4863] text-[12px] font-normal">
                                                                {timeRemainingMobile}
                                                            </span>
                                                        )}
                                                        <MiniLoader isLoading={isSubmitingResendMobile} />
                                                    </button>
                                                </div>
                                                {errors.mobile_otp && touched.mobile_otp ? (
                                                    <p className="text-red-500 mt-2 ml-1">{errors.mobile_otp}</p>
                                                ) : null}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between mt-5 xl:mt-8">
                                            <div className="intro-x text-center xl:text-left">
                                                <button
                                                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                                                    onClick={handleSubmit}
                                                    disabled={isSubmiting}>
                                                    Verify
                                                    <MiniLoader isLoading={isSubmiting} />
                                                </button>
                                                {/* <button
                                                    className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                                                    onClick={getOTP}
                                                    disabled={isSubmitingResend}>
                                                    Resend {timeRemaining || ""}
                                                    <MiniLoader isLoading={isSubmitingResend} />
                                                </button> */}
                                            </div>
                                            <button
                                                className="btn btn-outline-danger py-3 px-4 xl:w-32 xl:mt-0 align-top"
                                                onClick={cancelOtp}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <Formik initialValues={initialValues} validationSchema={editProfileSchema} enableReinitialize={true} onSubmit={onSubmit}>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form>
                            <div className="intro-y mt-12">
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 sm:col-span-12">
                                        <Input
                                            isRequiredField
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder="Full Name"
                                            label="Full Name"
                                            name="name"
                                        />
                                        <Input
                                            isRequiredField
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder="Email"
                                            label="Email"
                                            name="email"
                                            containerClassName="mt-4"
                                        />

                                        <div className="mt-4 mb-[-12px]">
                                            Mobile No <span className="text-danger">*</span>
                                        </div>

                                        <PhoneInput
                                            countryCodeValue={values.countryCode}
                                            setFieldValue={setFieldValue}
                                            error={errors.mobile}
                                            touched={touched.mobile}
                                            name="mobile_num"
                                        />
                                        {/* <Input
                                    isRequiredField
                                    type="text"
                                    className="intro-x login__input form-control py-2 px-3 block"
                                    placeholder="Mobile Number"
                                    label="Mobile Number"
                                    name="mobile_num"
                                    containerClassName="mt-4"
                                /> */}
                                    </div>
                                </div>
                                <div className="intro-x mt-5 xl:mt-8 justify-end flex">
                                    <button
                                        className="btn btn-primary py-3 px-4 w-32 xl:mr-3 align-top"
                                        onClick={handleSubmit}
                                        disabled={!isValid || isSubmiting}>
                                        Save
                                        <MiniLoader isLoading={isSubmiting} />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default VerifyOTP;
