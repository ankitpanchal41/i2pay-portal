import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Images from "../../../../assets/images";
// const Images = React.lazy(() => import("../../../../assets/images"));
const Heading = React.lazy(() => import("../../../components/common/Heading"));
const CampaignTemplatePreviewModal = React.lazy(() => import("../../../components/common/CampaignTemplatePreviewModal"));

const DATA = [
    {
        id: 1,
        image: Images.EmailTemplate1,
        title: "Default template",
    },
    {
        id: 2,
        image: Images.EmailTemplate2,
        title: "Tell a story",
    },
    {
        id: 3,
        image: Images.EmailTemplate3,
        title: "Sell a product",
    },
    {
        id: 4,
        image: Images.EmailTemplate4,
        title: "Register for an event",
    },
    {
        id: 5,
        image: Images.EmailTemplate5,
        title: "Simple",
    },
    {
        id: 6,
        image: Images.EmailTemplate6,
        title: "Start from scratch",
    },
];

const EmailTemplate = () => {
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const [visiblePreviewModal, setVisiblePreviewModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const onClickBack = () => {
        navigate(`/email-campaigns/create/${campaignId}`);
    };

    const _renderHeading = () => {
        return <Heading title={"Email Templates"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const onClickUseTemplate = (templateId) => {
        navigate(`/email-template/create/${campaignId}/editor/${templateId}`);
    };

    const onClickPreviewTemplate = (image) => {
        setVisiblePreviewModal(!visiblePreviewModal);
        setPreviewImage(image);
    };

    return (
        <div className="content">
            <CampaignTemplatePreviewModal
                removeHeader={false}
                removeFooter={false}
                visible={visiblePreviewModal}
                onClose={onClickPreviewTemplate}>
                <div className="">
                    <img src={previewImage || ""} />
                </div>
            </CampaignTemplatePreviewModal>

            {/* BEGIN: Heading */}
            {_renderHeading()}
            {/* END: Heading */}
            <div className="intro-y mt-5">
                <div className="overflow-x-auto scrollbar-hidden">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                            <div className="grid grid-cols-12 gap-6 mt-5">
                                {DATA?.map((d) => {
                                    return (
                                        <div key={d?.id} className="intro-y col-span-12 md:col-span-3">
                                            <div>
                                                <div className="flex justify-center ">
                                                    <div className="h-80 overflow-hidden flex justify-center  relative group w-[202px] border rounded-lg">
                                                        <img src={d?.image} className="h-[130%]" />
                                                        <div className="h-[130%] absolute group-hover:block hidden w-full bg-white bg-opacity-70 cursor-pointer shadow-lg shadow-black">
                                                            <div className="flex flex-col justify-center items-center h-full w-full mt-[-30%]">
                                                                <button
                                                                    className="btn btn-primary mb-3"
                                                                    onClick={() => {
                                                                        onClickPreviewTemplate(d?.image);
                                                                    }}>
                                                                    Preview
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => {
                                                                        onClickUseTemplate(d?.id);
                                                                    }}>
                                                                    Use Template
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center mt-2 text-lg">{d?.title}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EmailTemplate;
