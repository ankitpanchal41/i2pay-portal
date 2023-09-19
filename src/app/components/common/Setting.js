import React, { useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { SET_LISTING_TYPE_REQUEST, SET_MENU_TYPE_REQUEST } from "../../redux/actions/Menu";

const Setting = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [menuType, setMenuType] = useState(false);
    const [listingType, setListingType] = useState("table");
    const dispatch = useDispatch();

    const state = useSelector((state) => state);

    useEffect(() => {
        const menuType = localStorage.getItem("MENU_TYPE");
        const listingType = localStorage.getItem("LISTING_TYPE");
        if (menuType !== null) {
            setMenuType(menuType);
            dispatch({ type: SET_MENU_TYPE_REQUEST, payload: { menuType: menuType } });
            dispatch({ type: SET_LISTING_TYPE_REQUEST, payload: { listingType: listingType } });
        } else {
            localStorage.setItem("MENU_TYPE", "top_menu");
            setMenuType("top_menu");
            dispatch({ type: SET_MENU_TYPE_REQUEST, payload: { menuType: "top_menu" } });
            dispatch({ type: SET_LISTING_TYPE_REQUEST, payload: { listingType: "table" } });
        }
    }, []);

    useEffect(() => {
        if (isOpenMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpenMenu]);

    useEffect(() => {
        if (state?.menu_type?.menuType) {
            setMenuType(state?.menu_type?.menuType);
        }
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.menuType, state?.menu_type?.listingType]);

    const changeMode = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const onChangeMenu = (type) => {
        setMenuType(type);
    };

    const onChangeListingType = (e) => {
        setListingType(e?.target?.value);
    };

    const onClickApply = () => {
        localStorage.setItem("MENU_TYPE", menuType);
        localStorage.setItem("LISTING_TYPE", listingType);
        dispatch({ type: SET_MENU_TYPE_REQUEST, payload: { menuType: menuType } });
        dispatch({ type: SET_LISTING_TYPE_REQUEST, payload: { listingType: listingType } });
        changeMode();
    };

    if (
        !state?.persist?.isLoggedIn ||
        state?.persist?.userData?.data?.redirect_screen === "1" ||
        window.location.pathname.includes("/payment/page/") ||
        window.location.pathname.includes("/payment/card/")
    ) {
        return null;
    }

    return (
        <>
            <div
                onClick={changeMode}
                className={
                    isOpenMenu
                        ? "modal modal-slide-over overflow-y-auto show ml-0 mt-0 z-[998]"
                        : "modal modal-slide-over overflow-y-auto ml-0 mt-0 z-[998]"
                }
                data-tw-backdrop="static"
                tabIndex="-1"
                aria-hidden="true">
                <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content ">
                        <a data-tw-dismiss="modal">
                            <Icon.X onClick={changeMode} className="feather feather-x w-8 h-8 text-slate-400" />
                        </a>
                        <div className="modal-header p-5">
                            <h2 className="font-medium text-base mr-auto">Theme Customizer</h2>
                        </div>
                        <div className="modal-body">
                            <div className="mb-5">
                                <label className="form-label">Data Listing Type</label>
                                <select onChange={onChangeListingType} value={listingType} name="listingType" className="form-select">
                                    <option value="table">Table</option>
                                    <option value="box">Box</option>
                                </select>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Menu Layout</label>
                                <div className="flex flex-col sm:flex-row mt-2">
                                    <div className="form-check mr-2">
                                        <input
                                            id="radio-switch-4"
                                            className="form-check-input"
                                            type="radio"
                                            name="menuType"
                                            value="top_menu"
                                            checked={menuType === "top_menu"}
                                            onChange={() => {
                                                onChangeMenu("top_menu");
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="radio-switch-4">
                                            Top Menu
                                        </label>
                                    </div>
                                    <div className="form-check mr-2 mt-2 sm:mt-0">
                                        <input
                                            id="radio-switch-5"
                                            className="form-check-input"
                                            type="radio"
                                            name="menuType"
                                            value="slid_menu"
                                            checked={menuType === "slid_menu"}
                                            onChange={() => {
                                                onChangeMenu("slid_menu");
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="radio-switch-5">
                                            Side Menu
                                        </label>
                                    </div>
                                    <div className="form-check mr-2 mt-2 sm:mt-0">
                                        <input
                                            id="radio-switch-6"
                                            className="form-check-input"
                                            type="radio"
                                            name="menuType"
                                            value="simple_menu"
                                            checked={menuType === "simple_menu"}
                                            onChange={() => {
                                                onChangeMenu("simple_menu");
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="radio-switch-6">
                                            Simple Menu
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer w-full absolute bottom-0">
                            <button onClick={onClickApply} className="btn btn-primary w-20 filter">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="dark-mode-switcher cursor-pointer fixed right-0 inset-y-2/4 flex items-center justify-center z-[60] mb-10 text-white"
                onClick={changeMode}>
                <div className="w-auto btn btn-danger shadow-md">
                    <Icon.Settings className="notification__icon dark:text-white-500" />{" "}
                </div>
            </div>
        </>
    );
};

export default Setting;
