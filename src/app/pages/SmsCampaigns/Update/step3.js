import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { messages } from "../../../messages/merchantRegister";
import { Step3EmailContentSection } from "../../../utils/validationSchema";
import { addSmsCampaignData } from "../../../redux/services/SmsCampaign";
import { useSelector } from "react-redux";

const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));

const Step3 = ({ id }) => {
    const navigate = useNavigate();
    const initialValuesObj = {
        content: "",
    };
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);

    const { detailSmsCampaign } = useSelector((state) => state.smsCampaign);

    useEffect(() => {
        setInitialValues({ content: detailSmsCampaign?.content });
    }, [detailSmsCampaign]);

    const onSubmit = async (values) => {
        setIsSubmiting(true);

        const payload = { ...values, step: 3, id };

        const response = await addSmsCampaignData(payload);

        if (response?.responseCode === 200) {
            navigate("/sms-campaigns");
        }
        setIsSubmiting(false);
    };

    return (
        <>
            <div className="pt-5 intro-y">
                <Formik initialValues={initialValues} validationSchema={Step3EmailContentSection} onSubmit={onSubmit} enableReinitialize>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="">
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-4">
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        textarea="true"
                                        type="text"
                                        rows="5"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.smsCampaign.step3.content}
                                        name="content"
                                        label={messages.smsCampaign.step3.content}
                                        isRequiredField
                                    />
                                </div>

                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end">
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
export default Step3;
