import React, { useEffect, useState } from "react";
import { otpValidation } from "../../utils/validationSchema";
import { Form, Formik } from "formik";
import * as Icon from "react-feather";
import OTPInput from "otp-input-react";
import {
    changeVerificationFlag,
    forgetGoogleAuthenticator,
    resendOtp,
    resendOtpWithoutAuth,
    verifyMobileOtp,
} from "../../redux/services/Profile";
import MiniLoader from "../../components/common/MiniLoader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleAuthValidate } from "../../redux/services/GoogleAuthenticator";
import { changeGoogleAuthVerification, detailStart } from "../../redux/actions/PersistActions";
import { showToastMessage } from "../../utils/methods";

const initialValuesOTPObj = {
    otp: "",
};

const OtpScreen = ({ setViewOtpScreen, setSignInAnotherWay, signInType, setSignInType, loginData, isFirstTimeOTP, setIsFirstTimeOTP }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.persist);

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVerifyEmail, setIsVerifyMobile] = useState(false);
    const [mobileSysOTP, setMobileSysOTP] = useState(false);
    const [initialValuesOTP, setInitialValuesOTP] = useState(initialValuesOTPObj);

    const onClickVerifyCancel = () => {
        setSignInType("google-authenticator-app");
        setViewOtpScreen(false);
    };

    const onClickVerifyAuthenticatorCode = async (value) => {
        setIsSubmitting(true);
        const payload = {
            pin: value.otp,
            secretCode: loginData?.secret_code,
        };

        const data = await googleAuthValidate(payload);
        if (data === "True") {
            showToastMessage("Congratulations!! Login Successfully.", 200);
            dispatch(detailStart(loginData?.token, () => {}));
        } else {
            showToastMessage("Authentication code is wrong.");
        }
        setIsSubmitting(false);
    };

    const onClickSendOTPToMobile = async () => {
        try {
            setIsLoading(true);
            const payload = {
                mobile_no: loginData?.mobile_no,
                type: "mobile",
                isFirstTimeOTP: isFirstTimeOTP,
            };

            const data = await resendOtp(payload, loginData?.token);
            if (data?.responseCode === 200) {
                setIsFirstTimeOTP(false);
                setMobileSysOTP(data?.data?.otp_mobile);
                // setIsOTPVisible(true);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const onClickVerifyMobileOTP = async (value) => {
        try {
            setIsSubmitting(true);
            const payload = {
                mobile_otp: value?.otp,
                mobile_sys_otp: mobileSysOTP,
            };

            const data = await verifyMobileOtp(payload, loginData?.token);
            // console.group("verify mobile otp");

            // console.groupEnd();
            // debugger;
            if (data?.responseCode === 200) {
                setIsVerifyMobile(true);
                showToastMessage("Congratulations!! Login Successfully.", data?.responseCode);
                dispatch(detailStart(loginData?.token, () => {}));
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    const onClickForgetAuthenticationCode = async (value) => {
        try {
            setIsLoading(true);
            const payload = {
                email: loginData?.email,
            };

            const data = await forgetGoogleAuthenticator(payload);
            if (data?.responseCode === 200) {
                setIsLoading(false);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (value) => {
        if (signInType === "google-authenticator-app") {
            onClickVerifyAuthenticatorCode(value);
        }

        if (signInType === "mobile-otp") {
            onClickVerifyMobileOTP(value);
        }

        if (signInType === "email-qrcode") {
            onClickVerifyAuthenticatorCode(value);
        }
    };

    useEffect(() => {
        if (signInType === "mobile-otp") {
            onClickSendOTPToMobile();
        }

        if (signInType === "email-qrcode") {
            onClickForgetAuthenticationCode();
        }
    }, [signInType]);

    return (
        <Formik initialValues={initialValuesOTP} validationSchema={otpValidation} onSubmit={handleSubmit} enableReinitialize={true}>
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                <Form className="flex justify-center sm:items-center w-full">
                    <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                        <h3 className="intro-x font-medium text-2xl text-center sm:text-left">Two Step Authentication</h3>

                        {/* SIGN IN ANOTHER WAY: GOOGLE AUTHENTICATOR APP OPTION */}
                        {signInType === "google-authenticator-app" && (
                            <div className="pt-3 sm:whitespace-normal font-medium text-md text-center mt-1">
                                <div className="flex items-center justify-center sm:justify-start">
                                    <div>
                                        <Icon.CheckCircle size="16" className="mr-1 text-success float-left mt-[3px]" />{" "}
                                        <em>
                                            Scan <b>QR code</b> from your <b>Authenticator App</b>{" "}
                                        </em>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* SIGN IN ANOTHER WAY: GOOGLE AUTHENTICATOR APP OPTION */}

                        {/* SIGN IN ANOTHER WAY: MOBILE OTP OPTION */}
                        {signInType === "mobile-otp" && (
                            <div className="pt-3 sm:whitespace-normal font-medium text-md text-center mt-1">
                                <div className="flex items-center justify-center sm:justify-start">
                                    <div>
                                        <Icon.CheckCircle size="16" className="mr-1 text-success float-left mt-[3px]" /> OTP has been sent
                                        to your registered mobile number. <br />
                                        <small>
                                            <em>
                                                Please enter received <b>OTP</b> from your registered mobile number below.
                                            </em>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* SIGN IN ANOTHER WAY: MOBILE OTP OPTION */}

                        {/* SIGN IN ANOTHER WAY: EMAIL QR CODE OPTION */}
                        {signInType === "email-qrcode" && (
                            <div className="pt-3 sm:whitespace-normal font-medium text-md text-center mt-1">
                                <div className="flex items-center justify-center sm:justify-start">
                                    <div>
                                        <Icon.CheckCircle size="16" className="mr-1 text-success float-left mt-[3px]" /> QR code has been
                                        sent to your registered email address. <br />
                                        <small>
                                            <em>
                                                Please scan <b>QR code</b> through your <b>Authenticator App</b> and enter otp below.
                                            </em>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* SIGN IN ANOTHER WAY: EMAIL QR CODE OPTION */}

                        {isLoading ? (
                            <div className="mt-5 h-[138px] flex items-center justify-center">
                                <MiniLoader isLoading="true" size={50} color="rgb(30, 58, 138)" />
                            </div>
                        ) : (
                            <>
                                <div className="form-label mt-8">
                                    Enter OTP <span className="text-danger">*</span>
                                </div>
                                <OTPInput
                                    // value={OTP}
                                    // onChange={setOTP}
                                    value={values.otp}
                                    onChange={(otp) => setFieldValue("otp", otp)}
                                    autoFocus
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    // secure
                                    inputClassName="intro-x form-control block"
                                    className="intro-x mt-1 justify-between"
                                    inputStyles={{ width: 40, height: 40, marginRight: 0 }}
                                />
                                {errors.otp && touched.otp ? <p className="text-red-500 mt-2 ml-1 w-[360px]">{errors.otp}</p> : null}
                                <div className="intro-x mt-4 text-center xl:text-left flex flex-col">
                                    <button
                                        disabled={isSubmitting}
                                        type="buttons"
                                        className="btn btn-primary py-3 px-4 w-full align-top"
                                        onClick={handleSubmit}>
                                        Verify
                                        <MiniLoader isLoading={isSubmitting} />
                                    </button>
                                    <button
                                        type="buttons"
                                        className="btn btn-outline-secondary py-3 px-4 w-full align-top mt-2"
                                        onClick={onClickVerifyCancel}>
                                        Cancel
                                        {/* <MiniLoader isLoading={isSubmiting} /> */}
                                    </button>
                                </div>

                                <div
                                    className="intro-x text-sm text-center mt-8 text-primary cursor-pointer"
                                    onClick={() => setSignInAnotherWay(true)}>
                                    Sign in another way?
                                </div>
                            </>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default OtpScreen;
