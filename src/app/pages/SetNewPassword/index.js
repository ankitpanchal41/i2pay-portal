import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Input from "../../components/common/forms/Input";
import { changePasswordEnd } from "../../redux/actions/PersistActions";
import { setNewPasswordValidation } from "../../utils/validationSchema";
import { handleChangePassword } from "../../redux/services/AuthService";
import MiniLoader from "../../components/common/MiniLoader";
import PasswordCheck from "../../components/common/PasswordCheck";
import { checkStatusForPassword } from "../../utils/helper";

const initialValues = { oldPassword: "", newPassword: "", confirmPassword: "" };

const SetNewPassword = () => {
    const dispatch = useDispatch();
    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const onSubmit = useCallback(async (values, formikBag) => {
        if (isSubmiting) return;
        try {
            setIsSubmiting(true);
            const payload = {
                password: values.newPassword,
                old_password: values.oldPassword,
                confirm_password: values.confirmPassword,
                first_time_login: false,
            };

            const data = await handleChangePassword(payload);
            if (data?.responseCode === 200) {
                dispatch(changePasswordEnd());

                formikBag?.resetForm();
            }
        } catch (error) {
        } finally {
            setIsSubmiting(false);
        }
    }, []);

    return (
        <Formik initialValues={initialValues} validationSchema={setNewPasswordValidation} onSubmit={onSubmit} validateOnMount>
            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => {
                const { strength, result } = checkStatusForPassword(values?.newPassword);

                return (
                    <Form>
                        <div className="intro-y mt-12">
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        isRequiredField
                                        type="password"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder="Old Password"
                                        label="Old Password"
                                        name="oldPassword"
                                    />
                                    <Input
                                        isRequiredField
                                        type="password"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder="New Password"
                                        label="New Password"
                                        name="newPassword"
                                        containerClassName="mt-4"
                                    />
                                    <PasswordCheck strength={strength} result={result} />
                                    <Input
                                        isRequiredField
                                        type="password"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder="Confirm Password"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        containerClassName="mt-4"
                                    />
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
                );
            }}
        </Formik>
    );
};

export default SetNewPassword;
