import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { messages } from "../../../messages/merchantRegister";
import { Step2SMSToSection } from "../../../utils/validationSchema";
import { categoryListData, contactFilter } from "../../../redux/services/Contact";
import { addSmsCampaignData } from "../../../redux/services/SmsCampaign";

const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));
const Select = React.lazy(() => import("react-select"));

/**
 * Email campaign to section
 */
const Step2 = ({ id, onSaveCurrentStep, onChangeSection }) => {
    const initialValues = {
        contact_category: [],
        contact_sms: [],
    };
    const [isSubmiting, setIsSubmiting] = useState(false);

    const onSubmit = async (values) => {
        setIsSubmiting(true);

        const contactCategory = [];
        values?.contact_category?.map((c) => {
            contactCategory.push(c?.value);
        });

        const contactSMS = [];
        values?.contact_sms?.map((c) => {
            contactSMS.push(c?.value);
        });

        const payload = {
            ...values,
            step: 2,
            id,
            contact_category: JSON.stringify(contactCategory),
            contact_sms: JSON.stringify(contactSMS),
        };

        const response = await addSmsCampaignData(payload);

        if (response?.responseCode === 200) {
            onSaveCurrentStep(3);
            onChangeSection();
        }
        setIsSubmiting(false);
    };

    const [categoryList, setCategoryList] = useState([]);
    const [categoryEmailList, setCategoryEmailList] = useState([]);

    useEffect(() => {
        async function getData() {
            const category = await categoryListData(1);

            if (category?.responseCode === 200) {
                const categoryList = [];
                category?.data?.map((c) => {
                    categoryList?.push({ label: c?.name, value: c?.id });
                });
                setCategoryList(categoryList);
            }
        }

        async function getFilterData() {
            const data = await contactFilter({ category_id: "[]" });

            const categoryList = [];
            if (data?.responseCode === 200) {
                data?.data?.map((c) => {
                    categoryList.push({ label: `${c?.first_name} ${c?.last_name}`, value: c?.id });
                });
                setCategoryEmailList(categoryList);
            }
        }

        getData();
        getFilterData();
    }, []);

    const onChangeContactCategory = async (value) => {
        const payload = [];
        value?.map((c) => {
            payload?.push(c?.value);
        });
        const data = await contactFilter({ category_id: JSON.stringify(payload) });

        const categoryList = [];
        if (data?.responseCode === 200) {
            data?.data?.map((c) => {
                categoryList.push({ label: `${c?.first_name} ${c?.last_name}`, value: c?.id });
            });
            setCategoryEmailList(categoryList);
        }
    };

    const { mode } = useSelector((state) => state.persist);

    const colorStyles = {
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

    return (
        <>
            <div className="pt-5 intro-y">
                <Formik initialValues={initialValues} validationSchema={Step2SMSToSection} onSubmit={onSubmit}>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="">
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-4">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label className="form-label">{messages.smsCampaign.step2.contact_category}</label>
                                    <Select
                                        isMulti
                                        placeholder={messages.smsCampaign.step2.contact_category}
                                        value={values?.contact_category}
                                        styles={colorStyles}
                                        style={{ boxShadow: "none" }}
                                        options={categoryList}
                                        onChange={(e) => {
                                            setFieldValue("contact_category", e);
                                            onChangeContactCategory(e);
                                        }}
                                        className="intro-x login__input form-control block shadow-none"
                                    />
                                    {errors.contact_category && touched.contact_category ? (
                                        <p className="text-red-500 mt-2 ml-1">{errors.contact_category}</p>
                                    ) : null}
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label className="form-label">{messages.smsCampaign.step2.contact_sms}</label>
                                    <Select
                                        isMulti
                                        // defaultValue={{ value: "INR", label: "India Rupee" }}
                                        value={values?.contact_sms}
                                        styles={colorStyles}
                                        style={{ boxShadow: "none" }}
                                        options={categoryEmailList}
                                        placeholder={messages.smsCampaign.step2.contact_sms}
                                        onChange={(e) => {
                                            setFieldValue("contact_sms", e);
                                        }}
                                        className="intro-x login__input form-control block shadow-none"
                                    />
                                    {errors.contact_sms && touched.contact_sms ? (
                                        <p className="text-red-500 mt-2 ml-1">{errors.contact_sms}</p>
                                    ) : null}
                                </div>

                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                    <button
                                        type="buttons"
                                        className="btn btn-primary w-24 ml-2"
                                        onClick={handleSubmit}
                                        disabled={isSubmiting}>
                                        Save <MiniLoader isLoading={isSubmiting} />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
export default Step2;
