import React, { useState } from "react";
import { otpValidation } from "../../utils/validationSchema";
import { Form, Formik } from "formik";
import * as Icon from "react-feather";
import OTPInput from "otp-input-react";
import { verifyMobileOtp } from "../../redux/services/Profile";
import MiniLoader from "../../components/common/MiniLoader";

const initialValuesOTP = {
    otp: "",
};

const AnotherWayToSignIn = ({ setIsEmailOtp, setSignInAnotherWay, setSignInType }) => {
    const [isVerifyLoading, setIsVerifyLoading] = useState(false);
    const [isVerifyEmailO, setIsVerifyMobile] = useState(false);

    const onClickVerifyCancel = () => {
        setIsEmailOtp(false);
    };

    const onClickVerifyOTP = async (value) => {
        try {
            setIsVerifyLoading(true);
            const payload = {
                mobile_otp: value?.otp,
                // mobile_sys_otp: mobileSysOTP,
            };

            const data = await verifyMobileOtp(payload);

            if (data?.responseCode === 200) {
                // setIsOTPVisible(false);
                setIsVerifyMobile(true);
            }
        } catch (error) {
        } finally {
            setIsVerifyLoading(false);
        }
    };

    const handleSignInType = (type) => {
        setSignInType(type);
        setSignInAnotherWay(false);
    };

    return (
        <Formik initialValues={initialValuesOTP} validationSchema={otpValidation} onSubmit={onClickVerifyOTP} enableReinitialize={true}>
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                <Form className="flex justify-center sm:items-center w-full">
                    <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                        <h3 className="intro-x font-medium text-2xl text-center sm:text-left">More ways to authenticate</h3>

                        <div className="sm:whitespace-normal font-medium text-md text-center sm:text-left mt-1">
                            <b>Having trouble? </b> <br />
                            <em>
                                Try one of these alternative methods to <b>sign in</b>.
                            </em>{" "}
                        </div>

                        <div className="my-4 pt-3 sm:whitespace-normal font-medium text-md mt-4">
                            <ul className="text-primary text-md line2 cursor-pointer">
                                <li className="flex items-center mb-1" onClick={() => handleSignInType("google-authenticator-app")}>
                                    <Icon.Lock size="16" className="mr-2" /> Use Google Authenticator App
                                </li>
                                <li className="flex items-center mb-1" onClick={() => handleSignInType("mobile-otp")}>
                                    <Icon.Lock size="16" className="mr-2" /> Use Mobile Number For Authenticate
                                </li>
                                <li className="flex items-center mb-1" onClick={() => handleSignInType("email-qrcode")}>
                                    <Icon.Lock size="16" className="mr-2" /> Forgot Your Authentication?
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AnotherWayToSignIn;
