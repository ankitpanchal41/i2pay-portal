import { useCallback, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

import Input from "../../components/common/forms/Input";
import PhoneInput from "../../components/common/forms/PhoneInput";
import AuthSideScreen from "../../components/common/AuthSideScreen";
import ReCaptchaComponent from "../../components/common/Recaptcha";

import { uniqueValidations, verifyRP } from "../../redux/services/AuthService";
import { registerValidations } from "../../utils/validationSchema";

import { authMesages } from "../../messages/auth";
import { setLoading } from "../../redux/actions/Loader";
import Images from "../../../assets/images";
import MiniLoader from "../../components/common/MiniLoader";

const initialValues = {
    email: "",
    mobile: "",
    termsCheck: false,
    countryCode: {
        name: "India",
        value: "+91",
        code: "IN",
        flag: "🇮🇳",
    },
};

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const captchaRef = useRef();
    const [isCatpchaScriptLoaded, setIsCatpchaScriptLoaded] = useState(null);
    const [rpValue, setRPValue] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const gotoLogin = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const moveToOTP = async (values) => {
        setIsLoading(true);
        const recaptchToken = await captchaRef.current.execute();
        // setIsLoading(true);

        const catpchaPayload = {
            recaptcha: recaptchToken,
            server: process.env.NODE_ENV,
        };

        const payload = {
            email: values.email,
            mobile_no: values.mobile,
        };

        try {
            setIsLoading(true);
            const data = await uniqueValidations(payload, catpchaPayload);

            if (data?.responseCode === 200) {
                navigate("/verify", {
                    state: { RP: rpValue, ...values },
                });
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const asyncScriptOnLoad = (res, error) => {
        if (res.loaded) {
            setIsCatpchaScriptLoaded(true);
        } else {
            setIsCatpchaScriptLoaded(false);
        }
    };

    useEffect(() => {
        async function checkRP() {
            if (window?.location?.search?.includes("RP=")) {
                const RP = window?.location?.search?.split("RP=")[1];
                dispatch(setLoading(true));
                const data = await verifyRP(RP);

                if (data?.responseCode === 200) {
                    setRPValue(RP);
                } else {
                    const nextURL = `${window.location.origin}/register`;
                    const nextTitle = "My new page title";
                    const nextState = { additionalInformation: "Updated the URL with JS" };
                    window.history.pushState(nextState, nextTitle, nextURL);
                }
                dispatch(setLoading(false));
            }
        }

        checkRP();
    }, []);

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

                <Formik initialValues={initialValues} validationSchema={registerValidations} onSubmit={moveToOTP} validateOnMount>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="flex justify-center sm:items-center w-full">
                            <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                                <h3 className="intro-x font-medium text-2xl text-center sm:text-left">
                                    {authMesages.register.sideScreen.textLine1}
                                </h3>
                                <p class="intro-x text-slate-400 text-center text-sm mt-1 sm:text-left">
                                    It's free to signup and only takes a minute.
                                </p>
                                <div className="intro-x mt-8">
                                    <Input
                                        label="Email address"
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder="Enter your email add"
                                        name="email"
                                    />
                                    <PhoneInput
                                        marginTopNull
                                        label="Mobile number"
                                        countryCodeValue={values.countryCode}
                                        setFieldValue={setFieldValue}
                                        error={errors.mobile}
                                        touched={touched.mobile}
                                        containerClassName="mt-4"
                                        name="mobile"
                                        placeholder="Mobile number"
                                    />
                                    {/* <Input
                                        type="number"
                                        className="intro-x login__input form-control py-2 px-3 block mt-4"
                                        placeholder="Mobile no."
                                        name="mobile"
                                    /> */}
                                </div>
                                <div className="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm">
                                    {/* <input id="remember-me" type="checkbox" className="form-check-input border mr-2" /> */}
                                    <Input
                                        type="checkbox"
                                        className="form-check-input border mr-2"
                                        name="termsCheck"
                                        errorEnabled={false}
                                    />
                                    {/* <label className="cursor-pointer select-none" htmlFor="remember-me">
                                        I agree to the I2pay
                                    </label>
                                    <a className="text-primary dark:text-slate-200 ml-1" href="#">
                                        Privacy Policy
                                    </a> */}
                                    {/* . */}
                                    <div class="text-sm">
                                        I agree to the I2pay{" "}
                                        <a className="text-primary" href="https://payomatix.com/privacy-policy/" target="_blank">
                                            Privacy Policy
                                        </a>
                                    </div>
                                </div>

                                <ReCaptchaComponent ref={captchaRef} asyncScriptOnLoad={asyncScriptOnLoad} />
                                <div className="intro-x mt-4 text-center xl:text-left flex flex-col">
                                    <button
                                        type="buttons"
                                        className="btn btn-primary py-3 px-4 w-full align-top"
                                        onClick={handleSubmit}
                                        disabled={!isValid || !isCatpchaScriptLoaded || isLoading}>
                                        {authMesages.login.buttons.register} <MiniLoader isLoading={isLoading} />
                                    </button>
                                    {/* <button
                                        type="button"
                                        className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                                        onClick={gotoLogin}>
                                        {authMesages.login.buttons.signIn}
                                    </button> */}
                                </div>
                                <div class="intro-x text-sm text-center mt-8">
                                    Already have an account?{" "}
                                    <Link to="/login" class="text-primary">
                                        Sign In
                                    </Link>
                                </div>
                                {isValid && !isCatpchaScriptLoaded ? (
                                    <p>Your catpcha is not loading. Please check your network connection.</p>
                                ) : null}
                            </div>
                        </Form>
                    )}
                </Formik>
                {/* END: Register Form */}
            </div>
        </div>
    );
};

export default Register;
