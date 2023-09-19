import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
// import Dropzone from "react-dropzone";
import Input from "../../components/common/forms/Input";
import Dropzone from "../../components/common/forms/Dropzone";
import MiniLoader from "../../components/common/MiniLoader";
import { messages } from "../../messages/merchantRegister";
import { companyDetails } from "../../utils/validationSchema";
import Select from "react-select";
import AppSelect from "../../components/common/forms/Select";
import { useDispatch, useSelector } from "react-redux";
import { countryCodesApplication } from "../../utils/countryCode";
import { getCategories } from "../../redux/actions/ApplicationAction";
import { decode } from "html-entities";
import { TypeOfEntities } from "../../utils/staticDropdown";

const Step1 = ({ onNextClick, changeStepNumber, stepValues, disable }) => {
    const dispatch = useDispatch();
    const [categoryList, setCategoryList] = useState([]);

    const state = useSelector((state) => state);

    const initialValues = {
        company_name: "",
        company_registration_num: "",
        company_year_of_register: "",
        company_gst_num: "",
        company_address: "",
        business_activity: "",
        website: "",
        country_registration: "",
        categories: "[]",
        merchant_name: state?.persist?.userData?.data?.name,
        email: state?.persist?.userData?.data?.email,
        mobile_number: `${state?.persist?.userData?.data?.country_code}-${state?.persist?.userData?.data?.mobile_no}`,
        entities_type: "",
        aadhar_card_front_image: "",
        aadhar_card_back_image: "",
        cancel_cheque: "",
        pan_card: "",
        passport: "",
        voter_id: "",
        driving_license: "",
        certificate_of_incorporation: "",
        business_address_proof: "",
        personalised_cancel_cheque_of_account: "",
        memorandum_article_of_association_of_company: "",
        board_resolution_company_stamp: "",
        beneficial_owners_declaration: "",
        gst_doc: "",
        registration_certificate: "",
        resolution_letter: "",
        llp_dead: "",
        moa: "",
        aoa: "",
        shops_and_establishment_document: "",
        fssai_fda_license: "",
        udyam_certificate: "",
        trust_deed: "",
        itr: "",
        udyam_num: "",
        ...stepValues,
    };

    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const stopIsSubmiting = React.useCallback(() => {
        setIsSubmiting(false);
    }, []);

    const onSubmit = (values, formikBag) => {
        setIsSubmiting(true);

        const payload = {
            merchant_name: values?.merchant_name,
            entities_type: values?.entities_type,
        };

        if (values?.entities_type === "1") {
            payload["aadhar_card_front_image"] = values?.aadhar_card_front_image;
            payload["aadhar_card_back_image"] = values?.aadhar_card_back_image;
            payload["cancel_cheque"] = values?.cancel_cheque;
            payload["pan_card"] = values?.pan_card;
            payload["passport"] = values?.passport;
            payload["voter_id"] = values?.voter_id;
            payload["driving_license"] = values?.driving_license;
        } else if (values?.entities_type === "2") {
            payload["company_name"] = values?.company_name;
            payload["company_year_of_register"] = values?.company_year_of_register;
            payload["country_registration"] = values?.country_registration;
            payload["company_registration_num"] = values?.company_registration_num;
            payload["company_gst_num"] = values?.company_gst_num;
            payload["company_address"] = values?.company_address;
            payload["business_activity"] = values?.business_activity;
            payload["website"] = values?.website;
            payload["categories"] = values?.categories;
            payload["pan_card"] = values?.pan_card;
            payload["certificate_of_incorporation"] = values?.certificate_of_incorporation;
            payload["business_address_proof"] = values?.business_address_proof;
            payload["personalised_cancel_cheque_of_account"] = values?.personalised_cancel_cheque_of_account;
            payload["moa"] = values?.moa;
            payload["aoa"] = values?.aoa;
            payload["board_resolution_company_stamp"] = values?.board_resolution_company_stamp;
            payload["beneficial_owners_declaration"] = values?.beneficial_owners_declaration;
            payload["gst_doc"] = values?.gst_doc;
            payload["udyam_certificate"] = values?.udyam_certificate;
            payload["udyam_num"] = values?.udyam_num;
        } else if (values?.entities_type === "3") {
            payload["company_name"] = values?.company_name;
            payload["company_year_of_register"] = values?.company_year_of_register;
            payload["country_registration"] = values?.country_registration;
            payload["company_registration_num"] = values?.company_registration_num;
            payload["company_gst_num"] = values?.company_gst_num;
            payload["company_address"] = values?.company_address;
            // payload["business_activity"] = values?.business_activity;
            payload["registration_certificate"] = values?.registration_certificate;
            payload["website"] = values?.website;
            payload["categories"] = values?.categories;
            payload["pan_card"] = values?.pan_card;
            payload["business_address_proof"] = values?.business_address_proof;
            payload["resolution_letter"] = values?.resolution_letter;
            payload["personalised_cancel_cheque_of_account"] = values?.personalised_cancel_cheque_of_account;
            payload["udyam_certificate"] = values?.udyam_certificate;
            payload["udyam_num"] = values?.udyam_num;
        } else if (values?.entities_type === "4") {
            payload["company_name"] = values?.company_name;
            payload["company_year_of_register"] = values?.company_year_of_register;
            payload["country_registration"] = values?.country_registration;
            payload["company_registration_num"] = values?.company_registration_num;
            payload["company_gst_num"] = values?.company_gst_num;
            payload["company_address"] = values?.company_address;
            // payload["business_activity"] = values?.business_activity;
            payload["website"] = values?.website;
            payload["categories"] = values?.categories;
            payload["pan_card"] = values?.pan_card;
            payload["certificate_of_incorporation"] = values?.certificate_of_incorporation;
            payload["llp_dead"] = values?.llp_dead;
            payload["moa"] = values?.moa;
            payload["aoa"] = values?.aoa;
            payload["gst_doc"] = values?.gst_doc;
            payload["personalised_cancel_cheque_of_account"] = values?.personalised_cancel_cheque_of_account;
            payload["business_address_proof"] = values?.business_address_proof;
            payload["resolution_letter"] = values?.resolution_letter;
        } else if (values?.entities_type === "5") {
            payload["shops_and_establishment_document"] = values?.shops_and_establishment_document;
            payload["fssai_fda_license"] = values?.fssai_fda_license;
            payload["udyam_certificate"] = values?.udyam_certificate;
            payload["udyam_num"] = values?.udyam_num;
            payload["gst_doc"] = values?.gst_doc;
            payload["personalised_cancel_cheque_of_account"] = values?.personalised_cancel_cheque_of_account;
            payload["aadhar_card_front_image"] = values?.aadhar_card_front_image;
            payload["aadhar_card_back_image"] = values?.aadhar_card_back_image;
            payload["pan_card"] = values?.pan_card;
            payload["passport"] = values?.passport;
            payload["voter_id"] = values?.voter_id;
            payload["driving_license"] = values?.driving_license;
            payload["company_gst_num"] = values?.company_gst_num;
        } else if (values?.entities_type === "6") {
            payload["company_name"] = values?.company_name;
            payload["company_year_of_register"] = values?.company_year_of_register;
            payload["country_registration"] = values?.country_registration;
            payload["company_registration_num"] = values?.company_registration_num;
            payload["company_gst_num"] = values?.company_gst_num;
            payload["company_address"] = values?.company_address;
            // payload["business_activity"] = values?.business_activity;
            payload["website"] = values?.website;
            payload["categories"] = values?.categories;
            payload["pan_card"] = values?.pan_card;
            payload["registration_certificate"] = values?.registration_certificate;
            payload["trust_deed"] = values?.trust_deed;
            payload["business_address_proof"] = values?.business_address_proof;
            payload["itr"] = values?.itr;
            payload["gst_doc"] = values?.gst_doc;
            payload["personalised_cancel_cheque_of_account"] = values?.personalised_cancel_cheque_of_account;
            payload["board_resolution_company_stamp"] = values?.board_resolution_company_stamp;
        }

        onNextClick(payload, formikBag, undefined, stopIsSubmiting);
    };

    // useEffect(() => {
    //     const callback = () => {};

    //     dispatch(getCategories(callback));
    // }, []);

    const { mode } = useSelector((state) => state.persist);

    useEffect(() => {
        const categories = [];
        state?.application?.categoryList?.map((c) => {
            categories.push({ value: c?.id, label: c?.name });
        });
        setCategoryList(categories);
    }, [state?.application?.categoryList]);

    const colourStyles = {
        container: (base) => ({
            ...base,
            // border: "1px solid lightgrey"
        }),
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
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
                // zIndex: "999 !important"
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
        menu: (styles, { data }) => ({ ...styles, backgroundColor: mode === "dark" ? "#1b253b" : "white", zIndex: "999 !important" }),
        menuList: (styles, { data }) => ({ ...styles, zIndex: "999 !important" }),
    };

    const categoryStyles = {
        container: (base) => ({
            ...base,
            // border: "1px solid lightgrey"
            zIndex: "41 !important",
        }),
        control: (base) => ({
            ...base,
            border: "1px solid #e3e3e3",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
        }),
        valueContainer: (base) => ({
            ...base,
            minHeight: "43px",
        }),
    };

    const toInputUppercase = (e) => {
        const re = /^[A-Za-z0-9]*$/;
        if (re.test(e.target.value)) {
            e.target.value = ("" + e.target.value).toUpperCase();
        } else {
            e.target.value = e.target.value.substring(0, e.target.value?.length - 1);
        }
    };

    const handleCategoryChange = (setFieldValue, e) => {
        let categories = [];
        if (e.length) {
            e.forEach((category) => {
                categories.push(JSON.stringify(category.value));
            });
        }
        setFieldValue("categories", JSON.stringify(categories));
    };

    return (
        <Formik initialValues={initialValues} validationSchema={companyDetails} onSubmit={onSubmit} enableReinitialize validateOnMount>
            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => {
                const categoryValue =
                    values?.categories === ""
                        ? []
                        : Array.isArray(values?.categories)
                        ? values?.categories
                        : JSON.parse(values?.categories);
                console.log({ errors, values });
                return (
                    <Form className="px-5 sm:px-20 mb-7">
                        <div className="font-medium text-base">Personal Details</div>
                        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                            <div className="intro-y col-span-12 sm:col-span-6">
                                <Input
                                    type="text"
                                    className="intro-x login__input form-control py-2 px-3 block"
                                    placeholder={messages.placeholders.merchant_name}
                                    name="merchant_name"
                                    label={messages.placeholders.merchant_name}
                                    isRequiredField={true}
                                />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                                <Input
                                    readOnly
                                    type="text"
                                    className="intro-x login__input form-control py-2 px-3 block"
                                    placeholder={messages.placeholders.mobile_number}
                                    name="mobile_number"
                                    label={messages.placeholders.mobile_number}
                                    isRequiredField={true}
                                />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                                <Input
                                    readOnly
                                    type="text"
                                    className="intro-x login__input form-control py-2 px-3 block"
                                    placeholder={messages.placeholders.email}
                                    name="email"
                                    label={messages.placeholders.email}
                                    isRequiredField={true}
                                />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                                <AppSelect
                                    firstEnableLabel={messages.placeholders.entities_type}
                                    className="intro-x login__input form-control py-2 px-3 block"
                                    placeholder={"Select entity type"}
                                    name="entities_type"
                                    label={messages.placeholders.entities_type}
                                    isRequiredField={true}
                                    // onChange={(e) => setFieldValue("entities_type", e.target.value)}
                                    data={TypeOfEntities}
                                />
                            </div>
                        </div>

                        {values?.entities_type === "1" && (
                            <>
                                <div className="font-medium text-base mt-5">Documents</div>
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="aadhar_card_front_image"
                                                placeholder={messages.placeholders.aadhar_card_front_image}
                                                error={errors.aadhar_card_front_image}
                                                touched={touched.aadhar_card_front_image}
                                                values={values.aadhar_card_front_image}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.aadhar_card_front_image}
                                                isRequiredField={true}
                                                allValue={values}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="aadhar_card_back_image"
                                                placeholder={messages.placeholders.aadhar_card_back_image}
                                                error={errors.aadhar_card_back_image}
                                                touched={touched.aadhar_card_back_image}
                                                values={values.aadhar_card_back_image}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.aadhar_card_back_image}
                                                isRequiredField={true}
                                                allValue={values}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            name="cancel_cheque"
                                            placeholder={messages.placeholders.cancel_cheque}
                                            error={errors.cancel_cheque}
                                            touched={touched.cancel_cheque}
                                            values={values.cancel_cheque}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.cancel_cheque}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="pan_card"
                                                placeholder={messages.placeholders.pan_card}
                                                error={errors.pan_card}
                                                touched={touched.pan_card}
                                                values={values.pan_card}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.pan_card}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="passport"
                                                placeholder={messages.placeholders.passport}
                                                error={errors.passport}
                                                touched={touched.passport}
                                                values={values.passport}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.passport}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="voter_id"
                                                placeholder={messages.placeholders.voter_id}
                                                error={errors.voter_id}
                                                touched={touched.voter_id}
                                                values={values.voter_id}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.voter_id}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="driving_license"
                                                placeholder={messages.placeholders.driving_license}
                                                error={errors.driving_license}
                                                touched={touched.driving_license}
                                                values={values.driving_license}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.driving_license}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {values?.entities_type === "2" && (
                            <>
                                <div className="font-medium text-base mt-5">Company Details</div>
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.name}
                                            name="company_name"
                                            label={messages.placeholders.name}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            // maxlength="6"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationYear}
                                            name="company_year_of_register"
                                            label={messages.placeholders.registrationYear}
                                            maxLength="4"
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <label className="form-label">{messages.placeholders.country}</label>
                                        <Select
                                            value={countryCodesApplication?.find((item) => item?.code === values?.country_registration)}
                                            styles={colourStyles}
                                            style={{ boxShadow: "none" }}
                                            options={countryCodesApplication}
                                            onChange={(e) => {
                                                setFieldValue("country_registration", e?.code);
                                            }}
                                            className="intro-x login__input form-control block shadow-none"
                                            getOptionLabel={(e) => (
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <span style={{ marginLeft: 5 }}>
                                                        <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                                                    </span>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            onInput={toInputUppercase}
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationNo}
                                            name="company_registration_num"
                                            label={messages.placeholders.registrationNo}
                                            isRequiredField={true}
                                            maxLength="21"
                                        />
                                    </div>
                                    {/* {values?.country_registration === "IN" && ( */}
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.gstNo}
                                            name="company_gst_num"
                                            maxLength="15"
                                            label={messages.placeholders.gstNo}
                                        />
                                    </div>
                                    {/* )} */}

                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.fullAddress}
                                            name="company_address"
                                            label={messages.placeholders.fullAddress}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.website}
                                            name="website"
                                            label={messages.placeholders.website}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="connectors_id" className="form-label">
                                            Category <span className="text-danger">*</span>
                                        </label>

                                        <Select
                                            isMulti
                                            name="connectors_id"
                                            onChange={(e) => handleCategoryChange(setFieldValue, e)}
                                            options={categoryList}
                                            value={categoryValue?.map((d) => {
                                                return categoryList?.find((c) => c?.value === Number(d));
                                            })}
                                            className="intro-x login__input form-control block"
                                            styles={categoryStyles}
                                        />

                                        {errors.categories && touched.categories ? (
                                            <p className="text-red-500 mt-2 ml-1">{errors.categories}</p>
                                        ) : null}
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.udyam_num}
                                            name="udyam_num"
                                            maxLength="15"
                                            label={messages.placeholders.udyam_num}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6"></div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="pan_card"
                                                placeholder={messages.placeholders.company_pan_card}
                                                error={errors.pan_card}
                                                touched={touched.pan_card}
                                                values={values.pan_card}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.company_pan_card}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="certificate_of_incorporation"
                                                placeholder={messages.placeholders.company_roc}
                                                error={errors.certificate_of_incorporation}
                                                touched={touched.certificate_of_incorporation}
                                                values={values.certificate_of_incorporation}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.company_roc}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                info={"Municipal Registration OR Electricity Bill or Rent Agreement"}
                                                name="business_address_proof"
                                                placeholder={messages.placeholders.business_address_proof}
                                                error={errors.business_address_proof}
                                                touched={touched.business_address_proof}
                                                values={values.business_address_proof}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.business_address_proof}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                info={"Bank Branch Authorised Letter of Account OR Bank GST"}
                                                setFieldValue={setFieldValue}
                                                name="personalised_cancel_cheque_of_account"
                                                placeholder={messages.placeholders.personalised_cancel_cheque_of_account}
                                                error={errors.personalised_cancel_cheque_of_account}
                                                touched={touched.personalised_cancel_cheque_of_account}
                                                values={values.personalised_cancel_cheque_of_account}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.personalised_cancel_cheque_of_account}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="moa"
                                                placeholder={messages.placeholders.moa}
                                                error={errors.moa}
                                                touched={touched.moa}
                                                values={values.moa}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.moa}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="aoa"
                                                placeholder={messages.placeholders.aoa}
                                                error={errors.aoa}
                                                touched={touched.aoa}
                                                values={values.aoa}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.aoa}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="board_resolution_company_stamp"
                                                info="Board resolution company stamp & authorized person sign on comppany letter head"
                                                placeholder={messages.placeholders.board_resolution_company_stamp}
                                                error={errors.board_resolution_company_stamp}
                                                touched={touched.board_resolution_company_stamp}
                                                values={values.board_resolution_company_stamp}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.board_resolution_company_stamp}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="udyam_certificate"
                                                placeholder={messages.placeholders.udyam_certificate}
                                                error={errors.udyam_certificate}
                                                touched={touched.udyam_certificate}
                                                values={values.udyam_certificate}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.udyam_certificate}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            name="beneficial_owners_declaration"
                                            placeholder={messages.placeholders.beneficial_owners_declaration}
                                            error={errors.beneficial_owners_declaration}
                                            touched={touched.beneficial_owners_declaration}
                                            values={values.beneficial_owners_declaration}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.beneficial_owners_declaration}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            name="gst_doc"
                                            placeholder={messages.placeholders.gst_doc}
                                            error={errors.gst_doc}
                                            touched={touched.gst_doc}
                                            values={values.gst_doc}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.gst_doc}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {values?.entities_type === "3" && (
                            <>
                                <div className="font-medium text-base mt-5">Company Details</div>
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.name}
                                            name="company_name"
                                            label={messages.placeholders.name}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            // maxlength="6"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationYear}
                                            name="company_year_of_register"
                                            label={messages.placeholders.registrationYear}
                                            maxLength="4"
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <label className="form-label">{messages.placeholders.country}</label>
                                        <Select
                                            value={countryCodesApplication?.find((item) => item?.code === values?.country_registration)}
                                            styles={colourStyles}
                                            style={{ boxShadow: "none" }}
                                            options={countryCodesApplication}
                                            onChange={(e) => {
                                                setFieldValue("country_registration", e?.code);
                                            }}
                                            className="intro-x login__input form-control block shadow-none"
                                            getOptionLabel={(e) => (
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <span style={{ marginLeft: 5 }}>
                                                        <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                                                    </span>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            onInput={toInputUppercase}
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationNo}
                                            name="company_registration_num"
                                            label={messages.placeholders.registrationNo}
                                            isRequiredField={true}
                                            maxLength="21"
                                        />
                                    </div>
                                    {/* {values?.country_registration === "IN" && ( */}
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.gstNo}
                                            name="company_gst_num"
                                            maxLength="15"
                                            label={messages.placeholders.gstNo}
                                        />
                                    </div>
                                    {/* )} */}

                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.fullAddress}
                                            name="company_address"
                                            label={messages.placeholders.fullAddress}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.website}
                                            name="website"
                                            label={messages.placeholders.website}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="connectors_id" className="form-label">
                                            Category <span className="text-danger">*</span>
                                        </label>

                                        <Select
                                            isMulti
                                            name="connectors_id"
                                            onChange={(e) => handleCategoryChange(setFieldValue, e)}
                                            options={categoryList}
                                            value={categoryValue?.map((d) => {
                                                return categoryList?.find((c) => c?.value === Number(d));
                                            })}
                                            className="intro-x login__input form-control block"
                                            styles={categoryStyles}
                                        />

                                        {errors.categories && touched.categories ? (
                                            <p className="text-red-500 mt-2 ml-1">{errors.categories}</p>
                                        ) : null}
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.udyam_num}
                                            name="udyam_num"
                                            maxLength="15"
                                            label={messages.placeholders.udyam_num}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6"></div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="pan_card"
                                                placeholder={messages.placeholders.pan_card_of_partnership}
                                                error={errors.pan_card}
                                                touched={touched.pan_card}
                                                values={values.pan_card}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.pan_card_of_partnership}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                info={"Municipal Registration OR Electricity Bill or Rent Agreement"}
                                                name="business_address_proof"
                                                placeholder={messages.placeholders.business_address_proof}
                                                error={errors.business_address_proof}
                                                touched={touched.business_address_proof}
                                                values={values.business_address_proof}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.business_address_proof}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="resolution_letter"
                                                info="Resolution letter on letter head making a partner as Auth signatory company if not explicity covered in the partnership deed"
                                                placeholder={messages.placeholders.resolution_letter}
                                                error={errors.resolution_letter}
                                                touched={touched.resolution_letter}
                                                values={values.resolution_letter}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.resolution_letter}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="udyam_certificate"
                                                placeholder={messages.placeholders.udyam_certificate}
                                                error={errors.udyam_certificate}
                                                touched={touched.udyam_certificate}
                                                values={values.udyam_certificate}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.udyam_certificate}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            name="registration_certificate"
                                            info="Registration Certificate of Partnership Firm or Registered Partnership Deed"
                                            placeholder={messages.placeholders.registration_certificate}
                                            error={errors.registration_certificate}
                                            touched={touched.registration_certificate}
                                            values={values.registration_certificate}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.registration_certificate}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            info={"Bank Branch Authorised Letter of Account OR Bank GST"}
                                            name="personalised_cancel_cheque_of_account"
                                            placeholder={messages.placeholders.personalised_cancel_cheque_of_account}
                                            error={errors.personalised_cancel_cheque_of_account}
                                            touched={touched.personalised_cancel_cheque_of_account}
                                            values={values.personalised_cancel_cheque_of_account}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.personalised_cancel_cheque_of_account}
                                            isRequiredField={true}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {values?.entities_type === "4" && (
                            <>
                                <div className="font-medium text-base mt-5">Company Details</div>
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.name}
                                            name="company_name"
                                            label={messages.placeholders.name}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            // maxlength="6"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationYear}
                                            name="company_year_of_register"
                                            label={messages.placeholders.registrationYear}
                                            maxLength="4"
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <label className="form-label">{messages.placeholders.country}</label>
                                        <Select
                                            value={countryCodesApplication?.find((item) => item?.code === values?.country_registration)}
                                            styles={colourStyles}
                                            style={{ boxShadow: "none" }}
                                            options={countryCodesApplication}
                                            onChange={(e) => {
                                                setFieldValue("country_registration", e?.code);
                                            }}
                                            className="intro-x login__input form-control block shadow-none"
                                            getOptionLabel={(e) => (
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <span style={{ marginLeft: 5 }}>
                                                        <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                                                    </span>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            onInput={toInputUppercase}
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationNo}
                                            name="company_registration_num"
                                            label={messages.placeholders.registrationNo}
                                            isRequiredField={true}
                                            maxLength="21"
                                        />
                                    </div>
                                    {/* {values?.country_registration === "IN" && ( */}
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.gstNo}
                                            name="company_gst_num"
                                            maxLength="15"
                                            label={messages.placeholders.gstNo}
                                        />
                                    </div>
                                    {/* )} */}

                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.fullAddress}
                                            name="company_address"
                                            label={messages.placeholders.fullAddress}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.website}
                                            name="website"
                                            label={messages.placeholders.website}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="connectors_id" className="form-label">
                                            Category <span className="text-danger">*</span>
                                        </label>

                                        <Select
                                            isMulti
                                            name="connectors_id"
                                            onChange={(e) => handleCategoryChange(setFieldValue, e)}
                                            options={categoryList}
                                            value={categoryValue?.map((d) => {
                                                return categoryList?.find((c) => c?.value === Number(d));
                                            })}
                                            className="intro-x login__input form-control block"
                                            styles={categoryStyles}
                                        />

                                        {errors.categories && touched.categories ? (
                                            <p className="text-red-500 mt-2 ml-1">{errors.categories}</p>
                                        ) : null}
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="pan_card"
                                                placeholder={messages.placeholders.pan_card_of_partnership}
                                                error={errors.pan_card}
                                                touched={touched.pan_card}
                                                values={values.pan_card}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.pan_card_of_partnership}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="certificate_of_incorporation"
                                                placeholder={messages.placeholders.certificate_of_incorporation}
                                                error={errors.certificate_of_incorporation}
                                                touched={touched.certificate_of_incorporation}
                                                values={values.certificate_of_incorporation}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.certificate_of_incorporation}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="llp_dead"
                                                placeholder={messages.placeholders.llp_dead}
                                                error={errors.llp_dead}
                                                touched={touched.llp_dead}
                                                values={values.llp_dead}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.llp_dead}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="moa"
                                                placeholder={messages.placeholders.moa}
                                                error={errors.moa}
                                                touched={touched.moa}
                                                values={values.moa}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.moa}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="aoa"
                                                placeholder={messages.placeholders.aoa}
                                                error={errors.aoa}
                                                touched={touched.aoa}
                                                values={values.aoa}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.aoa}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="gst_doc"
                                                placeholder={messages.placeholders.gst_doc}
                                                error={errors.gst_doc}
                                                touched={touched.gst_doc}
                                                values={values.gst_doc}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.gst_doc}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                info={"Bank Branch Authorised Letter of Account"}
                                                name="personalised_cancel_cheque_of_account"
                                                placeholder={messages.placeholders.personalised_cancel_cheque_of_account}
                                                error={errors.personalised_cancel_cheque_of_account}
                                                touched={touched.personalised_cancel_cheque_of_account}
                                                values={values.personalised_cancel_cheque_of_account}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.personalised_cancel_cheque_of_account}
                                                isRequiredField={true}
                                            />
                                        </div>

                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                info={"Municipal Registration OR Electricity Bill or Rent Agreement"}
                                                setFieldValue={setFieldValue}
                                                name="business_address_proof"
                                                placeholder={messages.placeholders.business_address_proof}
                                                error={errors.business_address_proof}
                                                touched={touched.business_address_proof}
                                                values={values.business_address_proof}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.business_address_proof}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            name="resolution_letter"
                                            info="Resolution letter on letter head making a partner as Auth signatory company"
                                            placeholder={messages.placeholders.llp_resolution_letter}
                                            error={errors.resolution_letter}
                                            touched={touched.resolution_letter}
                                            values={values.resolution_letter}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.llp_resolution_letter}
                                            isRequiredField={true}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {values?.entities_type === "5" && (
                            <>
                                <div className="font-medium text-base mt-5">Documents</div>
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.gstNo}
                                            name="company_gst_num"
                                            maxLength="15"
                                            label={messages.placeholders.gstNo}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.udyam_num}
                                            name="udyam_num"
                                            maxLength="15"
                                            label={messages.placeholders.udyam_num}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            name="shops_and_establishment_document"
                                            placeholder={messages.placeholders.shops_and_establishment_document}
                                            error={errors.shops_and_establishment_document}
                                            touched={touched.shops_and_establishment_document}
                                            values={values.shops_and_establishment_document}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.shops_and_establishment_document}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="fssai_fda_license"
                                                placeholder={messages.placeholders.fssai_fda_license}
                                                error={errors.fssai_fda_license}
                                                touched={touched.fssai_fda_license}
                                                values={values.fssai_fda_license}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.fssai_fda_license}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="udyam_certificate"
                                                placeholder={messages.placeholders.udyam_certificate}
                                                error={errors.udyam_certificate}
                                                touched={touched.udyam_certificate}
                                                values={values.udyam_certificate}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.udyam_certificate}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="gst_doc"
                                                placeholder={messages.placeholders.gst_doc}
                                                error={errors.gst_doc}
                                                touched={touched.gst_doc}
                                                values={values.gst_doc}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.gst_doc}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                info={"Bank Branch Authorised Letter of Account"}
                                                name="personalised_cancel_cheque_of_account"
                                                placeholder={messages.placeholders.cancel_cheque}
                                                error={errors.personalised_cancel_cheque_of_account}
                                                touched={touched.personalised_cancel_cheque_of_account}
                                                values={values.personalised_cancel_cheque_of_account}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.cancel_cheque}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="aadhar_card_front_image"
                                                placeholder={messages.placeholders.aadhar_card_front_image}
                                                error={errors.aadhar_card_front_image}
                                                touched={touched.aadhar_card_front_image}
                                                values={values.aadhar_card_front_image}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.aadhar_card_front_image}
                                                isRequiredField={true}
                                                allValue={values}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="aadhar_card_back_image"
                                                placeholder={messages.placeholders.aadhar_card_back_image}
                                                error={errors.aadhar_card_back_image}
                                                touched={touched.aadhar_card_back_image}
                                                values={values.aadhar_card_back_image}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.aadhar_card_back_image}
                                                isRequiredField={true}
                                                allValue={values}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="pan_card"
                                                placeholder={messages.placeholders.pan_card}
                                                error={errors.pan_card}
                                                touched={touched.pan_card}
                                                values={values.pan_card}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.pan_card}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="passport"
                                                placeholder={messages.placeholders.passport}
                                                error={errors.passport}
                                                touched={touched.passport}
                                                values={values.passport}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.passport}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="voter_id"
                                                placeholder={messages.placeholders.voter_id}
                                                error={errors.voter_id}
                                                touched={touched.voter_id}
                                                values={values.voter_id}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.voter_id}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="driving_license"
                                                placeholder={messages.placeholders.driving_license}
                                                error={errors.driving_license}
                                                touched={touched.driving_license}
                                                values={values.driving_license}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.driving_license}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {values?.entities_type === "6" && (
                            <>
                                <div className="font-medium text-base mt-5">Company Details</div>
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.name}
                                            name="company_name"
                                            label={messages.placeholders.name}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            // maxlength="6"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationYear}
                                            name="company_year_of_register"
                                            label={messages.placeholders.registrationYear}
                                            maxLength="4"
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <label className="form-label">{messages.placeholders.country}</label>
                                        <Select
                                            value={countryCodesApplication?.find((item) => item?.code === values?.country_registration)}
                                            styles={colourStyles}
                                            style={{ boxShadow: "none" }}
                                            options={countryCodesApplication}
                                            onChange={(e) => {
                                                setFieldValue("country_registration", e?.code);
                                            }}
                                            className="intro-x login__input form-control block shadow-none"
                                            getOptionLabel={(e) => (
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <span style={{ marginLeft: 5 }}>
                                                        <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                                                    </span>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            onInput={toInputUppercase}
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.registrationNo}
                                            name="company_registration_num"
                                            label={messages.placeholders.registrationNo}
                                            isRequiredField={true}
                                            maxLength="21"
                                        />
                                    </div>
                                    {/* {values?.country_registration === "IN" && ( */}
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.gstNo}
                                            name="company_gst_num"
                                            maxLength="15"
                                            label={messages.placeholders.gstNo}
                                        />
                                    </div>
                                    {/* )} */}

                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.fullAddress}
                                            name="company_address"
                                            label={messages.placeholders.fullAddress}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Input
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={messages.placeholders.website}
                                            name="website"
                                            label={messages.placeholders.website}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="connectors_id" className="form-label">
                                            Category <span className="text-danger">*</span>
                                        </label>

                                        <Select
                                            isMulti
                                            name="connectors_id"
                                            onChange={(e) => handleCategoryChange(setFieldValue, e)}
                                            options={categoryList}
                                            value={categoryValue?.map((d) => {
                                                return categoryList?.find((c) => c?.value === Number(d));
                                            })}
                                            className="intro-x login__input form-control block"
                                            styles={categoryStyles}
                                        />

                                        {errors.categories && touched.categories ? (
                                            <p className="text-red-500 mt-2 ml-1">{errors.categories}</p>
                                        ) : null}
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="pan_card"
                                                placeholder={messages.placeholders.trust_pan_card}
                                                error={errors.pan_card}
                                                touched={touched.pan_card}
                                                values={values.pan_card}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.trust_pan_card}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="registration_certificate"
                                                placeholder={messages.placeholders.trust_registration_certificate}
                                                error={errors.registration_certificate}
                                                touched={touched.registration_certificate}
                                                values={values.registration_certificate}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.trust_registration_certificate}
                                                isRequiredField={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="trust_deed"
                                                placeholder={messages.placeholders.trust_deed}
                                                error={errors.trust_deed}
                                                touched={touched.trust_deed}
                                                values={values.trust_deed}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.trust_deed}
                                                isRequiredField={true}
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[49%]">
                                            <Dropzone
                                                info={"Municipal Registration OR Electricity Bill or Rent Agreement"}
                                                setFieldValue={setFieldValue}
                                                name="business_address_proof"
                                                placeholder={messages.placeholders.business_address_proof}
                                                error={errors.business_address_proof}
                                                touched={touched.business_address_proof}
                                                values={values.business_address_proof}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.business_address_proof}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6 flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="itr"
                                                placeholder={messages.placeholders.itr}
                                                error={errors.itr}
                                                touched={touched.itr}
                                                values={values.itr}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.itr}
                                            />
                                        </div>
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[49%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="gst_doc"
                                                placeholder={messages.placeholders.gst_doc}
                                                error={errors.gst_doc}
                                                touched={touched.gst_doc}
                                                values={values.gst_doc}
                                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                                label={messages.placeholders.gst_doc}
                                            />
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            info={"Bank Branch Authorised Letter of Account"}
                                            setFieldValue={setFieldValue}
                                            name="personalised_cancel_cheque_of_account"
                                            placeholder={messages.placeholders.personalised_cancel_cheque_of_account}
                                            error={errors.personalised_cancel_cheque_of_account}
                                            touched={touched.personalised_cancel_cheque_of_account}
                                            values={values.personalised_cancel_cheque_of_account}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.personalised_cancel_cheque_of_account}
                                            isRequiredField={true}
                                        />
                                    </div>
                                    <div className="intro-y col-span-12 lg:col-span-6">
                                        <Dropzone
                                            setFieldValue={setFieldValue}
                                            name="board_resolution_company_stamp"
                                            info="Board Resolution with trust stamp & authorised person sign on Trust letter Head"
                                            placeholder={messages.placeholders.trust_board_resolution_company_stamp}
                                            error={errors.board_resolution_company_stamp}
                                            touched={touched.board_resolution_company_stamp}
                                            values={values.board_resolution_company_stamp}
                                            accept="image/png,image/jpg,image/jpeg,application/pdf"
                                            label={messages.placeholders.trust_board_resolution_company_stamp}
                                            isRequiredField={true}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                            {!disable && (
                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                    <button className="btn btn-primary w-24 ml-2" disabled={isSubmiting} onClick={handleSubmit}>
                                        {values?.entities_type === "1" || values?.entities_type === "5" ? "Save" : "Next"}{" "}
                                        <MiniLoader isLoading={isSubmiting} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default React.memo(Step1);
