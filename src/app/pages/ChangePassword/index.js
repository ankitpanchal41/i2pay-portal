import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";

import Input from "../../components/common/forms/Input";
import AuthSideScreen from "../../components/common/AuthSideScreen";

import { changePasswordEnd } from "../../redux/actions/PersistActions";

import { changePasswordValidation } from "../../utils/validationSchema";
import { authMesages } from "../../messages/auth";
import { handleChangePassword } from "../../redux/services/AuthService";
import { setLoading } from "../../redux/actions/Loader";
import PasswordCheck from "../../components/common/PasswordCheck";
import { checkStatusForPassword } from "../../utils/helper";
import Images from "../../../assets/images";

const initialValues = { newPassword: "", confirmPassword: "" };

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigateHook = useNavigate();

    const { userData } = useSelector((state) => state.persist);

    useEffect(() => {
        // document.body.classList.remove("main");
        // document.body.classList.add("login");
    }, []);

    const onSubmit = useCallback(async (values) => {
        try {
            dispatch(setLoading(true));
            const payload = {
                password: values.newPassword,
                confirm_password: values.confirmPassword,
                first_time_login: true,
            };

            const data = await handleChangePassword(payload);
            if (data?.responseCode === 200) {
                dispatch(changePasswordEnd());
                navigateHook("/");
            }
        } catch (error) {
            console.log("err", error);
        } finally {
            dispatch(setLoading(false));
        }
    }, []);

    if (userData?.data?.redirect_screen !== "1") return <Navigate to="/" />;

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
                                    <h3 className="intro-x font-medium text-2xl text-center sm:text-left">Set New Password</h3>
                                    {/* <p class="intro-x text-slate-400 text-center text-sm mt-1 sm:text-left">
                                        {authMesages.changePassword.headingText}
                                    </p> */}
                                    <div className="intro-x mt-8">
                                        <label className="form-label">
                                            New Password
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <Input
                                            type="password"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder="New Password"
                                            name="newPassword"
                                        />
                                        <PasswordCheck strength={strength} result={result} />
                                        <label className="form-label mt-4">
                                            Confirm Password
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <Input
                                            type="password"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                        />
                                    </div>
                                    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                        <button
                                            className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                                            onClick={handleSubmit}
                                            disabled={!isValid}>
                                            Save
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

export default ChangePassword;
