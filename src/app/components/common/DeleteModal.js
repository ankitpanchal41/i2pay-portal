import React, {useEffect} from "react";
import { ClipLoader } from "react-spinners";

function DeleteModal({ visible, onClose, onDelete, isLoading }) {

    useEffect(() => {
        if(visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [visible]);

    return (
        <>
            {visible ? (
                <div
                    onClick={onClose}
                    id="delete-modal-preview"
                    className="modal overflow-y-auto show mt-0 ml-0 pl-0 z-[999999999]"
                    tabIndex="-1"
                    aria-hidden="false">
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body p-0">
                                <div className="p-5 text-center">
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
                                        className="feather feather-x-circle w-16 h-16 text-danger mx-auto mt-3">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    <div className="text-3xl mt-5">Are you sure?</div>
                                    <div className="text-slate-500 mt-2">
                                        Do you really want to delete these records?
                                        <br />
                                        This process cannot be undone.
                                    </div>
                                </div>
                                <div className="px-5 pb-8 text-center">
                                    <button data-tw-dismiss="modal" onClick={onClose} className="btn btn-outline-secondary w-24 mr-1">
                                        Close
                                    </button>
                                    <button disabled={isLoading === true} className="btn btn-danger w-24" onClick={onDelete}>
                                        Delete
                                        <ClipLoader
                                            loading={isLoading === true}
                                            color="#1e3a8a"
                                            size={15}
                                            css="border-width: 2px;border-color: #fff !important;margin-left:10px;border-bottom-color: transparent !important;"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default React.memo(DeleteModal);
