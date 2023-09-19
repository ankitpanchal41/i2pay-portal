import React from "react";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import SyntaxHighlighter from "react-syntax-highlighter";

const ApiDocDetails = () => {
    const requestData = [
        {
            id: 1,
            parameters: "api_key",
            required: "Yes",
            dataType: "String",
            description: "API key from your account.",
        },
        {
            id: 2,
            parameters: "first_name",
            required: "Yes",
            dataType: "String",
            description: "First Name from (Credit/Debit) Card",
        },
        {
            id: 3,
            parameters: "last_name",
            required: "Yes",
            dataType: "String",
            description: "Last Name from (Credit/Debit)Card",
        },
        {
            id: 4,
            parameters: "address",
            required: "No",
            dataType: "String",
            description: "Full Address of User",
        },
        {
            id: 5,
            parameters: "country",
            required: "No",
            dataType: "String",
            description: "2 letter Country, eg US",
        },
        {
            id: 5,
            parameters: "state",
            required: "No",
            dataType: "String",
            description: "State Name, 2 letter for US states, eg CA",
        },
        {
            id: 6,
            parameters: "city",
            required: "No",
            dataType: "String",
            description: "Valid City name",
        },
        {
            id: 7,
            parameters: "zip",
            required: "No",
            dataType: "String",
            description: "Valid Zip Code",
        },
        {
            id: 8,
            parameters: "email",
            required: "Yes",
            dataType: "String",
            description: "Valid Email address of User",
        },
        {
            id: 9,
            parameters: "country_code",
            required: "No",
            dataType: "String",
            description: "Valid Country Code of User",
        },
        {
            id: 10,
            parameters: "phone_no",
            required: "No",
            dataType: "String",
            description: "Valid Phone Number of User",
        },
        {
            id: 11,
            parameters: "amount",
            required: "Yes",
            dataType: "Decimal",
            description: "Amount Value",
        },
        {
            id: 12,
            parameters: "currency",
            required: "Yes",
            dataType: "String",
            description: "3 Digit format, eg USD",
        },
        {
            id: 13,
            parameters: "customer_order_id",
            required: "No",
            dataType: "String",
            description: "Customer order id generated from the user side.",
        },
        {
            id: 14,
            parameters: "response_url",
            required: "Yes",
            dataType: "String",
            description: "Response URL where we redirect after the transaction process is completed.",
        },
        {
            id: 15,
            parameters: "webhook_url",
            required: "No",
            dataType: "String",
            description: "POST URL where we send webhook notification.",
        },
    ];
    const responseData = [
        {
            id: 1,
            parameters: "status",
            description: "“3d_redirect” or “fail”",
        },
        {
            id: 2,
            parameters: "message",
            description: "Redirect message or declined message",
        },
        {
            id: 3,
            parameters: "redirect_3ds_url",
            description: "Redirection url incase status is 3d_redirect",
        },
        {
            id: 4,
            parameters: "address",
            description: "Full Address of User",
        },
        {
            id: 5,
            parameters: "errors",
            description: "Array of validation message",
        },
        {
            id: 6,
            parameters: "data.amount",
            description: "Amount value in return",
        },
        {
            id: 7,
            parameters: "data.currency",
            description: "Currency value in return",
        },
        {
            id: 8,
            parameters: "data.email",
            description: "Email value in return",
        },
        {
            id: 7,
            parameters: "data.customer_order_id",
            description: "Customer_order_id value in return or null",
        },
    ];

    return (
        <div className="content">
            <div className="divide-y">
                <div className="intro-y grid grid-cols-12 gap-5 mt-5">
                    <div className="intro-y col-span-12">
                        <div className="grid grid-cols-12 gap-5 mt-5">
                            <div className="col-span-12 box p-5">
                                <div className="text-4xl font-medium leading-none my-3">API Documentation</div>
                                <div className="font-medium text-base">How to integrate API</div>
                                <div className="text-slate-500 my-2">
                                    Our platform’s payment API can be integrated with any platform of your choice. You need to send a
                                    payment request with payload in JSON format to our API Endpoint.
                                </div>
                                <div className="text-slate-500 my-2">
                                    Make sure you have whitelisted all your server IPs at "{process.env.REACT_APP_MERCHANT_URL}whitelist-ip" before
                                    starting API integration.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-y col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-12 gap-5 mt-5">
                            <div className="col-span-12 box p-5">
                                <div className="font-medium text-base my-1">Request Parameters</div>
                                <div className="overflow-x-auto">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className="whitespace-nowrap">Parameters</th>
                                                <th className="whitespace-nowrap">Required</th>
                                                <th className="whitespace-nowrap">Data Type</th>
                                                <th className="whitespace-nowrap">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requestData?.map((item) => (
                                                <tr key={item?.id}>
                                                    <td>{item?.parameters}</td>
                                                    <td>{item?.required}</td>
                                                    <td>{item?.dataType}</td>
                                                    <td>{item?.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-slate-500 my-2">
                                    <span className="font-medium"> Note </span>: The non-required fields may come again further which will
                                    be dependent on the assigned MID, but if you fill in the non required fields along with the required
                                    fields, then they won't need to be addressed again.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-y col-span-12 lg:col-span-4">
                        <div className="grid grid-cols-4 gap-5 mt-5">
                            <div className="col-span-4 box bg-current p-5">
                                <SyntaxHighlighter language="javascript" style={dark}>
                                    Testing url : {process.env.REACT_APP_MERCHANT_URL}api/test-transaction
                                </SyntaxHighlighter>
                                <SyntaxHighlighter language="javascript" style={dark}>
                                    Live url : {process.env.REACT_APP_MERCHANT_URL}api/transaction
                                </SyntaxHighlighter>
                                <div className="font-bold  text-xl text-base text-white mt-5 mb-2">
                                    Below is the example of json Payment payload.
                                </div>

                                <SyntaxHighlighter language="json" style={dark}>
                                    {`{ 
    "api_key": "88|cc31d9Xfc2e4a43a9001872d9c00890",
    "first_name": "Graham",
    "last_name": "Lester",
    "address": "3B Belsize Ave",
    "country": "GB",
    "state": "London",
    "city": "London",
    "zip": "NW3 4BL",
    "email": "grahamlester@gmail.com",
    "phone_no": "+44984015255",
    "amount": "30.00",
    "currency": "GBP",
    "customer_order_id": "ce35d90-fc2e-4a43-a900-1872d9c00890",
    "response_url": "https://mysite.com/redirect/dce35d90-fc2e-4a43-a900-1872d9c00890",
    "webhook_url": "https://mysite.com/notify/ce35d90-fc2e-4a43-a900-1872d9c00890",
}`}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="intro-y grid grid-cols-12 gap-5 mt-5">
                    <div className="intro-y col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-12 gap-5 mt-5">
                            <div className="col-span-12 box p-5">
                                <div className="font-medium text-base my-1">Response:</div>
                                <div className="text-slate-500 my-2">
                                    Our server will validate the request and then send the response in JSON format. The response will
                                    contain the below parameters:
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className="whitespace-nowrap">Parameters</th>
                                                <th className="whitespace-nowrap">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {responseData?.map((item) => (
                                                <tr key={item?.id}>
                                                    <td>{item?.parameters}</td>
                                                    <td>{item?.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-y col-span-12 lg:col-span-4">
                        <div className="grid grid-cols-4 gap-5 mt-5">
                            <div className="col-span-4 box bg-current p-5">
                                <div className="font-bold  text-xl text-base text-white mb-2">
                                    If your API request failed due to validation, the response JSON format will be similar as follows:
                                </div>

                                <SyntaxHighlighter language="json" style={dark}>
                                    {`{
    "status": "fail",
    "message": "Some parameters are missing or invalid request data, please check 'errors' parameter for more details.",
    "errors": {
        "email": [
            "The email must be a valid email address."
        ]
    },
    "data": {
        "order_id": null,
        "amount": "30.00",
        "currency": "GBP",
        "email": "grahamlester@gmail.com",
        "customer_order_id": "ce35d90-fc2e-4a43-a900-1872d9c00890"
    }
}`}
                                </SyntaxHighlighter>
                            </div>
                            <div className="col-span-4 box bg-current p-5">
                                <div className="font-bold  text-xl text-base text-white mb-2">
                                    Below is an example of a successful API request JSON format.
                                </div>

                                <SyntaxHighlighter language="json" style={dark}>
                                    {`{
    "status": "3d_redirect",
    "message": "Checkout link generated successfully, please redirect to 'redirect_3ds_url'.",
    "redirect_3ds_url": "${process.env.REACT_APP_MERCHANT_URL}api/checkout/SFKF1645427241",
    "data": {
        "amount": "30.00",
        "currency": "GBP",
        "email": "grahamlester@gmail.com",
        "customer_order_id": "ce35d90-fc2e-4a43-a900-1872d9c00890"
    }
}`}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="intro-y grid grid-cols-12 mt-5 gap-3 pt-5">
                    <div className="intro-y col-span-12 lg:col-span-6 box p-5 grid content-evenly justify-items-center">
                        <h2 className="intro-y font-medium text-xl sm:text-2xl">
                            After getting redirected to “redirect_3ds_url”, the client will see the below screen with all available payment
                            options.
                        </h2>
                    </div>
                    <div className="intro-y col-span-12 lg:col-span-6 box p-5 grid content-evenly justify-items-center">
                        <h2 className="intro-y font-medium text-xl sm:text-2xl">
                            When the client selects any option, for example, “Pay with Card”, the client will be asked to select a card
                            scheme, VISA, Mastercard etc.
                        </h2>
                    </div>
                </div>
                <div className="intro-y grid grid-cols-12 mt-5 gap-3 pt-5">
                    <div className="intro-y col-span-12 lg:col-span-6 box p-5 grid content-evenly justify-items-center">
                        <h2 className="intro-y font-medium text-xl sm:text-2xl">
                            After that, when the client selects any card scheme, for example, “VISA”, the client will be asked to input card
                            details with other required information.
                        </h2>
                        <div className="intro-y text-justify">
                            <p>
                                If any optional parameters have been included in the first API request, that parameter field will not be
                                included in this form.
                            </p>
                            <p>Once the client inputs all required details, “Pay Now” button will be enabled.</p>
                            <p>
                                As soon as the client clicks on the “Pay Now” button, the client will be redirected to the gateway website
                                and proceed for 3D secure verification.
                            </p>
                            <p>
                                Once the transaction is completed, the client will be redirected back to “response_url”, which was passed in
                                the first API request. If you have passed “webhook_url”, our server will send a server notification to that
                                URL.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="intro-y grid grid-cols-12 mt-5">
                    <div className="intro-y col-span-12">
                        <div className="text-slate-500 my-2">
                            <span className="font-medium"> Note </span>: Make sure that “webhook_url” is not secured by token and able to
                            get external requests
                        </div>
                        <div className="text-slate-500 my-2">
                            You need to verify the transaction status using the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `user-api/gettransactiondetailsapi`} className="text-primary underline">
                                Get Transaction Details API.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiDocDetails;
