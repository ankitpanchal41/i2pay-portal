import React from "react";
import { Formik, Form } from "formik";

import { messages } from "../../messages/merchantRegister";
import Input from "../../components/common/forms/Input";
import { shareHolderSchema } from "../../utils/validationSchema";
import Dropzone from "../../components/common/forms/Dropzone";
import MiniLoader from "../../components/common/MiniLoader";
import { checkIsValidPhoneNo } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { countryCodesApplication } from "../../utils/countryCode";
import Select from "react-select";
import { decode } from "html-entities";
import { deleteMultipleImage } from "../../redux/services/MerchantApplicationRates";
import { DELETE_SHARE_HOLDER_MULTIPLE_IMAGE } from "../../redux/actions/ApplicationAction";
import MultipleDropzone from "../../components/common/forms/MultipleDropzone";

const Step3 = ({ onNextClick, changeStepNumber, stepValues, onPreviousClick, disable, editClick, index }) => {
    const [isEditOn, setIsEditOn] = React.useState(false);
    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const dispatch = useDispatch();

    const { applicationStepValues } = useSelector((state) => state.application);

    const initialValues = {
        share_holder_name: "",
        share_holder_address: "",
        share_holder_email: "",
        share_holder_phone_num: "",
        share_holder_pan_card: "",
        share_holder_passport: "",
        share_holder_aadhar_card_front_image: "",
        share_holder_aadhar_card_back_image: "",
        share_holder_bank_statement: "",
        share_holder_latest_utility_bill: "",
        // share_holder_articles_of_incorporation: "",
        // share_holder_ubo_bank_statement: "",
        // share_holder_processing_history: "",
        // share_holder_memorandum_of_association: "",
        // share_holder_additional_document: "",
        share_holder_country: "",
        ...stepValues,
    };

    const toggleEditing = React.useCallback(() => {
        setIsEditOn((oldV) => !oldV);
    }, []);

    const disabled = stepValues?.director_id ? true : stepValues ? !isEditOn : false;

    // useEffect(() => {
    //     dispatch(getStepDataStart({ step: 3 }, () => {}));
    // }, []);

    // const disabledButtonClick = stepValues ? !isEditOn : false;

    const onSubmit = (values, formikBag) => {
        setIsSubmiting(true);
        const callback = () => {
            setIsSubmiting(false);

            if (stepValues && !stepValues?.director_id) {
                toggleEditing();
            }
        };

        onNextClick(values, formikBag, callback);
    };

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles, { isDisabled }) => ({
            ...styles,
            backgroundColor: isDisabled ? "rgb(var(--color-slate-100)/var(--tw-bg-opacity))" : "#FFFFFF",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,

                cursor: isDisabled ? "not-allowed" : "default",
                border: isFocused ? "0px" : "0px",

                ":active": {
                    ...styles[":active"],
                },
                ":hover": {
                    ...styles[":hover"],
                    backgroundColor: mode === "dark" ? "#0f1d36" : "#b1d7ff",
                },
            };
        },
        input: (styles, { isFocused }) => ({
            ...styles,
            ":active": {
                border: "none",
            },
            border: 0,
            // This line disable the blue border
        }),
        placeholder: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: "none",
            // This line disable the blue border
        }),

        singleValue: (styles, { data }) => ({ ...styles, color: mode === "dark" ? "#FFFFFF" : "#384252" }),
        menu: (styles, { data }) => ({ ...styles, backgroundColor: mode === "dark" ? "#1b253b" : "white" }),
    };

    // useEffect(() => {
    //     dispatch(getStepDataStart({ step: 3 }, () => {}));
    // }, [])

    const onRemoveMultipleImage = async (id, values) => {
        const payload = {
            id,
            file_type: "additional_document",
            source_type: "share_holder",
        };

        const data = await deleteMultipleImage(payload);

        if (data?.responseCode === 200) {
            dispatch({ type: DELETE_SHARE_HOLDER_MULTIPLE_IMAGE, data: values?.filter((i) => i?.id !== id), step: index });
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={shareHolderSchema} onSubmit={onSubmit} enableReinitialize>
            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                <Form className="mt-10 mb-7 px-[40px]">
                    {/* <div className="font-medium text-base">{messages.formStepTitles.step3}</div> */}
                    <div className="grid grid-cols-12 gap-6 gap-y-5 mt-5">
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.share_holder_name}
                                name="share_holder_name"
                                disabled={disabled}
                                label={messages.placeholders.share_holder_name}
                                isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.share_holder_address}
                                name="share_holder_address"
                                disabled={disabled}
                                label={messages.placeholders.share_holder_address}
                                isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.share_holder_phone_num}
                                name="share_holder_phone_num"
                                disabled={disabled}
                                maxLength="12"
                                label={messages.placeholders.share_holder_phone_num}
                                isRequiredField={true}
                                onChange={(e) =>
                                    checkIsValidPhoneNo(e?.target?.value, (value) => setFieldValue("share_holder_phone_num", value))
                                }
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.placeholders.share_holder_email}
                                name="share_holder_email"
                                disabled={disabled}
                                label={messages.placeholders.share_holder_email}
                                isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <label className="form-label">{messages.placeholders.share_holder_country}</label>
                            <div className={disabled ? "bg-slate-100" : ""}>
                                <Select
                                    isDisabled={disabled}
                                    isClearable
                                    value={countryCodesApplication?.find((item) => item?.code === values?.share_holder_country)}
                                    styles={colourStyles}
                                    style={{ boxShadow: "none" }}
                                    options={countryCodesApplication}
                                    onChange={(e) => {
                                        setFieldValue("share_holder_country", e?.code);
                                    }}
                                    className="intro-x login__input form-control:disabled block shadow-none"
                                    getOptionLabel={(e) => (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginLeft: 5 }}>
                                                <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                                            </span>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="intro-y col-span-12 lg:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="share_holder_passport"
                                placeholder={messages.placeholders.share_holder_passport}
                                error={errors.share_holder_passport}
                                touched={touched.share_holder_passport}
                                values={values.share_holder_passport}
                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                disabled={disabled}
                                label={messages.placeholders.share_holder_passport}
                                // isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 lg:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="share_holder_bank_statement"
                                placeholder={messages.placeholders.share_holder_bank_statement}
                                error={errors.share_holder_bank_statement}
                                touched={touched.share_holder_bank_statement}
                                values={values.share_holder_bank_statement}
                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                disabled={disabled}
                                label={messages.placeholders.share_holder_bank_statement}
                                // isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 lg:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="share_holder_latest_utility_bill"
                                placeholder={messages.placeholders.share_holder_latest_utility_bill}
                                error={errors.share_holder_latest_utility_bill}
                                touched={touched.share_holder_latest_utility_bill}
                                values={values.share_holder_latest_utility_bill}
                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                disabled={disabled}
                                label={messages.placeholders.share_holder_latest_utility_bill}
                                // isRequiredField={true}
                            />
                        </div>
                        {/* {values?.share_holder_country === "IN" ? ( */}
                        <>
                            <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="share_holder_aadhar_card_front_image"
                                        placeholder={messages.placeholders.share_holder_aadhar_card_front_image}
                                        error={errors.share_holder_aadhar_card_front_image}
                                        touched={touched.share_holder_aadhar_card_front_image}
                                        values={values.share_holder_aadhar_card_front_image}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.share_holder_aadhar_card_front_image}
                                        isRequiredField={true}
                                        allValue={values}
                                    />
                                </div>
                                <div className="intro-y w-[100%] md:w-[49%]">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="share_holder_aadhar_card_back_image"
                                        placeholder={messages.placeholders.share_holder_aadhar_card_back_image}
                                        error={errors.share_holder_aadhar_card_back_image}
                                        touched={touched.share_holder_aadhar_card_back_image}
                                        values={values.share_holder_aadhar_card_back_image}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.share_holder_aadhar_card_back_image}
                                        isRequiredField={true}
                                        allValue={values}
                                    />
                                </div>
                            </div>
                            <div className="intro-y col-span-12 lg:col-span-6">
                                <Dropzone
                                    setFieldValue={setFieldValue}
                                    name="share_holder_pan_card"
                                    placeholder={messages.placeholders.share_holder_pan_card}
                                    error={errors.share_holder_pan_card}
                                    touched={touched.share_holder_pan_card}
                                    values={values.share_holder_pan_card}
                                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                                    disabled={disabled}
                                    label={messages.placeholders.share_holder_pan_card}
                                    isRequiredField={true}
                                />
                            </div>
                        </>
                        {/* ) : ( */}
                        <>
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="share_holder_articles_of_incorporation"
                                        placeholder={messages.placeholders.share_holder_articles_of_incorporation}
                                        error={errors.share_holder_articles_of_incorporation}
                                        touched={touched.share_holder_articles_of_incorporation}
                                        values={values.share_holder_articles_of_incorporation}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.share_holder_articles_of_incorporation}
                                        isRequiredField={true}
                                    />
                                </div> */}

                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="share_holder_ubo_bank_statement"
                                        placeholder={messages.placeholders.share_holder_ubo_bank_statement}
                                        error={errors.share_holder_ubo_bank_statement}
                                        touched={touched.share_holder_ubo_bank_statement}
                                        values={values.share_holder_ubo_bank_statement}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.share_holder_ubo_bank_statement}
                                        // isRequiredField={true}
                                    />
                                </div> */}
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="share_holder_processing_history"
                                        placeholder={messages.placeholders.share_holder_processing_history}
                                        error={errors.share_holder_processing_history}
                                        touched={touched.share_holder_processing_history}
                                        values={values.share_holder_processing_history}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.share_holder_processing_history}
                                        // isRequiredField={true}
                                    />
                                </div> */}
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="share_holder_memorandum_of_association"
                                        placeholder={messages.placeholders.share_holder_memorandum_of_association}
                                        error={errors.share_holder_memorandum_of_association}
                                        touched={touched.share_holder_memorandum_of_association}
                                        values={values.share_holder_memorandum_of_association}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.share_holder_memorandum_of_association}
                                        // isRequiredField={true}
                                    />
                                </div> */}
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                    <MultipleDropzone
                                        onRemoveMultipleImage={onRemoveMultipleImage}
                                        maxFiles={10}
                                        enableRemove={true}
                                        enableAdd={true}
                                        onRemove={() => {}}
                                        onAdd={() => {}}
                                        setFieldValue={setFieldValue}
                                        name="share_holder_additional_document"
                                        placeholder={messages.placeholders.share_holder_additional_document}
                                        error={errors.share_holder_additional_document}
                                        touched={touched.share_holder_additional_document}
                                        values={values.share_holder_additional_document}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.share_holder_additional_document}
                                        // isRequiredField={true}
                                    />
                                </div> */}
                        </>
                        {/* )} */}

                        {stepValues?.id && stepValues?.director_id && !stepValues?.isNew
                            ? null
                            : !disable && (
                                  <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                      <button
                                          className="btn bg-blue-900 w-24 ml-2 text-slate-100"
                                          type="button"
                                          disabled={isSubmiting}
                                          onClick={
                                              stepValues?.director_id
                                                  ? () => {
                                                        handleSubmit();
                                                    }
                                                  : disabled
                                                  ? toggleEditing
                                                  : () => {
                                                        handleSubmit();
                                                    }
                                          }>
                                          {stepValues?.director_id ? "Submit" : stepValues && !isEditOn ? "Edit" : "Submit"}
                                          <MiniLoader isLoading={isSubmiting} />
                                      </button>
                                  </div>
                              )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default React.memo(Step3);
