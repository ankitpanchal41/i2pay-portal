import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { contactSchema } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { DETAIL_CONTACT_REQUEST, UPDATE_CONTACT_REQUEST } from "../../redux/actions/Contact";
import { countryCodes } from "../../utils/countryCode";
import { ClipLoader } from "react-spinners";
import { categoryListData } from "../../redux/services/Contact";

const Creatable = React.lazy(() => import("react-select/creatable"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const PhoneInput = React.lazy(() => import("../../components/common/forms/PhoneInput"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));

const UpdateContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { contactId } = useParams();

    const initialValuesObj = {
        first_name: "",
        last_name: "",
        email: "",
        mobile_no: "",
        countryCode: {
            name: "India",
            value: "+91",
            code: "IN",
            flag: "🇮🇳",
        },
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const { detailContact } = useSelector((state) => state.contact);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        async function getData() {
            const category = await categoryListData(0);

            if (category?.responseCode === 200) {
                const categoryList = [];
                category?.data?.map((c) => {
                    categoryList?.push({ label: c?.name, value: c?.name });
                });
                setCategoryList(categoryList);
            }
        }

        getData();
    }, []);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            navigate("/contact");
        };

        setIsLoading(true);
        dispatch({ type: DETAIL_CONTACT_REQUEST, payload: { id: contactId }, callBack, navigateListing });
    }, []);

    useEffect(() => {
        setInitialValues({
            first_name: detailContact?.first_name,
            last_name: detailContact?.last_name,
            email: detailContact?.email,
            mobile_no: detailContact?.mobile_no,
            countryCode: countryCodes?.find((c) => c?.value === detailContact?.country_code),
            category: { label: detailContact?.category_name, value: detailContact?.category_name },
        });
    }, [detailContact]);

    const onSubmit = (values) => {
        const callBack = () => {
            setIsSubmitting(false);
        };

        const navigateState = () => {
            navigate(`/contact`);
        };

        setIsSubmitting(true);

        const payload = {
            ...values,
            country_code: values?.countryCode?.value,
            countryCode: undefined,
            category: values?.category?.value,
            contact_id: contactId,
        };

        dispatch({ type: UPDATE_CONTACT_REQUEST, payload, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/contact`);
    };

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
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
        menuList: (styles, { data }) => ({ ...styles, maxHeight: 150 }),
    };

    const _renderHeading = () => {
        return <Heading title={"Edit Contact"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    return (
        <>
            {/* BEGIN: Modal */}
            {/* {_renderModal()} */}
            {/* END: Modal */}

            {/* <div className="mobile-menu md:hidden">
                <div className="mobile-menu-bar">
                    <a href className="flex mr-auto">
                        <img alt="logo" className="w-[30%]" src={Images.logoImage} />
                    </a>
                    <a href="javascript:;" id="mobile-menu-toggler">
                        {" "}
                        <Icon.BarChart2 className="w-8 h-8 text-white transform -rotate-90" />{" "}
                    </a>
                </div>
                <ul className="border-t border-white/[0.08] py-5 hidden">
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Home />{" "}
                            </div>
                            <div className="menu__title">Dashboard</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Box />{" "}
                            </div>
                            <div className="menu__title">Application</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Box />{" "}
                            </div>
                            <div className="menu__title">Connector</div>
                        </a>
                    </li>
                </ul>
            </div> */}
            {/* END: Mobile Menu */}

            {/* BEGIN: Header */}
            {/* <Header /> */}
            {/* END: Header */}

            {/* BEGIN: Menu */}
            {/* <MainMenu active={5}> */}
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {/* BEGIN: Connector Table */}
                                {isLoading ? (
                                    <div className="flex justify-center h-48 items-center">
                                        <ClipLoader
                                            loading={true}
                                            color="#1e3a8a"
                                            size={55}
                                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                        />
                                    </div>
                                ) : (
                                    <div className="intro-y box p-5 mt-5">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={contactSchema}
                                            onSubmit={onSubmit}
                                            validateOnMount
                                            enableReinitialize>
                                            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                                                <Form className="">
                                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.contact.first_name}
                                                                name="first_name"
                                                                label={messages.contact.first_name}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.contact.last_name}
                                                                name="last_name"
                                                                label={messages.contact.last_name}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <label className="form-label flex mt-4">
                                                                Group <p className="text-sm mb-0 ml-1">(You can create and select group)</p>
                                                            </label>
                                                            <Creatable
                                                                // isSearchable
                                                                // defaultValue={"INR"}
                                                                // defaultInputValue=""
                                                                // defaultValue={{ value: "INR", label: "India Rupee" }}
                                                                value={values?.category}
                                                                styles={colourStyles}
                                                                style={{ boxShadow: "none" }}
                                                                placeholder="Select or Create"
                                                                options={categoryList}
                                                                onChange={(e) => {
                                                                    setFieldValue("category", e);
                                                                }}
                                                                className="intro-x login__input form-control block shadow-none"
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                isRequiredField
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.contact.email}
                                                                label={messages.contact.email}
                                                                name="email"
                                                                containerClassName="mt-4"
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <div className="mt-4 mb-[-12px]">
                                                                Mobile No <span className="text-danger">*</span>
                                                            </div>
                                                            <PhoneInput
                                                                countryCodeValue={values.countryCode}
                                                                setFieldValue={setFieldValue}
                                                                error={errors.mobile_no}
                                                                touched={touched.mobile_no}
                                                                name="mobile_no"
                                                            />
                                                        </div>

                                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                            <button
                                                                type="buttons"
                                                                className="btn btn-primary w-24 ml-2"
                                                                onClick={handleSubmit}
                                                                // disabled={!isValid || isSubmitting}
                                                            >
                                                                Update <MiniLoader isLoading={isSubmitting} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                )}
                                {/* END: Connector Table */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END: Content */}
            {/* </MainMenu> */}
            {/* END: Menu */}
        </>
    );
};

export default UpdateContact;
