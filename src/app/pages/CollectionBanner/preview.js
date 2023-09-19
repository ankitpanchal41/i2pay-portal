import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Heading from "../../components/common/Heading";
import {useDispatch, useSelector} from "react-redux";
import {ClipLoader} from "react-spinners";
import {DETAIL_CONTACT_REQUEST} from "../../redux/actions/Contact";
import NotAvailable from "../../components/common/status/NotAvailable";

const ContactEmailHistory = React.lazy(() => import("./PreviewHistory/ContactEmailHistory"));
const ContactSmsHistory = React.lazy(() => import("./PreviewHistory/ContactSmsHistory"));

const ContactsPreview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {contactId} = useParams();
    const {detailContact} = useSelector((state) => state.contact);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const callBack = () => {
            setIsLoading(false);
        };
        dispatch({type: DETAIL_CONTACT_REQUEST, payload: {id: contactId}, callBack});

    }, []);

    const onClickBack = () => {
        navigate(`/contact`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Contact Preview"}
                // isLoadingExport={isLoadingExport}
                displayBackButton={true}
                onClickBack={onClickBack}
                addButton={" "}
            />
        );
    };
    return (
        <>
            {/* BEGIN: Content */}

            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}


                {isLoading ? (
                    <div className="flex justify-center h-48 items-center">
                        <ClipLoader
                            loading={true}
                            color="#1e3a8a"
                            size={55}
                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                        />
                    </div>
                ) : (
                    <div className="intro-y mt-5">
                        <div className="overflow-x-auto scrollbar-hidden">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="intro-y col-span-12 overflow-x-auto overflow-hidden flex">

                                    {/* SIDEBAR */}
                                    <div className="flex flex-col w-1/4 p-5">
                                        {/* Details Box */}
                                        <div className="box shadow-lg">
                                            <div
                                                className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                                <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <span className="font-medium text-primary dark:text-white text-lg">Contact Details</span>
                                                </div>
                                            </div>
                                            <div
                                                className="ml-0 lg:justify-end mt-3 lg:mt-0  border-b border-slate-200/60 dark:border-darkmode-400 p-5">
                                                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                    <div className="text-slate-500 text-xs col-span-12">
                                                    <span
                                                        className="mt-0.5 font-bold text-slate-800 dark:text-white text-xl">
                                                        {" "}
                                                        {detailContact?.first_name} {detailContact?.last_name}
                                                    </span>
                                                    </div>
                                                    <div className="text-slate-500 text-xs col-span-12 mt-1">
                                                        <span
                                                            className="mt-0.5 font-bold text-slate-800 dark:text-white">
                                                            Email: {" "}
                                                        </span>
                                                        <span className="mt-0.5 text-slate-800 dark:text-white">
                                                            {" "}
                                                            {detailContact?.email}
                                                        </span>
                                                    </div>
                                                    <div className="text-slate-500 text-xs col-span-12 mt-1">
                                                        <span
                                                            className="mt-0.5 font-bold text-slate-800 dark:text-white">
                                                            Mobile No: {" "}
                                                        </span>
                                                        <span className="mt-0.5 text-slate-800 dark:text-white">
                                                            {" "}
                                                            {detailContact?.country_code} {detailContact?.mobile_no}
                                                        </span>
                                                    </div>

                                                    <div className="text-slate-500 text-xs col-span-12 mt-1">
                                                        <span
                                                            className="mt-0.5 font-bold text-slate-800 dark:text-white">
                                                            Category: {" "}
                                                        </span>

                                                        {detailContact?.category_name ? (
                                                            <span
                                                                className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-success">{detailContact?.category_name}</span>
                                                        ) : NotAvailable()}

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* Details Box */}

                                    </div>
                                    {/* END: SIDEBAR */}

                                    {/* CONTENT */}
                                    <div className="flex flex-col w-3/4 p-5">

                                        {/* Emails History Box */}
                                        <ContactEmailHistory contactId={contactId}/>
                                        {/* Emails History Box */}

                                        {/* SMS Box */}
                                        <ContactSmsHistory contactId={contactId}/>
                                        {/* SMS Box */}


                                    </div>
                                    {/* END: CONTENT */}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ContactsPreview;
