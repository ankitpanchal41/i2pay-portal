import React, {useEffect} from "react";
import * as Icon from "react-feather";

function CampaignTemplatePreviewModal(props) {
    const {
        children,
        visible,
        onClose,
        modalMinWidth,
        removeHeader = true
    } = props;

    useEffect(() => {
        if(visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [visible])

    if (visible) {
        return (
            <div
                className="modal  overflow-y-scroll show mt-0 ml-0 pl-0 z-[999999999] justify-center items-center flex  fixed inset-0 outline-none focus:outline-none modal-dialog"
                onClick={onClose}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={
                        modalMinWidth
                            ? `relative w-auto my-6 mx-auto w-xl min-w-[50%] max-w-[90%]`
                            : `relative w-auto my-6 mx-auto w-xl max-w-[90%]`
                    }>
                    {(
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none focus:outline-none max-h-[90vh]">

                            {/* BEGIN: Modal Body */}
                            <div className={removeHeader ? "relative p-6 flex-auto" : "relative  flex-auto"}>
                                {!removeHeader && (
                                    <button
                                        type="button"
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500 absolute z-[9999] right-2 top-2"
                                        onClick={onClose}>
                                        <Icon.X size={25} className="text-dark"/>
                                    </button>
                                )}
                                <div className="overflow-y-auto">{children}</div>
                            </div>
                            {/* END: Modal Body */}

                            {/* END: Modal Footer */}
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return false;
    }
}

export default CampaignTemplatePreviewModal;
