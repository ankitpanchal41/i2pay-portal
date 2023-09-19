import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Modal = React.lazy(() => import("../../../components/common/Modal"));
const Input = React.lazy(() => import("../../../components/common/forms/Input"));

const SubmitInvoiceModal = ({ data, showModal, onCloseModal, onClickSave, editInitialValues, isLoading }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        // isPriceEditable: false,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Please enter invoice name"),
    });

    const handleSubmit = (values) => {
        onClickSave(values);
        // dispatch(addInvoiceStart({ ...values, ...data, date: new Date() }, () => navigate("/invoice")));
    };

    return (
        <Modal
            heading={"Add Invoice"}
            visible={showModal}
            onClose={onCloseModal}
            onClickSave={handleSubmit}
            onClickCancel={onCloseModal}
            modalMinWidth={"50%"}
            useFormik
            initialValues={editInitialValues || initialValues}
            validationState={validationSchema}
            buttonLoading={isLoading}>
            <Input
                type="text"
                className="intro-x login__input form-control py-2 px-3 block"
                placeholder={"Invoice Name"}
                name={"name"}
                label={"Invoice Name"}
                isRequiredField
            />
            {/* <div className="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm">
                <Input
                    type="checkbox"
                    id="remember-me"
                    className="form-check-input border mr-2"
                    name="isPriceEditable"
                    errorEnabled={false}
                    defaultChecked={editInitialValues?.isPriceEditable}
                    // checked={editInitialValues?.isPriceEditable}
                />
                <label className="cursor-pointer select-none" htmlFor="remember-me">
                    Payment Price Editable
                </label>
            </div> */}
        </Modal>
    );
};

export default SubmitInvoiceModal;
