import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-feather";
const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../../components/common/Heading"));
const Step1 = React.lazy(() => import("./step1"));
const Step2 = React.lazy(() => import("./step2"));
const Step3 = React.lazy(() => import("./step3"));

const CreateSmsCampaign = () => {
    const navigate = useNavigate();

    const [currentId, setCurrentId] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const onClickBack = () => {
        navigate(`/sms-campaigns`);
    };
    const _renderHeading = () => {
        return <Heading title={"Add SMS Campaign"} displayBackButton={true} onClickBack={onClickBack} />;
    };
    const { mode } = useSelector((state) => state.persist);

    const [campaignDetailsSectionVisible, setCampaignDetailsSectionVisible] = useState(false);

    // SMS Sections Visibility
    const [sectionVisible, setSectionVisible] = useState(1);
    // const [smsToSectionVisible, setSmsToSectionVisible] = useState(false);
    // const [smsTemplateSectionVisible, setSmsTemplateSectionVisible] = useState(false);
    // END: SMS Sections Visibility

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
                                {/* BEGIN: EmailCampaign Detail */}
                                <div className="intro-y bg-[#F4F5F880] p-[30px] mt-1">
                                    <div className={`flex items-center`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="text-md text-[14px] text-[#3B4863] font-medium">Campaign Name</div>
                                            <div>
                                                <span onClick={() => setSectionVisible(1)} className="cursor-pointer">
                                                    {currentStep > 1 ? <Icon.Edit size={20} /> : ""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={sectionVisible === 1 ? "" : "hidden"}>
                                        <Step1
                                            id={currentId}
                                            onSaveCurrentId={(id) => {
                                                setCurrentId(id);
                                            }}
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

                                {/* BEGIN: EmailCampaign Type SMS */}
                                {/* ================================================================ */}
                                <div className="intro-y bg-[#F4F5F880] p-[30px] mt-1">
                                    <div className={`flex items-center`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="text-md text-[14px] text-[#3B4863] font-medium">
                                                To
                                                <small className="ml-2 text-[#97A3B9]">
                                                    <em>Select or add your contacts from your contact lists (Select any one or both)</em>
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
                                            id={currentId}
                                            onSaveCurrentStep={(step) => {
                                                setCurrentStep(step);
                                            }}
                                            onChangeSection={() => {
                                                setSectionVisible(3);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="intro-y bg-[#F4F5F880] p-[30px] mt-1">
                                    <div className={`flex items-center`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="text-md text-[14px] text-[#3B4863] font-medium">
                                                SMS Content
                                                <small className="ml-2 text-[#97A3B9]">
                                                    <em>Create your sms content to send to your selected recipients</em>
                                                </small>
                                            </div>
                                            <div>
                                                {currentStep > 2 && (
                                                    <span onClick={() => setSectionVisible(3)} className="cursor-pointer">
                                                        {currentStep > 1 ? <Icon.Edit size={20} /> : ""}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={sectionVisible === 3 ? "" : "hidden"}>
                                        <Step3 id={currentId} />
                                    </div>
                                </div>
                                {/* ================================================================ */}
                                {/* END:  EmailCampaign Type SMS */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CreateSmsCampaign;
