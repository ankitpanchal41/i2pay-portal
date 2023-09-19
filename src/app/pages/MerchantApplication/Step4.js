import React from "react";
import { Formik } from "formik";
import { Form } from "formik";

import Input from "../../components/common/forms/Input";
import Dropzone from "../../components/common/forms/Dropzone";
import { messages } from "../../messages/merchantRegister";
import { businessValidation } from "../../utils/validationSchema";

const Step4 = ({ onNextClick, changeStepNumber, stepValues, onPreviousClick, disable }) => {
    const initialValues = stepValues || {
        business_activity: "",
        business_details: "",
        business_email: "",
        business_phone_num: "",
        business_plan: "",
        business_license: "",
        business_financial: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            initialTouched={false}
            validationSchema={businessValidation}
            onSubmit={onNextClick}
            enableReinitialize={true}>
            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                <Form className="px-5 sm:px-20 mt-10 mb-7">
                    <div className="font-medium text-base">{messages.formStepTitles.step4}</div>
                    <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.business_activity}
                                name="business_activity"
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.business_details}
                                name="business_details"
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.business_email}
                                name="business_email"
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.business_phone_num}
                                name="business_phone_num"
                                maxLength="12"
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="business_plan"
                                placeholder={messages.placeholders.business_plan}
                                error={errors.business_plan}
                                touched={touched.business_plan}
                                values={values.business_plan}
                                accept="image/png,image/jpg,image/jpeg"
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="business_license"
                                placeholder={messages.placeholders.business_license}
                                error={errors.business_license}
                                touched={touched.business_license}
                                values={values.business_license}
                                accept="image/png,image/jpg,image/jpeg"
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="business_financial"
                                placeholder={messages.placeholders.business_financial}
                                error={errors.business_financial}
                                touched={touched.business_financial}
                                values={values.business_financial}
                                accept="image/png,image/jpg,image/jpeg"
                            />
                        </div>
                        {!disable && (
                            <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                <button className="btn btn-secondary w-24" type="button" onClick={onPreviousClick}>
                                    Previous
                                </button>
                                <button className="btn btn-primary w-24 ml-2" onClick={handleSubmit}>
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default React.memo(Step4);
