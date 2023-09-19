import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Icon from "react-feather";
import { encode } from "js-base64";
import {
    EMAIL_TEMPLATE_1_DESIGN,
    EMAIL_TEMPLATE_2_DESIGN,
    EMAIL_TEMPLATE_3_DESIGN,
    EMAIL_TEMPLATE_4_DESIGN,
    EMAIL_TEMPLATE_5_DESIGN,
    EMAIL_TEMPLATE_6_DESIGN,
} from "../../../utils/JSON/email-template";
import { updateEmailCampaignData } from "../../../redux/services/EmailCampaign";
import { useDispatch, useSelector } from "react-redux";
import { DETAIL_EMAIL_CAMPAIGN_REQUEST } from "../../../redux/actions/EmailCampaign";
import { ClipLoader } from "react-spinners";

const EmailTemplateEditor = React.lazy(() => import("../../../components/common/EmailTemplateEditor"));
const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));

const EmailTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailEditorRef, setEmailEditorRef] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { content_json } = useSelector((state) => state?.emailCampaign?.detailEmailCampaign);

    const { templateId, campaignId } = useParams();

    const myRef = useRef();

    let selectedTemplate = false;
    let title = "";

    if (templateId === "1") {
        selectedTemplate = EMAIL_TEMPLATE_1_DESIGN;
        title = "Default template";
    } else if (templateId === "2") {
        selectedTemplate = EMAIL_TEMPLATE_2_DESIGN;
        title = "Tell a story";
    } else if (templateId === "3") {
        selectedTemplate = EMAIL_TEMPLATE_3_DESIGN;
        title = "Sell a product";
    } else if (templateId === "4") {
        selectedTemplate = EMAIL_TEMPLATE_4_DESIGN;
        title = "Register for an event";
    } else if (templateId === "5") {
        selectedTemplate = EMAIL_TEMPLATE_5_DESIGN;
        title = "Simple";
    } else if (templateId === "6") {
        selectedTemplate = EMAIL_TEMPLATE_6_DESIGN;
        title = "Start from scratch";
    }

    useEffect(() => {
        if (!content_json) {
            const callBack = () => {
                setIsLoading(false);
            };

            const navigateListing = () => {
                navigate("/email-campaigns");
            };

            setIsLoading(true);
            dispatch({ type: DETAIL_EMAIL_CAMPAIGN_REQUEST, payload: { id: campaignId }, callBack, navigateListing });
        }
    }, [!content_json]);

    const onClickBack = () => {
        navigate(`/email-campaigns/update/${campaignId}`);
    };

    const onClickSave = () => {
        emailEditorRef?.current?.editor?.exportHtml(
            async function (data) {
                // var json = data.design;
                // var html = data.html;

                const { design, html } = data;
                // const aaa = JSON.stringify(html);

                // const content = html.split("style")?.join("templateStyle");

                setIsSubmiting(true);

                const payload = {
                    step: 3,
                    id: campaignId,
                    content: encode(html),
                    content_json: encode(JSON.stringify(design)),
                };

                // const formData = new FormData();
                // formData.append("step", 3);
                // formData.append("id", campaignId);
                // formData.append("content", html);
                // formData.append("content_json", JSON.stringify(design));
                // formData.append()

                const response = await updateEmailCampaignData(payload);

                if (response?.responseCode === 200) {
                    navigate(`/email-campaigns`);
                }

                setIsSubmiting(false);
            },
            {
                cleanup: false,
            },
        );
    };

    const onSaveData = (ref) => {
        setEmailEditorRef(ref);
    };

    const onClickOtherTemplate = () => {
        navigate(`/email-template/update/${campaignId}`);
    };

    const _renderHeading = () => {
        return (
            <div className="intro-y flex flex-col sm:flex-row pt-2 pb-2 justify-between">
                <div className="flex">
                    <div className="inline-flex">
                        <div className="flex items-center">
                            <Icon.ChevronLeft className="mr-2 cursor-pointer" size={30} onClick={onClickBack} />
                            <h2 className="text-lg font-medium mr-auto">Template Editor</h2>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex flex-row">
                        <div className="inline-flex ml-2 mr-2" role="group">
                            <button
                                className="btn text-sm font-medium text-white bg-primary max-h-[38px] mr-2"
                                onClick={onClickOtherTemplate}>
                                <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                                <span className="hidden md:block lg:block">Other Templets</span>
                            </button>
                            <button
                                disabled={isSubmiting}
                                className="btn text-sm font-medium text-white bg-primary max-h-[38px]"
                                onClick={onClickSave}>
                                <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                                <span className="hidden md:block lg:block">
                                    Save <MiniLoader isLoading={isSubmiting} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            // <Heading
            //     // noTopMargin
            //     title={"Add Email Campaign"}
            //     displayBackButton={true}
            //     onClickBack={onClickBack}
            //     addButton={
            //         <div className="inline-flex ml-2" role="group">
            //             <button className="btn text-sm font-medium text-white bg-primary max-h-[38px]" onClick={onClickSave}>
            //                 <Icon.Plus size="16" className="block md:hidden lg:hidden" />
            //                 <span className="hidden md:block lg:block">Save</span>
            //             </button>
            //         </div>
            //     }
            // />
        );
    };

    return (
        <div className="bg-white">
            {/* BEGIN: Heading */}
            {_renderHeading()}
            {/* END: Heading */}
            {/* <div className="intro-y mt-5">
                <div className="overflow-x-auto scrollbar-hidden"> */}
            {isLoading ? (
                <div className="flex justify-center items-center h-[calc(100vh-54px)]">
                    <ClipLoader
                        loading={true}
                        color="#1e3a8a"
                        size={55}
                        css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                    />
                </div>
            ) : (
                <EmailTemplateEditor id={campaignId} onSaveData={onSaveData} json={selectedTemplate ? selectedTemplate : content_json} />
            )}
            {/* </div>
            </div> */}
        </div>
    );
};
export default EmailTemplate;
