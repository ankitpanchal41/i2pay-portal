import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { messages } from "../../messages/merchantRegister";
import { Step5EmailDesignSection } from "../../utils/validationSchema";

const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));

/**
 * Email campaign design section
 */
const Step5 = () => {
    const navigate = useNavigate();
    const initialValues = {
        email_from_name: "",
        email_address: "",
    };
    const [isSubmiting, setIsSubmiting] = useState(false);
    const onSubmit = (values) => {};
    const onClickBack = () => {
        navigate(`/email-campaigns`);
    };
    const _renderHeading = () => {
        return <Heading title={"Add Email Campaign"} displayBackButton={true} onClickBack={onClickBack} />;
    };
    const { mode } = useSelector((state) => state.persist);

    const [campaignDetailsSectionVisible, setCampaignDetailsSectionVisible] = useState(false);

    return (
        <>
            <div className="p-5 intro-y">
                <Formik initialValues={initialValues} validationSchema={Step5EmailDesignSection} onSubmit={onSubmit}>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="">
                            <div className="grid grid-cols-12 gap-4 gap-y-5">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.emailCampaign.step5.email_from_name}
                                        name="email_from_name"
                                        label={messages.emailCampaign.step5.email_from_name}
                                        isRequiredField
                                    />
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.emailCampaign.step5.email_address}
                                        name="email_address"
                                        label={messages.emailCampaign.step5.email_address}
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
export default Step5;
