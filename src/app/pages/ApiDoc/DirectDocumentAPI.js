import React, {useRef, useState} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useNavigate } from "react-router";
import * as Icon from "react-feather";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));
const  Scrollspy = React.lazy(() => import("react-scrollspy"));

const AutoplaySlider = withAutoplay(AwesomeSlider);

const DirectDocumentApi = () => {
    const myRef = useRef(null);
    const navigate = useNavigate();
    const [visibleBannerModal, setVisibleBannerModal] = useState("");
    const [bannerImages, setBannerImages] = useState([]);
    // const { userData } = useSelector((state) => state.persist);

    const onClickBack = () => {
        navigate(`/api-document`);
    };

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
                    <Scrollspy items={["how-to-integrate-api", "make-test-transaction", "live-transaction", "3ds-url-redirection"]} currentClassName="active">
                        <li
                            className="scroll-to-link"
                            data-target="how-to-integrate-api"
                            onClick={(e) => goToSection("how-to-integrate-api", e)}>
                            <a>How to integrate API</a>
                        </li>
                        <li className="scroll-to-link" data-target="make-test-transaction" onClick={(e) => goToSection("make-test-transaction", e)}>
                            <a>Create Test Transaction</a>
                        </li>
                        <li className="scroll-to-link" data-target="live-transaction" onClick={(e) => goToSection("live-transaction", e)}>
                            <a>Create Transaction</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="3ds-url-redirection"
                            onClick={(e) => goToSection("3ds-url-redirection", e)}>
                            <a>Redirection</a>
                        </li>
                    </Scrollspy>
                </div>
            </div>
            <div className="api-document-page">
                <div className="api-document-code"></div>
                <div ref={myRef} className="api-document">

                    {/* START: HOW TO INTEGRATE API */}
                    <div className="overflow-hidden api-document-section" id="how-to-integrate-api">
                        <h2>How to integrate API</h2>
                        <p>
                            Our platform’s payment API can be integrated with any platform of your choice. You need to send a payment
                            request with payload in JSON format to our API Endpoint. Make sure you have whitelisted all your server IPs at{" "}
                            <strong>
                                <a href={process.env.REACT_APP_MERCHANT_URL + `ip-whitelist`}
                                   target="_blank">
                                    {process.env.REACT_APP_MERCHANT_URL}ip-whitelist
                                </a>
                            </strong>{" "}.

                        </p>

                        <p className="mt-3">
                            After that, create an API key using {" "}
                            <strong>
                                <a href={process.env.REACT_APP_MERCHANT_URL + `api-key`}
                                   target="_blank">
                                    {process.env.REACT_APP_MERCHANT_URL}api-key
                                </a>
                            </strong>{" "}
                            before starting API integration.
                        </p>
                    </div>
                    {/* END: HOW TO INTEGRATE API */}

                    {/* START: CREATE TEST TRANSACTION */}
                    <div className="overflow-hidden api-document-section" id="make-test-transaction">
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
API Endpoint
    Test url : ${process.env.REACT_APP_API_URL}payment/test/merchant/transaction
`}
                        </SyntaxHighlighter>
                        <h2>Create Test Transaction</h2>
                        <p>
                            To make test transactions you need to make a POST call to the following url :<br />
                            <strong>Test url</strong> :{" "}
                            <code className="higlighted break-word">{process.env.REACT_APP_API_URL}payment/test/merchant/transaction</code>
                        </p>
                        <br />
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
curl -X POST ${process.env.REACT_APP_API_URL}payment/test/merchant/transaction
`}
                        </SyntaxHighlighter>

                        <SyntaxHighlighter language="json" style={dark}>
                            {`
EXAMPLE: Request Headers
                            
{ 
    "Accept": "application/json",
    "Authorization": API_KEY,
}`}
                        </SyntaxHighlighter>

                        <h4>REQUEST PARAMETERS</h4>
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
EXAMPLE: Request Parameters
                            
