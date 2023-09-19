import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { v4 as UUID } from "uuid";
import { messages } from "../../messages/merchantRegister";
import Input from "../../components/common/forms/Input";
import { directorDetails } from "../../utils/validationSchema";
import Dropzone from "../../components/common/forms/Dropzone";
import MiniLoader from "../../components/common/MiniLoader";
import { checkIsValidPhoneNo } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { countryCodesApplication } from "../../utils/countryCode";
import Select from "react-select";
import { DELETE_DIRECTOR_MULTIPLE_IMAGE, getStepDataStart } from "../../redux/actions/ApplicationAction";
import { decode } from "html-entities";
import { deleteMultipleImage } from "../../redux/services/MerchantApplicationRates";
import MultipleDropzone from "../../components/common/forms/MultipleDropzone";

const Step2 = ({ onNextClick, changeStepNumber, stepValues, onPreviousClick, disable, editClick, index, entityType }) => {
    function generateArray(length, stepValues) {
        return new Array(length).fill("0").map((_, index) => ({ id: stepValues?.[index]?.director_additional_document?.id || UUID() }));
    }
    const dispatch = useDispatch();

    const { applicationStepValues } = useSelector((state) => state.application);

    const [isEditOn, setIsEditOn] = React.useState(false);
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const [documentArray, setDocumentArray] = React.useState(
        generateArray(stepValues?.director_additional_document?.length || 1, stepValues),
    );

    const initialValues = {
        director_name: "",
        director_address: "",
        director_phone_num: "",
        director_passport: "",
        director_aadhar_card_front_image: "",
        director_aadhar_card_back_image: "",
        director_pan_card: "",
        director_bank_statement: "",
        director_latest_utility_bill: "",
        director_email: "",
        // director_articles_of_incorporation: "",
        // director_ubo_bank_statement: "",
        // director_processing_history: "",
        // director_memorandum_of_association: "",
        // director_additional_document: "",
        director_country: "",
        ...stepValues,
    };

    const toggleEditing = React.useCallback(() => {
        setIsEditOn((oldV) => !oldV);
    }, []);

    const disabled = stepValues ? !isEditOn : false;

    const onSubmit = (values, formikBag) => {
        setIsSubmiting(true);
        const callback = () => {
            setIsSubmiting(false);
            if (stepValues) {
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

    useEffect(() => {
        dispatch(getStepDataStart({ step: 2 }, () => {}));
    }, []);

    const onRemoveMultipleImage = async (id, values) => {
        const payload = {
            id,
            file_type: "additional_document",
            source_type: "director",
        };

        const data = await deleteMultipleImage(payload);

        if (data?.responseCode === 200) {
            dispatch({ type: DELETE_DIRECTOR_MULTIPLE_IMAGE, data: values?.filter((i) => i?.id !== id), step: index });
        }
    };

    const typeLabel =
        entityType === "2"
            ? "Directors"
            : entityType === "3" || entityType === "4"
            ? "Partner"
            : entityType === "6"
            ? "Trust"
            : "Directors";

    return (
        <Formik initialValues={initialValues} validationSchema={directorDetails} onSubmit={onSubmit} enableReinitialize>
            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                <Form className="mt-10 mb-7 px-[40px]">
                    {/* <div className="font-medium text-base">{messages.formStepTitles.step2}</div> */}

                    <div className="grid grid-cols-12 gap-6 gap-y-5 mt-5">
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={`${typeLabel} ${messages.placeholders.director_name}`}
                                name="director_name"
                                disabled={disabled}
                                label={`${typeLabel} ${messages.placeholders.director_name}`}
                                isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={`${typeLabel} ${messages.placeholders.director_address}`}
                                name="director_address"
                                disabled={disabled}
                                label={`${typeLabel} ${messages.placeholders.director_address}`}
                                isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={`${typeLabel} ${messages.placeholders.director_phone_num}`}
                                name="director_phone_num"
                                maxLength="12"
                                disabled={disabled}
                                label={`${typeLabel} ${messages.placeholders.director_phone_num}`}
                                isRequiredField={true}
                                onChange={(e) =>
                                    checkIsValidPhoneNo(e?.target?.value, (value) => setFieldValue("director_phone_num", value))
                                }
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={`${typeLabel} ${messages.placeholders.director_email}`}
                                name="director_email"
                                disabled={disabled}
                                label={`${typeLabel} ${messages.placeholders.director_email}`}
                                isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <label className="form-label">{`${typeLabel} ${messages.placeholders.director_country}`}</label>
                            <div className={disabled ? "bg-slate-100" : ""}>
                                <Select
                                    isClearable
                                    placeholder={`${typeLabel} ${messages.placeholders.director_country}`}
                                    isDisabled={disabled}
                                    value={countryCodesApplication?.find((item) => item?.code === values?.director_country)}
                                    styles={colourStyles}
                                    style={{ boxShadow: "none" }}
                                    options={countryCodesApplication}
                                    onChange={(e) => {
                                        setFieldValue("director_country", e?.code);
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
                                name="director_passport"
                                placeholder={messages.placeholders.director_passport}
                                error={errors.director_passport}
                                touched={touched.director_passport}
                                values={values.director_passport}
                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                disabled={disabled}
                                label={messages.placeholders.director_passport}
                                // isRequiredField={true}
                            />
                        </div>

                        <div className="intro-y col-span-12 lg:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="director_bank_statement"
                                placeholder={messages.placeholders.director_bank_statement}
                                error={errors.director_bank_statement}
                                touched={touched.director_bank_statement}
                                values={values.director_bank_statement}
                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                disabled={disabled}
                                label={messages.placeholders.director_bank_statement}
                                // isRequiredField={true}
                            />
                        </div>
                        <div className="intro-y col-span-12 lg:col-span-6">
                            <Dropzone
                                setFieldValue={setFieldValue}
                                name="director_latest_utility_bill"
                                placeholder={messages.placeholders.director_latest_utility_bill}
                                error={errors.director_latest_utility_bill}
                                touched={touched.director_latest_utility_bill}
                                values={values.director_latest_utility_bill}
                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                disabled={disabled}
                                label={messages.placeholders.director_latest_utility_bill}
                                // isRequiredField={true}
                            />
                        </div>

                        {/* {values?.director_country === "IN" ? ( */}
                        <>
                            <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="director_aadhar_card_front_image"
                                        placeholder={messages.placeholders.director_aadhar_card_front_image}
                                        error={errors.director_aadhar_card_front_image}
                                        touched={touched.director_aadhar_card_front_image}
                                        values={values.director_aadhar_card_front_image}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.director_aadhar_card_front_image}
                                        isRequiredField={true}
                                        allValue={values}
                                    />
                                </div>
                                <div className="intro-y w-[100%] md:w-[49%]">
                                    <Dropzone
                                        setFieldValue={setFieldValue}
                                        name="director_aadhar_card_back_image"
                                        placeholder={messages.placeholders.director_aadhar_card_back_image}
                                        error={errors.director_aadhar_card_back_image}
                                        touched={touched.director_aadhar_card_back_image}
                                        values={values.director_aadhar_card_back_image}
                                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        disabled={disabled}
                                        label={messages.placeholders.director_aadhar_card_back_image}
                                        isRequiredField={true}
                                        allValue={values}
                                    />
                                </div>
                            </div>

                            <div className="intro-y col-span-12 lg:col-span-6">
                                <Dropzone
                                    setFieldValue={setFieldValue}
                                    name="director_pan_card"
                                    placeholder={messages.placeholders.director_pan_card}
                                    error={errors.director_pan_card}
                                    touched={touched.director_pan_card}
                                    values={values.director_pan_card}
                                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                                    disabled={disabled}
                                    label={messages.placeholders.director_pan_card}
                                    isRequiredField={true}
                                />
                            </div>
                        </>
                        {/* ) : ( */}
                        <>
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                <Dropzone
                                    setFieldValue={setFieldValue}
                                    name="director_articles_of_incorporation"
                                    placeholder={messages.placeholders.director_articles_of_incorporation}
                                    error={errors.director_articles_of_incorporation}
                                    touched={touched.director_articles_of_incorporation}
                                    values={values.director_articles_of_incorporation}
                                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                                    disabled={disabled}
                                    label={messages.placeholders.director_articles_of_incorporation}
                                    isRequiredField={true}
                                />
                            </div> */}
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                <Dropzone
                                    setFieldValue={setFieldValue}
                                    name="director_ubo_bank_statement"
                                    placeholder={messages.placeholders.director_ubo_bank_statement}
                                    error={errors.director_ubo_bank_statement}
                                    touched={touched.director_ubo_bank_statement}
                                    values={values.director_ubo_bank_statement}
                                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                                    disabled={disabled}
                                    label={messages.placeholders.director_ubo_bank_statement}
                                    // isRequiredField={true}
                                />
                            </div> */}
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                <Dropzone
                                    setFieldValue={setFieldValue}
                                    name="director_processing_history"
                                    placeholder={messages.placeholders.director_processing_history}
                                    error={errors.director_processing_history}
                                    touched={touched.director_processing_history}
                                    values={values.director_processing_history}
                                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                                    disabled={disabled}
                                    label={messages.placeholders.director_processing_history}
                                    // isRequiredField={true}
                                />
                            </div> */}
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                <Dropzone
                                    setFieldValue={setFieldValue}
                                    name="director_memorandum_of_association"
                                    placeholder={messages.placeholders.director_memorandum_of_association}
                                    error={errors.director_memorandum_of_association}
                                    touched={touched.director_memorandum_of_association}
                                    values={values.director_memorandum_of_association}
                                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                                    disabled={disabled}
                                    label={messages.placeholders.director_memorandum_of_association}
                                    // isRequiredField={true}
                                />
                            </div> */}
                            {/* <div className="intro-y col-span-12 lg:col-span-6">
                                <MultipleDropzone
                                    onRemoveMultipleImage={onRemoveMultipleImage}
                                    maxFiles={10}
                                    setFieldValue={setFieldValue}
                                    name="director_additional_document"
                                    placeholder={messages.placeholders.director_additional_document}
                                    error={errors.director_additional_document}
                                    touched={touched.director_additional_document}
                                    values={values.director_additional_document}
                                    accept="image/png,image/jpg,image/jpeg,application/pdf"
                                    disabled={disabled}
                                    label={messages.placeholders.director_additional_document}
                                    // isRequiredField={true}
                                />
                            </div> */}
                        </>
                        {/* )} */}
                        {!disable && (
                            <div className="intro-y col-span-12 flex items-center justify-end mt-5">
                                {/* <button className="btn btn-secondary w-24" type="button" onClick={onPreviousClick}>
                                Previous
                            </button> */}
                                <button
                                    className="btn bg-blue-900 w-24 ml-2 text-slate-100"
                                    type="button"
                                    disabled={isSubmiting}
                                    onClick={
                                        disabled
                                            ? toggleEditing
                                            : () => {
                                                  handleSubmit();
                                              }
                                    }>
                                    {stepValues && !isEditOn ? "Edit" : "Submit"}
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

export default React.memo(Step2);
