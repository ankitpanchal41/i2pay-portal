import React, { useEffect } from "react";

function QRModal(props) {
    const { visible, onClose, children } = props;

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [visible]);

    if (visible) {
        return (
            <div
                className="modal show mt-0 ml-0 pl-0 z-[999999999] justify-center items-center flex  fixed inset-0 outline-none focus:outline-none modal-dialog"
                onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className={"relative w-auto my-6 mx-auto max-w-3xl"}>
                    {children}
                </div>
            </div>
        );
    } else {
        return false;
    }
}

export default QRModal;
