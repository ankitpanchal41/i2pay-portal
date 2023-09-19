import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

import Images from "../../../assets/images/index";
import PortalDropdown from "../../components/common/ProfileDropdown";
import Header from "../../components/common/Header";
import MainMenu from "../../components/common/menu";

const Home = () => {
    const { userData } = useSelector((state) => state.persist);
    const stepNumber = Number(userData?.data?.step);

    const applicationPercent = useMemo(() => (100 * stepNumber) / 4, [stepNumber]);

    const toggleDropdown = useCallback(() => {
        document.querySelector("#_mtw6ebn4z").classList.toggle("show");
    }, []);

    return (
        <>
            {/* BEGIN: Mobile Menu */}
            <div className="mobile-menu md:hidden">
                <div className="mobile-menu-bar">
                    <a href className="flex mr-auto">
                        <img alt="logo" className="w-[30%]" src={Images.logoImage} />
                    </a>
                    <a href="javascript:;" id="mobile-menu-toggler">
                        {" "}
                        <Icon.BarChart2 className="w-8 h-8 text-white transform -rotate-90" />{" "}
                    </a>
                </div>
                <ul className="border-t border-white/[0.08] py-5 hidden">
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Home />{" "}
                            </div>
                            <div className="menu__title">Dashboard</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Box />{" "}
                            </div>
                            <div className="menu__title">Application</div>
                        </a>
                    </li>
                </ul>
            </div>
            {/* END: Mobile Menu */}

            {/* BEGIN: Top Bar */}
            <Header />
            {/* END: Top Bar */}

            {/* <div className="wrapper">
                <div className="wrapper-box"> */}
            {/* BEGIN: Side Menu */}
            {/* <nav className="side-nav">
                        <ul>
                            <li>
                                <Link to="/" className="side-menu">
                                    <div className="side-menu__icon">
                                        {" "}
                                        <Icon.Home />{" "}
                                    </div>
                                    <div className="side-menu__title">Dashboard</div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/merchant-register" className="side-menu">
                                    <div className="side-menu__icon">
                                        {" "}
                                        <Icon.Box />{" "}
                                    </div>
                                    <div className="side-menu__title">Application</div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/connector" className="side-menu">
                                    <div className="side-menu__icon">
                                        {" "}
                                        <Icon.Box />{" "}
                                    </div>
                                    <div className="side-menu__title">Connector</div>
                                </Link>
                            </li>
                        </ul>
                    </nav> */}
            {/* END: Side Menu */}
            {/* BEGIN: Content */}
            <MainMenu active={1}>
                <div className="content">
                    <div className="col-span-12 mt-6 -mb-6 intro-y">
                        <div className="text-4xl mb-5 font-semibold">Hi Merchant Welcome to Exotic 😊</div>
                        <div className="alert alert-dismissible show box bg-primary text-white flex items-center mb-6" role="alert">
                            <span>
                                Your application is {applicationPercent}% done
                                {applicationPercent !== 100 ? (
                                    <>
                                        , click{" "}
                                        <Link to="/merchant-register" className="underline">
                                            here
                                        </Link>{" "}
                                        to complete now.
                                    </>
                                ) : null}
                            </span>
                        </div>
                    </div>
                </div>
            </MainMenu>
            {/* END: Content */}
            {/* </div>
            </div> */}
        </>
    );
};

export default Home;
