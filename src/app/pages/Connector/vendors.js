import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Icon from "react-feather";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import {
    addVendorsData,
    deleteVendorsData,
    getAutoSplitPaymentData,
    getVendorsData,
    splitPaymentEditData,
    updateVendorsData,
} from "../../redux/services/Connector";
import {
    emailValidation,
    mobileValidation,
    numberOnlyPattern,
    vendorsSelectAutoSplitSchema,
    vendorsSelectSchema,
} from "../../utils/validationSchema";
import DeleteModal from "../../components/common/DeleteModal";

const Modal = React.lazy(() => import("../../components/common/Modal"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Select = React.lazy(() => import("react-select"));

const autoSplitPaymentInitialValuesObj = {
    vendors: [],
    percentage: [],
    split_type: 0,
    is_auto_split_enabled: 0,
};

const Vendors = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [loadingId, setLoadingId] = useState(false);

    const [initialValues, setInitialValues] = useState({});
    const [autoSplitPaymentInitialValues, setAutoSplitPaymentInitialValues] = useState(autoSplitPaymentInitialValuesObj);

    const [validationState, setValidationState] = useState({});

    const [modalData, setModalData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [editableId, setEditableId] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isVisibleAutoSplitModal, setIsVisibleAutoSplitModal] = useState(false);
    const [allVendorList, setAllVendorList] = useState([]);
    const [vendorList, setVendorList] = useState([]);

    const onCreateNewVendor = () => {
        let validationObject = {};
        let initialValuesObj = {};

        modalData?.map((item) => {
            initialValuesObj[item?.field_name] = "";

            if (item?.field_name === "email") {
                validationObject[item?.field_name] = emailValidation();
            } else if (item?.field_name === "phone_number") {
                validationObject[item?.field_name] = Yup.string()
                    .trim()
                    .required(`Please enter your ${item?.field_title}`)
                    .length(10, `${item?.field_title} should be 10 digits long`)
                    .test("number_only_test", "Only digits are allowed", (val) => numberOnlyPattern.test(val));
            } else if (item?.field_name === "first_name" || item?.field_name === "last_name") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(50, "Please enter max 50 character");
            } else if (
                item?.field_name === "business_type" ||
                item?.field_name === "legal_business_name" ||
                item?.field_name === "category" ||
                item?.field_name === "sub_category" ||
                item?.field_name === "street1" ||
                item?.field_name === "street2"
            ) {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(200, "Please enter max 200 character");
            } else if (item?.field_name === "city" || item?.field_name === "state" || item?.field_name === "country") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(100, "Please enter max 200 character")
                    .matches(/^[a-zA-Z\s]+$/, `Please enter valid ${item?.field_title}`);
            } else if (item?.field_name === "postal_code") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(20, "Please enter max 20 character")
                    .matches(/^\d{5,9}$/, `Please enter valid ${item?.field_title}`);
            } else if (item?.field_name === "gst_number") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(30, "Please enter max 30 character")
                    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, `Please enter valid ${item?.field_title}`);
            } else if (item?.field_name === "cin_number") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(30, "Please enter max 30 character")
                    .matches(/^[LU]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/, `Please enter valid ${item?.field_title}`);
            } else if (item?.field_name === "pan_number") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(30, "Please enter max 30 character")
                    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, `Please enter valid ${item?.field_title}`);
            } else if (item?.field_name === "bank_account_number") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(30, "Please enter max 30 character")
                    .matches(/^[0-9]{9,18}$/, `Please enter valid ${item?.field_title}`);
            } else if (item?.field_name === "account_holder_name") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(30, "Please enter max 30 character")
                    .matches(/^[a-zA-Z\s]+$/, `Please enter valid ${item?.field_title}`);
            } else if (item?.field_name === "ifsc_code") {
                validationObject[item?.field_name] = Yup.string()
                    .required(`Please enter ${item?.field_title}`)
                    .max(30, "Please enter max 30 character")
                    .matches(/^[A-Za-z]{4}[0-9]{7}$/, `Please enter valid ${item?.field_title}`);
            } else {
                validationObject[item?.field_name] = Yup.string().required(`Please enter ${item?.field_title}`);
            }
        });

        let validationState = Yup.object().shape(validationObject);
        setValidationState(validationState);
        setInitialValues(initialValuesObj);

        setIsVisibleModal(true);
    };

    useEffect(() => {
        getVendors();
    }, []);

    const getVendors = async () => {
        setIsLoading(true);
        const data = await getVendorsData();

        console.log(data);
        if (data?.responseCode === 200) {
            setPageData(data?.data?.vendor_list || []);

            const vendorList = [];
            data?.data?.vendor_list?.map((item) => {
                vendorList.push({
                    name: `${item?.vendor_data?.first_name} ${item?.vendor_data?.last_name}`,
                    id: item?.id,
                    email: item?.vendor_data?.email,
                });
            });

            setAllVendorList(vendorList);
            setVendorList(vendorList);

            await getAutoSplitPayment(vendorList);

            // let labelArray = [];
            let validationObject = {};
            let initialValuesObj = {};

            data?.data?.fields?.map((item) => {
                initialValuesObj[item?.field_name] = "";

                if (item?.field_name === "email") {
                    validationObject[item?.field_name] = emailValidation();
                } else if (item?.field_name === "phone_number") {
                    validationObject[item?.field_name] = Yup.string()
                        .trim()
                        .required(`Please enter your ${item?.field_title}`)
                        .length(10, `${item?.field_title} should be 10 digits long`)
                        .test("number_only_test", "Only digits are allowed", (val) => numberOnlyPattern.test(val));
                } else {
                    validationObject[item?.field_name] = Yup.string().required(`Please enter ${item?.field_title}`);
                }
            });

            let validationState = Yup.object().shape(validationObject);
            setValidationState(validationState);
            setInitialValues(initialValuesObj);
            setModalData(data?.data?.fields);
        }

        setIsLoading(false);
    };

    const getAutoSplitPayment = async (allVendors) => {
        const data = await getAutoSplitPaymentData();

        if (data?.responseCode === 200) {
            if (data?.data?.vendors?.length > 0) {
                const vendors = [];
                const percentage = [];

                data?.data?.vendors?.map((item) => {
                    vendors.push(item?.id);
                    percentage.push(item?.percentage);
                });

                console.log({ allVendors, vendors });
                const customizeVendorList = allVendors?.filter((vendor) => !vendors?.includes(vendor?.id?.toString()));
                setVendorList(customizeVendorList);

                setAutoSplitPaymentInitialValues({
                    vendors,
                    percentage,
                    split_type: data?.data?.split_type,
                    is_auto_split_enabled: data?.data?.is_auto_split_enabled,
                });
            } else {
                setVendorList(allVendors);
                setAutoSplitPaymentInitialValues({
                    vendors: [],
                    percentage: [],
                    split_type: 0,
                    is_auto_split_enabled: 0,
                });
            }
        }
    };

    const onCloseModal = () => {
        setIsVisibleModal(false);
    };

    const onSubmit = async (values) => {
        setLoadingId(true);
        if (editableId) {
            const data = await updateVendorsData({ id: editableId, ...values });
            if (data?.responseCode === 200) {
                getVendors();
                setIsVisibleModal(false);
                setEditableId(false);
            }
        } else {
            const data = await addVendorsData(values);
            if (data?.responseCode === 200) {
                getVendors();
                setIsVisibleModal(false);
            }
        }

        setLoadingId(false);
    };

    // const onClickEdit = (id, value) => {
    //     setEditableId(id);
    //     let validationObject = {};
    //     let initialValuesObj = {};

    //     modalData?.map((item) => {
    //         initialValuesObj[item?.field_name] = value?.vendor_data?.[item?.field_name];

    //         if (item?.field_name === "email") {
    //             validationObject[item?.field_name] = emailValidation();
    //         } else if (item?.field_name === "phone_number") {
    //             validationObject[item?.field_name] = Yup.string()
    //                 .trim()
    //                 .required(`Please enter your ${item?.field_title}`)
    //                 .length(10, `${item?.field_title} should be 10 digits long`)
    //                 .test("number_only_test", "Only digits are allowed", (val) => numberOnlyPattern.test(val));
    //         } else {
    //             validationObject[item?.field_name] = Yup.string().required(`Please enter ${item?.field_title}`);
    //         }
    //     });

    //     let validationState = Yup.object().shape(validationObject);
    //     setValidationState(validationState);
    //     setInitialValues(initialValuesObj);
    //     setIsVisibleModal(true);
    // };

    const onClickDelete = async () => {
        setIsLoadingDelete(true);
        const payload = {
            id: deleteModalDetails,
        };
        const data = await deleteVendorsData(payload);

        if (data?.responseCode === 200) {
            getVendors();
        }

        setIsVisibleModal(false);
        setIsLoadingDelete(false);
        onHandleDeleteModal();
        setIsLoadingDelete(false);
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const onEnableAutoSplit = () => {
        setIsVisibleAutoSplitModal(true);
    };

    const onCloseAutoSplitModal = async (values) => {
        setIsVisibleAutoSplitModal(false);
    };

    const onSubmitAutoSplit = async (values) => {
        const customizeTotalAmount = values?.percentage.reduce((a, b) => Number(a) + Number(b), 0);

        // console.log(customizeTotalAmount !== 0 || customizeTotalAmount !== 100);
        if (values?.is_auto_split_enabled === 1) {
            if (customizeTotalAmount !== 100) {
                return false;
            }
        }

        console.log({ values });
        const vendor_data = [];

        values?.vendors?.map((item, index) => {
            vendor_data.push({ id: item, percentage: Number(values?.percentage?.[index]) });
        });

        let payload = {};

        if (values?.is_auto_split_enabled === 1) {
            payload = {
                is_auto_split_enabled: values?.is_auto_split_enabled,
                split_type: values?.split_type,

                vendor_data: JSON.stringify(vendor_data),
            };
        } else {
            payload = {
                is_auto_split_enabled: values?.is_auto_split_enabled,
            };
        }

        console.log({ payload });

        setIsSubmiting(true);

        const data = await splitPaymentEditData(payload);

        if (data?.responseCode === 200) {
            onCloseAutoSplitModal();
            getAutoSplitPayment(allVendorList);
        }

        setIsSubmiting(false);
        // const payload = {

        // }

        // const data = await splitPaymentEditData()
        // console.log({data})
    };

    const onChangeAmountType = (values, value, setFieldValue) => {
        setFieldValue("split_type", value);

        let customizeAmount = [];
        if (value === 0) {
            const amount = 100 / values?.vendors?.length;
            let totalAmount = 0;
            values?.vendors?.map((vendor, index) => {
                if (values?.vendors?.length > 1 && values?.vendors?.length === index + 1) {
                    const amount = 100 - Number(totalAmount);
                    customizeAmount.push(amount.toFixed(2));
                } else {
                    customizeAmount.push(amount.toFixed(2));
                }
                totalAmount += Number(amount.toFixed(2));
            });
        } else {
            values?.vendors?.map((vendor) => {
                customizeAmount.push("");
            });
        }
        console.log({ customizeAmount });

        setFieldValue("percentage", customizeAmount);
    };

    const onChangeAmount = (onChange, i, e, values) => {
        let customizeAmount = [...values];
        customizeAmount[i] = e.target.value;
        onChange("percentage", customizeAmount);
    };

    const onDeleteVendor = (id, values, setFieldValue, index) => {
        const customizeVendors = values?.vendors?.filter((v) => v?.toString() !== id);
        setFieldValue("vendors", customizeVendors);

        const customizeVendorList = allVendorList?.filter((vendor) => !customizeVendors?.includes(vendor?.id?.toString()));
        setVendorList(customizeVendorList);

        if (values?.split_type === 0) {
            let customizeAmount = [];
            const amount = 100 / customizeVendors?.length;
            let totalAmount = 0;
            customizeVendors?.map((vendor, index) => {
                if (customizeVendors?.length > 1 && customizeVendors?.length === index + 1) {
                    const amount = 100 - Number(totalAmount);
                    customizeAmount.push(amount.toFixed(2));
                } else {
                    customizeAmount.push(amount.toFixed(2));
                }
                totalAmount += Number(amount.toFixed(2));
            });
            setFieldValue("percentage", customizeAmount);
        } else {
            let customizeAmount = values?.percentage?.filter((_, i) => i !== index);
            console.log({ customizeAmount });
            setFieldValue("percentage", customizeAmount);
        }
    };

    const _renderModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    func
                    heading={"Add Vendor"}
                    visible={isVisibleModal}
                    onClose={onCloseModal}
                    onClickSave={onSubmit}
                    useFormik
                    initialValues={initialValues}
                    validationState={validationState}
                    modalMinWidth={"50%"}
                    buttonLoading={loadingId}
                    onClickCancel={onCloseModal}>
                    {(setFieldValue, values, errors, setFieldTouched) => {
                        return (
                            <>
                                <div className="sm:flex">
                                    <div className="pr-3 flex flex-col justify-center flex-1">
                                        {modalData?.map((item, index) => {
                                            if (item?.field_name === "phone_number") {
                                                return (
                                                    <Input
                                                        key={index}
                                                        type={item?.field_type}
                                                        className="intro-x login__input form-control py-2 px-3 block border"
                                                        containerClassName="mt-3"
                                                        placeholder={item?.field_title}
                                                        name={item?.field_name}
                                                        label={item?.field_title}
                                                        isRequiredField={true}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <Input
                                                        key={index}
                                                        type={item?.field_type}
                                                        className="intro-x login__input form-control py-2 px-3 block border"
                                                        containerClassName="mt-3"
                                                        placeholder={item?.field_title}
                                                        name={item?.field_name}
                                                        label={item?.field_title}
                                                        isRequiredField={true}
                                                    />
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </>
                        );
                    }}
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    const onChangeVendors = (e, values, setFieldValue) => {
        // setVendorValue(e.target.value);
        const customizeVendors = [...values?.vendors];
        customizeVendors.push(e.target.value);
        setFieldValue("vendors", customizeVendors);

        console.log({ customizeVendors });
        const customizeVendorList = allVendorList?.filter((vendor) => !customizeVendors?.includes(vendor?.id?.toString()));
        console.log({ customizeVendorList });
        setVendorList(customizeVendorList);

        const customizeAmount = [];
        if (values?.split_type === 0) {
            const amount = 100 / customizeVendors?.length;
            let totalAmount = 0;
            customizeVendors?.map((vendor, index) => {
                if (customizeVendors?.length > 1 && customizeVendors?.length === index + 1) {
                    const amount = 100 - Number(totalAmount);
                    customizeAmount.push(amount.toFixed(2));
                } else {
                    customizeAmount.push(amount.toFixed(2));
                }
                totalAmount += Number(amount.toFixed(2));
            });
        } else {
            values?.vendors?.map((vendor, index) => {
                customizeAmount.push(values?.percentage?.[index] ? values?.percentage?.[index] : "");
            });
        }

        setFieldValue("percentage", customizeAmount);
    };

    const _renderAutoSplitModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    func
                    heading={"Auto Split Payment"}
                    visible={isVisibleAutoSplitModal}
                    onClose={onCloseAutoSplitModal}
                    onClickSave={onSubmitAutoSplit}
                    useFormik
                    initialValues={autoSplitPaymentInitialValues}
                    validationState={vendorsSelectAutoSplitSchema}
                    modalMinWidth={"50%"}
                    buttonLoading={isSubmiting}
                    onClickCancel={onCloseAutoSplitModal}>
                    {(setFieldValue, values, errors, touched) => {
                        console.log({ values, errors, touched });
                        const customizeTotalAmount = values?.percentage.reduce((a, b) => Number(a) + Number(b), 0);
                        return (
                            <div className="grid grid-cols-12 gap-4 gap-y-5">
                                <div className="intro-y col-span-12">
                                    <div className="form-switch ">
                                        <input
                                            id="is_auto_split_enabled"
                                            onChange={(e) => {
                                                setFieldValue("is_auto_split_enabled", e?.target?.checked ? 1 : 0);
                                                setFieldValue("vendors", []);
                                                setFieldValue("percentage", []);
                                                setFieldValue("split_type", 0);
                                            }}
                                            // id="show-example-5"
                                            className="show-code form-check-input mr-0"
                                            type="checkbox"
                                            checked={values?.is_auto_split_enabled}
                                        />
                                        <label htmlFor="is_auto_split_enabled" className="cursor-pointer ml-2">
                                            Auto Split Payment Enable
                                        </label>
                                    </div>
                                </div>
                                {values?.is_auto_split_enabled ? (
                                    <>
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <label className="form-label">
                                                Vendors
                                                <span className="text-danger"></span>
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    onChangeVendors(e, values, setFieldValue);
                                                }}
                                                value=""
                                                name="vendors"
                                                className="form-select intro-x login__input form-control py-2 px-3 block">
                                                <option value="" disabled>
                                                    Select Venders
                                                </option>
                                                {vendorList?.map((vendor) => {
                                                    return (
                                                        <option value={vendor?.id}>
                                                            {vendor?.name} ({vendor?.email})
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {touched?.vendors && errors?.vendors ? (
                                                <p className="text-red-500 text-[12px] mt-2">{errors?.vendors}</p>
                                            ) : null}
                                        </div>
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <label className="form-label">
                                                Percentage Type
                                                <span className="text-danger"></span>
                                            </label>
                                            <div className="flex items-center mt-2">
                                                <div className="form-check mr-4">
                                                    <input
                                                        id="radio-switch-1"
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="split_type"
                                                        value="0"
                                                        checked={values?.split_type === 0}
                                                        onChange={() => {
                                                            onChangeAmountType(values, 0, setFieldValue);
                                                        }}
                                                    />
                                                    <label className="form-check-label" htmlFor="radio-switch-1">
                                                        Equal Percentage
                                                    </label>
                                                </div>
                                                <div className="form-check mr-2">
                                                    <input
                                                        id="radio-switch-2"
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="split_type"
                                                        value="1"
                                                        checked={values?.split_type === 1}
                                                        onChange={() => {
                                                            onChangeAmountType(values, 1, setFieldValue);
                                                        }}
                                                    />
                                                    <label className="form-check-label" htmlFor="radio-switch-2">
                                                        Customize Percentage
                                                    </label>
                                                </div>
                                            </div>
                                            {touched?.split_type && errors?.split_type ? (
                                                <p className="text-red-500 text-[12px] mt-2">{errors?.split_type}</p>
                                            ) : null}
                                        </div>
                                        {values?.vendors?.length > 0 && (
                                            <div className="intro-y col-span-12">
                                                <div className="text-[16px] font-semibold mb-5">Vendors Percentage Selection</div>
                                                <div className="grid grid-cols-12 gap-4 gap-y-5 flex items-center">
                                                    {values?.vendors?.map((vendor, index) => {
                                                        const name = allVendorList?.find((v) => v?.id?.toString() === vendor)?.name;
                                                        return (
                                                            <>
                                                                <div className="col-span-12 md:col-span-4">{name}</div>
                                                                <div className="col-span-10 md:col-span-7">
                                                                    <Input
                                                                        onChange={(e) =>
                                                                            onChangeAmount(setFieldValue, index, e, values?.percentage)
                                                                        }
                                                                        disabled={values?.split_type === 0}
                                                                        value={values.percentage?.[index] || ""}
                                                                        name="value"
                                                                        type="number"
                                                                        className="intro-x login__input  form-control py-2 px-3 block"
                                                                        placeholder="Percentage"
                                                                    />
                                                                    {touched?.percentage?.[index] && errors?.percentage?.[index] ? (
                                                                        <p className="text-red-500 text-[12px] mt-2">
                                                                            {errors?.percentage?.[index]}
                                                                        </p>
                                                                    ) : null}
                                                                </div>
                                                                <div className="col-span-2 md:col-span-1">
                                                                    <div
                                                                        className="btn btn-danger remove"
                                                                        onClick={() => {
                                                                            onDeleteVendor(vendor, values, setFieldValue, index);
                                                                        }}>
                                                                        <Icon.Trash2 size="20" />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        );
                                                    })}
                                                </div>
                                                <div className="intro-y col-span-12">
                                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                        <div className="col-span-12 md:col-span-4"></div>
                                                        <div className="col-span-12 md:col-span-8">
                                                            {customizeTotalAmount !== 0 && customizeTotalAmount !== 100 ? (
                                                                <p className="text-red-500 text-[12px] mt-2">
                                                                    Vendors divided percentage are not match.
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-10">
                                                    {/* <button className="btn btn-primary w-24 ml-2" onClick={handleSubmit} disabled={isSubmiting}>
                                                Save <MiniLoader isLoading={isSubmiting} />
                                            </button> */}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : null}
                            </div>
                        );
                    }}
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Vendors"}
                displayBackButton={false}
                addButton={
                    <>
                        <button
                            disabled={isLoading}
                            type="buttons"
                            onClick={onEnableAutoSplit}
                            className={`py-2 px-4 text-sm font-medium text-white bg-primary rounded max-h-[38px] ml-2`}>
                            <Icon.Save size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Auto Split Payment</span>
                        </button>
                        <button
                            disabled={isLoading}
                            type="buttons"
                            onClick={onCreateNewVendor}
                            className={`py-2 px-4 text-sm font-medium text-white bg-primary rounded max-h-[38px] ml-2`}>
                            <Icon.Save size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Create New Vendor</span>
                        </button>
                    </>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Connector Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">First Name</th>
                            <th className="whitespace-nowrap">Last Name</th>
                            <th className="whitespace-nowrap">Email</th>
                            <th className="whitespace-nowrap">Mobile Number</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={6}>
                                    <div className="flex justify-center h-48 items-center">
                                        <ClipLoader
                                            loading={true}
                                            color="#1e3a8a"
                                            size={55}
                                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="font-normal">
                            {pageData?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-20">{index + 1}</td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-white">{item?.vendor_data?.first_name}</p>
                                        </td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-white">{item?.vendor_data?.last_name}</p>
                                        </td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-white">{item?.vendor_data?.email}</p>
                                        </td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-white">
                                                {item?.vendor_data?.phone_number}
                                            </p>
                                        </td>
                                        <td className="table-report__action text-center">
                                            <div className="flex justify-center">
                                                {/* <div
                                                    onClick={() => {
                                                        onClickEdit(item?.id, item);
                                                    }}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                    }>
                                                    <Icon.Edit size={15} /> &nbsp;
                                                </div> */}
                                                <div
                                                    onClick={() => {
                                                        onHandleDeleteModal(item?.id);
                                                        // onClickDelete(item?.id);
                                                    }}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center cursor-pointer text-danger dark:text-slate-300 mr-3"
                                                    }>
                                                    {/* {loadingId === item?.id ? (
                                                        <MiniLoader isLoading={true} size={15} color="red" />
                                                    ) : ( */}
                                                    <Icon.Trash2 size={15} />
                                                    {/* )} */}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Connector Table */}

                {/* START: Table Not Found */}
                {pageData?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };

    // MAIN CONTENT
    return (
        <>
            <DeleteModal
                isLoading={isLoadingDelete}
                visible={visibleDeleteModal}
                onClose={onHandleDeleteModal}
                onDelete={() => {
                    onClickDelete();
                }}
            />
            {/* BEGIN: Modal */}
            {_renderModal()}
            {_renderAutoSplitModal()}
            {/* END: Modal */}

            {/* BEGIN: Content */}

            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">{_renderTable()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    // MAIN CONTENT
};

export default Vendors;
