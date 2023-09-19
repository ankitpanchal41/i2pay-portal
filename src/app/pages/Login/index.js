import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

import Input from "../../components/common/forms/Input";
import AuthSideScreen from "../../components/common/AuthSideScreen";

import { loginSchema } from "../../utils/validationSchema";
import { authMesages } from "../../messages/auth";
import {
    changeApplicationStatus,
    changeConnectorStatus,
    changeKeyStatus,
    changeRateStatus,
    detailStart,
} from "../../redux/actions/PersistActions";
import { setLoading } from "../../redux/actions/Loader";
import ReCaptchaComponent from "../../components/common/Recaptcha";
import { getMessaging, getToken } from "firebase/messaging";
import { loginTFAUserApi } from "../../redux/services/AuthService";
import OtpScreen from "./OtpScreen";
import AnotherWayToSignIn from "./SignInAnotherWay";
import { equalTo, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { showToastMessage } from "../../utils/methods";
import Images from "../../../assets/images";
import MiniLoader from "../../components/common/MiniLoader";

const initialValues = { email: "", password: "", rememberMe: false };

const TermsAndConditionsText = () => {
    return (
        <div class="intro-x text-sm text-slate-400 text-center">
            By sign up, you agree to our <br />
            <a className="text-primary" href="https://payomatix.com/terms-of-service/" target="_blank">
                Terms and Conditions
            </a>{" "}
            &{" "}
            <a className="text-primary" href="https://payomatix.com/privacy-policy/" target="_blank">
                Privacy Policy
            </a>
        </div>
    );
};

const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const captchaRef = useRef();
    const [isCatpchaScriptLoaded, setIsCatpchaScriptLoaded] = useState(false);

    const [viewOtpScreen, setViewOtpScreen] = useState(false);
    const [signInAnotherWay, setSignInAnotherWay] = useState(false);
    const [signInType, setSignInType] = useState("google-authenticator-app");

    const [loginDataState, setLoginDataState] = useState(null);
    const [isFirstTimeOTP, setIsFirstTimeOTP] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const registerNow = useCallback(() => {
        navigate("/register");
    }, [navigate]);

    // const merchantId = store.getState()?.persist?.userData?.data?.id;

    const getFirebaseData = async (merchantId) => {
        const db = getDatabase();

        const q = query(ref(db, "merchant_detail"), orderByChild("merchant_id"), equalTo(merchantId));

        onValue(q, (snapshot) => {
            const data = [];
            snapshot.forEach(function (child) {
                data.push(child.val());
            });
            // console.log("Firebase Data Out 2", { data });
            dispatch(changeApplicationStatus(data?.[0]));
            dispatch(changeRateStatus(data?.[0]));
            dispatch(changeConnectorStatus(data?.[0]));
            dispatch(changeKeyStatus(data?.[0]));
        });
    };

    const onSubmit = async (value) => {
        setIsLoading(true);
        const recaptchToken = await captchaRef.current.execute();

        let fcm_token = "";
        const messaging = getMessaging();
        await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
            .then((currentToken) => {
                if (currentToken) {
                    fcm_token = currentToken;
                } else {
                    console.warn("No registration token available. Request permission to generate one.");
                }
            })
            .catch((err) => {
                console.warn("An error occurred while retrieving token. ", err);
            });

        const payload = {
            ...value,
            fcm_token,
        };

        const catpchaPayload = {
            recaptcha: recaptchToken,
            server: process.env.NODE_ENV,
        };

        // dispatch(loginStart(payload, catpchaPayload));

        const data = await loginTFAUserApi(payload, catpchaPayload);
        if (data?.responseCode === 200) {
            await getFirebaseData(data?.data?.id);
            if (data?.data?.has_google_auth_activated == "1") {
                setLoginDataState(data?.data);
                setViewOtpScreen(true);
            } else {
                showToastMessage(data?.response, data?.responseCode);
                dispatch(detailStart(data?.data?.token, () => {}));
            }
        }

        setIsLoading(false);
    };

    const asyncScriptOnLoad = (res, error) => {
        if (res.loaded) {
            setIsCatpchaScriptLoaded(true);
        } else {
            setIsCatpchaScriptLoaded(false);
        }
    };

    useEffect(() => {
        // console.log(signInAnotherWay);
    }, [signInAnotherWay]);

    return (
        <div className="auth-bg">
            <div className="top-bar-boxed fixed h-[70px] z-[51] top-0 border-b border-white/[0.08] px-3 sm:px-8 md:pt-0 auth-bg w-full">
                <div className="h-full flex items-center justify-center lg:justify-start">
                    {/* BEGIN: Logo */}
                    <Link to="/" className="-intro-x md:flex">
                        <img alt="Icewall Tailwind HTML Admin Template" className="w-[150px] h-[95px] object-contain" src={Images.logoImage} />
                    </Link>
                    {/* END: Logo */}
                </div>
            </div>
            <div className="block lg:grid grid-cols-2 gap-4 content-auth mt-[70px] flex p-0 sm:p-5">
                <AuthSideScreen {...authMesages.login.sideScreen} />

                {!signInAnotherWay ? (
                    <>
                        {!viewOtpScreen ? (
                            <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit} validateOnMount>
                                {({ handleSubmit, isValid }) => (
                                    <Form className="flex justify-center sm:items-center w-full">
                                        <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                                            <h3 className="intro-x font-medium text-2xl text-center sm:text-left">
                                                {authMesages.login.headingText}
                                            </h3>
                                            <p class="intro-x text-slate-400 text-center text-sm mt-1 sm:text-left">
                                                Welcome back! Please signin to continue.
                                            </p>
                                            {/* <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">{authMesages.login.mobileText}</div> */}
                                            <div className="intro-x mt-8">
                                                <Input
                                                    label={"Email address"}
                                                    type="text"
                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                    containerClassName="mt-4"
                                                    placeholder="Enter your email address"
                                                    name="email"
                                                />
                                                <Input
                                                    label={"Password"}
                                                    type="password"
                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                    containerClassName="mt-4"
                                                    placeholder="Enter your password"
                                                    name="password"
                                                />
                                            </div>
                                            <ReCaptchaComponent ref={captchaRef} asyncScriptOnLoad={asyncScriptOnLoad} />
                                            <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-1">
                                                <div className="flex items-center mr-auto">
                                                    {/* <input id="remember-me" type="checkbox" className="form-check-input border mr-2" /> */}
                                                    <Input type="checkbox" className="form-check-input border mr-2" name="rememberMe" />
                                                    <label className="cursor-pointer select-none" htmlFor="remember-me">
                                                        {authMesages.login.rememberMe}
                                                    </label>
                                                </div>
                                                <Link className="text-primary" to="/forgot-password">
                                                    {authMesages.login.forgotPass}
                                                </Link>
                                            </div>
                                            <div className="intro-x mt-4 text-center xl:text-left flex flex-col">
                                                <button
                                                    type="buttons"
                                                    className="btn btn-primary py-3 px-4 w-full align-top"
                                                    onClick={handleSubmit}
                                                    disabled={!isCatpchaScriptLoaded || isLoading}>
                                                    {authMesages.login.buttons.signIn} <MiniLoader isLoading={isLoading} />
                                                </button>
                                                {/* <button
                                                    type="button"
                                                    className="btn btn-outline-secondary py-3 px-4 w-full xl:mt-0 align-top"
                                                    onClick={registerNow}>
                                                    {authMesages.login.buttons.register}
                                                </button> */}
                                            </div>
                                            <div class="intro-x text-sm mg-t-20 text-center mt-5">
                                                Don't have an account?{" "}
                                                <Link to="/register" class="text-primary">
                                                    Create an Account
                                                </Link>
                                            </div>
                                            <hr class="intro-x my-4" />
                                            <TermsAndConditionsText />
                                            {isValid && !isCatpchaScriptLoaded ? (
                                                <p>Your captcha is not loading. Please check your network connection.</p>
                                            ) : null}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <OtpScreen
                                setViewOtpScreen={setViewOtpScreen}
                                setSignInAnotherWay={setSignInAnotherWay}
                                signInType={signInType}
                                setSignInType={setSignInType}
                                loginData={loginDataState}
                                isFirstTimeOTP={isFirstTimeOTP}
                                setIsFirstTimeOTP={setIsFirstTimeOTP}
                            />
                        )}
                    </>
                ) : (
                    <AnotherWayToSignIn setSignInAnotherWay={setSignInAnotherWay} setSignInType={setSignInType} />
                )}
            </div>
        </div>
    );
};

export default Login;