{ 
    "email": "test@jondoe.com",
    "amount": "30.00",
    "currency": "USD",
    "return_url": "https://mysite.com/redirect/dce35d90-fc2e-4a43-a900-1872d9c00890",
    "notify_url": "https://mysite.com/notify/ce35d90-fc2e-4a43-a900-1872d9c00890",
    "merchant_ref": "ce35d90-fc2e-4a43-a900-1872d9c00890",
    "card_no": "4242 4242 4242 4242",
}`}
                        </SyntaxHighlighter>
                        <table className="central-overflow-x">
                            <thead>
                            <tr>
                                <th>Parameters</th>
                                <th>Required</th>
                                <th>Data Type</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>email</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>Valid Email address of User</td>
                            </tr>
                            <tr>
                                <td>amount</td>
                                <td>Yes</td>
                                <td>Decimal</td>
                                <td>Amount Value</td>
                            </tr>
                            <tr>
                                <td>currency</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>3 Digit format, eg USD</td>
                            </tr>
                            <tr>
                                <td>return_url</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>Response URL where we redirect after the transaction process is completed.</td>
                            </tr>
                            <tr>
                                <td>notify_url</td>
                                <td>No</td>
                                <td>String</td>
                                <td>POST URL where we send webhook notification.</td>
                            </tr>
                            <tr>
                                <td>merchant_ref</td>
                                <td>No</td>
                                <td>String</td>
                                <td>Customer order id generated from the user side.</td>
                            </tr>
                            <tr>
                                <td>card_no</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>Test card number.</td>
                            </tr>
                            </tbody>
                        </table>

                        <br/>
                        <p>
                            <strong className="text-danger">Note:</strong> Following cards can be used for different scenarios of the test transactions.
                        </p>

                        <table className="central-overflow-x">
                            <thead>
                            <tr>
                                <th>Card Number</th>
                                <th>Response</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>4242 4242 4242 4242</td>
                                <td>Success</td>
                                <td>To test successful transaction</td>
                            </tr>
                            <tr>
                                <td>4000 0000 0000 3220</td>
                                <td>3ds Redirection</td>
                                <td>To test 3ds redirection transaction</td>
                            </tr>
                            <tr>
                                <td>4000 0000 0000 9995</td>
                                <td>Declined</td>
                                <td>To test insufficient funds transaction</td>
                            </tr>
                            <tr>
                                <td>4000 0000 0000 9987</td>
                                <td>Declined</td>
                                <td>To test stolen cards transaction</td>
                            </tr>
                            </tbody>
                        </table>



                        <div className="mt-12"></div>
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
EXAMPLE: Successful Response                            

{
    "responseCode": 300,
    "response": "Please redirect to redirect_url.",
    "status": "redirect",
    "redirect_url": "${process.env.REACT_APP_API_URL}test/connectors/CSAE1653196475"
}
`}
                        </SyntaxHighlighter>
                        <h4>RESPONSE PARAMETERS</h4>
                        <p>
                            Our server will validate the request and then send the response in JSON format. The response will contain the
                            below parameters. In the successful response as shown you will get redirection URL to create test transaction.
                        </p>
                        <br />

                        <p>After redirecting to the <b>redirect_url</b> you will get test connector as shown below.</p>
                        <div className="api-document-detail max-w-[50%] ">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/test-connector-page-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/test-connector-page-1.png"
                            />
                        </div>

                        <p>
                            There is only one connector available to test as shown. Fill the appropriate details and submit the details with using test cards given above to test different scenarios.
                        </p>
                        <br />

                        <div className="api-document-detail max-w-[50%]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/test-connector-detail-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/test-connector-detail-2.png"
                            />
                        </div>

                        <p>
                            You will be redirected to the page according to the used cards.
                        </p>

                        <br />

                        <p>Using <b>4242 4242 4242 4242</b> card will give you a successful transaction</p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/test-successful-transaction-3.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/test-successful-transaction-3.png"
                            />
                        </div>


                        <p>Using <b>4000 0000 0000 3220</b> card will give you a 3ds redirection as shown below.</p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/test-3DS-redirection-4.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/test-3DS-redirection-4.png"
                            />
                        </div>

                        <p>Using <b>4000 0000 0000 9995	</b> or <b>4000 0000 0000 9987</b> card will give you a declined transaction. In this situation you can retry or cancel transaction as shown below.</p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/retry-or-cancel-transaction-5-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/retry-or-cancel-transaction-5-1.png"
                            />
                        </div>

                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/retry-or-cancel-transaction-5-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/retry-or-cancel-transaction-5-2.png"
                            />
                        </div>

                        <div className="mt-12"></div>
                        <SyntaxHighlighter language="json" style={dark}>
                            {`

EXAMPLE: Error Response                            

{
    "responseCode": 400,
    "response": "Validation failed, please try again",
    "status": "validation_error",
    "errors": {
        "validation": [
            "The email field is required.",
            "The amount field is required.",
            "The currency field is required.",
            "The return url field is required."
        ]
    }
}`}
                        </SyntaxHighlighter>
                        <h4>Errors</h4>
                        <p>If your API request failed due to validation, the response JSON format will be similar as shown:</p>
                    </div>
                    {/*END: CREATE TEST TRANSACTION*/}

                    {/* START: CREATE TRANSACTION */}
                    <div className="overflow-hidden api-document-section mt-12" id="live-transaction">
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
API Endpoint
    Live url : ${process.env.REACT_APP_API_URL}payment/merchant/transaction
