import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import * as Icon from "react-feather";
import {
    EmailIcon,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    LinkedinShareButton,
    LinkedinIcon,
} from "react-share";
import { PAYMENT_LINK_SEND_REQUEST } from "../../redux/actions/PaymentLinkAction";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Images from "../../../assets/images";

const SocialSharingDropdown = ({ item }) => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.persist);
    const [isSendSmsLoading, setIsSendSmsLoading] = useState(false);
    const [isSendEmailLoading, setIsSendEmailLoading] = useState(false);

    /**
     * Send Payment Link Email Or SMS When Clicking on sharing button
     * @type = email, sms
     */
    const _onClickSendEmailOrSMS = (type, payment_link_id) => {
        if (type == "email") setIsSendEmailLoading(true);
        if (type == "sms") setIsSendSmsLoading(true);

        const callBack = () => {
            setIsSendSmsLoading(false);
            setIsSendEmailLoading(false);
        };

        dispatch({ type: PAYMENT_LINK_SEND_REQUEST, payload: { type, payment_link_id }, callBack });
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button
                type="buttons"
                className="dropdown-toggle font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3 mt-1">
                <Icon.Share2 size="15" />{" "}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    style={{
                        background: mode === "light" ? "#ffffff" : "#232D45",
                        top: "-23px",
                        bottom: "-15px",
                        left: "-157px",
                        width: "149px",
                    }}>
                    <div className="pt-3 px-3 pb-2">
                        <Menu.Item>
                            {({ active }) => (
                                <>
                                    {/* {isSendSmsLoading ? (
                                        <ClipLoader
                                            loading={isSendSmsLoading}
                                            color="#1e3a8a"
                                            size={15}
                                            css="border-width: 1px;border-bottom-color: white !important;padding: 0.75rem;margin-right: 0.5rem;"
                                        />
                                    ) : (
                                        <button
                                            onClick={() => _onClickSendEmailOrSMS("sms", item?.id)}
                                            className={"h-[22px] w-[22px] p-3 bg-primary mr-2 relative top-[2px]"}
                                            style={{borderRadius: "50%"}}>
                                            <Icon.Smartphone size={14}
                                                             className={"text-white"}
                                                             style={{
                                                                 position: "relative",
                                                                 top: "-7px",
                                                                 right: "7px"
                                                             }}/>
                                        </button>
                                    )}


                                    {isSendEmailLoading ? (
                                        <ClipLoader
                                            loading={isSendEmailLoading}
                                            color="#1e3a8a"
                                            size={15}
                                            css="border-width: 1px;border-bottom-color: white !important;padding: 0.75rem;margin-right: 0.5rem;"
                                        />
                                    ) : (
                                        <button
                                            onClick={() => _onClickSendEmailOrSMS("email", item?.id)}
                                            className={"Demo__some-network__share-button mr-2"}>

                                            <EmailIcon size={25}
                                                       round={true}/>
                                        </button>
                                    )} */}

                                    {/*<EmailShareButton*/}
                                    {/*    subject={item?.title}*/}
                                    {/*    body={item?.title + ` ` + item?.description + `` + item?.link}*/}
                                    {/*    separator=":: "*/}
                                    {/*    className="Demo__some-network__share-button"*/}
                                    {/*>*/}
                                    {/*    <EmailIcon size={32} round={true}/>*/}
                                    {/*</EmailShareButton>*/}

                                    <FacebookShareButton
                                        url={item?.link}
                                        quote={item?.title}
                                        separator=":: "
                                        className="Demo__some-network__share-button mr-2">
                                        <FacebookIcon size={25} round={true} />
                                    </FacebookShareButton>

                                    <TwitterShareButton
                                        url={item?.link}
                                        title={item?.title}
                                        via={item?.link}
                                        separator=":: "
                                        className="Demo__some-network__share-button mr-2">
                                        <img className="h-[25px] w-[25px] rounded-full" src={Images.XLogoTwitter} />
                                    </TwitterShareButton>

                                    <WhatsappShareButton
                                        url={item?.link}
                                        title={item?.title}
                                        separator=":: "
                                        className="Demo__some-network__share-button2 mr-2">
                                        <WhatsappIcon size={25} round={true} />
                                    </WhatsappShareButton>

                                    <LinkedinShareButton
                                        url={item?.link}
                                        title={item?.title}
                                        separator=":: "
                                        className="Demo__some-network__share-button2">
                                        <LinkedinIcon size={25} round={true} />
                                    </LinkedinShareButton>
                                </>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default SocialSharingDropdown;
