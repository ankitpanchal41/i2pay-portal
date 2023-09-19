import React, { useEffect } from "react";
import * as Icon from "react-feather";
import { ClipLoader } from "react-spinners";
import { Formik, Form } from "formik";

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
            <div
                className="modal  show mt-0 ml-0 pl-0 z-[999999999] justify-center items-center flex  fixed inset-0 outline-none focus:outline-none modal-dialog"
                onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className={`relative my-6 mx-auto w-auto`}>
                    <div className="border-0 rounded-lg relative flex flex-col w-full  outline-none focus:outline-none max-h-[100vh]">
                        {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <button
                                type="button"
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500"
                                onClick={onClose}>
                                <Icon.X size={25} />
                            </button>
                        </div> */}
                        {/* BEGIN: Modal Body */}
                        <div className="relative p-6 flex-auto overflow-hidden overflow-y-auto">{children}</div>
                        {/* END: Modal Body */}
                    </div>
                </div>
            </div>
        );
    } else {
        return false;
    }
}

export default TransparentModal;
