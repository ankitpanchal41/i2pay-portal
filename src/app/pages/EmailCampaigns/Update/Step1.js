import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { messages } from "../../../messages/merchantRegister";
import { Step1EmailCampaignDetails } from "../../../utils/validationSchema";
import { updateEmailCampaignData } from "../../../redux/services/EmailCampaign";
import { useSelector } from "react-redux";

const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));

const Step1 = ({ onSaveCurrentStep, id, onChangeSection }) => {
    const initialValuesObj = {
        name: "",
        subject: "",
    };
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);

    const { detailEmailCampaign } = useSelector((state) => state.emailCampaign);

    useEffect(() => {
        setInitialValues({ name: detailEmailCampaign?.name, subject: detailEmailCampaign?.subject });
    }, [detailEmailCampaign]);

    const onSubmit = async (values) => {
        setIsSubmiting(true);

        const payload = { ...values, step: 1, id };

        const response = await updateEmailCampaignData(payload);

        if (response?.responseCode === 200) {
            onSaveCurrentStep(2);
            onChangeSection();
        }
        setIsSubmiting(false);
    };

    return (
        <>
            <div className="pt-5 intro-y">
                <Formik initialValues={initialValues} validationSchema={Step1EmailCampaignDetails} onSubmit={onSubmit} enableReinitialize>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="">
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-4">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.emailCampaign.step1.name}
                                        name="name"
                                        label={messages.emailCampaign.step1.name}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.emailCampaign.step1.subject}
                                        name="subject"
                                        label={messages.emailCampaign.step1.subject}
                                        extraLabel={
                                            <small className="text-gray-500">
                                                (<em>Create a email subject for this campaign</em>)
                                            </small>
                                        }
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                    <button
                                        type="buttons"
                                        className="btn btn-primary w-24 ml-2"
                                        onClick={handleSubmit}
                                        disabled={isSubmiting}>
                                        Save <MiniLoader isLoading={isSubmiting} />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
export default Step1;
