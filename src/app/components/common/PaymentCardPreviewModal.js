import React, { useEffect } from "react";
import * as Icon from "react-feather";

function TransparentModal(props) {
    const { children, visible, onClose } = props;

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [visible]);

    if (visible) {
        return (
            <>
                <div class="modal opacity-0 fixed show mt-0 ml-0 pl-0 z-[999999999] flex">
                    <div class="modal-overlay w-full h-full opacity-95"></div>

                    <div class="modal-container fixed w-full h-full z-50 overflow-y-auto " >
                        <div
                            className={
                                props?.closeDark
                                    ? "modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-gray text-sm z-[999]"
                                    : "modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-[999]"
                            }
                            onClick={() => {
                                onClose();
                            }}>
                            <Icon.X />
                            Close
                        </div>

                        <div class="modal-content mx-auto bg-transparent h-full">{children}</div>
                    </div>
                </div>
            </>
        );
    } else {
        return false;
    }
}

export default TransparentModal;
