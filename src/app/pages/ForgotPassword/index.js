import { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/common/forms/Input";
import { forgotPasswordValidation } from "../../utils/validationSchema";
import AuthSideScreen from "../../components/common/AuthSideScreen";
import { authMesages } from "../../messages/auth";
import { setLoading } from "../../redux/actions/Loader";
import { forgotPassword } from "../../redux/services/AuthService";
import Images from "../../../assets/images";
import MiniLoader from "../../components/common/MiniLoader";

const initialValues = { email: "" };

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const gotoLogin = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const onSubmit = useCallback(async (values) => {
        setIsLoading(true);
        try {
            const data = await forgotPassword(values);
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="auth-bg">
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
                <AuthSideScreen {...authMesages.login.sideScreen} />

                <Formik initialValues={initialValues} validationSchema={forgotPasswordValidation} onSubmit={onSubmit} validateOnMount>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="flex justify-center sm:items-center w-full">
                            <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                                <h3 className="intro-x font-medium text-2xl text-center sm:text-left">Forgot your password?</h3>
                                <p class="intro-x text-slate-400 text-center text-sm mt-1 sm:text-left">
                                    Enter your username or email address and we will send you a link to reset your password.
                                </p>

                                <div className="intro-x mt-8">
                                    <Input
                                        label="Email address"
                                        type="email"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder="Email"
                                        name="email"
                                    />
                                </div>
                                <div className="intro-x mt-4 text-center xl:text-left flex flex-col">
                                    <button
                                        disabled={isLoading}
                                        type="buttons"
                                        className="btn btn-primary py-3 px-4 w-full align-top"
                                        onClick={handleSubmit}>
                                        {authMesages.forgotPassword.getLink} <MiniLoader isLoading={isLoading} />
                                    </button>
                                    {/* <button
                                        type="button"
                                        className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                                        onClick={gotoLogin}>
                                        Sign in
                                    </button> */}
                                </div>
                                <div class="intro-x text-sm text-center mt-7">
                                    Back to{" "}
                                    <Link to="/login" class="text-primary">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPassword;
