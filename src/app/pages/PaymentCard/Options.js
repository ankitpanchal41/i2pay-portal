import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import * as Icon from "react-feather";
import { productOptions } from "../../utils/validationSchema";
const Creatable = React.lazy(() => import("react-select/creatable"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));

const initialValuesObj = {
    options: [{ name: { label: "", value: "" }, value: [""] }],
};

const OPTIONS = [
    { label: "Size", value: "size" },
    { label: "Color", value: "color" },
    { label: "Material", value: "material" },
    { label: "Style", value: "style" },
];

const Options = ({
    pricingOption,
    onChangePricingOption,
    values,
    onChangeOption,
    setFieldValue,
    errors,
    touched,
    optionErrorObject,
    handleChange,
    setFieldTouched,
    onHandleAddOption,
    disableFields,
    onCheckDuplicateOption,
    optionValueErrorObject,
    onRemoveOptionValueValidation,
}) => {
    // const [isSubmiting, setIsSubmiting] = useState(false);
    // const [pricingOption, setPricingOption] = useState(false);
    // const [selectedOptions, setSelectedOptions] = useState([""]);
    // const [optionErrorObject, setOptionErrorObject] = useState([]);
    // const [initialValues, setInitialValues] = useState(initialValuesObj);

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles, { isDisabled }) => ({
            ...styles,
            backgroundColor: mode === "dark" ? (isDisabled ? "#202a41" : "#1b253b") : isDisabled ? "#f1f5f9" : "white",
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
        menuList: (styles, { data }) => ({ ...styles, maxHeight: 150 }),
    };

    // const onChangePricingOption = () => {
    //     setPricingOption(!pricingOption);
    //     setInitialValues({ ...setInitialValues, options: [{ name: { label: "", value: "" }, value: [""] }] });
    // };

    // let handleChange = (onChange, mi, i, e, values) => {
    //     values.options[mi].value[i] = e.target.value;
    //     onChange("options", values.options, false);
    // };

    // const onHandleAddOption = (onClick, values) => {
    //     const newValue = [...values.options, { name: { label: "", value: "" }, value: [""] }];
    //     onClick("options", newValue, false);
    // };

    // const onChangeOption = (setFieldValue, values, e, mainIndex) => {
    //     values.options[mainIndex].name = e;
    //     setFieldValue(`options`, values.options);

    //     let newOptions = [...selectedOptions];
    //     newOptions[mainIndex] = e?.value;

    //     setSelectedOptions(newOptions);

    //     const duplicateItem = newOptions.filter((item, index) => index !== newOptions?.indexOf(item));

    //     const newErrorObj = [];
    //     // let firstOption = [];
    //     newOptions?.map((o, index) => {
    //         if (duplicateItem?.includes(o)) {
    //             // if (firstOption?.includes(o)) {
    //             if (o) {
    //                 newErrorObj[index] = "ERROR" + index;
    //             }

    //             // } else {
    //             //     firstOption.push(o);
    //             // }
    //         }
    //     });

    //     setOptionErrorObject(newErrorObj);

    // };

    // const onSubmit = (values) => {
    //     onClickSaveOption();
    // };

    return (
        // <Formik initialValues={initialValues} validationSchema={productOptions} onSubmit={onSubmit} validateOnMount enableReinitialize>
        //     {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
        //         <Form className="">
        <div className="border border-[#e3e7ed] p-10 mt-5 mx-2">
            <h2 className="text-lg font-medium mr-auto mb-2 p-5">Options</h2>
            <div className={pricingOption === "1" ? "px-5" : "px-5 pb-8"}>
                <input
                    disabled={disableFields}
                    onChange={(e) => {
                        // setFieldValue("pricing_option", pricingOption === "1" ? "0" : "1");
                        onChangePricingOption(e);
                    }}
                    className="show-code form-check-input mr-0"
                    type="checkbox"
                    checked={pricingOption === "1" ? true : false}
                    // value={pricingOption === "1" ? true : false}
                />
                {/* <Input type="checkbox" className="form-check-input border mr-2" name="pricing_option" errorEnabled={false} /> */}
                <span className="text-slate-500 ml-2 mt-1">This product has options, like size or color</span>
            </div>

            <Creatable options={OPTIONS} className="hidden" />
            <div className="grid grid-cols-12 gap-4 gap-y-5">
                {pricingOption === "1" &&
                    values?.options?.map((options_value, mainIndex) => {
                        return (
                            <>
                                <div className="intro-y col-span-12 sm:col-span-12 px-5 border-t border-slate-400/60 dark:border-darkmode-400 mt-5">
                                    <label className="form-label flex mt-4">
                                        Option name <p className="text-sm mb-0 ml-1">(You can create and select option name)</p>
                                    </label>
                                    <div className="flex items-center">
                                        <Creatable
                                            isDisabled={disableFields}
                                            value={options_value?.name?.value ? options_value?.name : ""}
                                            styles={colourStyles}
                                            style={{ boxShadow: "none" }}
                                            placeholder="Select or Create"
                                            options={OPTIONS}
                                            onChange={(e) => {
                                                onChangeOption(setFieldValue, values, e, mainIndex);
                                            }}
                                            className="intro-x login__input form-control block shadow-none"
                                        />
                                        {values?.options?.length > 1 && (
                                            <button
                                                disabled={disableFields}
                                                className="btn btn-danger btn-sm ml-2"
                                                type="button"
                                                onClick={() => {
                                                    const filterValue = values?.options.filter((_, i) => i !== mainIndex);
                                                    setFieldValue("options", filterValue);
                                                    onCheckDuplicateOption(mainIndex);
                                                }}>
                                                <Icon.Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>

                                    {errors.options?.[mainIndex]?.name?.value && touched.options?.[mainIndex]?.name?.value ? (
                                        <p className="text-red-500 mt-2 ml-1">{errors.options?.[mainIndex]?.name?.value}</p>
                                    ) : null}

                                    {optionErrorObject[mainIndex] && (
                                        <p className="text-red-500 mt-2 ml-1">
                                            {`You've already used the option name "${options_value?.name?.label}"`}
                                        </p>
                                    )}
                                </div>
                                {options_value?.name?.value && (
                                    <div className="intro-y col-span-12 sm:col-span-12 px-5">
                                        <label className="form-label mb-0">
                                            Option Value
                                            <span className="text-danger">*</span>
                                        </label>
                                    </div>
                                )}

                                {options_value?.name?.value &&
                                    options_value.value.map((element, index) => (
                                        <>
                                            <div className="intro-y col-span-12 sm:col-span-6 relative px-5" key={index}>
                                                <div className="flex items-center">
                                                    <input
                                                        readOnly={disableFields}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                setFieldValue,
                                                                mainIndex,
                                                                index,
                                                                e,
                                                                values,
                                                                element?.id,
                                                                options_value?.name?.value,
                                                            )
                                                        }
                                                        value={element.value || ""}
                                                        type="text"
                                                        // onBlur={() => setFieldTouched(`options_value[${index}]`)}
                                                        className="intro-x login__input form-control py-2 px-3 block"
                                                        placeholder={
                                                            index !== 0
                                                                ? "Add another value"
                                                                : options_value?.name?.value === "size"
                                                                ? "Medium"
                                                                : options_value?.name?.value === "color"
                                                                ? "Black"
                                                                : options_value?.name?.value === "material"
                                                                ? "Rubber"
                                                                : options_value?.name?.value === "style"
                                                                ? "Classic"
                                                                : "Add value"
                                                        }
                                                        style={{ zIndex: 0 }}
                                                    />

                                                    <div className="flex ml-2">
                                                        {index + 1 === options_value?.value.length ? (
                                                            <button
                                                                disabled={disableFields}
                                                                className="btn btn-primary bg-primary btn-sm ml-auto mr-1"
                                                                type="button"
                                                                onClick={() => {
                                                                    values.options[mainIndex].value = [
                                                                        ...options_value?.value,
                                                                        { id: "", value: "" },
                                                                    ];
                                                                    setFieldValue("options", values.options);
                                                                }}
                                                                style={{
                                                                    backgroundColor: "rgb(30,58,138)",
                                                                }}>
                                                                <Icon.Plus size={14} />
                                                            </button>
                                                        ) : null}

                                                        {options_value?.value.length > 1 ? (
                                                            <button
                                                                disabled={disableFields}
                                                                className="btn btn-danger btn-sm ml-auto"
                                                                type="button"
                                                                onClick={() => {
                                                                    // setFieldTouched(
                                                                    //     `option_name[${index}]`,
                                                                    //     false,
                                                                    // );
                                                                    const filterValue = options_value?.value.filter((_, i) => i !== index);

                                                                    options_value.value = filterValue;
                                                                    values.options[mainIndex] = options_value;
                                                                    setFieldValue("options", values.options, true);
                                                                    onRemoveOptionValueValidation(values);
                                                                }}>
                                                                <Icon.Minus size={14} />
                                                            </button>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                {optionValueErrorObject?.[mainIndex]?.[index] && (
                                                    <p className="text-red-500 mt-2 ml-1">
                                                        {`You've already used the option value "${element.value}"`}
                                                    </p>
                                                )}

                                                {errors.options?.[mainIndex]?.value?.[index]?.value &&
                                                touched.options?.[mainIndex]?.value?.[index] ? (
                                                    <p className="text-red-500 mt-2 ml-1">
                                                        {errors.options?.[mainIndex]?.value?.[index]?.value}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </>
                                    ))}
                                {values?.options?.length === mainIndex + 1 && (
                                    <div className="intro-y col-span-12 sm:col-span-12 border-t border-slate-400/60 dark:border-darkmode-400 flex items-center justify-between">
                                        <div
                                            className={
                                                disableFields
                                                    ? "text-primary flex items-center m-5 cursor-not-allowed"
                                                    : "text-primary flex items-center m-5 cursor-pointer"
                                            }
                                            onClick={() => {
                                                if (!disableFields) onHandleAddOption(setFieldValue, values);
                                            }}>
                                            <Icon.Plus size={18} className="mr-2" /> Add another option
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })}
            </div>
        </div>
        //         </Form>
        //     )}
        // </Formik>
    );
};

export default Options;
