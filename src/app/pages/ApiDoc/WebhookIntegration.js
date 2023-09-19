import React, {useRef, useState} from "react";
import * as Icon from "react-feather";
import {useNavigate} from "react-router";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));

const WebhookIntegration = () => {
    const myRef = useRef(null);
    const [visibleBannerModal, setVisibleBannerModal] = useState("");
    const [bannerImages, setBannerImages] = useState([]);
    const navigate = useNavigate();
    // const { userData } = useSelector((state) => state.persist);

    const onClickBanner = (item) => {
        setVisibleBannerModal(!visibleBannerModal);
        const images = [];
        images.push(item);
        setBannerImages(images);
    };

    const goToSection = (scrollToID, el) => {
        let target = document.getElementById(scrollToID);
        target.scrollIntoView({
            behavior: "smooth",
        });
        document.querySelector(".scroll-to-link.active").classList.remove("active");
        document.querySelector("[ data-target='" + scrollToID + "']").classList.add("active");
    };

    const onClickBack = () => {
        navigate(`/api-document`);
    };

    const openMobileMenu = () => {
        document.querySelector("html").classList.toggle("menu-opened");
    };

    return (
        <>
            <ApiDocumentImageModal removeHeader={false} removeFooter={false} visible={visibleBannerModal}
                                   onClose={onClickBanner}>
                <div className="">
                    <AutoplaySlider
                        animation="foldOutAnimation"
                        bullets={false}
                        organicArrows={false}
                        className="h-full"
                        play={false}
                        interval={2000}>
                        <div>
                            <img src={bannerImages[0] || ""}/>
                        </div>
                    </AutoplaySlider>
                </div>
            </ApiDocumentImageModal>

            <div className="left-menu">
                <div className="api-document-logo">
                    <div className="logo">
                        <img alt="API documentation" title="API documentation" src="images/logo.png"
                             style={{height: 32}}/>
                        <span>API Documentation</span>
                    </div>
                    <button className="burger-menu-icon" id="button-menu-mobile" onClick={() => openMobileMenu()}>
                        <svg width="34" height="34" viewBox="0 0 100 100">
                            <path
                                className="line line1"
                                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"></path>
                            <path className="line line2" d="M 20,50 H 80"></path>
                            <path
                                className="line line3"
                                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"></path>
                        </svg>
                    </button>
                </div>
                <div className="mobile-menu-closer"></div>
                <div className="api-document-back-menu">
                    <ul>
                        <li className="flex" onClick={onClickBack}>
                            <Icon.ChevronLeft className="mr-2 cursor-pointer relative top-1" size={30} color="#777A7A"/>
                            <a className="" style={{cursor: "pointer"}}>
                                BACK
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="api-document-menu">
                    <Scrollspy
                        items={[
                            "how-to-create-webhook",
                            "preview-webhook",
                            "test-webhook",
                            "modify-webhook",
                        ]}
                        currentClassName="active">
                        <li
                            className="scroll-to-link"
                            data-target="how-to-create-webhook"
                            onClick={(e) => goToSection("how-to-create-webhook", e)}>
                            <a>Create Webhook</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="preview-webhook"
                            onClick={(e) => goToSection("preview-webhook", e)}>
                            <a>Preview Webhook</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="preview-webhook"
                            onClick={(e) => goToSection("test-webhook", e)}>
                            <a>Test Webhook</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="modify-webhook"
                            onClick={(e) => goToSection("modify-webhook", e)}>
                            <a>Modify Webhook</a>
                        </li>
                    </Scrollspy>
                </div>
            </div>
            <div className="api-document-page">
                <div ref={myRef} className="api-document api-document-single-content">

                    {/* START: HOW TO CREATE WEBHOOK */}
                    <div className="overflow-hidden api-document-section" id="how-to-create-webhook">
                        <h2>How to create webhook</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `webhook`} target="_blank">
                                Webhook
                            </a>{" "}
                            page as shown. You will get all of the available webhooks listed there.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/webhook/webhook.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Webhook Listing"
                                title="Webhook Listing"
                                src="images/webhook/webhook.png"
                            />
                        </div>


                        <p>
                            After that, click on the <strong>Add Webhook</strong> to create a new webhook. You will be
                            asked to select pre defined events according to your need. After selecting, events enter
                            your callback url. It will be a call back url for selected events. Finally, enter your
                            description and you are good to go.
                        </p>


                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/webhook/add-webhook.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Webhook Listing"
                                title="Webhook Listing"
                                src="images/webhook/add-webhook.png"
                            />
                        </div>

                        <hr/>
                    </div>
                    {/* END: HOW TO CREATE WEBHOOK */}


                    {/* START: PREVIEW WEBHOOK */}
                    <div className="overflow-hidden api-document-section" id="preview-webhook">
                        <h2>Preview Webhook</h2>
                        <p>
                            After creating webhook you can preview webhook by clicking preview button as shown below.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/webhook/preview-webhook.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Webhook preview"
                                title="Webhook preview"
                                src="images/webhook/preview-webhook.png"
                            />
                        </div>


                        <p>
                            In the preview section you can find history of fired webhooks for specific events which you
                            defined before.
                        </p>

                        <p>
                            <strong className='text-warning'>Note: </strong> When you will use the preview button first
                            time or there are not history for webhook. You will be asked to test your webhook. You can
                            test your webhooks too. History will automatically displayed when available.
                        </p>

                        <p>In the history section you can find successful or failed responses. So, you can track your
                            webhook events accordingly. You can change preview for specific events
                            using <strong>Action</strong> button which is displayed in list.</p>


                        <div className="mt-8">
                            <h4>SUCCESS RESPONSE</h4>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/webhook/webhook-success-response.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Webhook preview"
                                    title="Webhook preview"
                                    src="images/webhook/webhook-success-response.png"
                                />
                            </div>

                        </div>

                        <div className="mt-8">
                            <h4>FAILED RESPONSE</h4>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/webhook/webhook-failed-response.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Webhook preview"
                                    title="Webhook preview"
                                    src="images/webhook/webhook-failed-response.png"
                                />
                            </div>

                        </div>


                        <hr/>
                    </div>
                    {/* END: PREVIEW WEBHOOK */}


                    {/* START: TEST WEBHOOK */}
                    <div className="overflow-hidden api-document-section" id="test-webhook">
                        <h2>Test Webhook</h2>
                        <p>
                            Also, you can test your webhooks using preview button. Just select your event and click on
                            the test button.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/webhook/test-webhook.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Webhook preview"
                                title="Webhook preview"
                                src="images/webhook/test-webhook.png"
                            />
                        </div>

                        <p>
                            <strong className='text-warning'>Note: </strong> You can test webhook only once. After
                            testing your webhook it will reload your history of webhooks.
                        </p>

                        <hr/>
                    </div>
                    {/* END: TEST WEBHOOK */}

                    {/* START: MODIFY WEBHOOK */}
                    <div className="overflow-hidden api-document-section" id="modify-webhook">
                        <h2>Modify Webhook</h2>
                        <p>
                            You can <strong>Modify</strong>, and <strong>Delete</strong> webhook as shown below.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/webhook/modify-webhook.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Modify Webhook"
                                title="Modify Webhook"
                                src="images/webhook/modify-webhook.png"
                            />
                        </div>

                        <div className="mt-5"></div>
                    </div>
                    {/* END: MODIFY WEBHOOK */}

                </div>
            </div>
        </>
    );
};
export default WebhookIntegration;
