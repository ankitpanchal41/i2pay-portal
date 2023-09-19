import React from "react";
import {Link} from "react-router-dom";
import * as Icon from "react-feather";


const CardDesign = ({redirectLink, title, description}) => (
    <Link
        to={redirectLink}
        class="p-4 bg-white rounded-lg md:p-6 dark:bg-gray-800 col-span-12 sm:col-span-4 2xl:col-span-3 box cursor-pointer zoom-in">
        <h2 class="mb-3 text-xl font-extrabold tracking-tight text-primary dark:text-white"> {title}</h2>
        <p class="mb-3 text-gray-700 dark:text-white">{description}</p>
        <span class="flex items-center justify-end font-medium text-primary dark:text-white">
            Learn more <Icon.ChevronRight size={18}/>
        </span>
    </Link>
)


const ApiDoc = () => {
    return (
        <div className="content">
            <div className="intro-y grid grid-cols-12 gap-5 mt-5">
                <div className="intro-y col-span-12">
                    <div className="grid grid-cols-12 gap-5 mt-5">


                        <CardDesign
                            redirectLink={"/direct-document-api"}
                            title={"Direct Payment API"}
                            description={"Manage transaction through direct payment API."}
                        />

                        <CardDesign
                            redirectLink={"/get-transaction-api"}
                            title={"Get Transaction API"}
                            description={"Get All transaction through API."}
                        />


                        <CardDesign
                            redirectLink={"/paybutton-integration"}
                            title={"Pay Button"}
                            description={"Create custom pay buttons for checkout in stores."}
                        />


                        <CardDesign
                            redirectLink={"/store-integration"}
                            title={"Store"}
                            description={"Create and manage multiple stores and its products."}
                        />


                        <CardDesign
                            redirectLink={"/invoice-integration"}
                            title={"Invoice"}
                            description={"Create invoices and sent to the mail recursively."}
                        />

                        <CardDesign
                            redirectLink={"/sms-payment-integration"}
                            title={"SMS Payment"}
                            description={"Create transactions through sms templates."}
                        />


                        <CardDesign
                            redirectLink={"/email-campaign-integration"}
                            title={"Email Campaigns"}
                            description={"Create campaign templates and send through email to receive payment."}
                        />


                        <CardDesign
                            redirectLink={"/sms-campaign-integration"}
                            title={"SMS Campaigns"}
                            description={"Create campaign templates and send through sms to receive payment."}
                        />


                        <CardDesign
                            redirectLink={"/payment-link-integration"}
                            title={"Payment Link"}
                            description={"Create custom payment links to receive payment."}
                        />


                        <CardDesign
                            redirectLink={"/payment-page-integration"}
                            title={"Payment Page"}
                            description={"Create custom payment page to receive payment."}
                        />

                        <CardDesign
                            redirectLink={"/payment-card-integration"}
                            title={"Payment Card"}
                            description={"Create custom payment card to receive payment."}
                        />

                        <CardDesign
                            redirectLink={"/webhook-integration"}
                            title={"Webhook"}
                            description={"Create automatic event callbacks for any events in the app."}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiDoc;
