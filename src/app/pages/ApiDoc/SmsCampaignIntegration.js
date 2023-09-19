import React, { useRef, useState } from "react";
import * as Icon from "react-feather";
import { useNavigate } from "react-router";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
const AutoplaySlider = withAutoplay(AwesomeSlider);
const  Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));


const SmsCampaignIntegration = () => {
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
            <ApiDocumentImageModal removeHeader={false} removeFooter={false} visible={visibleBannerModal} onClose={onClickBanner}>
                <div className="">
                    <AutoplaySlider
                        animation="foldOutAnimation"
                        bullets={false}
                        organicArrows={false}
                        className="h-full"
                        play={false}
                        interval={2000}>
                        <div>
                            <img src={bannerImages[0] || ""} />
                        </div>
                    </AutoplaySlider>
                </div>
            </ApiDocumentImageModal>

            <div className="left-menu">
                <div className="api-document-logo">
                    <div className="logo">
                        <img alt="API documentation" title="API documentation" src="images/logo.png" style={{ height: 32 }} />
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
                            <Icon.ChevronLeft className="mr-2 cursor-pointer relative top-1" size={30} color="#777A7A" />
                            <a className="" style={{ cursor: "pointer" }}>
                                BACK
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="api-document-menu">
                    <Scrollspy
                        items={[
                            "create-api-keys",
                            "activate-connector",
                            "create-contacts",
                            "how-to-create-sms-template",
                            "modify-sms-template",
                            "send-sms-campaign",
                            // "payment-report",
                        ]}
                        currentClassName="active">
                        <li className="scroll-to-link" data-target="create-api-keys" onClick={(e) => goToSection("create-api-keys", e)}>
                            <a>Create API Keys</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="activate-connector"
                            onClick={(e) => goToSection("activate-connector", e)}>
                            <a>Activate Connector</a>
                        </li>
                        <li className="scroll-to-link" data-target="create-contacts" onClick={(e) => goToSection("create-contacts", e)}>
                            <a>Create Contacts</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="how-to-create-sms-template"
                            onClick={(e) => goToSection("how-to-create-sms-template", e)}>
                            <a>Create Sms Campaign</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="modify-sms-template"
                            onClick={(e) => goToSection("modify-sms-template", e)}>
                            <a>Modify Sms Campaign</a>
                        </li>

                        <li className="scroll-to-link" data-target="send-sms-campaign" onClick={(e) => goToSection("send-sms-campaign", e)}>
                            <a>Send Sms Campaign</a>
                        </li>

                        {/* <li className="scroll-to-link" data-target="payment-report" onClick={(e) => goToSection("payment-report", e)}>
                            <a>Payment Report</a>
                        </li> */}
                    </Scrollspy>
                </div>
            </div>
            <div className="api-document-page">
                <div ref={myRef} className="api-document api-document-single-content">
                    {/* START: CREATE API KEYS */}
                    <div className="overflow-hidden api-document-section" id="create-api-keys">
                        <h2>CREATE API KEYS</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `api-key`} target="_blank">
                                API KEY
                            </a>{" "}
                            page as shown.
                        </p>
                        <p>
                            After that, click on the <strong>Generate API Key</strong> button to create a new api keys.
                        </p>
                        <p>
                            <strong className="text-danger">Note: </strong> You don't need to regenerate API keys, if it's already generated
                            previously.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/create-api-key-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/api_key/create-api-key-1.png"
                            />
                        </div>

                        <p>
                            Generated keys will shown as below, you can <strong>Revoke</strong> keys using <strong>Revoke API Keys</strong>{" "}
                            buttons.
                        </p>
                        <p>
                            You can copy <strong>Public Key</strong> or <strong>Secret Key</strong> from here.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/api-keys-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="API Keys"
                                title="API Keys"
                                src="images/api_key/api-keys-2.png"
                            />
                        </div>
                        <hr />
                    </div>
                    {/* END: CREATE API KEYS */}

                    {/* START: ACTIVATE CONNECTOR */}
                    <div className="overflow-hidden api-document-section" id="activate-connector">
                        <h2>ACTIVATE CONNECTOR</h2>
                        <p>
                            After generating <strong>API Keys</strong>, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `connector`} target="_blank">
                                <strong>Connectors</strong>
                            </a>{" "}
                            page as shown.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/create-api-key-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/connector/connector_list.png"
                            />
                        </div>

                        <p>
                            After that, click on the <strong>Status</strong> button to <strong>activate</strong> connector. As you can see,
                            you need to provide appropriate credentials. On the other hand, you can use exotic connector by clicking{" "}
                            <strong>Use Exotic Connector</strong> too.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/api-keys-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="API Keys"
                                title="API Keys"
                                src="images/connector/enable_connector.png"
                            />
                        </div>
                        <hr />
                    </div>
                    {/* END: ACTIVATE CONNECTOR */}

                    {/* START: CREATE CONTACTS */}
                    <div className="overflow-hidden api-document-section" id="create-contacts">
                        <h2>CREATE CONTACTS</h2>
                        <p>
                            Before proceeding to create campaign, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `contact`} target="_blank">
                                Contact
                            </a>{" "}
                            page as shown.
                        </p>

                        <p>
                            <strong className="text-danger">Note: </strong> You can skip create contact if you already have.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/contacts/1-create-contacts.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create Contacts"
                                title="Create Contacts"
                                src="images/contacts/1-create-contacts.png"
                            />
                        </div>

                        <p>
                            After that, click on the <strong>Add Contact</strong> button to create a new contacts. <br />
                            In this section, you can also import contacts directly with downloading sample file and reupload with clicking{" "}
                            <strong>Import Contact</strong> button.
                        </p>
                        <p>
                            In addition, you can group your contacts with adding or selecting your group name while creating or updating a
                            contact.{" "}
                        </p>
                        <p>Campaign can be send directly to the selected contact groups. We'll talk about this later in this document.</p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/contacts/3-list-contacts.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="List Contact"
                                title="List Contact"
                                src="images/contacts/3-list-contacts.png"
                            />
                        </div>

                        <p>
                            You can export contacts with clicking <strong>Export Excel</strong> button in contact listing.
                        </p>
                        <div className="mb-5"></div>

                        <hr />
                    </div>
                    {/* END: CREATE CONTACTS */}

                    {/* START: HOW TO CREATE EMAIL CAMPAIGN */}
                    <div className="overflow-hidden api-document-section" id="how-to-create-sms-template">
                        <h2>How to create sms campaign</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `sms-campaigns`} target="_blank">
                                SMS Campaigns
                            </a>{" "}
                            page as shown. You will get all of the available campaigns listed there.
                        </p>
                        <p>
                            After that, click on the <strong>Add Campaign</strong> to create a new sms campaign template.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/sms-campaign/add-sms-campaign.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Sms Campaign Listing"
                                title="Sms Campaign Listing"
                                src="images/sms-campaign/add-sms-campaign.png"
                            />
                        </div>

                        <p>You can create a new sms campaign template as shown below.</p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/sms-campaign/add-sms-campaign-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Add Sms Campaign"
                                title="Add Sms Campaign"
                                src="images/sms-campaign/add-sms-campaign-2.png"
                            />
                        </div>

                        <p>
                            In the create sms campaign section enter <strong>campaign name</strong> and save it to start.
                        </p>
                        <p>
                            After that, select the contact group you've previously created. Also, you can select other contacts from this
                            section.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/sms-campaign/add-contact-group.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Add Contact Group"
                                title="Add Contact Group"
                                src="images/sms-campaign/add-contact-group.png"
                            />
                        </div>

                        <p>
                            Next, in the design section enter the sms template which you want to send in the sms to receive payment. </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/sms-campaign/sms-content.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Sms content"
                                title="Sms content"
                                src="images/sms-campaign/sms-content.png"
                            />
                        </div>

                        <p>
                            Finally, your sms template is ready to receive payment. Click on <strong>Save</strong> button to create your
                            template.
                        </p>

                        <div className="mt-5"></div>

                        <hr />
                    </div>
                    {/* END: HOW TO CREATE EMAIL CAMPAIGN */}

                    {/* START: MODIFY EMAIL CAMPAIGN */}
                    <div className="overflow-hidden api-document-section" id="modify-sms-template">
                        <h2>Modify Sms Campaign</h2>
                        <p>
                            You can <strong>Modify</strong>, <strong>Delete</strong> and <strong>Preview</strong> template as shown below.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/sms-campaign/modify-sms-template.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Modify Sms Campaign Template"
                                title="Modify Sms Campaign Template"
                                src="images/sms-campaign/modify-sms-template.png"
                            />
                        </div>
                    </div>
                    {/* END: MODIFY EMAIL CAMPAIGN */}

                    {/* START: SEND EMAIL CAMPAIGN */}
                    <div className="overflow-hidden api-document-section" id="send-sms-campaign">
                        <h2>Send Sms Campaign</h2>
                        <p>
                            You can send <strong>Sms Campaign</strong> by clicking{" "}
                            <strong>
                                <Icon.Send className="inline-block" size={15} color="#000000" />
                            </strong>{" "}
                            &nbsp; button. Sms will automatically been send to the selected contacts group with using this button.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/sms-campaign/send-sms-campaign.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Send Sms Campaign"
                                title="Send Sms Campaign"
                                src="images/sms-campaign/send-sms-campaign.png"
                            />
                        </div>
                    </div>
                    {/* END: SEND EMAIL CAMPAIGN */}

                    {/* START:  PAYMENT REPORT*/}
                    {/* <div className="overflow-hidden api-document-section" id="payment-report">
                        <h2>PAYMENT REPORT</h2>

                        <div className="mt-8">
                            <p>
                                You can also check report of sms transactions by going{" "}
                                <a href={process.env.REACT_APP_MERCHANT_URL} target="_blank">
                                    Dashboard
                                </a>{" "}
                                page as shown below.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/transactions-filter-12.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Dashboard SMS Template Report"
                                    title="Dashboard SMS Template Report"
                                    src="images/smspayment/dashboard_sms_transactions_5.png"
                                />
                            </div>
                            <hr />
                        </div>
                    </div> */}
                    {/* END: PAYMENT REPORT*/}
                </div>
            </div>
        </>
    );
};
export default SmsCampaignIntegration;
