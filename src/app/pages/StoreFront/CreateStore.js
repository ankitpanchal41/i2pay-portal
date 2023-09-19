import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Header from "../../components/common/Header";
import MainMenu from "../../components/common/menu";
import MultiStepForm from "../../components/common/forms/MultiStep";
import { messages } from "../../messages/merchantRegister";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { SET_DEFAULT_STEP_REQUEST, STEP_CHANGE_RESPONSE } from "../../redux/types/StoreSteps";
import {
    ADD_STORE_FRONT_REQUEST,
    editStoreAction,
    EDIT_STORE_FRONT_REQUEST,
    GET_STORE_FRONT_REQUEST,
} from "../../redux/actions/StoreFront";
import Heading from "../../components/common/Heading";
import { store } from "../../redux/store";
import { countryCodes } from "../../utils/countryCode";

const formSteps = [messages.storeFormStepTitles.step1, messages.storeFormStepTitles.step2, messages.storeFormStepTitles.step3];

const MerchantApplication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isEdit = location?.pathname?.includes("edit");

    const [modalVisible, setModalVisible] = useState(false);
    const [templateNumber, setTemplateNumber] = useState(1);
    const [stepNumber, setStepNumber] = useState(2);
    const [submitStep, setSubmitStep] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiLoading, setAPILoading] = useState(false);

    const state = useSelector((state) => state);
    const { userData } = store.getState()?.persist;

    // Set Current Step
    useEffect(() => {
        if (state?.storeFrontStep?.currentStep) {
            setStepNumber(state?.storeFrontStep?.currentStep);
        }
    }, [state?.storeFrontStep?.currentStep]);

    // Set Default Data In Redux
    useEffect(() => {
        if (!isEdit) {
            dispatch({
                type: STEP_CHANGE_RESPONSE,
                payload: {
                    step: {
                        step: 3,
                        value: {
                            store_contact_email: "",
                            store_contact_description: "",
                            contact_image: "",
                            store_contact_mobile: "",
                            countryCode: {
                                name: "India",
                                value: "+91",
                                code: "IN",
                                flag: "🇮🇳",
                            },
                        },
                    },
                },
            });

            dispatch({
                type: STEP_CHANGE_RESPONSE,
                payload: {
                    step: {
                        step: 2,
                        value: {
                            about_description: "",
                            about_image: "",
                        },
                    },
                },
            });

            dispatch({
                type: STEP_CHANGE_RESPONSE,
                payload: {
                    step: {
                        step: 1,
                        value: {
                            store_banner_1: "",
                            store_banner_2: "",
                            store_banner_3: "",
                            store_currency: "INR",
                            store_description: "",
                            store_email: "",
                            store_name: "",
                            template_banner: 1,
                            address_line_1: "",
                            address_line_2: "",
                            city: "",
                            state: "",
                            pincode: "",
                            country: "",
                            banner_image_1_title: "",
                            banner_image_1_description: "",
                            banner_image_2_title: "",
                            banner_image_2_description: "",
                            banner_image_3_title: "",
                            banner_image_3_description: "",
                            logo: "",
                        },
                    },
                },
            });

            dispatch({
                type: STEP_CHANGE_RESPONSE,
                payload: {
                    step: {
                        step: 0,
                    },
                },
            });

            dispatch({
                type: SET_DEFAULT_STEP_REQUEST,
                payload: {
                    defaultStep: 1,
                },
            });
        }
    }, []);

    // Detail APi Call
    useEffect(() => {
        if (isEdit) {
            const callBack = () => {
                setIsLoading(false);
            };

            const navigateListing = () => {
                navigate("/store-front");
            };

            setIsLoading(true);
            const array = location?.pathname?.split("/");
            const id = array[array?.length - 1];

            dispatch({ type: GET_STORE_FRONT_REQUEST, payload: { store_id: id, user_id: userData?.data?.id }, callBack, navigateListing });
        }
    }, []);

    // Loading Get Details
    // useEffect(() => {
    //     setIsLoading(state?.storeFrontStep?.loadingGetDetails);
    // }, []);

    // Set Step Data In Redux
    useEffect(() => {
        if (isEdit && state?.storeFrontStep?.editStoreFrontData) {
            const item = state?.storeFrontStep?.editStoreFrontData;

            dispatch({
                type: SET_DEFAULT_STEP_REQUEST,
                payload: {
                    defaultStep: 3,
                },
            });

            dispatch({
                type: STEP_CHANGE_RESPONSE,
                payload: {
                    step: {
                        step: 1,
                        value: {
                            store_banner_1: item?.banner_image_1,
                            store_banner_2: item?.banner_image_2,
                            store_banner_3: item?.banner_image_3,
                            store_currency: item?.currency,
                            store_description: item?.description,
                            store_name: item?.name,
                            logo: item?.logo,
                            template_banner: item?.template_id,
                            address_line_1: item?.address_line_1,
                            address_line_2: item?.address_line_2,
                            city: item?.city,
                            state: item?.state,
                            pincode: item?.pincode,
                            country: item?.country,
                            banner_image_1_title: item?.banner_image_1_title,
                            banner_image_1_description: item?.banner_image_1_description,
                            banner_image_2_title: item?.banner_image_2_title,
                            banner_image_2_description: item?.banner_image_2_description,
                            banner_image_3_title: item?.banner_image_3_title,
                            banner_image_3_description: item?.banner_image_3_description,
                        },
                    },
                },
            });

            dispatch({
                type: STEP_CHANGE_RESPONSE,
                payload: {
                    step: {
                        step: 2,
                        value: {
                            about_description: item?.about_us,
                            about_image: item?.about_banner_image,
                        },
                    },
                },
            });

            dispatch({
                type: STEP_CHANGE_RESPONSE,
                payload: {
                    step: {
                        step: 3,
                        value: {
                            store_contact_email: item?.contact_us_email,
                            store_contact_description: item?.contact_us_description,
                            contact_image: item?.contact_banner_image,
                            store_contact_mobile: item?.store_contact_mobile,
                            country_code: item?.country_code,
                            countryCode: countryCodes?.find((c) => c?.value === item?.country_code),
                        },
                    },
                },
            });
        }
    }, [state?.storeFrontStep?.editStoreFrontData]);

    // Create And Update API Calls
    useEffect(() => {
        if (state?.storeFrontStep?.currentStep === 3 && submitStep === true) {
            setSubmitStep(false);
            const item = state?.storeFrontStep?.editStoreFrontData;
            const payload = {
                name: state?.storeFrontStep?.step1?.value?.store_name || "",
                template_id: state?.storeFrontStep?.step1?.value?.template_banner || "",
                currency: state?.storeFrontStep?.step1?.value?.store_currency || "",
                description: state?.storeFrontStep?.step1?.value?.store_description || "",
                logo: state?.storeFrontStep?.step1?.value?.logo || "",
                banner_image_1: state?.storeFrontStep?.step1?.value?.store_banner_1 || "",
                banner_image_2: state?.storeFrontStep?.step1?.value?.store_banner_2 || "",
                banner_image_3: state?.storeFrontStep?.step1?.value?.store_banner_3 || "",
                address_line_1: state?.storeFrontStep?.step1?.value?.address_line_1 || "",
                address_line_2: state?.storeFrontStep?.step1?.value?.address_line_2 || "",
                banner_image_1_title: state?.storeFrontStep?.step1?.value?.banner_image_1_title || "",
                banner_image_1_description: state?.storeFrontStep?.step1?.value?.banner_image_1_description || "",
                banner_image_2_title: state?.storeFrontStep?.step1?.value?.banner_image_2_title || "",
                banner_image_2_description: state?.storeFrontStep?.step1?.value?.banner_image_2_description || "",
                banner_image_3_title: state?.storeFrontStep?.step1?.value?.banner_image_3_title || "",
                banner_image_3_description: state?.storeFrontStep?.step1?.value?.banner_image_3_description || "",
                city: state?.storeFrontStep?.step1?.value?.city || "",
                state: state?.storeFrontStep?.step1?.value?.state || "",
                pincode: state?.storeFrontStep?.step1?.value?.pincode || "",
                country: state?.storeFrontStep?.step1?.value?.country || "",
                about_us: state?.storeFrontStep?.step2?.value?.about_description || "",
                about_banner_image: state?.storeFrontStep?.step2?.value?.about_image || "",
                contact_us_description: state?.storeFrontStep?.step3?.value?.store_contact_description || "",
                store_contact_mobile: state?.storeFrontStep?.step3?.value?.store_contact_mobile,
                country_code: state?.storeFrontStep?.step3?.value?.country_code || "",
                contact_us_email: state?.storeFrontStep?.step3?.value?.store_contact_email || "",
                contact_banner_image: state?.storeFrontStep?.step3?.value?.contact_image || "",
                user_id: state?.persist?.userData?.data?.id || "",
            };

            // const changedValues = objectDiff(dataForDiff, payload);

            if (isEdit) {
                const updateValidation = {
                    name: state?.storeFrontStep?.step1?.value?.store_name || "",
                    template_id: state?.storeFrontStep?.step1?.value?.template_banner || "",
                    currency: state?.storeFrontStep?.step1?.value?.store_currency || "",
                    description: state?.storeFrontStep?.step1?.value?.store_description || "",
                    banner_image_1: state?.storeFrontStep?.step1?.value?.store_banner_1 || "",
                    banner_image_2: state?.storeFrontStep?.step1?.value?.store_banner_2 || "",
                    banner_image_3: state?.storeFrontStep?.step1?.value?.store_banner_3 || "",
                    address_line_1: state?.storeFrontStep?.step1?.value?.address_line_1 || "",
                    address_line_2: state?.storeFrontStep?.step1?.value?.address_line_2 || "",
                    banner_image_1_title: state?.storeFrontStep?.step1?.value?.banner_image_1_title || "",
                    banner_image_1_description: state?.storeFrontStep?.step1?.value?.banner_image_1_description || "",
                    banner_image_2_title: state?.storeFrontStep?.step1?.value?.banner_image_2_title || "",
                    banner_image_2_description: state?.storeFrontStep?.step1?.value?.banner_image_2_description || "",
                    banner_image_3_title: state?.storeFrontStep?.step1?.value?.banner_image_3_title || "",
                    banner_image_3_description: state?.storeFrontStep?.step1?.value?.banner_image_3_description || "",
                    city: state?.storeFrontStep?.step1?.value?.city || "",
                    state: state?.storeFrontStep?.step1?.value?.state || "",
                    pincode: state?.storeFrontStep?.step1?.value?.pincode || "",
                    country: state?.storeFrontStep?.step1?.value?.country || "",
                    about_us: state?.storeFrontStep?.step2?.value?.about_description || "",
                    about_banner_image: state?.storeFrontStep?.step2?.value?.about_image || "",
                    contact_us_description: state?.storeFrontStep?.step3?.value?.store_contact_description || "",
                    store_contact_mobile: state?.storeFrontStep?.step3?.value?.store_contact_mobile,
                    logo: state?.storeFrontStep?.step1?.value?.logo || "",
                    // store_contact_mobile:
                    //     countryCodes?.find((c) => c?.value === state?.storeFrontStep?.step3?.value?.store_contact_mobile) || "",
                    country_code: state?.storeFrontStep?.step3?.value?.country_code || "",
                    contact_us_email: state?.storeFrontStep?.step3?.value?.store_contact_email || "",
                    contact_banner_image: state?.storeFrontStep?.step3?.value?.contact_image || "",
                };

                const formData = new FormData();
                Object.keys(payload).forEach((v) => {
                    if (updateValidation[v] !== item[v]) {
                        formData.append(v, payload[v]);
                    }
                });
                const array = location?.pathname?.split("/");
                const id = array[array?.length - 1];
                formData.append("store_id", id);

                const callBack = () => {
                    // navigate(`/store-front`);
                    setAPILoading(false);
                };

                const navigateState = () => {
                    navigate(`/store-front`);
                };

                // dispatch(editStoreAction(formData, callBack, () => navigate(`/store-front`)));
                setAPILoading(true);
                dispatch({
                    type: EDIT_STORE_FRONT_REQUEST,
                    payload: formData,
                    callBack,
                    navigateState,
                });
                // navigate(`/store-front`);
            } else {
                const formData = new FormData();
                Object.keys(payload).forEach((v) => {
                    if (payload[v] !== "") {
                        formData.append(v, payload[v]);
                    }
                });

                const callBack = () => {
                    // navigate(`/store-front`);
                    setAPILoading(false);
                };

                const navigateState = () => {
                    navigate(`/store-front`);
                };

                setAPILoading(true);
                dispatch({
                    type: ADD_STORE_FRONT_REQUEST,
                    payload: formData,
                    callBack,
                    navigateState,
                });
            }
        }
        return true;
    }, [state?.storeFrontStep?.currentStep === 3, submitStep === true]);

    // Back To Listing
    const onClickBack = () => {
        navigate("/store-front");
    };

    // Handle Template Modal
    const onHandleModal = () => {
        setModalVisible(!modalVisible);
    };

    // Set Template
    const onSelectTemplateNumber = (number) => {
        setTemplateNumber(number);
        onHandleModal();
    };

    // Submit Steps
    const onSubmitStep = (value) => {
        dispatch({
            type: STEP_CHANGE_RESPONSE,
            payload: {
                step: { step: stepNumber, value: value },
            },
        });

        if (state?.storeFrontStep?.defaultStep !== 3) {
            dispatch({
                type: SET_DEFAULT_STEP_REQUEST,
                payload: {
                    defaultStep: stepNumber + 1,
                },
            });
        }

        if (stepNumber !== 3) {
            setStepNumber(stepNumber + 1);
            setSubmitStep(false);
        } else {
            setSubmitStep(true);
        }
    };

    // Step Previous
    const onPreviousClick = () => {
        setStepNumber(stepNumber - 1);
    };

    const _renderHeading = () => {
        return <Heading title={isEdit ? "Edit Store" : "Create Store"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const _renderTemplateModal = () => {
        return (
            <>
                {/* BEGIN: Template Modal */}
                {modalVisible && (
                    <div className=" justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                        <div className="relative w-auto my-6 mx-auto">
                            <button
                                type="buttons"
                                className="btn btn-dark w-10 mr-1 mb-2 absolute bottom-10 right-[50%] cursor-pointer rounded-full opacity-60 z-10"
                                onClick={onHandleModal}>
                                <Icon.X size={23} color={"#FFFFFF"} />
                            </button>

                            <div className="overflow-hidden overflow-y-auto h-[100vh] w-[100vw]">
                                <img src={require(`../../../assets/images/template${templateNumber}.png`)} className="w-[100%]" />
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
            {/* <Header /> */}

            {/* BEGIN: Modal */}
            {_renderTemplateModal()}
            {/* END: Modal */}

            {/* BEGIN: Main Menu */}
            {/* <MainMenu active={5}> */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                {/* BEGIN: Content */}
                <div>
                    {isLoading ? (
                        <div className="flex justify-center h-48 items-center">
                            {/* BEGIN: Step Loading */}
                            <ClipLoader
                                loading={true}
                                color="#1e3a8a"
                                size={55}
                                css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                            />
                            {/* END: Step Loading */}
                        </div>
                    ) : (
                        <>
                            {/* BEGIN: Steps */}
                            <div className="intro-y">
                                <MultiStepForm storeFrontStep formSteps={formSteps} stepNumber={stepNumber - 1} />
                            </div>
                            {stepNumber === 1 && <Step1 onSubmitStep={onSubmitStep} onSelectTemplateNumber={onSelectTemplateNumber} />}
                            {stepNumber === 2 && <Step2 onSubmitStep={onSubmitStep} onPreviousClick={onPreviousClick} />}
                            {stepNumber === 3 && (
                                <Step3 isLoading={apiLoading} onSubmitStep={onSubmitStep} onPreviousClick={onPreviousClick} />
                            )}
                            {/* END: Steps */}
                        </>
                    )}
                </div>
                {/* END: Content */}
            </div>
            {/* </MainMenu> */}
            {/* END: Main Menu */}
        </>
    );
};

export default MerchantApplication;
