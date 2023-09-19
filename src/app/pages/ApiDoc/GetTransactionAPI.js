import React, { useRef, useState } from "react";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useNavigate } from "react-router";
import * as Icon from "react-feather";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
const AutoplaySlider = withAutoplay(AwesomeSlider);
const SyntaxHighlighter = React.lazy(() => import("react-syntax-highlighter"));
const Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));

const GetTransactionAPI = () => {
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
                            <a className="" style={{ cursor: "pointer" }}>
                                BACK
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="api-document-menu">
                    <Scrollspy items={["how-to-integrate-api", "get-transaction"]} currentClassName="active">
                        <li
                            className="scroll-to-link"
                            data-target="how-to-integrate-api"
                            onClick={(e) => goToSection("how-to-integrate-api", e)}>
                            <a>How to integrate API</a>
                        </li>
                        <li className="scroll-to-link" data-target="get-transaction" onClick={(e) => goToSection("get-transaction", e)}>
                            <a>Get Transactions</a>
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
                                <a href={process.env.REACT_APP_MERCHANT_URL + `ip-whitelist`} target="_blank">
                                    {process.env.REACT_APP_MERCHANT_URL}ip-whitelist
                                </a>
                            </strong>{" "}
                            .
                        </p>

                        <p className="mt-3">
                            After that, create an API key using{" "}
                            <strong>
                                <a href={process.env.REACT_APP_MERCHANT_URL + `api-key`} target="_blank">
                                    {process.env.REACT_APP_MERCHANT_URL}api-key
                                </a>
                            </strong>{" "}
                            before starting API integration.
                        </p>
                    </div>
                    {/* END: HOW TO INTEGRATE API */}

                    {/* START: GET TRANSACTION */}
                    <div className="overflow-hidden api-document-section mt-12" id="get-transaction">
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
API Endpoint
    Live url : ${process.env.REACT_APP_API_URL}payment/get/transaction
`}
                        </SyntaxHighlighter>
                        <h2>Get Transactions</h2>
                        <p>
                            To make transactions you need to make a POST call to the following url :<br />
                            <strong>Live url</strong> :{" "}
                            <code className="higlighted break-word">{process.env.REACT_APP_API_URL}payment/get/transaction</code>
                        </p>
                        <br />
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
curl -X POST ${process.env.REACT_APP_API_URL}payment/get/transaction
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
    "merchant_ref": "ORDER78945",
    "order_id": "I7EHJ0m4-FpI0-Q9W3-16493264720K"  
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
                                    <td>merchant_ref</td>
                                    <td>Yes (When order_id is not present)</td>
                                    <td>String</td>
                                    <td>Valid Email address of User</td>
                                </tr>
                                <tr>
                                    <td>order_id</td>
                                    <td>Yes (When merchant_ref is not present)</td>
                                    <td>Decimal</td>
                                    <td>Amount Value</td>
                                </tr>
                            </tbody>
                        </table>
                        <br /> <br /> <br />
                        <h4>RESPONSE PARAMETERS</h4>
                        <p>
                            Our server will validate the request and then send the response in JSON format. The response will contain the
                            below parameters. In the successful response as shown you will get all transactions.
                            <br />
                        </p>
                        <br />
                        <div className="mt-12"></div>
                        <br />
                        <SyntaxHighlighter language="json" style={dark}>
                            {`
EXAMPLE: Successful Response                            

{
    "responseCode": 200,
    "response": "successfully",
    "status": "success",
    "data": {
        "order_id": "pgYeG5xA-24V6-X710-1653196475ZC",
        "merchant_ref": "ORDER78945",
        "connector": null,
        "email": "johndoe@mailinator.com",
        "amount": "20.00",
        "currency": "INR",
        "descriptor": null,
        "status": 1,
        "response": "Your transaction successfully processed.",
        "test_mode": 1,
        "is_admin_connector": 0,
        "return_url": "https://google.com",
        "notify_url": "https://webhook.site/34a109fd-9373-4f60-83f3-c7a5f851886a",
        "created_at": "2022-05-22T05:34:22.000000Z",
        "updated_at": "2022-05-22T05:34:22.000000Z"
    }
}`}
                        </SyntaxHighlighter>
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
            "The merchant ref field is required when order id is not present.",
            "The order id field is required when merchant ref is not present."
        ]
    }
}`}
                        </SyntaxHighlighter>
                        <h4>Errors</h4>
                        <p>If your API request failed due to validation, the response JSON format will be similar as shown:</p>
                    </div>
                    {/*END: GET TRANSACTION*/}
                </div>
                <div className="api-document-code"></div>
            </div>
        </>
    );
};
export default GetTransactionAPI;
