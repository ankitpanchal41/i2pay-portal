import React, { useRef, useState } from "react";
import * as Icon from "react-feather";
import { useNavigate } from "react-router";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
const AutoplaySlider = withAutoplay(AwesomeSlider);
const  Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));

const PaymentLinkIntegration = () => {
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
                            "how-to-create-payment-link",
                            "modify-payment-link",
                            "share-payment-link",
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
                        <li
                            className="scroll-to-link"
                            data-target="how-to-create-payment-link"
                            onClick={(e) => goToSection("how-to-create-payment-link", e)}>
                            <a>Create Payment Link</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="modify-payment-link"
                            onClick={(e) => goToSection("modify-payment-link", e)}>
                            <a>Modify Payment Link</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="share-payment-link"
                            onClick={(e) => goToSection("share-payment-link", e)}>
                            <a>Share Payment Link</a>
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
                            you need to provide appropriate credentials. On the other hand, you can use i2pay connector by clicking{" "}
                            <strong>Use I2pay Connector</strong> too.
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
                  

                    {/* START: HOW TO CREATE PAYMENT LINK */}
                    <div className="overflow-hidden api-document-section" id="how-to-create-payment-link">
                        <h2>How to create payment link</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `payment-links`} target="_blank">
                                Payment Links
                            </a>{" "}
                            page as shown. You will get all of the available links listed there.
                        </p>
                        <p>
                            After that, click on the <strong>Add Payment Link</strong> to create a new payment link.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-link/add-payment-link.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Payment Link Listing"
                                title="Payment Link Listing"
                                src="images/payment-link/add-payment-link.png"
                            />
                        </div>

                        <p>You can create a new payment link as shown below.</p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-link/add-payment-link-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Add Payment Link"
                                title="Add Payment Link"
                                src="images/payment-link/add-payment-link-2.png"
                            />
                        </div>

                        <p>
                            In the create payment link section, you can choose <strong>Payment Type</strong> from <strong>Single</strong> or{" "}
                            <strong>Multiple</strong> along with <strong>Expiry Date</strong> of payment link.
                        </p>
                        <p>
                            Payment link will automatically been expired while selecting <strong>Single</strong> payment type. Choosing{" "}
                            <strong>Multiple</strong> payment type will allow user to use that link multiple times to pay.
                        </p>
                        <p>
                            <strong className="text-warning">Note:</strong> Both of the payment type will automatically been expired if you
                            select expiry date.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-link/payment-type.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Add Contact Group"
                                title="Add Contact Group"
                                src="images/payment-link/payment-type.png"
                            />
                        </div>

                        <p>
                            Finally, your <strong>Payment Link</strong> is ready to receive payment. Click on <strong>Save</strong> button
                            to create your payment link.
                        </p>

                        <div className="mt-5"></div>

                        <hr />
                    </div>
                    {/* END: HOW TO CREATE PAYMENT LINK */}

                    {/* START: MODIFY PAYMENT LINK */}
                    <div className="overflow-hidden api-document-section" id="modify-payment-link">
                        <h2>Modify Payment Link</h2>
                        <p>
                            You can <strong>Modify</strong>, and <strong>Delete</strong> payment link as shown below.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-link/modify-payment-link.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Modify Payment Link Template"
                                title="Modify Payment Link Template"
                                src="images/payment-link/modify-payment-link.png"
                            />
                        </div>

                        <p>
                            You can directly, <strong>Copy</strong> payment link from listing too. In addition, you can also export
                            available payment links into the excel file by clicking <strong>Export Excel</strong> button.
                        </p>
                        <div className="mt-5"></div>
                    </div>
                    {/* END: MODIFY PAYMENT LINK */}

                    {/* START: SEND PAYMENT LINK */}
                    <div className="overflow-hidden api-document-section" id="share-payment-link">
                        <h2>Share Payment Link</h2>
                        <p>
                            You can share <strong>Payment Link</strong> in to multiple platforms like, <strong>Email</strong>,{" "}
                            <strong>SMS</strong>, <strong>Facebook</strong>, <strong>Telegram</strong>, <strong>Twitter</strong> and{" "}
                            <strong>Whatsapp</strong> by clicking{" "}
                            <strong>
                                <Icon.Share2 className="inline-block" size={15} color="#000000" />
                            </strong>{" "}
                            &nbsp; button. Payment link will automatically been shared to the selected platform with using this button.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-link/share-payment-link.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Share Payment Link"
                                title="Share Payment Link"
                                src="images/payment-link/share-payment-link.png"
                            />
                        </div>
                    </div>
                    {/* END: SEND PAYMENT LINK */}

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
                                    alt="Dashboard Payment Link Report"
                                    title="Dashboard Payment Link Report"
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
export default PaymentLinkIntegration;
