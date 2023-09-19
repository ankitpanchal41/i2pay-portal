import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { DETAIL_EMAIL_CAMPAIGN_REQUEST } from "../../../redux/actions/EmailCampaign";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";

const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../../components/common/Heading"));
const Step1 = React.lazy(() => import("./Step1"));
const Step2 = React.lazy(() => import("./Step2"));
const Step3 = React.lazy(() => import("./Step3"));

const UpdateEmailCampaign = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { emailCampaignId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            navigate("/email-campaigns");
        };

        setIsLoading(true);
        dispatch({ type: DETAIL_EMAIL_CAMPAIGN_REQUEST, payload: { id: emailCampaignId }, callBack, navigateListing });
    }, []);

    const { detailEmailCampaign } = useSelector((state) => state.emailCampaign);

    useEffect(() => {
        setSectionVisible(Number(detailEmailCampaign?.step) + 1);
        setCurrentStep(Number(detailEmailCampaign?.step) + 1);
    }, [detailEmailCampaign]);

    const onClickBack = () => {
        navigate(`/email-campaigns`);
    };
    const _renderHeading = () => {
        return <Heading title={"Edit Email Campaign"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const [campaignDetailsSectionVisible, setCampaignDetailsSectionVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Email Sections Visibility
    const [sectionVisible, setSectionVisible] = useState(1);
    // END: Email Sections Visibility

    return (
        <>
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y box col-span-12 overflow-x-auto overflow-hidden">
                                {isLoading ? (
                                    <div className="flex justify-center h-48 items-center">
                                        <ClipLoader
                                            loading={true}
                                            color="#1e3a8a"
                                            size={55}
                                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {/* BEGIN: EmailCampaign Detail */}
                                        <div className="intro-y bg-[#F4F5F880] p-[30px] mt-1">
                                            <div className={`flex items-center`}>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="text-md text-[14px] text-[#3B4863] font-medium">
                                                        Campaign name and subject
                                                    </div>
                                                    <div>
                                                        <span onClick={() => setSectionVisible(1)} className="cursor-pointer">
                                                            {currentStep > 1 ? <Icon.Edit size={20} /> : ""}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={sectionVisible === 1 ? "" : "hidden"}>
                                                <Step1
                                                    id={emailCampaignId}
                                                    onSaveCurrentStep={(step) => {
                                                        setCurrentStep(step);
                                                    }}
                                                    onChangeSection={() => {
                                                        setSectionVisible(2);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* END:  EmailCampaign Detail */}

                                        {/* BEGIN: Email Campaign To */}
                                        <div className="intro-y bg-[#F4F5F880] p-[30px] mt-2">
                                            <div className={`flex items-center`}>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="text-md text-[14px] text-[#3B4863] font-medium">
                                                        To
                                                        <small className="ml-2 text-[#97A3B9]">
                                                            <em>
                                                                Select or add your contacts from your contact lists (Select any one or both)
                                                            </em>
                                                        </small>
                                                    </div>
                                                    <div>
                                                        {currentStep > 1 && (
                                                            <span onClick={() => setSectionVisible(2)} className="cursor-pointer">
                                                                {currentStep > 1 ? <Icon.Edit size={20} /> : ""}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={sectionVisible === 2 ? "" : "hidden"}>
                                                <Step2
                                                    id={emailCampaignId}
                                                    onSaveCurrentStep={(step) => {
                                                        setCurrentStep(step);
                                                    }}
                                                    onChangeSection={() => {
                                                        setSectionVisible(3);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* END: Email Campaign To */}

                                        {/* BEGIN: Email Campaign Design */}
                                        <div className="intro-y bg-[#F4F5F880] p-[30px] mt-2">
                                            <div className={`flex items-center`}>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="text-md text-[14px] text-[#3B4863] font-medium">
                                                        Design
                                                        <small className="ml-2 text-[#97A3B9]">
                                                            <em>Create design of your email campaign from various templates</em>
                                                        </small>
                                                    </div>
                                                    <div>
                                                        {currentStep > 2 && (
                                                            <span
                                                                onClick={() => {
                                                                    navigate(`/email-template/update/editor/${emailCampaignId}`);
                                                                }}
                                                                className="cursor-pointer">
                                                                {currentStep > 1 ? <Icon.Edit size={20} /> : ""}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={(sectionVisible) => (3 ? "" : "hidden")}>
                                                <Step3 id={emailCampaignId} />
                                            </div>
                                        </div>
                                        {/* END: Email Campaign Design */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UpdateEmailCampaign;
