import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { userDetailPaymentCardData } from "../../../redux/services/PaymentCard";

const TemplateOneUserPreview = React.lazy(() => import("./TemplateOne/TemplateOneUserPreview"));
const TemplateTwoUserPreview = React.lazy(() => import("./TemplateTwo/TemplateTwoUserPreview"));
const TemplateThreeUserPreview = React.lazy(() => import("./TemplateThree/TemplateThreeUserPreview"));
const TemplateFourUserPreview = React.lazy(() => import("./TemplateFour/TemplateFourUserPreview"));
const TemplateFiveUserPreview = React.lazy(() => import("./TemplateFive/TemplateFiveUserPreview"));

const UserPaymentCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues = {
        title: "",
        description: "",
        mobile: "",
        email: "",
        terms_conditions: "",
    };

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // set it to true

    const [isVisibleSocialMedia, setIsVisibleSocialMedia] = useState(false);
    const [paymentData, setPaymentData] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        const data = await userDetailPaymentCardData({ slug: id });

        setPaymentData(data?.data);
        setIsLoading(false);
    };

    return (
        <>
            {/* BEGIN: Content */}
            {isLoading ? (
                <div className="h-[100vh] flex justify-center items-center">
                    <ClipLoader
                        loading={true}
                        color="#FFFFFF"
                        size={55}
                        css="border-width: 6px;border-color: #FFFFFF !important;border-bottom-color: transparent !important;"
                    />
                </div>
            ) : (
                <>
                    {paymentData?.template_id === 1 ? (
                        <TemplateOneUserPreview data={paymentData} />
                    ) : paymentData?.template_id === 2 ? (
                        <TemplateTwoUserPreview data={paymentData} />
                    ) : paymentData?.template_id === 3 ? (
                        <TemplateThreeUserPreview data={paymentData} />
                    ) : paymentData?.template_id === 4 ? (
                        <TemplateFourUserPreview data={paymentData} />
                    ) : paymentData?.template_id === 5 ? (
                        <TemplateFiveUserPreview data={paymentData} />
                    ) : (
                        <TemplateOneUserPreview data={paymentData} />
                    )}
                </>
            )}
            {/* END: Content */}
        </>
    );
};

export default UserPaymentCard;