`}
                        </SyntaxHighlighter>
                        <h2>Create Transaction</h2>
                        <p>
                            To make transactions you need to make a POST call to the following url :<br />
                            <strong>Live url</strong> :{" "}
                            <code className="higlighted break-word">{process.env.REACT_APP_API_URL}payment/merchant/transaction</code>
                        </p>
                        <br />
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
curl -X POST ${process.env.REACT_APP_API_URL}payment/merchant/transaction
`}
                        </SyntaxHighlighter>



                        <SyntaxHighlighter language="json" style={dark}>
                            {`
EXAMPLE: Request Headers
                            
{ 
    "Accept": "application/json",
    "Authorization": API_KEY,
}`}
                        </SyntaxHighlighter>

                        <br /> <br /> <br />
                        <h4>REQUEST PARAMETERS</h4>
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
EXAMPLE: Request Parameters
                            
{ 
    "email": "test@jondoe.com",
    "amount": "30.00",
    "currency": "USD",
    "return_url": "https://mysite.com/redirect/dce35d90-fc2e-4a43-a900-1872d9c00890",
    "notify_url": "https://mysite.com/notify/ce35d90-fc2e-4a43-a900-1872d9c00890",
    "merchant_ref": "ce35d90-fc2e-4a43-a900-1872d9c00890",
    "card_no": YOUR_CARD_NUMBER,
}`}
                        </SyntaxHighlighter>

                        <table className="central-overflow-x">
                            <thead>
                            <tr>
                                <th>Parameters</th>
                                <th>Required</th>
                                <th>Data Type</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>email</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>Valid Email address of User</td>
                            </tr>
                            <tr>
                                <td>amount</td>
                                <td>Yes</td>
                                <td>Decimal</td>
                                <td>Amount Value</td>
                            </tr>
                            <tr>
                                <td>currency</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>3 Digit format, eg USD</td>
                            </tr>
                            <tr>
                                <td>return_url</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>Response URL where we redirect after the transaction process is completed.</td>
                            </tr>
                            <tr>
                                <td>notify_url</td>
                                <td>No</td>
                                <td>String</td>
                                <td>POST URL where we send webhook notification.</td>
                            </tr>
                            <tr>
                                <td>merchant_ref</td>
                                <td>No</td>
                                <td>String</td>
                                <td>Customer order id generated from the user side.</td>
                            </tr>
                            <tr>
                                <td>card_no</td>
                                <td>Yes</td>
                                <td>String</td>
                                <td>Valid card number.</td>
                            </tr>
                            </tbody>
                        </table>



                        <br /> <br /> <br />
                        <h4>RESPONSE PARAMETERS</h4>
                        <p>
                            Our server will validate the request and then send the response in JSON format. The response will contain the below parameters. In the successful response as shown you will get redirection URL to create transaction.
                            <br />
                        </p>

                        <br />

                        <div className="mt-12"></div>
                        <br />
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
EXAMPLE: Successful Response                            

{
    "responseCode": 300,
    "response": "Please redirect to redirect_url.",
    "status": "redirect",
    "redirect_url": "${process.env.REACT_APP_API_URL}test/connectors/CSAE1653196475"
}`}
                        </SyntaxHighlighter>

                        <h4>PAYMENT OPTIONS PAGE</h4>
                        <p>
                            After successful response, client will be redirected to "redirect_3ds_url". After that, he will see the below screen with all available payment options.</p>

                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/live-transaction-connector-7.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/live-transaction-connector-7.png"
                            />
                        </div>


                        <div className="mt-12"></div>
                       <h4>PAYMENT TYPE SELECTION</h4>
                        <p>When the client selects any option, for example, <b>"Flutterwave"</b>, <b>"Paypal"</b>, or <b>"Stripe"</b> the client will be asked to
                            fill the details.</p>

                        <div className="mt-6"></div>
                        <p>Using <b>Flutterwave</b></p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/using-flutterwave-8.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/using-flutterwave-8.png"
                            />
                        </div>

                        <div className="mt-6"></div>
                        <p>Using <b>Paypal</b></p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/using-paypal-9.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/using-paypal-9.png"
                            />
                        </div>
                        <p><b className="text-danger">Note: </b> You don't need to fill any details while using paypal. Clint will be redirected to paypal login automatically.</p>

                        <div className="mt-6"></div>
                        <p>Using <b>Stripe</b></p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/using-stripe-10.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/using-stripe-10.png"
                            />
                        </div>

                        <div className="mt-6"></div>
                        <p>After submitting the details, transactions response will be shown as below.</p>

                        <br />
                        <p><b>Successful Transaction</b></p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/test-successful-transaction-3.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/test-successful-transaction-3.png"
                            />
                        </div>


                        <p><b>3Ds Redirection</b></p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/test-3DS-redirection-4.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/test-3DS-redirection-4.png"
                            />
                        </div>

                        <p><b>Blocked</b> or <b>Declined</b> Transaction</p>
                        <p><b className="text-danger">Note: </b>In this situation you can retry or cancel transaction as shown below.</p>
                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/retry-or-cancel-transaction-5-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/retry-or-cancel-transaction-5-1.png"
                            />
                        </div>

                        <div className="api-document-detail max-w-[50%] mt-[-15px]">
                            <img
                                onClick={() => {
                                    onClickBanner("images/directPaymentAPI/retry-or-cancel-transaction-5-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/directPaymentAPI/retry-or-cancel-transaction-5-2.png"
                            />
                        </div>


                        <div className="mt-12"></div>
                        <SyntaxHighlighter language="json" style={dark}>
                            {`

EXAMPLE: Error Response                            

{
    "responseCode": 400,
    "response": "Validation failed, please try again",
    "status": "validation_error",
    "errors": {
        "validation": [
            "The email field is required.",
            "The amount field is required.",
            "The currency field is required.",
            "The return url field is required."
        ]
    }
}`}
                        </SyntaxHighlighter>
                        <h4>Errors</h4>
                        <p>If your API request failed due to validation, the response JSON format will be similar as shown:</p>
                    </div>
                    {/*END: CREATE TRANSACTION*/}

                    {/* START: Redirection */}
                    <div className="overflow-hidden api-document-section" id="3ds-url-redirection">
                        <h2>Redirection</h2>

                        <div className="mt-8">
                            <h4>PAYMENT OPTIONS PAGE</h4>
                            <p>
                                After successful response, client will be redirected to <strong>"redirect_3ds_url"</strong>. After that, he
                                will see the below screen with all available payment options.
                            </p>
                        </div>

                        <div className="mt-8">
                            <h4>PAYMENT TYPE SELECTION</h4>
                            <p>
                                When the client selects any option, for example, <strong>"Pay with Card"</strong>, the client will be asked
                                to select a card scheme, VISA, Mastercard etc.
                            </p>
                        </div>

                        <div className="mt-8">
                            <h4>CARD DETAILS</h4>
                            <p>
                                After that, when the client selects any card scheme, for example, <strong>"VISA"</strong>, the client will
                                be asked to input card details with other required information.
                            </p>
                            <p className="mt-3">
                                If any optional parameters have been included in the first API request, that parameter field will not be
                                included in this form.{" "}
                            </p>
                            <p className="mt-3">
                                Once the client inputs all required details, <strong>"Pay Now"</strong> button will be enabled.
                            </p>
                            <p className="mt-3">
                                As soon as the client clicks on the "Pay Now" button, the client will be redirected to the gateway website
                                and proceed for 3D secure verification.
                            </p>
                            <p className="mt-3">
                                Once the transaction is completed, the client will be redirected back to <strong>"response_url"</strong>,
                                which was passed in the first API request. If you have passed <strong>"webhook_url"</strong>, our server
                                will send a server notification to that URL.
                            </p>
                        </div>

                        <div className="mt-8">
                            <p>
                                <strong className="text-danger">Note :</strong> Make sure that, you fet the get transaction api after successful transaction using
                                {" "}
                                <a onClick={() => navigate(`/get-transaction-api`)}  target="_blank" style={{cursor: "pointer"}}>
                                    Get Transaction API.
                                </a>
                            </p>
                        </div>
                    </div>
                    {/* END: Redirection */}
                </div>
                <div className="api-document-code"></div>
            </div>
        </>
    );
};
export default DirectDocumentApi;
