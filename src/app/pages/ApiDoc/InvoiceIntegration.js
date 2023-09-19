import React, { useRef, useState } from "react";
import * as Icon from "react-feather";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
import { useNavigate } from "react-router";
const AutoplaySlider = withAutoplay(AwesomeSlider);
const  Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));

const InvoiceIntegration = () => {
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
                            "how-to-create-invoice",
                            "invoice-add-products",
                            "invoice-preview-and-download",
                            "modify-invoice-and-configuration",
                        ]}
                        currentClassName="active">
                        <li className="scroll-to-link" data-target="create-api-keys" onClick={(e) => goToSection("create-api-keys", e)}>
                            <a>Create API Keys</a>
                        </li>
                        <li className="scroll-to-link" data-target="activate-connector"
                            onClick={(e) => goToSection("activate-connector", e)}>
                            <a>Activate Connector</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="how-to-create-invoice"
                            onClick={(e) => goToSection("how-to-create-invoice", e)}>
                            <a>How to create Invoice</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="invoice-add-products"
                            onClick={(e) => goToSection("invoice-add-products", e)}>
                            <a>Invoice Products & Tax</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="invoice-preview-and-download"
                            onClick={(e) => goToSection("invoice-preview-and-download", e)}>
                            <a>Preview & Download</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="modify-invoice-and-configuration"
                            onClick={(e) => goToSection("modify-invoice-and-configuration", e)}>
                            <a>Modify Invoice & Configuration</a>
                        </li>
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
                            After that, click on the <strong>Status</strong> button
                            to <strong>activate</strong> connector. As you can see, you need to provide appropriate
                            credentials. On the other hand, you can use i2pay connector by clicking <strong>Use I2pay Connector</strong> too.
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

                    {/* START: How to create Invoice */}
                    <div className="overflow-hidden api-document-section" id="how-to-create-invoice">
                        <h2>How to create Invoice</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `invoice`} target="_blank">
                                Invoice
                            </a>{" "}
                            page as shown. You will get all of the available invoices listed there.
                        </p>
                        <p>
                            After that, click on the <strong>Add Button</strong> to create a new invoice.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/invoice/click-invoice-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Invoice Listing & Add Invoice"
                                title="Invoice Listing & Add Invoice"
                                src="images/invoice/click-invoice-1.png"
                            />
                        </div>

                        <hr />

                        <div className="mt-8">
                            <h4>INVOICE DETAILS</h4>

                            <p>
                                You can manage <strong>Invoice Name</strong>, <strong>Invoice Number</strong> & <strong>Currency</strong>.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/invoice-details-2-1.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Invoice Detail"
                                    title="Invoice Detail"
                                    src="images/invoice/invoice-details-2-1.png"
                                />
                            </div>

                            <p>
                                Also you can change, <strong>Billing & Shipping Address</strong> & <strong>Invoice Logo</strong>.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/invoice-details-2-2.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Invoice Detail"
                                    title="Invoice Detail"
                                    src="images/invoice/invoice-details-2-2.png"
                                />
                            </div>
                        </div>

                        <hr />
                    </div>
                    {/* END: How to create Invoice */}

                    {/* START: Invoice Products */}
                    <div className="overflow-hidden api-document-section" id="invoice-add-products">
                        <h2>Invoice Products & Tax</h2>
                        <div className="mt-8">
                            <h4>STEP 1: ADD PRODUCTS</h4>
                            <p>
                                To add the product in the invoice click on the <strong>"Add Products To The List"</strong> button. You can
                                add as many products as you want.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/add-product-3.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Add Product"
                                    title="Add Product"
                                    src="images/invoice/add-product-3.png"
                                />
                            </div>
                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>STEP 2: ADD TAX</h4>
                            <p>
                                You can also add tax individually to the product in the invoice. To do that, select tax accordingly. You can
                                choose tax from <strong>No Tax</strong>, <strong>IGST</strong>, <strong>CGST & SGST</strong>.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/add-tax-4.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Add Tax"
                                    title="Add Tax"
                                    src="images/invoice/add-tax-4.png"
                                />
                            </div>

                            <p>
                                After selecting a tax you need to provide tax percentage. Total amount will automatically generated
                                according to tax as shown.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/tax-value-5.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Add Tax Value"
                                    title="Add Tax Value"
                                    src="images/invoice/tax-value-5.png"
                                />
                            </div>

                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>STEP 3: MODIFY PRODUCTS</h4>
                            <p>
                                Added products will be shown as below. You can modify product, tax and also remove the product while
                                creating an invoice.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/modify-tax-6.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Modify Tax Value"
                                    title="Modify Tax Value"
                                    src="images/invoice/modify-tax-6.png"
                                />
                            </div>
                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>STEP 4: Adding Signature</h4>
                            <p>You can add digital signature as text as shown below.</p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/digital-signature-7.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Signature"
                                    title="Signature"
                                    src="images/invoice/digital-signature-7.png"
                                />
                            </div>
                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>STEP 5: Save Invoice</h4>
                            <p>Finally, click on save button at the upper right corner to save the invoice.</p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/save-8.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Save Invoice"
                                    title="Save Invoice"
                                    src="images/invoice/save-8.png"
                                />
                            </div>
                            <hr />
                        </div>
                    </div>
                    {/*END: Invoice Products */}

                    {/* START: Invoice Preview & Download */}
                    <div className="overflow-hidden api-document-section" id="invoice-preview-and-download">
                        <h2>Invoice Preview & Download</h2>

                        <div className="mt-8">
                            <h4>Preview Invoice</h4>
                            <p>
                                To preview invoice click the <strong>Preview</strong> button as shown below.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/preview-9.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Preview Invoice"
                                    title="Preview Invoice"
                                    src="images/invoice/preview-9.png"
                                />
                            </div>
                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>Download Invoice As PDF</h4>
                            <p>
                                In the preview section, you can download the invoice as PDF with clicking <strong>Download</strong> button.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/download-10.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Preview Invoice"
                                    title="Preview Invoice"
                                    src="images/invoice/download-10.png"
                                />
                            </div>
                            <hr />
                        </div>
                    </div>
                    {/* END: Invoice Preview & Download */}

                    {/* START: Invoice Modify & Configuration*/}
                    <div className="overflow-hidden api-document-section" id="modify-invoice-and-configuration">
                        <h2>Modify Invoice & Configuration</h2>

                        <div className="mt-8">
                            <h4>INVOICE CONFIGURATIONS</h4>

                            <p>
                                You can <strong>Preview</strong>, <strong>Download</strong>, <strong>Modify</strong>,{" "}
                                <strong>Send Invoice To Mail</strong>, and <strong>Delete</strong> invoice using configurations.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/configure-invoice-11.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Configure Invoice Detail"
                                    title="Configure Invoice Detail"
                                    src="images/invoice/configure-invoice-11.png"
                                />
                            </div>

                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>SEND INVOICE INTO MAIL</h4>

                            <p>You can send invoice to the mail recursively according to selected timeline as shown below.</p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/invoice/send-mail-12.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Send Mail"
                                    title="Send Mail"
                                    src="images/invoice/send-mail-12.png"
                                />
                            </div>
                            <hr />
                        </div>

                        <div className="mt-8">
                            <h4>DETAILED REPORT</h4>


                            <p>
                                You can also check detailed chart report of transactions by going {" "}
                                <a
                                    href={process.env.REACT_APP_MERCHANT_URL} target="_blank">
                                    Dashboard
                                </a>{" "} page as shown below.
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
                            <hr />
                        </div>

                    </div>
                    {/* END: Invoice Modify & Configuration*/}
                </div>
            </div>
        </>
    );
};
export default InvoiceIntegration;
