import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Menu } from "@headlessui/react";
import Images from "../../../assets/images";
import { logoutUser } from "../../redux/actions/PersistActions";
import unregisterFirebase from "../../utils/unregisterdFCMToken";

const ProfileDropdown = ({ visible, setVisible, data, profilePic }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userData } = useSelector((state) => state.persist);

    const onPressProfile = () => {
        navigate("/profile");
    };

    const onPressLogout = () => {
        dispatch(logoutUser());
        unregisterFirebase();
    };

    return (
        <>
            <Menu as="div" className="relative">
                {({ open }) => (
                    <>
                        <Menu.Button type="buttons" className="dropdown-toggle notification cursor-pointer">
                            <div
                                className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
                                aria-expanded="true"
                                data-tw-toggle="dropdown">
                                <img alt="Icewall Tailwind HTML Admin Template" src={profilePic || Images.profileImage} />
                            </div>
                        </Menu.Button>

                        {open && (
                            <Menu.Items
                                static
                                className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <ul className="p-2 w-[224px] rounded-md before:block bg-primary/80 dark:bg-darkmode-600 before:absolute  before:bg-black shadow-lg before:inset-0 before:rounded-md before:z-[-1] text-white">
                                    <li className="p-2">
                                        <div className="font-medium">{userData?.data?.name}</div>
                                        <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">{userData?.data?.email}</div>
                                    </li>
                                    <li className="py-2">
                                        <hr className="dropdown-divider border-white/[0.08]" />
                                    </li>
                                    <li>
                                        <Menu.Item
                                            onClick={onPressProfile}
                                            className="dropdown-item hover:bg-white/5 rounded-md cursor-pointer p-2">
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <Icon.User className="feather feather-toggle-right w-4 h-4 mr-2" />
                                                <span>Profile</span>
                                            </div>
                                        </Menu.Item>
                                    </li>
                                    <li>
                                        <Menu.Item
                                            onClick={onPressLogout}
                                            className="dropdown-item hover:bg-white/5 rounded-md cursor-pointer p-2">
                                            <div style={{ display: "flex", alignItems: "center" }}>
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
                                                    className="feather feather-toggle-right w-4 h-4 mr-2">
                                                    <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
                                                    <circle cx="16" cy="12" r="3"></circle>
                                                </svg>
                                                <span>Logout</span>
                                            </div>
                                        </Menu.Item>
                                    </li>
                                </ul>
                            </Menu.Items>
                        )}
                    </>
                )}
            </Menu>
        </>
    );
};

export default ProfileDropdown;
