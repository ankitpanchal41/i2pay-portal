import React, { useCallback, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import { SET_PROFILE_REQUEST } from "../../redux/actions/Profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Images from "../../../assets/images";
import { detailStart } from "../../redux/actions/PersistActions";
import Box from "../../components/common/Box";

const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const SetNewPassword = React.lazy(() => import("../SetNewPassword"));
const EditProfile = React.lazy(() => import("../EditProfile"));
const TwoFactorAuthentication = React.lazy(() => import("../TwoFactorAuthentication"));

const Profile = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.persist);
    const [profilePic, setProfilePic] = useState(Images.profileImage);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [activeMenu, setActiveMenu] = useState(1);

    const profilePicRef = useRef("");

    useEffect(() => {
        setProfilePic(userData?.data?.image);
    }, [userData?.data?.image]);

    useEffect(() => {
        setIsLoadingProfile(true);
        dispatch(
            detailStart(userData?.data?.token, () => {
                setIsLoadingProfile(false);
            }),
        );
    }, []);

    const onProfilePicChange = async (event) => {
        console.log("image", event);

        // let reader = new FileReader();
        // reader.onload = (e) => {
        //     setProfilePic(e.target.result);
        // };
        // reader.readAsDataURL(event.target.files[0]);
        // let formData = new FormData();
        const base64 = await convertBase64(event.target.files[0]);
        console.log({ base64 });
        // formData.append("image", event.target.files[0]);

        const payload = { image: base64 };

        const callBack = () => {
            setIsLoadingProfile(false);
        };

        setIsLoadingProfile(true);

        dispatch({ type: SET_PROFILE_REQUEST, payload, callBack });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <>
            <div className="content">
                <div className="grid grid-cols-12 border border-1 p-5 mt-5 border-[#E3E7ED]">
                    <div className="md:col-span-3 col-span-12 px-3">
                        <div className="intro-y">
                            <div className="flex flex-col">
                                <div className="mt-6 lg:mt-0 flex-1 px-5 pt-5 lg:pt-0">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                                            <img
                                                alt="Icewall Tailwind HTML Admin Template"
                                                className="rounded-full"
                                                src={profilePic || Images.profileImage}
                                            />
                                            <div
                                                className="cursor-pointer absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2"
                                                onClick={() => {
                                                    console.log("ref", profilePicRef);
                                                    profilePicRef.current?.click();
                                                }}>
                                                {isLoadingProfile ? (
                                                    <MiniLoader size={14} isLoading={isLoadingProfile} className="ml-0" />
                                                ) : (
                                                    <Icon.Camera color="white" size={14} />
                                                )}
                                                <input
                                                    ref={profilePicRef}
                                                    // value={profilePic}
                                                    type="file"
                                                    hidden
                                                    onChange={onProfilePicChange}
                                                    accept="image/png,image/jpg,image/jpeg,image/gif"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-1 truncate sm:whitespace-normal font-medium text-[18px] mt-[40px]">
                                            {userData?.data?.name || userData?.data?.email?.split("@")[0]}
                                        </div>
                                        {userData?.data?.email && (
                                            <div className="truncate sm:whitespace-normal flex items-center mt-[10px]">
                                                {userData?.data?.email}
                                            </div>
                                        )}
                                        {userData?.data?.country_code && userData?.data?.mobile_no && (
                                            <div className="truncate sm:whitespace-normal flex items-center mt-[5px]">
                                                {userData?.data?.country_code} {userData?.data?.mobile_no}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-9 col-span-12">
                        <Box header={`Personal Details`}>
                            <div className="grid grid-cols-12">
                                <div className="md:col-span-6 col-span-12 px-3">
                                    <TwoFactorAuthentication />
                                </div>
                                <div className="md:col-span-6 col-span-12 px-3">
                                    <ul
                                        className="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center"
                                        role="tablist">
                                        <li
                                            id="dashboard-tab"
                                            className="nav-item cursor-pointer w-full flex items-center"
                                            role="presentation">
                                            <a
                                                onClick={() => {
                                                    setActiveMenu(1);
                                                }}
                                                className={
                                                    activeMenu === 1
                                                        ? "nav-link py-4 active w-full flex items-center text-[#1E3A8A] text-[14px] font-medium"
                                                        : "nav-link py-4 w-full flex items-center text-[#B4BDCE] text-[14px] font-medium"
                                                }>
                                                <Icon.User
                                                    size={24}
                                                    color={activeMenu === 1 ? "#1E3A8A" : "#B4BDCE"}
                                                    className="mr-[12px]"
                                                />
                                                My Details
                                            </a>
                                        </li>
                                        <li
                                            id="account-and-profile-tab"
                                            className="nav-item cursor-pointer w-full flex items-center"
                                            role="presentation">
                                            <a
                                                onClick={() => {
                                                    setActiveMenu(2);
                                                }}
                                                className={
                                                    activeMenu === 2
                                                        ? "nav-link py-4 active flex items-center text-[#1E3A8A] text-[14px] font-medium"
                                                        : "nav-link py-4 flex items-center text-[#B4BDCE] text-[14px] font-medium"
                                                }>
                                                <Icon.Key
                                                    size={24}
                                                    color={activeMenu === 2 ? "#1E3A8A" : "#B4BDCE"}
                                                    className="mr-[12px]"
                                                />
                                                Change Password
                                            </a>
                                        </li>
                                    </ul>
                                    {activeMenu === 1 ? <EditProfile /> : <SetNewPassword />}
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
                {/* <div className="intro-y box px-5 pt-5 mt-5">
                    <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
                        <div className="flex flex-1 px-5 items-center justify-start">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                                <img
                                    alt="Icewall Tailwind HTML Admin Template"
                                    className="rounded-full"
                                    src={profilePic || Images.profileImage}
                                />
                                <div
                                    className="cursor-pointer absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2"
                                    onClick={() => {
                                        console.log("ref", profilePicRef);
                                        profilePicRef.current?.click();
                                    }}>
                                    {isLoadingProfile ? (
                                        <MiniLoader size={14} isLoading={isLoadingProfile} className="ml-0" />
                                    ) : (
                                        <Icon.Camera color="white" size={14} />
                                    )}
                                    <input
                                        ref={profilePicRef}
                                        // value={profilePic}
                                        type="file"
                                        hidden
                                        onChange={onProfilePicChange}
                                        accept="image/png,image/jpg,image/jpeg,image/gif"
                                    />
                                </div>
                            </div>
                            <div className="ml-5">
                                <div className="w-4/5 sm:w-40 max-w-[150px] truncate sm:whitespace-normal font-medium text-lg">
                                    {userData?.data?.name || userData?.data?.email?.split("@")[0]}
                                </div>
                                <div className="text-slate-500">Merchant</div>
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
                            <div className="font-medium text-center lg:text-left lg:mt-3 md:block lg:block hidden">Contact Details</div>
                            <div className="flex flex-col justify-start md:justify-center lg:justify-center items-start lg:items-start lg:mt-4 md:mt-4">
                                <div className="truncate sm:whitespace-normal flex sm:items-start md:items-center lg:items-center">
                                    <Icon.Mail className="h-4 mr-2" />
                                    {userData?.data?.email}{" "}
                                </div>
                                <div className="truncate sm:whitespace-normal flex items-center mt-3">
                                    <Icon.Phone className="h-4 mr-2" />
                                    {userData?.data?.country_code} {userData?.data?.mobile_no}{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                    <div className="intro-y box col-span-12 lg:col-span-6">
                        <ul className="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center" role="tablist">
                            <li id="dashboard-tab" className="nav-item cursor-pointer" role="presentation">
                                <a
                                    onClick={() => {
                                        setActiveMenu(1);
                                    }}
                                    className={activeMenu === 1 ? "nav-link py-4 active" : "nav-link py-4"}>
                                    General
                                </a>
                            </li>
                            <li id="account-and-profile-tab" className="nav-item cursor-pointer" role="presentation">
                                <a
                                    onClick={() => {
                                        setActiveMenu(2);
                                    }}
                                    className={activeMenu === 2 ? "nav-link py-4 active" : "nav-link py-4"}>
                                    Change Password
                                </a>
                            </li>
                        </ul>
                        {activeMenu === 1 ? <EditProfile /> : <SetNewPassword />}
                    </div>
                    <div className="intro-y box col-span-12 lg:col-span-6">
                        <TwoFactorAuthentication />
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default Profile;
