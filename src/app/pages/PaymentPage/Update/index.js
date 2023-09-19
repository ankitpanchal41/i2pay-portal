import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { paymentPageSchema } from "../../../utils/validationSchema";
import { messages } from "../../../messages/merchantRegister";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { DETAIL_PAYMENT_PAGE_REQUEST, UPDATE_PAYMENT_PAGE_REQUEST } from "../../../redux/actions/PaymentPageAction";
import { countryCodes } from "../../../utils/countryCode";
import { encode, decode } from "js-base64";
import * as Icon from "react-feather";
import Images from "../../../../assets/images";
import { ClipLoader } from "react-spinners";

const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../../components/common/Heading"));
const PaymentBox = React.lazy(() => import("../PaymentBox"));
const PhoneInput = React.lazy(() => import("../../../components/common/forms/PhoneInput"));
const PaymentBoxUserPreview = React.lazy(() => import("../PaymentBoxUserPreview"));
const Dropzone = React.lazy(() => import("../../../components/common/forms/Dropzone"));

const PaymentPageUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageId, paymentPageId } = useParams();

    const initialValuesObj = {
        title: "",
        description: "",
        mobile: "",
        email: "",
        terms_conditions: "",
        amount: "",
        amount_type: "fixed",
        currency: "INR",
        logo: "",
        amount_array: [{ amount: "", label: "" }],
        countryCode: {
            name: "India",
            value: "+91",
            code: "IN",
            flag: "🇮🇳",
        },
    };

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isVisibleSocialMedia, setIsVisibleSocialMedia] = useState(false);
    const { detailPaymentPage } = useSelector((state) => state.paymentPage);

    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [submitValue, setSubmitValue] = useState(false);
    const state = useSelector((state) => state);

    // useEffect(() => {
    //     let template = "";
    //     if (pageId === "1") {
    //         template = PAYMENT_PAGE_1;
    //     } else if (pageId === "2") {
    //         template = PAYMENT_PAGE_2;
    //     } else if (pageId === "3") {
    //         template = PAYMENT_PAGE_3;
    //     } else if (pageId === "4") {
    //         template = PAYMENT_PAGE_4;
    //     } else if (pageId === "5") {
    //         template = PAYMENT_PAGE_5;
    //     }

    //     setInitialValues({
    //         title: "",
    //         description: template,
    //         mobile: "",
    //         email: "",
    //         terms_conditions: "",
    //         amount: "",
    //         amount_type: "fixed",
    //         currency: "INR",
    //         country_code: {
    //             name: "India",
    //             value: "+91",
    //             code: "IN",
    //             flag: "🇮🇳",
    //         },
    //     });
    // }, []);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            navigate("/payment-page");
        };

        setIsLoading(true);
        let payload = { merchant_id: state?.persist?.userData?.data?.id, payment_page_id: paymentPageId };

        dispatch({ type: DETAIL_PAYMENT_PAGE_REQUEST, payload, callBack, navigateListing });
    }, []);

    useEffect(() => {
        if (Object.keys(detailPaymentPage).length !== 0) {
            setIsVisibleSocialMedia(detailPaymentPage?.social_sharing === 1 ? true : false);
            setInitialValues({
                title: detailPaymentPage?.title,
                description: decode(detailPaymentPage?.description),
                mobile: detailPaymentPage?.mobile,
                email: detailPaymentPage?.email,
                terms_conditions: detailPaymentPage?.terms_conditions,
                amount: detailPaymentPage?.amount,
                amount_type: detailPaymentPage?.amount_type,
                currency: detailPaymentPage?.currency,
                logo: detailPaymentPage?.logo,
                amount_array: detailPaymentPage?.amount_type === "multiple" ? detailPaymentPage?.amount_array : [{ amount: "", label: "" }],
                logo_type: detailPaymentPage?.logo_type,
                countryCode: countryCodes.find((c) => c?.value === detailPaymentPage?.country_code),
            });
        }
    }, [detailPaymentPage]);

    const onSubmitAPI = () => {
        const values = submitValue;

        if (isSubmiting) return;

        setIsSubmiting(true);

        const callBack = () => {
            setIsSubmiting(false);
        };

        const navigateState = () => {
            navigate(`/payment-page`);
        };

        const payload = {
            ...values,
            countryCode: undefined,
            country_code: values?.countryCode?.value,
            description: encode(values?.description),
            social_sharing: isVisibleSocialMedia === true ? 1 : 0,
            payment_page_id: paymentPageId,
            preview: undefined,
            merchant_id: state?.persist?.userData?.data?.id,
        };

        if (values?.amount_type === "multiple") {
            payload["amount_array"] = JSON.stringify(values?.amount_array);
            payload["amount"] = undefined;
        } else {
            payload["amount_array"] = undefined;
        }

        const formData = new FormData();
        for (const property in payload) {
            if (property === "logo") {
                if (payload[property]?.includes("http://") || payload[property]?.includes("https://")) {
                } else if (payload[property][0] === undefined) {
                    formData.append(property, "");
                } else {
                    formData.append(property, payload[property][0]);
                }
            } else if (payload[property] !== undefined) {
                formData.append(property, payload[property]);
            }
        }

        dispatch({ type: UPDATE_PAYMENT_PAGE_REQUEST, payload: formData, callBack, navigateState });
    };

    const onSubmit = (values) => {
        let error = false;
        if (values?.amount_type === "multiple") {
            values?.amount_array?.map((v) => {
                if (v?.amount === "" || v?.label === "") {
                    error = true;
                }
            });
        }

        if (error) return false;

        onHandleModal();
        setSubmitValue({
            ...values,
            preview: values?.logo
                ? values?.logo?.includes("http://") || values?.logo?.includes("https://")
                    ? values?.logo
                    : URL.createObjectURL(values?.logo[0])
                : undefined,
        });
    };

    const onClickBack = () => {
        navigate(`/payment-page`);
    };

    const _renderHeading = () => {
        return <Heading title={"Edit Payment Page"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const onHandleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        if (modalVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [modalVisible]);

    const _renderTemplateModal = (data) => {
        return (
            <>
                {/* BEGIN: Template Modal */}
                {modalVisible && (
                    <div className="justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                        <div className="relative w-auto my-6 mx-auto">
                            <button
                                type="buttons"
                                className="btn btn-dark w-10 mr-1 mb-2 absolute bottom-10 right-[50%] cursor-pointer rounded-full opacity-60 z-[999]"
                                onClick={onHandleModal}>
                                <Icon.X size={23} color={"#FFFFFF"} />
                            </button>

                            <div className="overflow-hidden overflow-y-auto h-[100vh] w-[100vw]">
                                <div className="bg-slate-100">
                                    <div className="intro-y">
                                        <div className="overflow-x-auto scrollbar-hidden">
                                            <div className="grid grid-cols-12 gap-6">
                                                <div className="col-span-12 overflow-x-auto overflow-hidden relative">
                                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                        <div className="col-span-12 xl:col-span-12">
                                                            <div className="box min-h-[100vh] flex justify-center">
                                                                <div className="grid grid-cols-12 gap-4 gap-y-5 px-10 max-w-[1369px]">
                                                                    <div className="intro-y col-span-12 xl:col-span-6">
                                                                        <div className="flex justify-between items-center">
                                                                            <h2 className="text-lg font-medium mr-auto mb-4">
                                                                                Payment Page Preview
                                                                            </h2>
                                                                            <button
                                                                                type="buttons"
                                                                                className="btn btn-primary w-24"
                                                                                onClick={onSubmitAPI}
                                                                                disabled={isSubmiting}>
                                                                                Save <MiniLoader isLoading={isSubmiting} />
                                                                            </button>
                                                                        </div>

                                                                        {data?.preview &&
                                                                            (data?.logo_type === "banner" ? (
                                                                                <img
                                                                                    alt="Icewall Tailwind HTML Admin Template"
                                                                                    className="w-[100%]"
                                                                                    src={data?.preview}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    alt="Icewall Tailwind HTML Admin Template"
                                                                                    className="w-[150px]"
                                                                                    src={data?.preview}
                                                                                />
                                                                            ))}

                                                                        <div className="text-primary dark:text-white font-semibold text-3xl mt-5">
                                                                            {data?.title}
                                                                        </div>

                                                                        <div className="mt-5">
                                                                            {data?.description && (
                                                                                <span
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: data?.description,
                                                                                    }}></span>
                                                                            )}
                                                                        </div>
                                                                        {isVisibleSocialMedia && (
                                                                            <div className="mt-8">
                                                                                <label className="form-label">
                                                                                    {messages.paymentPage.share_this}:
                                                                                </label>
                                                                                <div className="flex items-center">
                                                                                    <FacebookIcon size={25} round={true} className="mr-3" />
                                                                                    <TelegramIcon size={25} round={true} className="mr-3" />
                                                                                    <TwitterIcon size={25} round={true} className="mr-3" />
                                                                                    <WhatsappIcon size={25} round={true} className="mr-3" />
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        <div className="mt-8">
                                                                            <label className="form-label">
                                                                                {messages.paymentPage.contactUs}:
                                                                            </label>
                                                                            <div className="flex items-center">
                                                                                <Icon.Mail className="mr-2" />
                                                                                <div>{data?.email}</div>
                                                                            </div>
                                                                            <div className="flex items-center mt-2">
                                                                                <Icon.Phone className="mr-2" />
                                                                                <div>
                                                                                    {data?.country_code}
                                                                                    {data?.mobile}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-8">
                                                                            <label className="form-label">
                                                                                {messages.paymentPage.termsAndConditions}:
                                                                            </label>
                                                                            {data?.terms_conditions && (
                                                                                <p className="mb-3">{data?.terms_conditions}</p>
                                                                            )}
                                                                            <p>
                                                                                You agree to share information entered on this page with
                                                                                Payment For I2pay (owner of this page) and I2pay,
                                                                                adhering to applicable laws.
                                                                            </p>
                                                                        </div>
                                                                        <div className="mt-5 pt-5 border-t-2	">
                                                                            <img
                                                                                alt="Icewall Tailwind HTML Admin Template"
                                                                                className="w-[150px]"
                                                                                src={Images.LogoPrimary}
                                                                            />
                                                                        </div>

                                                                        <div className="grid grid-cols-12 gap-4 gap-y-5 items-center">
                                                                            <div className="intro-y col-span-12 xl:col-span-8">
                                                                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                                                    {/* <button
                                                                        type="buttons"
                                                                        className="btn btn-primary w-24 ml-2"
                                                                        onClick={onHandleModal}
                                                                        // disabled={!isValid || isSubmiting}
                                                                    >
                                                                        Preview <MiniLoader isLoading={isSubmiting} />
                                                                    </button> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="intro-y col-span-12 xl:col-span-6 payment-box-linear-bg">
                                                                        <PaymentBoxUserPreview data={data} disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <img src={require(`../../../assets/images/template${templateNumber}.png`)} className="w-[100%]" /> */}
                            </div>
                        </div>
                    </div>
                )}
                {/* BEGIN: Template Modal */}
            </>
        );
    };

    return (
        <>
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {_renderTemplateModal(submitValue)}

                {/* END: Heading */}
                <div className="intro-y">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 overflow-x-auto overflow-hidden relative">
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
                                    <>
                                        <div className="grid grid-cols-12 gap-4 gap-y-5">
                                            <div className="col-span-12 xl:col-span-12">
                                                <div className="box py-0 px-0">
                                                    <Formik
                                                        initialValues={initialValues}
                                                        validationSchema={paymentPageSchema}
                                                        onSubmit={onSubmit}
                                                        enableReinitialize>
                                                        {({
                                                            handleSubmit,
                                                            errors,
                                                            values,
                                                            setFieldValue,
                                                            setFieldTouched,
                                                            touched,
                                                            isValid,
                                                        }) => (
                                                            <Form className="">
                                                                <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                                    <div className="intro-y col-span-12 xl:col-span-6 p-10">
                                                                        <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                                <label className="form-label">
                                                                                    {messages.paymentPage.logo}
                                                                                    <span className="text-danger"></span>
                                                                                </label>
                                                                                <select
                                                                                    onChange={(e) => {
                                                                                        setFieldValue("logo_type", e.target.value);
                                                                                        setFieldValue("logo", "");
                                                                                    }}
                                                                                    value={values.logo_type}
                                                                                    name="connector_id"
                                                                                    className="form-select intro-x login__input form-control py-2 px-3 block">
                                                                                    <option value="">Select Type Logo / Banner</option>
                                                                                    <option value="logo">Logo</option>
                                                                                    <option value="banner">Banner</option>
                                                                                </select>

                                                                                {values.logo_type && (
                                                                                    <div className="intro-y col-span-12 sm:col-span-12 mt-3">
                                                                                        <Dropzone
                                                                                            type={values.logo_type}
                                                                                            error={errors.logo}
                                                                                            touched={touched.logo}
                                                                                            setFieldValue={setFieldValue}
                                                                                            name="logo"
                                                                                            placeholder={messages.paymentPlaceHolder.logo}
                                                                                            values={values.logo}
                                                                                            accept="image/png,image/jpg,image/jpeg"
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                                <Input
                                                                                    type="text"
                                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                                    placeholder={messages.paymentPlaceHolder.title}
                                                                                    name="title"
                                                                                    label={messages.paymentPage.title}
                                                                                    isRequiredField
                                                                                />
                                                                            </div>

                                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                                <label className="form-label">
                                                                                    {messages.paymentPage.description}{" "}
                                                                                    <span className="text-danger"> *</span>
                                                                                </label>
                                                                                <CKEditor
                                                                                    editor={ClassicEditor}
                                                                                    config={{
                                                                                        placeholder:
                                                                                            messages.paymentPlaceHolder.description,
                                                                                        removePlugins: [
                                                                                            "EasyImage",
                                                                                            "ImageUpload",
                                                                                            "MediaEmbed",
                                                                                        ],
                                                                                    }}
                                                                                    data={values.description}
                                                                                    onChange={(event, editor) => {
                                                                                        const data = editor.getData();

                                                                                        setFieldValue("description", data);
                                                                                    }}
                                                                                />

                                                                                {touched.description && errors.description ? (
                                                                                    <p className="text-red-500 mt-2 ml-1">
                                                                                        {errors.description}
                                                                                    </p>
                                                                                ) : null}
                                                                            </div>
                                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                                {!isVisibleSocialMedia ? (
                                                                                    <span
                                                                                        onClick={() => {
                                                                                            setIsVisibleSocialMedia(!isVisibleSocialMedia);
                                                                                        }}
                                                                                        className="text-[#0153C8] text-[14px] font-medium dark:text-slate-400 whitespace-nowrap truncate cursor-pointer bg-[#F4F5F8] p-2 rounded flex items-center w-fit">
                                                                                        <Icon.PlusSquare
                                                                                            size={15}
                                                                                            color="#677793"
                                                                                            className="mr-2"
                                                                                        />{" "}
                                                                                        Add social media share icons
                                                                                    </span>
                                                                                ) : (
                                                                                    <>
                                                                                        <label className="form-label">
                                                                                            {messages.paymentPage.share_this}
                                                                                        </label>
                                                                                        <div className="flex items-center">
                                                                                            <FacebookIcon
                                                                                                size={25}
                                                                                                round={true}
                                                                                                className="mr-2"
                                                                                            />
                                                                                            <TelegramIcon
                                                                                                size={25}
                                                                                                round={true}
                                                                                                className="mr-2"
                                                                                            />
                                                                                            <TwitterIcon
                                                                                                size={25}
                                                                                                round={true}
                                                                                                className="mr-2"
                                                                                            />
                                                                                            <WhatsappIcon
                                                                                                size={25}
                                                                                                round={true}
                                                                                                className="mr-2"
                                                                                            />
                                                                                            <span
                                                                                                onClick={() => {
                                                                                                    setIsVisibleSocialMedia(
                                                                                                        !isVisibleSocialMedia,
                                                                                                    );
                                                                                                }}
                                                                                                className="font-medium dark:text-slate-400 whitespace-nowrap text-primary truncate cursor-pointer">
                                                                                                Remove
                                                                                            </span>
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </div>

                                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                                <label className="form-label">
                                                                                    {messages.paymentPage.contactUs}{" "}
                                                                                    <span className="text-danger"> *</span>
                                                                                </label>

                                                                                <Input
                                                                                    type="text"
                                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                                    containerClassName="w-full"
                                                                                    placeholder={messages.paymentPlaceHolder.supportEmail}
                                                                                    name="email"
                                                                                    isRequiredField
                                                                                />
                                                                            </div>
                                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                                {/* <Input
                                                                            type="number"
                                                                            className="intro-x login__input form-control py-2 px-3 block"
                                                                            containerClassName="w-full"
                                                                            placeholder={messages.paymentPlaceHolder.supportMobile}
                                                                            name="mobile"
                                                                            isRequiredField
                                                                        /> */}
                                                                                <PhoneInput
                                                                                    countryCodeValue={values.countryCode}
                                                                                    setFieldValue={setFieldValue}
                                                                                    error={errors.mobile}
                                                                                    touched={touched.mobile}
                                                                                    name="mobile"
                                                                                    marginTopNull
                                                                                    placeholder={messages.paymentPlaceHolder.supportMobile}
                                                                                />
                                                                            </div>

                                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                                <Input
                                                                                    // onBlur={() => {
                                                                                    //     if (values?.terms_conditions === "") {
                                                                                    //         setIsVisibleTerms(!isVisibleTerms);
                                                                                    //     }
                                                                                    // }}
                                                                                    type="text"
                                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                                    containerClassName="w-full"
                                                                                    placeholder={
                                                                                        messages.paymentPlaceHolder.termsAndConditions
                                                                                    }
                                                                                    name="terms_conditions"
                                                                                    label={messages.paymentPage.termsAndConditions}
                                                                                    // isRequiredField
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
                                                                    </div>
                                                                    <div className="intro-y col-span-12 xl:col-span-6 payment-box-linear-bg">
                                                                        <PaymentBox
                                                                            values={values}
                                                                            setFieldValue={setFieldValue}
                                                                            errors={errors}
                                                                            isValid={isValid}
                                                                            touched={touched}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </div>
                                            <div className="intro-y col-span-12 sm:col-span-2"></div>
                                        </div>
                                    </>
                                )}
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

export default PaymentPageUpdate;
