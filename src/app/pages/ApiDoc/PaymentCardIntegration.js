import React, {useRef, useState} from "react";
import * as Icon from "react-feather";
import {useNavigate} from "react-router";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
const AutoplaySlider = withAutoplay(AwesomeSlider);

const  Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));

const PaymentCardIntegration = () => {
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
                            "create-api-keys",
                            "activate-connector",
                            "how-to-create-payment-card",
                            "modify-payment-card",
                            "share-payment-card",
                            // "payment-report",
                        ]}
                        currentClassName="active">
                        <li className="scroll-to-link" data-target="create-api-keys"
                            onClick={(e) => goToSection("create-api-keys", e)}>
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
                            data-target="how-to-create-payment-card"
                            onClick={(e) => goToSection("how-to-create-payment-card", e)}>
                            <a>Create Payment Card</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="modify-payment-card"
                            onClick={(e) => goToSection("modify-payment-card", e)}>
                            <a>Modify Payment Card</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="share-payment-card"
                            onClick={(e) => goToSection("share-payment-card", e)}>
                            <a>Share Payment Card</a>
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
                            <strong className="text-danger">Note: </strong> You don't need to regenerate API keys, if
                            it's already generated
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
                            Generated keys will shown as below, you can <strong>Revoke</strong> keys using <strong>Revoke
                            API Keys</strong>{" "}
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
                        <hr/>
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
                            After that, click on the <strong>Status</strong> button
                            to <strong>activate</strong> connector. As you can see,
                            you need to provide appropriate credentials. On the other hand, you can use exotic
                            connector by clicking{" "}
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
                        <hr/>
                    </div>
                    {/* END: ACTIVATE CONNECTOR */}


                    {/* START: HOW TO CREATE PAYMENT LINK */}
                    <div className="overflow-hidden api-document-section" id="how-to-create-payment-card">
                        <h2>How to create payment card</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `payment-card`} target="_blank">
                                Payment Card
                            </a>{" "}
                            page as shown. You will get all of the available payment cards listed there.
                        </p>
                        <p>
                            After that, click on the <strong>Add Payment Card</strong> to create a new payment card.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-card/add-payment-card.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Payment Card Listing"
                                title="Payment Card Listing"
                                src="images/payment-card/add-payment-card.png"
                            />
                        </div>


                        <p>After that, choose the predefined template for the payment card to start.</p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-card/predefined-content.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Predefined Content Payment Card"
                                title="Predefined Content Payment Card"
                                src="images/payment-card/predefined-content.png"
                            />
                        </div>

                        <p>You can create a new payment card as shown below.</p>

                        <p><strong className="text-warning">Note: </strong> In the <strong>Product Name</strong> field
                            you can choose products which are available in your store. Selecting any products will
                            automatically fill all of the remaining fields of this page. </p>




                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-card/add-payment-card-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Add Payment Card"
                                title="Add Payment Card"
                                src="images/payment-card/add-payment-card-2.png"
                            />
                        </div>


                        <p>To create a custom product, enter your product name in <strong>Product Name</strong> field and
                            click on <strong>create</strong> button as shown below.</p>


                        <p><strong className="text-warning">Note: </strong> You need to create product to create <strong>Custom product card</strong>. You can also create product variant as well in product card.</p>


                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-card/create-or-select-product.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create or select product"
                                title="Create or select product"
                                src="images/payment-card/create-or-select-product.png"
                            />
                        </div>





                        <p>
                            Next, click on <strong>Save</strong> button
                            to preview your payment card before save.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-card/payment-card-preview.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="payment card preview"
                                title="payment card preview"
                                src="images/payment-card/payment-card-preview.png"
                            />
                        </div>

                        <p>
                            Finally, click
                            on <strong>Save Payment Card</strong> button
                            in the preview to create your payment card.
                        </p>

                        <div className="mt-5"></div>

                        <hr/>
                    </div>
                    {/* END: HOW TO CREATE PAYMENT LINK */}

                    {/* START: MODIFY PAYMENT LINK */}
                    <div className="overflow-hidden api-document-section" id="modify-payment-card">
                        <h2>Modify Payment Card</h2>
                        <p>
                            You can <strong>Modify</strong>, and <strong>Delete</strong> payment card as shown below.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-card/modify-payment-card.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Modify Payment Card Template"
                                title="Modify Payment Card Template"
                                src="images/payment-card/modify-payment-card.png"
                            />
                        </div>

                        <p>
                            You can directly, <strong>Copy</strong> payment card from listing too. In addition, you can
                            also export
                            available payment cards into the excel file by clicking <strong>Export
                            Excel</strong> button.
                        </p>
                        <div className="mt-5"></div>
                    </div>
                    {/* END: MODIFY PAYMENT LINK */}

                    {/* START: SEND PAYMENT LINK */}
                    <div className="overflow-hidden api-document-section" id="share-payment-card">
                        <h2>Share Payment Card</h2>
                        <p>
                            You can share <strong>Payment Card</strong> in to multiple platforms
                            like, <strong>Facebook</strong>, <strong>Telegram</strong>, <strong>Twitter</strong> and{" "}
                            <strong>Whatsapp</strong> by clicking{" "}
                            <strong>
                                <Icon.Share2 className="inline-block" size={15} color="#000000"/>
                            </strong>{" "}
                            &nbsp; button. Payment card will automatically been shared to the selected platform with
                            using this button.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/payment-card/share-payment-card.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Share Payment Card"
                                title="Share Payment Card"
                                src="images/payment-card/share-payment-card.png"
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
                                    alt="Dashboard Payment Card Report"
                                    title="Dashboard Payment Card Report"
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
export default PaymentCardIntegration;
