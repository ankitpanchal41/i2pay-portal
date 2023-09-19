import { useCallback, useState, useRef } from "react";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import OTPInput from "otp-input-react";

import Images from "../../../assets/images/index";
import { otpValidation } from "../../utils/validationSchema";
import { registerUser, sendOTP } from "../../redux/services/AuthService";
import { setLoading } from "../../redux/actions/Loader";
import AuthSideScreen from "../../components/common/AuthSideScreen";
import MiniLoader from "../../components/common/MiniLoader";

const initialValues = { otp: "" };

const VerifyOTP = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigateHook = useNavigate();

    const [otpResponse, setOtpResponse] = useState(null);
    const [otpType, setOtpType] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [visibleModal, setVisibleModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);
    const [isLoadingMobile, setIsLoadingMobile] = useState(false);

    // const [intervalState, setIntervalState] = useState(null);
    const intervalRef = useRef(null);
    const counterRef = useRef(60);
    console.log("location.state", location.state);
    const onSubmit = async (value) => {
        const { mobile, countryCode, email, RP } = location.state;

        console.log({ otpResponse });

        const payload = {
            email,
            mobile_no: mobile,
            otp: value.otp,
            country_code: countryCode?.value,
            sys_otp: otpResponse?.data?.otp,
            otp_type: otpType,
            is_terms_condi: 1,
            RP: RP,
            expires_at: otpResponse?.data?.expires_at,
        };

        // console.log({ RP }, { location });

        setIsLoadingVerify(true);
        try {
            const data = await registerUser(payload);
            if (data?.responseCode === 200) {
                // navigateHook("/login");
                onCloseModal();
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoadingVerify(false);
        }
    };

    const getOTP = useCallback(
        async (type, resend = false) => {
            setOtpType(type);
            console.log({ resend });

            if (resend) {
                setIsLoading(true);
            } else if (type === 1) {
                setIsLoadingMobile(true);
            } else if (type === 2) {
                setIsLoadingEmail(true);
            }

            const { mobile, countryCode, email } = location.state;
            try {
                const payload = {
                    mobile_no: mobile,
                    otp_type: type,
                    country_code: countryCode,
                    email: email,
                };

                const data = await sendOTP(payload);
                if (data?.responseCode === 200) {
                    setOtpResponse(data);
                }
                setTimeRemaining(60);
                counterRef.current = 60;
                startTimer();
            } catch (error) {
                console.log("error", error);
            } finally {
                if (resend) {
                    setIsLoading(false);
                } else if (type === 1) {
                    setIsLoadingMobile(false);
                } else if (type === 2) {
                    setIsLoadingEmail(false);
                }
            }
        },
        [location.state],
    );

    const timer = () => {
        if (counterRef.current <= 1) {
            clearTimer();
        }
        setTimeRemaining((t) => counterRef.current - 1);
        counterRef.current = counterRef.current - 1;
    };

    const clearTimer = () => {
        clearInterval(intervalRef.current);
    };

    const startTimer = () => {
        if (intervalRef.current) {
            clearTimer();
        }

        intervalRef.current = setInterval(timer, 1000);
    };

    if (location.state === null) return <Navigate to="/login" />;

    const onCloseModal = () => {
        setVisibleModal(!visibleModal);
    };

    const onClickLogin = () => {
        navigateHook("/login");
    };

    const _renderModal = () => {
        if (visibleModal) {
            return (
                <div className="backdrop-sepia-0 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog blurred-background">
                    <div className={`relative my-6 mx-auto min-w-[50vh]`}>
                        <div
                            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none
                            focus:outline-none">
                            <div className="relative flex-auto">
                                <div className="max-w-[50vh] w-full p-3 flex flex-col justify-center items-center">
                                    <div className="mt-4 text-slate-500 text-lg">
                                        Registration completed successfully, please login using password sent to email.
                                    </div>
                                    <button className="btn btn-primary w-24 mt-3" onClick={onClickLogin}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="auth-bg">
            {_renderModal()}
            <div className="top-bar-boxed fixed h-[70px] z-[51] top-0 border-b border-white/[0.08] px-3 sm:px-8 md:pt-0 auth-bg w-full">
                <div className="h-full flex items-center justify-center lg:justify-start">
                    {/* BEGIN: Logo */}
                    <Link to="/" className="-intro-x md:flex">
                        <img alt="Icewall Tailwind HTML Admin Template" className="w-[150px]" src={Images.logoImage} />
                    </Link>
                    {/* END: Logo */}
                </div>
            </div>
            <div className="block lg:grid grid-cols-2 gap-4 content-auth mt-[70px] flex p-0 sm:p-5">
                <AuthSideScreen textLine1="Verify yourself to complete registration" />

                {/* END: Login Info */}
                {/* BEGIN: Login Form */}
                {otpResponse ? (
                    <Formik initialValues={initialValues} validationSchema={otpValidation} onSubmit={onSubmit}>
                        {({ handleSubmit, setFieldValue, values, errors }) => (
                            // <Form className="h-screen xl:h-auto flex py-5 xl:py-0 my-0">
                            //     <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-0 flex-1 justify-center items-center">
                            //         <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                            //             <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Verify OTP</h2>
                            //             <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                            //                 Verify yourself to complete registration
                            //             </div>
                            <Form className="flex justify-center sm:items-center w-full">
                                <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                                    <h3 className="intro-x font-medium text-2xl text-center sm:text-left">Verify OTP</h3>
                                    <p class="intro-x text-slate-400 text-center text-sm mt-1 sm:text-left">
                                        Verify yourself to complete registration
                                    </p>
                                    <div className="">
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
                                            className="intro-x mt-8 flex-1 justify-between"
                                            inputStyles={{ width: 40, height: 40, marginRight: 0 }}
                                        />
                                    </div>
                                    <div className="intro-x mt-6 text-center xl:text-left flex flex-col">
                                        <button
                                            className="btn btn-primary py-3 px-4 w-full align-top"
                                            onClick={handleSubmit}
                                            disabled={isLoadingVerify}>
                                            Verify <MiniLoader isLoading={isLoadingVerify} />
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary py-3 px-4 w-full align-top mt-4"
                                            disabled={timeRemaining > 0 || isLoading}
                                            onClick={getOTP.bind(this, otpType, true)}>
                                            Resend {timeRemaining || ""}
                                            <MiniLoader color="#1b2e4b" isLoading={isLoading} />
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <div className="flex justify-center sm:items-center w-full">
                        <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                            <h2 className="intro-x font-medium text-2xl text-center sm:text-left">
                                Choose where
                                <br />
                                You want to get OTP
                            </h2>
                            <button
                                disabled={isLoadingEmail || isLoadingMobile}
                                className="btn btn-primary py-3 px-4 w-full align-top mt-8"
                                onClick={getOTP.bind(this, 2, false)}>
                                Email <MiniLoader isLoading={isLoadingEmail} />
                            </button>
                            <button
                                disabled={isLoadingEmail || isLoadingMobile}
                                className="btn btn-outline-secondary py-3 px-4 w-full align-top mt-4"
                                onClick={getOTP.bind(this, 1, false)}>
                                Mobile <MiniLoader color="#1b2e4b" isLoading={isLoadingMobile} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyOTP;
