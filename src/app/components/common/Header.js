import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { equalTo, getDatabase, onValue, orderByChild, query, ref, update } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { addToBreadcrumb } from "../../redux/actions/BreadcrumbAction";
import { store } from "../../redux/store";
import Images from "../../../assets/images/index";
import MainMenu from "./menu/index";
const ThemeSwitch = React.lazy(() => import("./ThemeSwitch"));
const NotificationDropdown = React.lazy(() => import("./NotificationDropdown"));
const PortalDropdown = React.lazy(() => import("./ProfileDropdown"));

export const Header = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const urlToNameMapping = {
        "/": "Dashboard",
        "/merchant-register": "Application",
        "/connector": "Connector",
        "/pay-button/add": [{ name: "Pay Button", link: "/pay-button-list" }, { name: "Create" }],
        "/invoice": "Invoice",
        "/store-front": "Stores",
        "/create-store": [{ name: "Stores", link: "/store-front" }, { name: "Create" }],
        "/store/edit/:id": [{ name: "Stores", link: "/store-front" }, { name: "Edit" }],
        "/create-product": "Create Product",
        "/edit-product": "Update Product",
        "/pay-button-list": "Pay Button List",
        "/invoice/add": [{ name: "Invoice", link: "/invoice" }, { name: "Create" }],
        "/invoice/edit/:id": [{ name: "Invoice", link: "/invoice" }, { name: "Edit" }],
        "/products": "Product List",
        "/profile": "Profile",
        "/ip-whitelist": "IP Whitelist",
        "/ip-whitelist/create": [{ name: "IP Whitelist", link: "/ip-whitelist" }, { name: "Create" }],
        "/ip-whitelist/:ipwhitelist/edit": [{ name: "IP Whitelist", link: "/ip-whitelist" }, { name: "Edit" }],
        "/orders": "Orders",
        "/api-document": "Documents",
        "/rules": "Rules",
        "/rules/create": [{ name: "Rules", link: "/rules" }, { name: "Create" }],
        "/rules/edit/:rulesid": [{ name: "Rules", link: "/rules" }, { name: "Edit" }],
        "/api-document/:id": "API Document",
        "/products/:storeId": [{ name: "Stores", link: "/store-front" }, { name: "Products" }],
        "/:storeId/create-product": [
            { name: "Stores", link: "/store-front" },
            { name: "Products", link: `/products/${location.pathname.split("/")[1]}` },
            { name: "Create" },
        ],
        "/:storeId/edit-product/:productId": [
            { name: "Stores", link: "/store-front" },
            { name: "Products", link: `/products/${location.pathname.split("/")[1]}` },
            { name: "Edit" },
        ],
        "/api-key": "API Key",
        "/connector/:connector/settings": [{ name: "Connector", link: "/connector" }, { name: "Setting" }],
        "/pay-button/edit/:id": [{ name: "Pay Button", link: "/pay-button-list" }, { name: "Edit" }],
        "/test-transactions": "Test Transactions",
        "/transactions": "Live Transactions",
        "/sms-payment": "SMS Payment",
        "/sms-payment/create": [{ name: "SMS Payment", link: "/sms-payment" }, { name: "Create" }],
        "/sms-payment/edit/:id": [{ name: "SMS Payment", link: "/sms-payment" }, { name: "Edit" }],
        "/refund-transactions": "Refund Transactions",
        "/chargeback-transactions": "Chargeback Transactions",
        "/suspicious-transactions": "Suspicious Transactions",
        "/retrieval-transactions": "Retrieval Transactions",
        "/remove-retrieval-transactions": "Remove Retrieval Transactions",
        "/notifications": "Notifications",
        "/payment-links": "Payment Link",
        "/payment-links/create": [{ name: "Payment Link", link: "/payment-links" }, { name: "Create" }],
        "/payment-links/edit/:id": [{ name: "Payment Link", link: "/payment-links" }, { name: "Edit" }],
        "/payment-page": "Payment Page",
        "/payment-page/create/:id": [{ name: "Payment Page", link: "/payment-page" }, { name: "Create" }],
        "/payment-page/update/:id": [{ name: "Payment Page", link: "/payment-page" }, { name: "Edit" }],
        "/contact": "Contacts",
        "/contact/create": [{ name: "Contact", link: "/contact/create" }, { name: "Create" }],
        "/contact/update/:id": [{ name: "Contact", link: "/contact/create" }, { name: "Edit" }],
        "/contact/preview/:id": [{ name: "Contact", link: "/contact/create" }, { name: "View" }],
        "/email-campaigns": "Email Campaigns",
        "/email-campaigns/create": [{ name: "Email Campaigns", link: "/email-campaigns" }, { name: "Create" }],
        "/email-campaigns/update/:id": [{ name: "Email Campaigns", link: "/email-campaigns" }, { name: "Edit" }],
        "/email-campaigns/preview/:id": [{ name: "Email Campaigns", link: "/email-campaigns" }, { name: "View" }],
        "/email-template/update/:id": [
            { name: "Email Campaigns", link: "/email-campaigns" },
            { name: "Edit", link: `/email-campaigns/update/${location.pathname.split("/")[3]}` },
            { name: "Edit Designs", link: `/email-template/update/editor/${location.pathname.split("/")[3]}` },
            { name: "Templates" },
        ],
        "email-template/create/:id": [
            { name: "Email Campaigns", link: "/email-campaigns" },
            { name: "Create", link: `/email-campaigns/create/${location.pathname.split("/")[3]}` },
            { name: "Templates" },
        ],
        "/sms-campaigns": "SMS Campaigns",
        "/sms-campaigns/create": [{ name: "SMS Campaigns", link: "/sms-campaigns" }, { name: "Create" }],
        "/sms-campaigns/update/:id": [{ name: "SMS Campaigns", link: "/sms-campaigns" }, { name: "Edit" }],
        "/sms-campaigns/preview/:id": [{ name: "SMS Campaigns", link: "/sms-campaigns" }, { name: "View" }],
        "/webhook": "Webhook",
        "/webhook/create": [{ name: "Webhook", link: "/webhook" }, { name: "Create" }],
        "/webhook/update/:id": [{ name: "Webhook", link: "/webhook" }, { name: "Edit" }],
        "/webhook/view/:id": [{ name: "Webhook", link: "/webhook" }, { name: "View" }],
        "/payment-card": "Payment Card",
        "/payment-card/create": [{ name: "Payment Card", link: "/payment-card" }, { name: "Create" }],
        "/payment-card/update/:id": [{ name: "Payment Card", link: "/payment-card" }, { name: "Edit" }],
    };

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [notificationDataAll, setNotificationDataAll] = useState([]);
    const [isNotificationEnable, setIsNotificationEnable] = useState(false);

    const [isNotificationDropdownVisible, setIsNotificationDropdownVisible] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const merchantId = store.getState()?.persist?.userData?.data?.id;

    const { data } = useSelector((state) => state.breadcrumb);
    const { userData } = useSelector((state) => state.persist);

    // const toggleDropdown = useCallback(() => {
    //     setIsDropdownVisible((ov) => !ov);
    //     document.querySelector("#_mtw6ebn4z").classList.toggle("show");
    // }, []);

    // const toggleNotificationDropdown = useCallback(() => {
    //     setIsNotificationDropdownVisible((ov) => !ov);
    //     document.querySelector("#_mtw6ebn4zz").classList.toggle("show");
    // }, []);

    const onReadNotification = async (notification) => {
        const db = getDatabase();
        const postData = {
            ...notification,
            is_read: 1,
        };

        const updates = {};
        updates[`/notification/${notification?.id}`] = postData;

        await update(ref(db), updates);

        navigate(`/notification/detail/${notification?.notification_id}`);
    };

    useEffect(() => {
        setProfilePic(userData?.data?.image);
    }, [userData?.data?.image]);

    const getData = () => {
        const db = getDatabase();

        const q = query(ref(db, "notification"), orderByChild("merchant_id"), equalTo(merchantId));

        onValue(q, (snapshot) => {
            let testData = [];
            let data = [];
            let dataAll = [];
            let notificationEnable = false;
            // console.log({ snapshot });
            snapshot.forEach(function (child) {
                if (child.val()?.receiver_type === "merchant") {
                    data.push(child.val());
                    // console.log(child.val());
                    if (child.val()?.is_read === 0) {
                        notificationEnable = true;
                        dataAll = child.val();
                    }
                }
            });
            setIsNotificationEnable(notificationEnable);
            data.reverse();
            data = data.slice(0, 5);
            setNotificationData(data);
            setNotificationDataAll(dataAll);
        });
    };

    useEffect(() => {
        if (merchantId) {
            getData();
        }
    }, [merchantId]);

    useEffect(() => {
        const breadcrumb = [];
        // let pathnames = "";
        Object.keys(urlToNameMapping).forEach((key) => {
            if (matchPath({ path: key }, location.pathname)) {
                if (Array.isArray(urlToNameMapping[key])) {
                    urlToNameMapping[key]?.map((u, index) => {
                        // console.log({ u });
                        // pathnames += urlToNameMapping[key]?.length === index + 1 ? u : `${u} > `;
                        breadcrumb.push({
                            currentPathName: u?.name,
                            url: u?.link || null,
                        });
                    });
                } else {
                    breadcrumb.push({ currentPathName: urlToNameMapping[key] });
                }
            }
        });

        // breadcrumb.push({ currentPathName: pathnames, url: location.pathname });
        dispatch(addToBreadcrumb(breadcrumb));
    }, [location.pathname]);

    if (!props?.isHeaderVisible || (!userData?.data?.token && props?.isAuthRequired)) {
        return <div />;
    }

    return (
        <div className="top-bar-boxed h-[70px] z-index-999 relative border-b border-white/[0.08] px-3 sm:px-8 md:pt-0 auth-bg">
            <div className="h-full flex items-center">
                {/* BEGIN: Logo */}
                <Link to="/" className="-intro-x hidden md:flex">
                    <img alt="Icewall Tailwind HTML Admin Template" className="w-[150px]" src={Images.logoImage} />
                </Link>
                {/* END: Logo */}

                {/* BEGIN: Breadcrumb */}
                <nav aria-label="breadcrumb" className="-intro-x h-full mr-auto">
                    {/* <MainMenu
                        active={props?.findIndex + 1}
                        activeSubMenu={props?.findSubIndex}
                        isMenuVisible={props?.menuItems[findIndex]?.menu}
                    /> */}

                    <ol className="breadcrumb breadcrumb-light">
                        <MainMenu
                            active={props?.active}
                            activeSubMenu={props?.activeSubMenu}
                            isMenuVisible={props?.isMenuVisible}></MainMenu>
                        {/* {location.pathname !== "/" && (
                            <li className="breadcrumb-item">
                                <Link to={"/"}>{"Dashboard"}</Link>
                            </li>
                        )}
                        {data?.map((item, index) => {
                            // console.log({ data });
                            if (item?.url) {
                                return (
                                    <li className="breadcrumb-item" key={index}>
                                        <Link to={item?.url}>{item?.currentPathName}</Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="breadcrumb-item active" key={index}>
                                        <span>{item?.currentPathName}</span>
                                    </li>
                                );
                            }
                        })} */}
                    </ol>
                </nav>
                {/* END: Breadcrumb */}
                {/* BEGIN: Search */}
                {userData?.data?.token ? (
                    <>
                        <div className="intro-x relative mr-3 sm:mr-6">
                            <a className="notification notification--light sm:hidden" href="#">
                                {" "}
                                <Icon.Search className="notification__icon dark:text-slate-500" />{" "}
                            </a>
                            <div className="search-result">
                                <div className="search-result__content">
                                    <div className="search-result__content__title">Pages</div>
                                    <div className="mb-5">
                                        <a href="#" className="flex items-center">
                                            <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                                                {" "}
                                                <Icon.Inbox className="w-4 h-4" />{" "}
                                            </div>
                                            <div className="ml-3">Mail Settings</div>
                                        </a>
                                        <a href="#" className="flex items-center mt-2">
                                            <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                                                {" "}
                                                <Icon.Users className="w-4 h-4" />{" "}
                                            </div>
                                            <div className="ml-3">Users &amp; Permissions</div>
                                        </a>
                                        <a href="#" className="flex items-center mt-2">
                                            <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                                                {" "}
                                                <Icon.CreditCard className="w-4 h-4" />{" "}
                                            </div>
                                            <div className="ml-3">Transactions Report</div>
                                        </a>
                                    </div>
                                    <div className="search-result__content__title">Users</div>
                                    <div className="mb-5">
                                        <a href="#" className="flex items-center mt-2">
                                            <div className="w-8 h-8 image-fit">
                                                <img
                                                    alt="Icewall Tailwind HTML Admin Template"
                                                    className="rounded-full"
                                                    src={Images.profileImage}
                                                />
                                            </div>
                                            <div className="ml-3">Will Smith</div>
                                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                                                willsmith@left4code.com
                                            </div>
                                        </a>
                                        <a href="#" className="flex items-center mt-2">
                                            <div className="w-8 h-8 image-fit">
                                                <img
                                                    alt="Icewall Tailwind HTML Admin Template"
                                                    className="rounded-full"
                                                    src={Images.profileImage}
                                                />
                                            </div>
                                            <div className="ml-3">Kevin Spacey</div>
                                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                                                kevinspacey@left4code.com
                                            </div>
                                        </a>
                                        <a href="#" className="flex items-center mt-2">
                                            <div className="w-8 h-8 image-fit">
                                                <img
                                                    alt="Icewall Tailwind HTML Admin Template"
                                                    className="rounded-full"
                                                    src={Images.profileImage}
                                                />
                                            </div>
                                            <div className="ml-3">Edward Norton</div>
                                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                                                edwardnorton@left4code.com
                                            </div>
                                        </a>
                                        <a href="#" className="flex items-center mt-2">
                                            <div className="w-8 h-8 image-fit">
                                                <img
                                                    alt="Icewall Tailwind HTML Admin Template"
                                                    className="rounded-full"
                                                    src={Images.profileImage}
                                                />
                                            </div>
                                            <div className="ml-3">Will Smith</div>
                                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                                                willsmith@left4code.com
                                            </div>
                                        </a>
                                    </div>
                                    <div className="search-result__content__title">Products</div>
                                    <a href="#" className="flex items-center mt-2">
                                        <div className="w-8 h-8 image-fit">
                                            <img
                                                alt="Icewall Tailwind HTML Admin Template"
                                                className="rounded-full"
                                                src={Images.profileImage}
                                            />
                                        </div>
                                        <div className="ml-3">Apple MacBook Pro 13</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">PC &amp; Laptop</div>
                                    </a>
                                    <a href="#" className="flex items-center mt-2">
                                        <div className="w-8 h-8 image-fit">
                                            <img
                                                alt="Icewall Tailwind HTML Admin Template"
                                                className="rounded-full"
                                                src={Images.profileImage}
                                            />
                                        </div>
                                        <div className="ml-3">Dell XPS 13</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">PC &amp; Laptop</div>
                                    </a>
                                    <a href="#" className="flex items-center mt-2">
                                        <div className="w-8 h-8 image-fit">
                                            <img
                                                alt="Icewall Tailwind HTML Admin Template"
                                                className="rounded-full"
                                                src={Images.profileImage}
                                            />
                                        </div>
                                        <div className="ml-3">Nike Air Max 270</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Sport &amp; Outdoor</div>
                                    </a>
                                    <a href="#" className="flex items-center mt-2">
                                        <div className="w-8 h-8 image-fit">
                                            <img
                                                alt="Icewall Tailwind HTML Admin Template"
                                                className="rounded-full"
                                                src={Images.profileImage}
                                            />
                                        </div>
                                        <div className="ml-3">Oppo Find X2 Pro</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                                            Smartphone &amp; Tablet
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* END: Search */}
                        {/* {userData?.data?.token && <ThemeSwitch from={"header"} />} */}
                        {/* BEGIN: Notifications */}
                        <div className="intro-x dropdown mr-4 z-index-999 sm:mr-6">
                            {/* <div className="dropdown-toggle notification cursor-pointer" aria-expanded="true" data-tw-toggle="dropdown">
                                {" "}
                                <Icon.Bell className="notification__icon dark:text-slate-500" />{" "}
                            </div> */}

                            {/* {isNotificationDropdownVisible} */}
                            <NotificationDropdown
                                isVisibleBadge={isNotificationEnable}
                                onReadNotification={onReadNotification}
                                data={notificationData}
                                visible={isNotificationDropdownVisible}
                                setVisible={setIsNotificationDropdownVisible}
                            />
                        </div>
                        {/* END: Notifications */}
                        {/* BEGIN: Account Menu */}
                        <div className="intro-x dropdown z-index-999 w-8 h-8">
                            {/* <div
                                className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
                                aria-expanded="true"
                                data-tw-toggle="dropdown">
                                <img alt="Icewall Tailwind HTML Admin Template" src={profilePic || Images.profileImage} />
                            </div> */}

                            <PortalDropdown visible={isDropdownVisible} setVisible={setIsDropdownVisible} profilePic={profilePic} />
                        </div>{" "}
                    </>
                ) : (
                    ""
                )}
                {/* <PortalDropdown /> */}
                {/* END: Account Menu */}
            </div>
        </div>
    );
};

export default Header;
