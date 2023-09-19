import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Icon from "react-feather";
import moment from "moment";
import { Menu } from "@headlessui/react";

const NotificationDropdown = ({ visible, setVisible, data, onReadNotification, isVisibleBadge }) => {
    const navigate = useNavigate();

    const onPressViewAll = () => {
        // const callBack = () => {};
        // dispatch({ type: DELETE_NOTIFICATION_REQUEST, payload: {}, callBack });
        navigate("/notifications");
    };

    return (
        <>
            <Menu as="div" className="relative">
                {({ open }) => (
                    <>
                        <Menu.Button
                            type="buttons"
                            className={
                                isVisibleBadge
                                    ? "notification--bullet dropdown-toggle notification cursor-pointer"
                                    : "dropdown-toggle notification cursor-pointer"
                            }>
                            <Icon.Bell className="notification__icon dark:text-slate-500 mt-2" />{" "}
                        </Menu.Button>

                        {open && (
                            <Menu.Items
                                static
                                className="absolute right-0 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-darkmode-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="p-2">
                                    <div className="notification-content__box dropdown-content" style={{ padding: 0 }}>
                                        <div className="notification-content__title py-3 px-5">Notifications</div>
                                        {data?.length === 0 && (
                                            <div className="text-slate-500 text-lg mt-0.5 mb-5 whitespace-nowrap text-center">
                                                Not Found New Notifications
                                            </div>
                                        )}
                                        {data?.map((notification) => {
                                            return (
                                                <Menu.Item key={notification?.id}>
                                                    <div
                                                        onClick={() => {
                                                            onReadNotification(notification);
                                                        }}
                                                        className={
                                                            notification?.is_read === 0
                                                                ? "cursor-pointer relative flex items-center pt-3 pb-3 border-t border-slate-200/60 pr-5"
                                                                : "cursor-pointer relative flex items-center pt-3 pb-3 border-t border-slate-200/60 dark:border-darkmode-400  dark:bg-darkmode-500 pr-5"
                                                        }>
                                                        {notification?.is_read === 0 ? (
                                                            <div className="border-l-2 border-success dark:border-success h-[42px] pl-5"></div>
                                                        ) : (
                                                            <div className="border-l-2 h-[42px] pl-5"></div>
                                                        )}

                                                        <div className=" flex-none image-fit mr-1 flex items-center justify-center">
                                                            <Icon.Bell className="notification__icon dark:text-slate-500" />{" "}
                                                        </div>
                                                        <div className="ml-2 overflow-hidden w-full">
                                                            <div className="flex items-center">
                                                                <a className="font-medium truncate mr-5">
                                                                    {notification?.notification_title}
                                                                </a>
                                                                <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                                                                    {moment(notification?.notification_time).format("hh:mm A")}
                                                                </div>
                                                            </div>
                                                            <div className="w-full truncate text-slate-500 mt-0.5">
                                                                {notification?.notification_msg}
                                                            </div>
                                                            {notification?.reson && (
                                                                <div className="w-full truncate text-slate-400 mt-0.5">
                                                                    Reason: {notification?.reson}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Menu.Item>
                                            );
                                        })}
                                        <Menu.Item
                                            onClick={onPressViewAll}
                                            className="flex items-center justify-center h-6 pt-4 mt-0 border-t border-slate-200/60 dark:border-darkmode-400 cursor-pointer px-5 pb-5">
                                            <div>{"View All >"}</div>
                                        </Menu.Item>
                                    </div>
                                </div>
                            </Menu.Items>
                        )}
                    </>
                )}
            </Menu>
        </>
    );
};

export default NotificationDropdown;
