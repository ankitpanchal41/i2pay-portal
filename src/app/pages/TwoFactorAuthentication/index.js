import React, { useState, useRef, useEffect } from "react";
import OTPInput from "otp-input-react";
import { googleAuthPair, googleAuthValidate } from "../../redux/services/GoogleAuthenticator";
import { useDispatch, useSelector } from "react-redux";
import { changeVerificationFlag, resendOtp, verifyMobileOtp } from "../../redux/services/Profile";
import MiniLoader from "../../components/common/MiniLoader";
import { Formik, Form } from "formik";
import { otpValidation } from "../../utils/validationSchema";
import { changeGoogleAuthVerification, changeMobileVerification } from "../../redux/actions/PersistActions";
import { async } from "../../redux/services/index";
import { showToastMessage } from "../../utils/methods";

const initialValuesOTPObj = {
    otp: "",
};

const TwoFactorAuthentication = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.persist);
    const [isOTPVisible, setIsOTPVisible] = useState(false);
    const [initialValuesOTP, setInitialValuesOTP] = useState(initialValuesOTPObj);
    const isVerifyMobile = userData?.data?.has_mobile_no_verified;
    const [isVisibleQRCodeOTP, setIsVisibleQRCodeOTP] = useState(false);
    const [qrCodeImage, setQRCodeImage] = useState(false);
    const isEnableGoogleAuth = userData?.data?.has_google_auth_activated;
    const [isVisibleDisableAuthOTP, setIsVisibleDisableAuthOTP] = useState(false);
    const [mobileSysOTP, setMobileSysOTP] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    console.log({ userData });

    console.log("userData?.data?.has_mobile_no_verified", userData?.data?.has_google_auth_activated);

    useEffect(() => {
        if (isVerifyMobile === "1") {
            onClickEnableVerification();
        }
    }, [isVerifyMobile]);

    const onClickVerifyMobile = async () => {
        try {
            setIsLoading(true);
            const payload = {
                mobile_no: userData?.data?.mobile_no,
                type: "mobile",
            };

            const data = await resendOtp(payload);
            console.log({ data });
            if (data?.responseCode === 200) {
                // setMobileSysOtp(data?.data?.otp_mobile);
                // setTimeRemainingMobile(60);
                // counterRefMobile.current = 60;
                // startTimerMobile();
                setMobileSysOTP(data?.data?.otp_mobile);
                setIsOTPVisible(true);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onClickVerifyOTP = async (value) => {
        try {
            setIsLoading(true);
            const payload = {
                mobile_otp: value?.otp,
                mobile_sys_otp: mobileSysOTP,
            };

            const data = await verifyMobileOtp(payload);
            console.log({ data });
            if (data?.responseCode === 200) {
                setIsOTPVisible(false);
                setInitialValuesOTP({ otp: "" });
                dispatch(changeMobileVerification(data?.data));
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onClickVerifyCancel = () => {
        setIsOTPVisible(false);
    };

    const onClickEnableVerification = async () => {
        const payload = {
            email: userData?.data?.email,
            secretCode: userData?.data?.secret_code,
        };
        const data = await googleAuthPair(payload);
        console.log("DATAS", { data });
        if (data) {
            const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
            let image = data.match(urlRegex);
            image = image[1];
            setQRCodeImage(image);
        }
    };

    const onClickVerifyQRCode = () => {
        setIsVisibleQRCodeOTP(true);
    };

    const onClickVerifyCancelQRCode = () => {
        setIsVisibleQRCodeOTP(false);
    };

    const onClickVerifyAuthenticatorCode = async (value) => {
        setIsLoading(true);
        const payload = {
            pin: value.otp,
            secretCode: userData?.data?.secret_code,
        };

        const data = await googleAuthValidate(payload);
        if (data === "True") {
            const verificationData = await changeVerificationFlag({ flag: 1 });
            if (verificationData?.responseCode === 200) {
                dispatch(changeGoogleAuthVerification(verificationData?.data));
                setInitialValuesOTP({ otp: "" });
            }
        } else {
            showToastMessage("Authentication code is wrong.");
        }
        setIsLoading(false);
    };

    const onClickDisableGoogleAuth = () => {
        // setIsEnableGoogleAuth("0");
        setIsVisibleDisableAuthOTP(true);
        // setIsVisibleQRCodeOTP(false);
        // setQRCodeImage(false);
    };

    const onClickDisableVerifyAuthenticatorCode = async (value) => {
        setIsLoading(true);
        const payload = {
            pin: value.otp,
            secretCode: userData?.data?.secret_code,
        };

        const data = await googleAuthValidate(payload);
        if (data === "True") {
            const verificationData = await changeVerificationFlag({ flag: 0 });
            if (verificationData?.responseCode === 200) {
                dispatch(changeGoogleAuthVerification(verificationData?.data));
                setIsVisibleDisableAuthOTP(false);
                setIsVisibleQRCodeOTP(false);
                setInitialValuesOTP({ otp: "" });
            }
        } else {
            showToastMessage("Authentication code is wrong.");
        }
        setIsLoading(false);
    };

    const onClickVerifyCancelDisableQRCode = async () => {
        setIsVisibleDisableAuthOTP(false);
    };

    return (
        <>
            {isEnableGoogleAuth === "1" ? (
                <>
                    {isVisibleDisableAuthOTP ? (
                        <Formik
                            initialValues={initialValuesOTP}
                            validationSchema={otpValidation}
                            onSubmit={onClickDisableVerifyAuthenticatorCode}
                            validateOnMount
                            enableReinitialize={true}>
                            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                                <Form className="flex flex-col items-center h-full justify-center p-6">
                                    <div className="p-10 pb-2 sm:whitespace-normal font-medium text-[22px] text-[#1C273C] text-center">
                                        Authenticator Code
                                    </div>
                                    {/* <div className="px-10 pt-3 sm:whitespace-normal font-medium text-lg text-center">
                                        Enter authenticator code which is received by an authenticator app by scanned QR Code.
                                    </div> */}

                                    <div className="pb-6 text-center text-[12px] font-normal">
                                        Enter <span className="font-medium text-[14px]">Authenticator Code</span> which is received by an{" "}
                                        <span className="font-medium text-[14px]">Authenticator App</span> by scanned{" "}
                                        <span className="font-medium text-[14px]">QR Code.</span>
                                    </div>

                                    <div className="form-label">
                                        Enter Authenticator Code <span className="text-danger">*</span>
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
                                        className="intro-x mt-1 justify-between w-full"
                                        inputStyles={{ width: 40, height: 40, marginRight: 0 }}
                                    />
                                    {errors.otp && touched.otp ? <p className="text-red-500 mt-2 ml-1 w-[360px]">{errors.otp}</p> : null}
                                    <div className="intro-x flex w-[360px] justify-between">
                                        <button className="mt-5 btn btn-primary py-3 px-4 w-32 align-top" onClick={handleSubmit}>
                                            Verify
                                            <MiniLoader isLoading={isLoading} />
                                        </button>
                                        <button
                                            className="mt-5 btn btn-outline-danger py-3 px-4 w-32 align-top"
                                            onClick={onClickVerifyCancelDisableQRCode}>
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <div className="flex flex-col items-center h-full justify-center p-6 items-center">
                            {/* <div className="p-10 sm:whitespace-normal font-medium text-lg"> */}
                            <div className="p-10 pb-2 sm:whitespace-normal font-medium text-3xl font-medium text-[22px] text-[#1C273C] text-center">
                                Two-Step Authentication
                            </div>
                            <div className="pb-6 text-center text-[12px] font-normal">
                                <span className="font-medium text-[14px]">Two-Step Authentication</span> has been enabled now.
                            </div>
                            <button className="mt-2 btn btn-primary py-3 px-4 w-auto align-top" onClick={onClickDisableGoogleAuth}>
                                Disable Two-Step Authentication
                                <MiniLoader isLoading={isLoading} />
                            </button>
                            {/* </div> */}
                        </div>
                    )}
                </>
            ) : isVerifyMobile === "1" ? (
                <>
                    {isVisibleQRCodeOTP ? (
                        <Formik
                            initialValues={initialValuesOTP}
                            validationSchema={otpValidation}
                            onSubmit={onClickVerifyAuthenticatorCode}
                            validateOnMount
                            enableReinitialize={true}>
                            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                                <Form className="flex flex-col items-center h-full justify-center p-6">
                                    <div className="p-10 pb-0 sm:whitespace-normal text-center font-medium text-[22px] text-[#1C273C]">
                                        Authenticator Code
                                    </div>
                                    <div className="pb-6 text-center text-[12px] font-normal">
                                        Enter <span className="font-medium text-[14px]">Authenticator Code</span> which is received by an{" "}
                                        <span className="font-medium text-[14px]">Authenticator App</span> by scanned{" "}
                                        <span className="font-medium text-[14px]">QR Code.</span>
                                    </div>
                                    <div className="form-label">
                                        Enter Authenticator Code <span className="text-danger">*</span>
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
                                        className="intro-x mt-1 justify-between w-full"
                                        inputStyles={{ width: 40, height: 40, marginRight: 0 }}
                                    />
                                    {errors.otp && touched.otp ? <p className="text-red-500 mt-2 ml-1 w-[360px]">{errors.otp}</p> : null}
                                    <div className="intro-x flex w-[360px] justify-between">
                                        <button className="mt-5 btn btn-primary py-3 px-4 w-32 align-top" onClick={handleSubmit}>
                                            Verify
                                            <MiniLoader isLoading={isLoading} />
                                        </button>
                                        <button
                                            className="mt-5 btn btn-outline-danger py-3 px-4 w-32 align-top"
                                            onClick={onClickVerifyCancelQRCode}>
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <div className="flex flex-col items-center h-full justify-center p-6 items-center">
                            {/* <div className="p-10 sm:whitespace-normal font-medium text-lg"> */}
                            <div className="p-10 pb-2 sm:whitespace-normal font-medium text-[22px] text-[#1C273C] text-center">
                                Two-Step Authentication
                            </div>
                            <div className="pb-6 text-center text-[12px] font-normal text-[#3B4863]">
                                To enable <span className="font-medium text-[14px]">Two-Step Authentication,</span> you need to install{" "}
                                <span className="font-medium text-[14px]">Google Authenticator App</span> in your mobile and scan the
                                following <span className="font-medium text-[14px]">QR Code.</span>
                            </div>
                            {qrCodeImage && <img src={qrCodeImage} className="w-[300px] h-[300px]" />}
                            <button className="mt-2 btn btn-primary py-3 px-4 w-auto align-top" onClick={onClickVerifyQRCode}>
                                Verify QR Code
                                <MiniLoader isLoading={isLoading} />
                            </button>
                            {/* </div> */}
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center h-full justify-center p-6">
                    {!isOTPVisible && (
                        <>
                            <div className="p-10 pb-0 sm:whitespace-normal font-medium text-[22px] text-[#1C273C] text-center">
                                Two-Step Authentication
                            </div>
                            <div className="pb-6 text-center text-[12px] font-normal text-[#3B4863]">
                                To enable <span className="font-medium text-[14px]">Two-Step Authentication,</span> you need to verify your{" "}
                                <span className="font-medium text-[14px]">Mobile Number</span> first.
                            </div>

                            <button className="btn btn-primary py-3 px-4 w-auto align-top" onClick={onClickVerifyMobile}>
                                Verify Mobile
                                <MiniLoader isLoading={isLoading} />
                            </button>
                        </>
                    )}

                    {isOTPVisible && (
                        <Formik
                            initialValues={initialValuesOTP}
                            validationSchema={otpValidation}
                            onSubmit={onClickVerifyOTP}
                            validateOnMount
                            enableReinitialize={true}>
                            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                                <Form className="flex flex-col items-center justify-center">
                                    <div className="p-10 pb-0 sm:whitespace-normal font-medium text-[22px] text-[#1C273C] text-center">
                                        OTP
                                    </div>
                                    {/* <div className="px-10 pt-3 sm:whitespace-normal font-medium text-lg text-center">
                                        One time password (OTP) has been sent to your registered +91 9979931298 mobile number.
                                    </div> */}
                                    <em className="pb-6 text-center">
                                        <b>One time password (OTP)</b> has been sent to your registered{" "}
                                        <b>
                                            {userData?.data?.country_code} {userData?.data?.mobile_no} Mobile Number
                                        </b>
                                        .
                                    </em>
                                    <div className="pb-6 text-center text-[12px] font-normal text-[#3B4863]">
                                        <span className="font-medium text-[14px]">One time password (OTP)</span> has been sent to your
                                        registered{" "}
                                        <span className="font-medium text-[14px]">
                                            {userData?.data?.country_code} {userData?.data?.mobile_no} Mobile Number
                                        </span>{" "}
                                        .
                                    </div>
                                    <div className="form-label">
                                        Enter Mobile OTP <span className="text-danger">*</span>
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
                                        className="intro-x mt-1 justify-between w-full"
                                        inputStyles={{ width: 40, height: 40, marginRight: 0 }}
                                    />
                                    {errors.otp && touched.otp ? <p className="text-red-500 mt-2 ml-1 w-[360px]">{errors.otp}</p> : null}
                                    <div className="intro-x flex w-[360px] justify-between">
                                        <button className="mt-5 btn btn-primary py-3 px-4 w-32 align-top" onClick={handleSubmit}>
                                            Verify
                                            <MiniLoader isLoading={isLoading} />
                                        </button>
                                        <button
                                            className="mt-5 btn btn-outline-danger py-3 px-4 w-32 align-top"
                                            onClick={onClickVerifyCancel}>
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            )}
        </>
    );
};

export default TwoFactorAuthentication;
