import React from "react";
import * as Icon from "react-feather";
import $ from "jquery";
import Images from "../../../../assets/images";
const MenuItems = React.lazy(() => import("./MenuItems"));

const MobileViewMenu = ({ isMenuVisible }) => {
    if (!isMenuVisible) {
        return <div />;
    }

    const toggleMenu = () => {
        if ($(".mobile-menu").find("ul").first()[0].offsetParent !== null) {
            $(".mobile-menu").find("ul").first().slideUp();
        } else {
            $(".mobile-menu").find("ul").first().slideDown();
        }
    };

    return (
        <div className="mobile-menu md:hidden">
            <div className="mobile-menu-bar auth-bg">
                <a className="flex mr-auto">
                    <img alt="logo" className="w-[30%]" src={Images.logoImage} />
                </a>
                <a id="mobile-menu-toggler" onClick={toggleMenu}>
                    <Icon.BarChart2 className="w-8 h-8 text-white transform -rotate-90" />
                </a>
            </div>
            <ul className="border-t border-white/[0.08] py-5 hidden bg-primary">
                <MenuItems
                    linkClassName={() => "menu"}
                    titleClassName="menu__title"
                    iconClassName="menu__icon"
                    subIconClassName="menu__sub-icon"
                    menuTypeClassName="menu"
                />
            </ul>
        </div>
    );
};

export default React.memo(MobileViewMenu);
