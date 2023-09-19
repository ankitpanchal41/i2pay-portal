import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmailCampaignData } from "../../../redux/services/EmailCampaign";

const Step3 = ({ id }) => {
    const navigate = useNavigate();
    const initialValues = {
        content: "",
    };
    const [isSubmiting, setIsSubmiting] = useState(false);

    const onSubmit = async (values) => {
        setIsSubmiting(true);

        const payload = { ...values, step: 3, id };

        const response = await addEmailCampaignData(payload);

        if (response?.responseCode === 200) {
            navigate("/email-campaigns");
        }
        setIsSubmiting(false);
    };

    return <></>;
};
export default Step3;
