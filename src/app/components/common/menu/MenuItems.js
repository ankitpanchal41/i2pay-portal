import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import $ from "jquery";
import ReactTooltip from "react-tooltip";
import { menuElementsType, menuItems } from "../../../utils/constants";
import { store } from "../../../redux/store";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const MenuItems = ({
    linkClassName,
    titleClassName,
    iconClassName,
    subIconClassName,
    menuTypeClassName,
    visibleTooltip,
    activeSubMenu,
    active,
}) => {
    const [paymentMenuEnable, setPaymentMenuEnable] = React.useState(null);
    const applicationStatus = store.getState()?.persist?.userData?.data?.application_status;
    const isRateSent = store.getState()?.persist?.userData?.data?.is_rate_sent;

    const openSubMenuPaymentMethod = (id) => {
        if (id === paymentMenuEnable) {
            setPaymentMenuEnable(null);
        } else {
            setPaymentMenuEnable(id);
        }
    };

    const screenWidth = useWindowDimensions();

    const closeMenu = () => {
        $(".mobile-menu").find("ul").first().slideUp();
    };

    let hideMenuCount = 0;
    if (
        applicationStatus == "0" ||
        applicationStatus == "" ||
        applicationStatus == "2" ||
        applicationStatus == "3" ||
        applicationStatus == "10"
    ) {
        hideMenuCount = 0;
    } else if (screenWidth?.width < 789) {
        hideMenuCount = 0;
    } else if (screenWidth?.width < 922) {
        hideMenuCount = 7;
    } else if (screenWidth?.width < 1072) {
        hideMenuCount = 6;
    } else if (screenWidth?.width < 1262) {
        hideMenuCount = 5;
    } else if (screenWidth?.width < 1412) {
        hideMenuCount = 4;
    } else if (screenWidth?.width < 1562) {
        hideMenuCount = 3;
    } else if (screenWidth?.width < 1690) {
        hideMenuCount = 2;
    } else if (screenWidth?.width < 1745) {
        hideMenuCount = 1;
    }

    // hideMenuCount = 0;

    return (
        <>
            {menuItems?.map((item, index) => {
                if (index >= menuItems.length - (hideMenuCount + 1)) {
                } else if (
                    (applicationStatus == "0" ||
                        applicationStatus == "" ||
                        applicationStatus == "2" ||
                        applicationStatus == "3" ||
                        applicationStatus == "10") &&
                    (item.id === 3 || item.id === 4 || item.id === 5 || item.id === 6 || item.id === 7 || item.id === 8) &&
                    isRateSent != "1"
                ) {
                    return <li key={index} />;
                } else {
                    switch (item.type) {
                        case menuElementsType.SINGLE:
                            return (
                                <li data-tip data-for={`global${item?.title}`} key={index} onClick={() => openSubMenuPaymentMethod(null)}>
                                    {item?.redirect_link ? (
                                        <a target="_blank" to={item.redirect_link} className={linkClassName(index + 1)}>
                                            {item?.icon && <div className={iconClassName}>{item?.icon()}</div>}
                                            {!visibleTooltip && <div className={titleClassName}>{item?.title}</div>}
                                        </a>
                                    ) : (
                                        <Link to={item.to} className={linkClassName(index + 1)} onClick={closeMenu}>
                                            {item?.icon && <div className={iconClassName}>{item?.icon()}</div>}
                                            {!visibleTooltip && <div className={titleClassName}>{item?.title}</div>}
                                        </Link>
                                    )}

                                    {visibleTooltip && (
                                        <ReactTooltip id={`global${item?.title}`} type="dark" place="right" effect="solid">
                                            <div className={titleClassName}>{item?.title}</div>
                                        </ReactTooltip>
                                    )}
                                </li>
                            );

                        case menuElementsType.MULTI:
                            return (
                                <li key={index}>
                                    <div
                                        data-tip
                                        data-for={`global${item?.title}`}
                                        className={linkClassName(index + 1)}
                                        onClick={() => openSubMenuPaymentMethod(item?.id)}>
                                        <div className={iconClassName}> {item?.icon()}</div>
                                        <div className={titleClassName}>
                                            {!visibleTooltip && item?.title}
                                            <div
                                                className={`${subIconClassName} transform ${
                                                    paymentMenuEnable === item?.id ? "rotate-180" : ""
                                                }`}>
                                                <Icon.ChevronDown size={17} />
                                            </div>
                                        </div>
                                        {visibleTooltip && (
                                            <ReactTooltip id={`global${item?.title}`} type="dark" place="right" effect="solid">
                                                {item?.title}
                                            </ReactTooltip>
                                        )}
                                    </div>
                                    <ul className={paymentMenuEnable === item?.id ? `${menuTypeClassName}__sub-open` : ""}>
                                        <div className="menu-arrow-top"></div>
                                        <div className="menu-arrow-two"></div>

                                        {item?.subMenuItems?.map((subMenu, subMenuIndex) => {
                                            if (
                                                (applicationStatus == "0" ||
                                                    applicationStatus == "" ||
                                                    applicationStatus == "2" ||
                                                    applicationStatus == "3" ||
                                                    applicationStatus == "10") &&
                                                (subMenu.id === 1 || subMenu.id === 2 || subMenu.id === 3 || subMenu.id === 4) &&
                                                isRateSent != "1"
                                            ) {
                                                return null;
                                            } else {
                                                return (
                                                    <li data-tip data-for={`global${subMenu?.title}`} key={subMenuIndex}>
                                                        {subMenu?.redirect_link ? (
                                                            <a
                                                                style={{ cursor: "pointer" }}
                                                                target="_blank"
                                                                href={subMenu.redirect_link}
                                                                className={
                                                                    active === index + 1 && activeSubMenu === subMenuIndex
                                                                        ? `${menuTypeClassName} top-menu--active`
                                                                        : menuTypeClassName
                                                                }>
                                                                {subMenu?.icon && <div className={iconClassName}>{subMenu?.icon()}</div>}
                                                                {!visibleTooltip && <div className={titleClassName}>{subMenu?.title}</div>}
                                                            </a>
                                                        ) : (
                                                            <Link
                                                                to={subMenu?.to}
                                                                className={
                                                                    active === index + 1 && activeSubMenu === subMenuIndex
                                                                        ? `${menuTypeClassName} top-menu--active`
                                                                        : menuTypeClassName
                                                                }
                                                                onClick={closeMenu}>
                                                                <div className={iconClassName}>{subMenu?.icon()}</div>
                                                                {!visibleTooltip && (
                                                                    <div className={titleClassName}> {subMenu?.title} </div>
                                                                )}
                                                            </Link>
                                                        )}
                                                        {visibleTooltip && (
                                                            <ReactTooltip
                                                                id={`global${subMenu?.title}`}
                                                                type="dark"
                                                                place="right"
                                                                effect="solid">
                                                                <div className={titleClassName}> {subMenu?.title} </div>
                                                            </ReactTooltip>
                                                        )}
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </li>
                            );

                        case menuElementsType.NONE:
                            return <li key={index} />;

                        default:
                            return <div key={index} />;
                    }
                }
            })}

            {hideMenuCount > 0 && (
                <li>
                    <div
                        data-tip
                        data-for={`globalEye`}
                        class={`top-menu cursor-pointer ${menuItems.length - (hideMenuCount + 1) < active ? "top-menu--active" : ""}`}>
                        <div class="top-menu__icon">
                            <Icon.Eye size={20} />
                        </div>
                        <div class="top-menu__title">More</div>
                    </div>

                    <ul style={{ left: "-175px" }}>
                        <div className="menu-arrow-top-right"></div>
                        <div className="menu-arrow-top-right-two"></div>
                        {menuItems?.map((item, index) => {
                            if (index >= menuItems.length - (hideMenuCount + 1)) {
                                if (
                                    (applicationStatus == "0" ||
                                        applicationStatus == "" ||
                                        applicationStatus == "2" ||
                                        applicationStatus == "3" ||
                                        applicationStatus == "10") &&
                                    (item.id === 3 || item.id === 4 || item.id === 5 || item.id === 6 || item.id === 7) &&
                                    isRateSent != "1"
                                ) {
                                    return null;
                                } else {
                                    switch (item.type) {
                                        case menuElementsType.SINGLE:
                                            return (
                                                <li
                                                    data-tip
                                                    data-for={`global${item?.title}`}
                                                    key={index}
                                                    onClick={() => openSubMenuPaymentMethod(null)}>
                                                    {item?.redirect_link ? (
                                                        <a
                                                            style={{ cursor: "pointer" }}
                                                            href={item?.redirect_link}
                                                            target="_blank"
                                                            className={linkClassName(index + 1)}
                                                            onClick={closeMenu}>
                                                            {item?.icon && <div className={iconClassName}>{item?.icon()}</div>}
                                                            {!visibleTooltip && <div className={titleClassName}>{item?.title}</div>}
                                                        </a>
                                                    ) : (
                                                        <Link to={item.to} className={linkClassName(index + 1)} onClick={closeMenu}>
                                                            {item?.icon && <div className={iconClassName}>{item?.icon()}</div>}
                                                            {!visibleTooltip && <div className={titleClassName}>{item?.title}</div>}
                                                        </Link>
                                                    )}

                                                    {visibleTooltip && (
                                                        <ReactTooltip id={`global${item?.title}`} type="dark" place="right" effect="solid">
                                                            <div className={titleClassName}>{item?.title}</div>
                                                        </ReactTooltip>
                                                    )}
                                                </li>
                                            );
                                        case menuElementsType.MULTI:
                                            return (
                                                <li key={index}>
                                                    <div
                                                        data-tip
                                                        data-for={`global${item?.title}`}
                                                        className={linkClassName(index + 1)}
                                                        onClick={() => openSubMenuPaymentMethod(item?.id)}>
                                                        <div className={iconClassName}> {item?.icon()}</div>
                                                        <div className={titleClassName}>
                                                            {!visibleTooltip && item?.title}
                                                            <div
                                                                className={`${subIconClassName} transform ${
                                                                    paymentMenuEnable === item?.id ? "rotate-180" : ""
                                                                }`}>
                                                                <Icon.ChevronDown size={17} />
                                                            </div>
                                                        </div>
                                                        {visibleTooltip && (
                                                            <ReactTooltip
                                                                id={`global${item?.title}`}
                                                                type="dark"
                                                                place="right"
                                                                effect="solid">
                                                                {item?.title}
                                                            </ReactTooltip>
                                                        )}
                                                    </div>
                                                    <ul className={paymentMenuEnable === item?.id ? `${menuTypeClassName}__sub-open` : ""}>
                                                        <div className="menu-arrow-right"></div>
                                                        <div className="menu-arrow-right-two"></div>
                                                        {item?.subMenuItems?.map((subMenu, subMenuIndex) => {
                                                            console.log({ subMenu });
                                                            if (
                                                                (applicationStatus == "0" ||
                                                                    applicationStatus == "" ||
                                                                    applicationStatus == "2" ||
                                                                    applicationStatus == "3" ||
                                                                    applicationStatus == "10") &&
                                                                (subMenu.id === 1 ||
                                                                    subMenu.id === 2 ||
                                                                    subMenu.id === 3 ||
                                                                    subMenu.id === 4) &&
                                                                isRateSent != "1"
                                                            ) {
                                                                return null;
                                                            } else {
                                                                return (
                                                                    <li data-tip data-for={`global${subMenu?.title}`} key={subMenuIndex}>
                                                                        {subMenu?.redirect_link ? (
                                                                            <a
                                                                                href={subMenu?.redirect_link}
                                                                                target="_blank"
                                                                                className={
                                                                                    active === index + 1 && activeSubMenu === subMenuIndex
                                                                                        ? `${menuTypeClassName} top-menu--active`
                                                                                        : menuTypeClassName
                                                                                }
                                                                                style={{ cursor: "pointer" }}
                                                                                onClick={closeMenu}>
                                                                                <div className={iconClassName}>{subMenu?.icon()}</div>
                                                                                {!visibleTooltip && (
                                                                                    <div className={titleClassName}> {subMenu?.title} </div>
                                                                                )}
                                                                            </a>
                                                                        ) : (
                                                                            <Link
                                                                                to={subMenu?.to}
                                                                                className={
                                                                                    active === index + 1 && activeSubMenu === subMenuIndex
                                                                                        ? `${menuTypeClassName} top-menu--active`
                                                                                        : menuTypeClassName
                                                                                }
                                                                                onClick={closeMenu}>
                                                                                <div className={iconClassName}>{subMenu?.icon()}</div>
                                                                                {!visibleTooltip && (
                                                                                    <div className={titleClassName}> {subMenu?.title} </div>
                                                                                )}
                                                                            </Link>
                                                                        )}
                                                                        {visibleTooltip && (
                                                                            <ReactTooltip
                                                                                id={`global${subMenu?.title}`}
                                                                                type="dark"
                                                                                place="right"
                                                                                effect="solid">
                                                                                <div className={titleClassName}> {subMenu?.title} </div>
                                                                            </ReactTooltip>
                                                                        )}
                                                                    </li>
                                                                );
                                                            }
                                                        })}
                                                    </ul>
                                                </li>
                                            );
                                        case menuElementsType.NONE:
                                            return <li key={index} />;
                                        default:
                                            return <div key={index} />;
                                    }
                                }
                            }
                        })}
                    </ul>
                </li>
            )}
        </>
    );
};

export default React.memo(MenuItems);
