import React from "react";
const MenuItems = React.lazy(() => import("./MenuItems"));

function TopMenu(props) {
    return (
        <>
            {props?.isMenuVisible ? (
                <nav className="top-nav">
                    <ul>
                        <MenuItems
                            linkClassName={(index) => (props?.active === index ? "top-menu top-menu--active" : "top-menu cursor-pointer")}
                            {...props}
                            titleClassName="top-menu__title"
                            menuTypeClassName="top-menu"
                            iconClassName="top-menu__icon"
                            subIconClassName="top-menu__sub-icon"
                        />
                    </ul>
                </nav>
            ) : (
                ""
            )}
            <div className="wrapper wrapper--top-nav">
                <div className="wrapper-box">{props?.children}</div>
            </div>
        </>
    );
}

export default React.memo(TopMenu);
