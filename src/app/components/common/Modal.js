import React, { useEffect } from "react";
import * as Icon from "react-feather";
import { ClipLoader } from "react-spinners";
import { Formik, Form } from "formik";

function Modal(props) {
    const {
        children,
        heading,
        visible,
        onClose,
        onClickSave,
        onClickCancel,
        saveButtonText,
        cancelButtonText,
        buttonLoading,
        modalMinWidth,
        fullWidth,
        cancelButtonLink,
        useFormik,
        initialValues,
        validationState,
        removeHeader = true,
        removeFooter = true,
        func = false,
    } = props;

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
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={
                        fullWidth
                            ? `relative my-6 mx-auto w-auto modal-container-width`
                            : modalMinWidth
                            ? `relative w-auto my-6 mx-auto max-w-3xl min-w-[50%]`
                            : `relative w-auto my-6 mx-auto max-w-3xl`
                    }>
                    {useFormik ? (
                        <Formik initialValues={initialValues} validationSchema={validationState} onSubmit={onClickSave}>
                            {({ handleSubmit, values, errors, setFieldValue }) => (
                                <Form className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none focus:outline-none max-h-[100vh]">
                                    {/* BEGIN: Modal Header */}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-xl font-semibold">{heading}</h3>
                                        <button
                                            type="button"
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500"
                                            onClick={onClose}>
                                            <Icon.X size={25} />
                                        </button>
                                    </div>
                                    {/* End: Modal Header */}

                                    {/* BEGIN: Modal Body */}
                                    <div className="relative p-6 flex-auto overflow-hidden overflow-y-auto">
                                        {func ? children(setFieldValue, values, errors) : children}
                                    </div>
                                    {/* END: Modal Body */}

                                    {/* BEGIN: Modal Footer */}
                                    <div className="flex flex-col-reverse md:flex-row items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        {cancelButtonLink ? (
                                            <a className="text-primary truncate cursor-pointer mt-3 md:mt-0" onClick={onClickCancel}>
                                                {cancelButtonText ? cancelButtonText : "Cancel"}
                                            </a>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-light mt-3 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top md:mt-0"
                                                onClick={onClickCancel}>
                                                {cancelButtonText ? cancelButtonText : "Cancel"}
                                            </button>
                                        )}
                                        <button
                                            disabled={buttonLoading === true}
                                            type="buttons"
                                            className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                                            onClick={handleSubmit}>
                                            {saveButtonText ? saveButtonText : "Submit"}
                                            <ClipLoader
                                                loading={buttonLoading === true}
                                                color="#1e3a8a"
                                                size={15}
                                                css="border-width: 2px;border-color: #fff !important;margin-left:10px;border-bottom-color: transparent !important;"
                                            />
                                        </button>
                                    </div>
                                    {/* END: Modal Footer */}
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none focus:outline-none max-h-[100vh]">
                            {/* BEGIN: Modal Header */}
                            {removeHeader && (
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl font-semibold">{heading}</h3>
                                    <button
                                        type="button"
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500"
                                        onClick={onClose}>
                                        <Icon.X size={25} />
                                    </button>
                                </div>
                            )}
                            {/* End: Modal Header */}

                            {/* BEGIN: Modal Body */}
                            <div
                                className={removeHeader ? "relative p-6 flex-auto overflow-hidden overflow-y-auto" : "relative  flex-auto"}>
                                {!removeHeader && (
                                    <button
                                        type="button"
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500 absolute z-[9999] right-2 top-2"
                                        onClick={onClose}>
                                        <Icon.X size={25} />
                                    </button>
                                )}
                                {children}
                            </div>
                            {/* END: Modal Body */}

                            {/* BEGIN: Modal Footer */}
                            {removeFooter && (
                                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    {cancelButtonLink ? (
                                        <a className="text-primary truncate cursor-pointer" onClick={onClickCancel}>
                                            {cancelButtonText ? cancelButtonText : "Cancel"}
                                        </a>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-light py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                                            onClick={onClickCancel}>
                                            {cancelButtonText ? cancelButtonText : "Cancel"}
                                        </button>
                                    )}
                                    <button
                                        type="buttons"
                                        disabled={buttonLoading === true}
                                        className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                                        onClick={onClickSave}>
                                        {saveButtonText ? saveButtonText : "Submit"}
                                        <ClipLoader
                                            loading={buttonLoading === true}
                                            color="#1e3a8a"
                                            size={15}
                                            css="border-width: 2px;border-color: #fff !important;margin-left:10px;border-bottom-color: transparent !important;"
                                        />
                                    </button>
                                </div>
                            )}

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

export default Modal;
