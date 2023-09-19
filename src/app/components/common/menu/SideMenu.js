import React from "react";
const MenuItems = React.lazy(() => import("./MenuItems"));

function SideMenu(props) {
    return (
        <div className="wrapper">
            <div className="wrapper-box">
                {props?.isMenuVisible ? (
                    <nav className="side-nav">
                        <ul>
                            <MenuItems
                                linkClassName={(index) =>
                                    props?.active === index ? "side-menu side-menu--active" : "side-menu  cursor-pointer"
                                }
                                {...props}
                                titleClassName="side-menu__title"
                                iconClassName="side-menu__icon"
                                menuTypeClassName="side-menu"
                                subIconClassName="side-menu__sub-icon"
                            />
                        </ul>
                    </nav>
                ) : (
                    ""
                )}
                {props?.children}
            </div>
        </div>
    );
}

export default React.memo(SideMenu);
