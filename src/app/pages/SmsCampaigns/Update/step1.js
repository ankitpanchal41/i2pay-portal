import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { messages } from "../../../messages/merchantRegister";
import { Step1SmsCampaignDetails } from "../../../utils/validationSchema";
import { addSmsCampaignData } from "../../../redux/services/SmsCampaign";
import { useSelector } from "react-redux";

const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));

const Step1 = ({ onSaveCurrentId, onSaveCurrentStep, id, onChangeSection }) => {
    const initialValuesObj = {
        name: "",
    };
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);

    const { detailSmsCampaign } = useSelector((state) => state.smsCampaign);

    useEffect(() => {
        setInitialValues({ name: detailSmsCampaign?.name });
    }, [detailSmsCampaign]);

    const onSubmit = async (values) => {
        setIsSubmiting(true);

        const payload = { ...values, step: 1, id };

        const response = await addSmsCampaignData(payload);

        if (response?.responseCode === 200) {
            if (!id) {
                onSaveCurrentStep(2);
            }
            onChangeSection();
        }
        setIsSubmiting(false);
    };

    return (
        <>
            <div className="pt-5 intro-y">
                <Formik initialValues={initialValues} validationSchema={Step1SmsCampaignDetails} onSubmit={onSubmit} enableReinitialize>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="">
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-4">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.smsCampaign.step1.name}
                                        name="name"
                                        label={messages.smsCampaign.step1.name}
                                        isRequiredField
                                    />
                                </div>

                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end">
                                    <button
                                        type="buttons"
                                        className="btn btn-primary w-24 ml-2"
                                        onClick={handleSubmit}
                                        disabled={isSubmiting}
                                    >
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
