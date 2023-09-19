import React, { useRef, useState } from "react";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import * as Icon from "react-feather";
import { useNavigate } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToastMessage } from "../../utils/methods";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
const AutoplaySlider = withAutoplay(AwesomeSlider);


const SyntaxHighlighter = React.lazy(() => import("react-syntax-highlighter"));
const  Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));

const PayButtonIntegration = () => {
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

    const onCopyText = () => {
        showToastMessage(`Your script was copied to the clipboard.`, 200);
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
                    <ul>
                        <Scrollspy
                            items={[
                                "create-api-keys",
                                "activate-connector",
                                "how-to-create-pay-button",
                                "pay-button-customization",
                                "pay-button-integration",
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
                                data-target="how-to-create-pay-button"
                                onClick={(e) => goToSection("how-to-create-pay-button", e)}>
                                <a>How to create Pay Button</a>
                            </li>
                            <li
                                className="scroll-to-link"
                                data-target="pay-button-customization"
                                onClick={(e) => goToSection("pay-button-customization", e)}>
                                <a>Customization</a>
                            </li>
                            <li
                                className="scroll-to-link"
                                data-target="pay-button-integration"
                                onClick={(e) => goToSection("pay-button-integration", e)}>
                                <a>Integration</a>
                            </li>
                        </Scrollspy>
                    </ul>
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

                    {/* START: HOW TO CREATE PAY BUTTON */}
                    <div className="overflow-hidden api-document-section" id="how-to-create-pay-button">
                        <h2>How to create Pay Button</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `paybutton-integration`} target="_blank">
                                Pay Button
                            </a>{" "}
                            page as shown.
                        </p>
                        <p>
                            After that, click on the <strong>Add Button</strong> to create a new pay button.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/paybutton/click-pay-button-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="API documentation"
                                title="API documentation"
                                src="images/paybutton/click-pay-button-1.png"
                            />
                        </div>
                        <hr />
                    </div>
                    {/* END: HOW TO CREATE PAY BUTTON */}

                    {/* START: Customization */}
                    <div className="overflow-hidden api-document-section" id="pay-button-customization">
                        <h2>Customization</h2>
                        <div className="mt-8">
                            <h4>STEP 1: CHANGE BUTTON TEXT & LOGO</h4>
                            <p>
                                To change the pay button text you need to change <strong>BUTTON TEXT</strong> field. Furthermore, you can
                                add logo along with your button text. To do that, select any image from <strong>LOGO</strong> section as
                                shown in image.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/paybutton/modify-button-text-with-logo-2.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="API documentation"
                                    title="API documentation"
                                    src="images/paybutton/modify-button-text-with-logo-2.png"
                                />
                            </div>
                            <hr />
                        </div>
                        <div className="mt-8">
                            <h4>STEP 2: CHANGE BACKGROUND & FONT COLOR</h4>
                            <p>
                                To change the background of the button you need to select color from <strong>Background Color</strong>{" "}
                                field. In the same way, select color from <strong>Font Color</strong> to change buttons font color as shown.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/paybutton/change-background-and-font-color-3.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="API documentation"
                                    title="API documentation"
                                    src="images/paybutton/change-background-and-font-color-3.png"
                                />
                            </div>
                            <hr />
                        </div>
                        <div className="mt-8">
                            <h4>STEP 3: CHANGE OTHER STYLES</h4>
                            <p>
                                In addition, you can modify lots of styles in button like, <strong>Font Size</strong>,{" "}
                                <strong>Border Radius</strong>, <strong>Font Weight</strong>, <strong>Padding</strong> and{" "}
                                <strong>Logo Height & Width</strong>
                            </p>
                            <p>To do that, move you need to change the sliders accordingly.</p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/paybutton/customization-sliders-4.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="API documentation"
                                    title="API documentation"
                                    src="images/paybutton/customization-sliders-4.png"
                                />
                            </div>
                            <hr />
                        </div>
                    </div>
                    {/*END: Customization */}

                    {/* START: Integration */}
                    <div className="overflow-hidden api-document-section" id="pay-button-integration">
                        <h2>Integration</h2>
                        <div className="mt-8">
                            <p>After creating a button, all of the available buttons are listed as shown below.</p>
                            <p>
                                Now, click on <strong>Copy Button</strong> to get specific button which you want to add in your store as
                                payment button.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/paybutton/click-copy-button-5.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="API documentation"
                                    title="API documentation"
                                    src="images/paybutton/click-copy-button-5.png"
                                />
                            </div>

                            <p>
                                You can also check integrated pay button's transactions detailed chart report by going{" "}
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
                                    alt="Dashboard Chart Report"
                                    title="Dashboard Chart Report"
                                    src="images/common/dashboard-chart.png"
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4>STEP 1: ADD BUTTON</h4>
                            <p>
                                Put the copied button in your store where you want to add pay button. You can put button any where in body
                                tag in your html.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/paybutton/step-by-step-7.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="API documentation"
                                    title="API documentation"
                                    src="images/paybutton/step-by-step-7.png"
                                />
                            </div>

                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>STEP 2: ADD SCRIPTS & CREDENTIALS</h4>
                            <p>
                                After adding a button you need to add <strong>Scripts</strong> and <strong>Credentials</strong> in same
                                order as shown above. Please replace credentials with your credentials.
                            </p>

                            <p>
                                You can copy <strong>Scripts</strong> and <strong>Credentials</strong> by clicking following buttons.
                            </p>

                            {/*Copy Button 1*/}
                            <div className="w-100 mt-8 flex ml-6">
                                <span className="copy-button-title">Copy jQuery Script</span>
                                <CopyToClipboard
                                    text={`<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>`}
                                    onCopy={() => {
                                        onCopyText();
                                    }}>
                                    <div className="source-code block flex mr-2">
                                        <button
                                            data-target="#copy-basic-dropdown"
                                            className="copy-code btn btn-outline-secondary py-1 px-2">
                                            <Icon.Copy size={15} />
                                        </button>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className="api-document-copy-buttons mt-2">
                                <div className="flex">
                                    <div className="copy-button">
                                        <SyntaxHighlighter language="json" style={dark}>
                                            {`<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            </div>
                            {/*END: Copy Button 1*/}

                            {/*Copy Button 2*/}
                            <div className="w-100 mt-8 flex ml-6">
                                <span className="copy-button-title">Copy Credentials</span>
                                <CopyToClipboard
                                    text={`
<script>
    payload = {
        email: "PUT-YOUR-EMAIL-ADDRESS",
        amount: "PUT-YOUR-AMOUNT-HERE",
        currency: "PUT-YOUR-CURRENCY",
        return_url: "PUT-YOUR-RETURN-URL",
        notify_url: "PUT-YOUR-NOTIFY-URL",
        secret_key: "PUT-YOUR-SECRET-KEY",
    };
</script>
                                    `}
                                    onCopy={() => {
                                        onCopyText();
                                    }}>
                                    <div className="source-code block flex mr-2">
                                        <button
                                            data-target="#copy-basic-dropdown"
                                            className="copy-code btn btn-outline-secondary py-1 px-2">
                                            <Icon.Copy size={15} />
                                        </button>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className="api-document-copy-buttons mt-2">
                                <div className="flex">
                                    <div className="copy-button">
                                        <SyntaxHighlighter language="json" style={dark}>
                                            {`<script>
    payload = {
        email: "PUT-YOUR-EMAIL-ADDRESS",
        amount: "PUT-YOUR-AMOUNT-HERE",
        currency: "PUT-YOUR-CURRENCY",
        return_url: "PUT-YOUR-RETURN-URL",
        notify_url: "PUT-YOUR-NOTIFY-URL",
        secret_key: "PUT-YOUR-SECRET-KEY",
    };
</script>
`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            </div>
                            {/*END: Copy Button 1*/}

                            {/*Copy Button 3*/}
                            <div className="w-100 mt-8 flex ml-6">
                                <span className="copy-button-title">Copy Pay Button Script</span>
                                <CopyToClipboard
                                    text={`<script src="${process.env.REACT_APP_API_URL}js/exotic-paybutton.min.js"></script>`}
                                    onCopy={() => {
                                        onCopyText();
                                    }}>
                                    <div className="source-code block flex mr-2">
                                        <button
                                            data-target="#copy-basic-dropdown"
                                            className="copy-code btn btn-outline-secondary py-1 px-2">
                                            <Icon.Copy size={15} />
                                        </button>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className="api-document-copy-buttons mt-2">
                                <div className="flex">
                                    <div className="copy-button">
                                        <SyntaxHighlighter language="json" style={dark}>
                                            {`<script src="${process.env.REACT_APP_API_URL}js/exotic-paybutton.min.js"></script>`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            </div>
                            {/*END: Copy Button 3*/}
                        </div>

                        <hr />
                    </div>
                </div>
                {/*END: Integration */}
            </div>
            {/*</div>*/}
        </>
    );
};
export default PayButtonIntegration;
