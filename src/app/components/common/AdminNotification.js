import { useState, useEffect } from "react";
import * as Icon from "react-feather";

const AdminNotification = (props) => {
    return (
        <>
            <div className={"z-[999] w-full mt-[70px] mb-[-70px]"}>
                <div
                    style={{
                        backgroundColor: props?.bgColor,
                        border: `1px solid ${props?.borderColor}`,
                        margin: "5px",
                        borderRadius: "5px",
                        color: props?.borderColor,
                        borderLeftWidth: "7px",
                    }}
                    className={`p-3 text-white flex items-center justify-between shadow-white mt-2`}>
                    <div className="flex items-center">
                        {props?.icon}
                        {/* <span>{props?.message}</span> */}
                        <marquee behavior="scroll" direction="left">
                            {props?.message}
                        </marquee>
                    </div>
                    <div>
                        <Icon.X
                            size={20}
                            color={props?.borderColor}
                            className="text-white cursor-pointer ml-5"
                            onClick={props?.onClickCloseMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminNotification;
