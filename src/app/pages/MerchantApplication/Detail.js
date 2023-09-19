import React from "react";
import MerchantApplicationView from "./MerchantApplicationView";

const MerchantApplicationDetail = ({ setIsEditOn }) => {
    const _renderHeading = () => {
        return (
            <div className="intro-y flex items-center mt-8">
                <h2 className="text-lg font-medium mr-auto">Applications Show</h2>

                <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
                    <button className="btn btn-secondary shadow-md mr-2" onClick={() => setIsEditOn(true)}>
                        Edit
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            {_renderHeading()}

            <div className="intro-y box px-5 pt-5 mt-5 mb-8">
                <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
                    <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
                        <div>
                            <div className="w-full truncate sm:whitespace-normal font-medium text-lg text-primary">Manoj Sonagra</div>
                            <div className="text-slate-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-mail w-4 h-4 mr-1 mt-0.5">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>{" "}
                                manoj.sonagra+20@payomatix.com
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
                        <div className="font-medium text-center lg:text-left lg:mt-3">Contact Details</div>
                        <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                            <div className="truncate sm:whitespace-normal flex items-center">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-phone w-4 h-4 mr-2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>{" "}
                                +&nbsp;9876541230{" "}
                            </div>
                            <div className="truncate sm:whitespace-normal flex mt-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-map-pin w-4 h-4 mr-2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                adad
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0 flex-1 px-5 border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
                        <div className="font-medium text-center lg:text-left lg:mt-3 mb-2">Status</div>
                        <span className="py-0.5 px-2 rounded-full text-xs bg-primary text-white cursor-pointer font-medium">In Progress</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="intro-y box col-span-12 lg:col-span-6">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-book w-4 h-4 mt-1 mr-1">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            Company Details
                        </h2>
                    </div>
                    <div className="p-5 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <label className="font-medium">Company Name </label>
                                    <div className="text-slate-500 mt-1">Manoj Sonagra</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <label className="font-medium">Company Registration Number</label>
                                    <div className="text-slate-500 mt-1">123456789123456789123</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <label className="font-medium">Company Year of Registration</label>
                                    <div className="text-slate-500 mt-1">1992</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <label className="font-medium">Company GST Number</label>
                                    <div className="text-slate-500 mt-1">adadadadadddddd</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <label className="font-medium">Business Domain</label>
                                    <div className="text-slate-500 mt-1">ada</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <label className="font-medium">Website</label>
                                    <div className="text-slate-500 mt-1">https://google.co.in</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-12">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <label className="font-medium">Company Address</label>
                                    <div className="text-slate-500 mt-1">adad</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-12">
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full">
                                    <div className="grid grid-cols-12 gap-2 border-t border-slate-200/60 dark:border-darkmode-400">
                                        <div className="col-span-12 lg:col-span-12 mt-2">
                                            <label className="font-medium">Documents</label>
                                        </div>
                                        <div className="col-span-6 lg:col-span-2">
                                            <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                    <a href="#" className="w-3/6 file__icon file__icon--file mx-auto">
                                                        <div className="file__icon__file-name">PDF</div>
                                                    </a>
                                                    <div className="h-10 mb-2">
                                                        <a href="#" className="block mt-2 text-center">
                                                            Bank Statement
                                                        </a>
                                                    </div>

                                                    <a
                                                        href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/1648198302948669893470953031110404.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=56f1ce48c4e8dc82b17effa0ce663112ad4e5f104bf08e3fbcde17f0f47e0fd0"
                                                        target="_blank"
                                                        className="btn btn-secondary btn-sm">
                                                        {" "}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-eye w-4 h-4">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>{" "}
                                                    </a>
                                                    <a
                                                        href="https://admin.payomatix.com/admin/applications/download/documents?file=uploads%2Fapplication-104%2F1648198302948669893470953031110404.pdf&amp;fname=Bank_Statement"
                                                        className="btn btn-secondary btn-sm">
                                                        {" "}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-download w-4 h-4">
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                            <polyline points="7 10 12 15 17 10"></polyline>
                                                            <line x1="12" y1="15" x2="12" y2="3"></line>
                                                        </svg>{" "}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="intro-y box col-span-12 lg:col-span-6">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-users w-4 h-4 mt-1 mr-1">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Director Details
                        </h2>
                    </div>
                    <div className="p-5 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-12">
                            <div id="faq-accordion-2" className="accordion accordion-boxed">
                                <div className="accordion-item">
                                    <div id="faq-accordion-content-1" className="accordion-header">
                                        <button
                                            className="accordion-button "
                                            type="button"
                                            data-tw-toggle="collapse"
                                            data-tw-target="#faq-accordion-collapse-2"
                                            aria-expanded="true"
                                            aria-controls="faq-accordion-collapse-2">
                                            1 . Director Details
                                        </button>
                                    </div>
                                    <div
                                        id="faq-accordion-collapse-2"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="faq-accordion-content-1"
                                        data-tw-parent="#faq-accordion-2">
                                        <div className="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                                            <div className="grid grid-cols-12 gap-6">
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Director Name </label>
                                                            <div className="text-slate-500 mt-1">adasd</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Director Email</label>
                                                            <div className="text-slate-500 mt-1">abc@gmail.com</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Director Phone Number</label>
                                                            <div className="text-slate-500 mt-1">9998366087</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Director Address</label>
                                                            <div className="text-slate-500 mt-1">asdad</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-12 lg:col-span-12">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <div className="grid grid-cols-12 gap-2 border-t border-slate-200/60 dark:border-darkmode-400">
                                                                <div className="col-span-12 lg:col-span-12 mt-2">
                                                                    <label className="font-medium">Documents</label>
                                                                </div>
                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983435961680663623424045399395.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=b7c1c1506ca80586796bf7e8a749067143449a0d3aff36dd787e53ea0f2db493"
                                                                                        data-action="zoom"
                                                                                        className=""
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    PAN Card
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983435961680663623424045399395.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=b7c1c1506ca80586796bf7e8a749067143449a0d3aff36dd787e53ea0f2db493"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983435961680663623424045399395.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3Db7c1c1506ca80586796bf7e8a749067143449a0d3aff36dd787e53ea0f2db493&amp;fname=PAN_Card"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983431023773027952181932062648.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=919052a669ec7d8e6a9441b5a941d33d0695d97e305234d2eb1d920fb6bee8d2"
                                                                                        data-action="zoom"
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Passport
                                                                                </a>
                                                                            </div>
                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983431023773027952181932062648.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=919052a669ec7d8e6a9441b5a941d33d0695d97e305234d2eb1d920fb6bee8d2"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983431023773027952181932062648.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D919052a669ec7d8e6a9441b5a941d33d0695d97e305234d2eb1d920fb6bee8d2&amp;fname=Passport"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983435747927056746405979278440.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=12dbf04b382f73dbce962dbebc22e753e6fb0823b7ae070c76adcded62d3652f"
                                                                                        data-action="zoom"
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Aadhar Card Front
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983435747927056746405979278440.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=12dbf04b382f73dbce962dbebc22e753e6fb0823b7ae070c76adcded62d3652f"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983435747927056746405979278440.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D12dbf04b382f73dbce962dbebc22e753e6fb0823b7ae070c76adcded62d3652f&amp;fname=Aadhar_Card_Front"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983438510254340092777554340205.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=6c5a70fd431e8d3e251f56fa73c35a74ade4a303d2343b3e06a161bf504b6bc9"
                                                                                        data-action="zoom"
                                                                                        className=""
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Aadhar Card Back
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983438510254340092777554340205.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=6c5a70fd431e8d3e251f56fa73c35a74ade4a303d2343b3e06a161bf504b6bc9"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983438510254340092777554340205.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D6c5a70fd431e8d3e251f56fa73c35a74ade4a303d2343b3e06a161bf504b6bc9&amp;fname=Aadhar_Card_Back"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--file mx-auto">
                                                                                <div className="file__icon__file-name">PDF</div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Bank Statement
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983446487529043820501894298769.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=1003728d79c9aac7aa01b83fe64dbbc6c603e4d50b1b619ccb301c018b3da632"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983446487529043820501894298769.pdf%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D1003728d79c9aac7aa01b83fe64dbbc6c603e4d50b1b619ccb301c018b3da632&amp;fname=Bank_Statement"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--file mx-auto">
                                                                                <div className="file__icon__file-name">PDF</div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Utility Bill
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983441671789005614481125813607.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=08f9927c864af78178e3bf56f31850c04a10c07737d6af1411f8e97e6a7f1e10"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983441671789005614481125813607.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D08f9927c864af78178e3bf56f31850c04a10c07737d6af1411f8e97e6a7f1e10&amp;fname=Utility_Bill"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="intro-y box col-span-12 lg:col-span-6">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-users w-4 h-4 mt-1 mr-1">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Shareholder Details
                        </h2>
                    </div>
                    <div className="p-5 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-12">
                            <div id="faq-accordion-3" className="accordion accordion-boxed">
                                <div className="accordion-item">
                                    <div id="shareholder-faq-accordion-content-1" className="accordion-header">
                                        <button
                                            className="accordion-button "
                                            type="button"
                                            data-tw-toggle="collapse"
                                            data-tw-target="#shareholder-faq-accordion-collapse-2"
                                            aria-expanded="true"
                                            aria-controls="shareholder-faq-accordion-collapse-2">
                                            1 . Shareholder Details
                                        </button>
                                    </div>
                                    <div
                                        id="shareholder-faq-accordion-collapse-2"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="shareholder-faq-accordion-content-1"
                                        data-tw-parent="#faq-accordion-3">
                                        <div className="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                                            <div className="grid grid-cols-12 gap-6">
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Shareholder Name </label>
                                                            <div className="text-slate-500 mt-1">ada</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Shareholder Email</label>
                                                            <div className="text-slate-500 mt-1">abc@gmail.com</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Shareholder Phone Number</label>
                                                            <div className="text-slate-500 mt-1">9879767904</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-6">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <label className="font-medium">Shareholder Address</label>
                                                            <div className="text-slate-500 mt-1">das</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-12 lg:col-span-12">
                                                    <div className="flex flex-col sm:flex-row items-center">
                                                        <div className="w-full">
                                                            <div className="grid grid-cols-12 gap-2 border-t border-slate-200/60 dark:border-darkmode-400">
                                                                <div className="col-span-12 lg:col-span-12 mt-2">
                                                                    <label className="font-medium">Documents</label>
                                                                </div>
                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983885396491380987501203194938.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=2fd15ed717a1d6922dce6c08649c43e64cf6bb97345647d7a63f89132754678e"
                                                                                        data-action="zoom"
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    PAN Card
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983885396491380987501203194938.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=2fd15ed717a1d6922dce6c08649c43e64cf6bb97345647d7a63f89132754678e"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983885396491380987501203194938.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D2fd15ed717a1d6922dce6c08649c43e64cf6bb97345647d7a63f89132754678e&amp;fname=PAN_Card"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983885658112101097334359316036.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=3799f8dc702de4387d366c86e26b68facf4a47156ea6fd55a9ea9c34c359556c"
                                                                                        data-action="zoom"
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Passport
                                                                                </a>
                                                                            </div>
                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983885658112101097334359316036.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=3799f8dc702de4387d366c86e26b68facf4a47156ea6fd55a9ea9c34c359556c"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983885658112101097334359316036.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D3799f8dc702de4387d366c86e26b68facf4a47156ea6fd55a9ea9c34c359556c&amp;fname=Passport"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/1648198388892144780869312195267382.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=80e425796d3040e061fa487b3a5325ecea654f32f2932fd1517fb05b299ec241"
                                                                                        data-action="zoom"
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Aadhar Card Front
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/1648198388892144780869312195267382.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=80e425796d3040e061fa487b3a5325ecea654f32f2932fd1517fb05b299ec241"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F1648198388892144780869312195267382.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D80e425796d3040e061fa487b3a5325ecea654f32f2932fd1517fb05b299ec241&amp;fname=Aadhar_Card_Front"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--image mx-auto">
                                                                                <div className="file__icon--image__preview image-fit">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983881606665324076210799471616.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=5b401202a26900b58ff00e63282d5e099c172f42a9850cf5c9d49303a6acebb9"
                                                                                        data-action="zoom"
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Aadhar Card Back
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983881606665324076210799471616.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=5b401202a26900b58ff00e63282d5e099c172f42a9850cf5c9d49303a6acebb9"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983881606665324076210799471616.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D5b401202a26900b58ff00e63282d5e099c172f42a9850cf5c9d49303a6acebb9&amp;fname=Aadhar_Card_Back"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--file mx-auto">
                                                                                <div className="file__icon__file-name">PDF</div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Bank Statement
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983885944987124143928342292829.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=3f4166c8f43acf623e3f81dde0e42ad643950a81be14c970052009c13ff6c347"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983885944987124143928342292829.pdf%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D3f4166c8f43acf623e3f81dde0e42ad643950a81be14c970052009c13ff6c347&amp;fname=Bank_Statement"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6 lg:col-span-2">
                                                                    <div className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
                                                                        <div className="file border border-dotted rounded-md py-3 relative zoom-in text-center">
                                                                            <a
                                                                                href="#"
                                                                                className="w-3/6 file__icon file__icon--file mx-auto">
                                                                                <div className="file__icon__file-name">PDF</div>
                                                                            </a>
                                                                            <div className="h-10 mb-2">
                                                                                <a href="#" className="block mt-2 text-center">
                                                                                    Utility Bill
                                                                                </a>
                                                                            </div>

                                                                            <a
                                                                                href="https://payomatix-data.s3.eu-west-2.amazonaws.com/uploads/application-104/16481983881517143777118911332914690.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA2PPE5AEZVSCVEKGR%2F20220325%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20220325T100838Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=1200&amp;X-Amz-Signature=232c58fcd762f5b5af1566f223f637bbada87c07dd727359332baba15b2cf4c6"
                                                                                target="_blank"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-eye w-4 h-4">
                                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                </svg>{" "}
                                                                            </a>
                                                                            <a
                                                                                href="https://admin.payomatix.com/admin/applications/download/documents/direct?file=https%3A%2F%2Fpayomatix-data.s3.eu-west-2.amazonaws.com%2Fuploads%2Fapplication-104%2F16481983881517143777118911332914690.jpg%3FX-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA2PPE5AEZVSCVEKGR%252F20220325%252Feu-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20220325T100838Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Expires%3D1200%26X-Amz-Signature%3D232c58fcd762f5b5af1566f223f637bbada87c07dd727359332baba15b2cf4c6&amp;fname=Utility_Bill"
                                                                                className="btn btn-secondary btn-sm">
                                                                                {" "}
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-download w-4 h-4">
                                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                                </svg>{" "}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="rejectModel" className="modal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="font-medium text-base mr-auto">Reason For Reject</h2>
                            <a data-tw-dismiss="modal" href="#">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-x w-8 h-8 text-slate-400">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>{" "}
                            </a>
                        </div>

                        <form id="rejectForm">
                            <input type="hidden" name="_token" value="wUsh4QP2He1NG6Z3JwAfLH3cNTrTWgwDPN8MznYG" />

                            <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12 sm:col-span-12">
                                    <label className="form-label">Reject Reason</label>
                                    <textarea
                                        className="form-control"
                                        name="reject_reason"
                                        id="reject_reason"
                                        rows="3"
                                        placeholder="Write Here Your Reject Reason"></textarea>
                                    <span className="text-danger">
                                        <span id="reject_reason_error"></span>
                                    </span>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    data-tw-dismiss="modal"
                                    className="btn btn-outline-secondary w-20 mr-1"
                                    id="closeRejectForm">
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    id="submitRejectForm"
                                    data-link="https://admin.payomatix.com/admin/applications/reject">
                                    Confirm Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="reassignModel" className="modal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="font-medium text-base mr-auto">Reason For Reassign</h2>
                            <a data-tw-dismiss="modal" href="#">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-x w-8 h-8 text-slate-400">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>{" "}
                            </a>
                        </div>

                        <form id="reassignForm">
                            <input type="hidden" name="_token" value="wUsh4QP2He1NG6Z3JwAfLH3cNTrTWgwDPN8MznYG" />

                            <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12 sm:col-span-12">
                                    <label className="form-label">Reassign Reason</label>
                                    <textarea
                                        className="form-control"
                                        name="reassign_reason"
                                        id="reassign_reason"
                                        rows="3"
                                        placeholder="Write Here Your Reassign Reason"></textarea>
                                    <span className="text-danger">
                                        <span id="reassign_reason_error"></span>
                                    </span>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    data-tw-dismiss="modal"
                                    className="btn btn-outline-secondary w-20 mr-1"
                                    id="closeReassignForm">
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    id="submitReassignForm"
                                    data-link="https://admin.payomatix.com/admin/applications/reassign">
                                    Confirm Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MerchantApplicationDetail;
