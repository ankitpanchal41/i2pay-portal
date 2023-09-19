import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Icon from "react-feather";
import { Formik, Form } from "formik";
import { contactSchema, productDetails } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { ADD_CONTACT_REQUEST } from "../../redux/actions/Contact";
import { categoryListData, downloadSampleFile, importContact } from "../../redux/services/Contact";

const Creatable = React.lazy(() => import("react-select/creatable"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const PhoneInput = React.lazy(() => import("../../components/common/forms/PhoneInput"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));

const CreateContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);

    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        mobile_no: "",
        category: "",
        countryCode: {
            name: "India",
            value: "+91",
            code: "IN",
            flag: "🇮🇳",
        },
    };

    const [isSubmiting, setIsSubmiting] = useState(false);
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

    const onSubmit = (values) => {
        if (isSubmiting) return;

        setIsSubmiting(true);

        const callBack = () => {
            setIsSubmiting(false);
        };

        const navigateState = () => {
            navigate(`/contact`);
        };

        const payload = {
            ...values,
            country_code: values?.countryCode?.value,
            category: values?.category?.value,
            countryCode: undefined,
        };

        dispatch({ type: ADD_CONTACT_REQUEST, payload, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/contact`);
    };

    const onDownloadSampleFile = async () => {
        const data = await downloadSampleFile();
        if (data) {
            window.location.href = data?.data;
        }
    };

    const onImportFile = async () => {
        hiddenFileInput.current.click();
    };

    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];

        if (fileUploaded) {
            const formData = new FormData();
            formData.append("contacts", fileUploaded);

            const data = await importContact(formData);

            if (data.responseCode === 200) {
                navigate(`/contact`);
            }
        }
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Add Contact"}
                displayBackButton={true}
                onClickBack={onClickBack}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <div className="btn text-sm font-medium text-white bg-primary max-h-[38px] mr-2" onClick={onDownloadSampleFile}>
                            <Icon.Download size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Download Sample File</span>
                        </div>
                        <div className="btn text-sm font-medium text-white bg-primary max-h-[38px]" onClick={onImportFile}>
                            <Icon.Upload size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Import Contact</span>
                        </div>
                        <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} />
                    </div>
                }
            />
        );
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
                                <div className="intro-y box p-5 mt-5">
                                    <Formik initialValues={initialValues} validationSchema={contactSchema} onSubmit={onSubmit}>
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
                                                            disabled={isSubmiting}>
                                                            Save <MiniLoader isLoading={isSubmiting} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
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

export default CreateContact;
