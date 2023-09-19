import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate, useSearchParams, Link } from "react-router-dom";
import { Formik, Form } from "formik";

import Input from "../../components/common/forms/Input";
import AuthSideScreen from "../../components/common/AuthSideScreen";

import { authMesages } from "../../messages/auth";
import { setLoading } from "../../redux/actions/Loader";
import { changePasswordValidation } from "../../utils/validationSchema";
import { updatePassword, verifyTokenStatus } from "../../redux/services/AuthService";
import PasswordCheck from "../../components/common/PasswordCheck";
import { checkStatusForPassword } from "../../utils/helper";
import Images from "../../../assets/images";
import MiniLoader from "../../components/common/MiniLoader";

const initialValues = { newPassword: "", confirmPassword: "" };

const VerifyForgotPassword = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const params = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const token = params[0].get("token");

    const onSubmit = useCallback(async (values) => {
        if (!token) return;

        const payload = {
            token,
            password: values?.newPassword,
            password_confirmation: values?.confirmPassword,
        };

        try {
            setIsLoading(true);
            const data = await updatePassword(payload);
            if (data?.responseCode === 200) {
                navigation("/login");
            }
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    const tokenStatusVerfiy = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const data = await verifyTokenStatus({ token });
            if (data?.responseCode !== 200) {
                navigation("/forgot-password");
            }
        } catch {
            navigation("/forgot-password");
        } finally {
            dispatch(setLoading(false));
        }
    }, []);

    useEffect(() => {
        tokenStatusVerfiy();
    }, [token]);

    if (!token) return <Navigate to="/forgot-password" />;

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
                {/* END: Register Info */}
                {/* BEGIN: Register Form */}
                <Formik initialValues={initialValues} validationSchema={changePasswordValidation} onSubmit={onSubmit} validateOnMount>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => {
                        const { strength, result } = checkStatusForPassword(values?.newPassword);
                        return (
                            <Form className="flex justify-center sm:items-center w-full">
                                <div className="box w-full max-w-[400px] height-fit dark:bg-darkmode-600 sm:px-10 sm:py-8 px-4 py-8">
                                    <h3 className="intro-x font-medium text-2xl text-center sm:text-left">
                                        {authMesages.resetPassword.headingText}
                                    </h3>

                                    <div className="intro-x mt-8">
                                        <Input
                                            type="password"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder="New Password"
                                            name="newPassword"
                                        />
                                        <PasswordCheck strength={strength} result={result} />
                                        <Input
                                            type="password"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder="Confirm Password"
                                            containerClassName="mt-4"
                                            name="confirmPassword"
                                        />
                                    </div>
                                    <div className="intro-x mt-4 text-center xl:text-left flex flex-col">
                                        <button
                                            className="btn btn-primary py-3 px-4 w-full align-top"
                                            onClick={handleSubmit}
                                            disabled={!isValid || isLoading}>
                                            Save <MiniLoader isLoading={isLoading} />
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
                {/* END: Register Form */}
            </div>
        </div>
    );
};

export default VerifyForgotPassword;
