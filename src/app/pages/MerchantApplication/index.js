import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import MultiStepForm from "../../components/common/forms/MultiStep";
import Step1 from "./Step1";
import * as Icon from "react-feather";
import { messages } from "../../messages/merchantRegister";
import { submitStep } from "../../redux/services/Merchant";
import { setLoading } from "../../redux/actions/Loader";
import {
    changeActualStep,
    decreaseStepNumber,
    detailStart,
    increaseStepNumber,
    jumpToStepNumber,
    setStepToActual,
} from "../../redux/actions/PersistActions";
import { getStepDataStart, editStepDataStart, editStepDataEnd, getCategories } from "../../redux/actions/ApplicationAction";
import { objectDiff } from "../../utils/helper";
import Step2Accordion from "./Accordions/Step2Accordion";
import Step3Accordion from "./Accordions/Step3Accordion";
import MiniLoader from "../../components/common/MiniLoader";
import MerchantApplicationView from "./MerchantApplicationView";
import { TOTAL_MERCHANT_APPLICATION_STEP } from "../../utils/constants";
import { useNavigate } from "react-router";

const formSteps = [messages.formStepTitles.step1, messages.formStepTitles.step2, messages.formStepTitles.step3];

const Forms = [Step1, Step2Accordion, Step3Accordion];

const MerchantApplication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userData, stepNumber } = useSelector((state) => state.persist);
    const { applicationStepValues } = useSelector((state) => state.application);
    const [stepValues, setStepValues] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const applicationPercent = useMemo(() => (100 * (stepNumber - 1)) / TOTAL_MERCHANT_APPLICATION_STEP, [stepNumber]);
    const isVisibleUpdate = Number(applicationPercent.toFixed(0)) || userData?.data?.step !== "0" ? true : false;

    const [isVisible, setIsVisible] = React.useState(false);
    const [editClick, setEditClick] = React.useState(false);

    const changeStepNumber = React.useCallback(
        (change, isCreateStep) => {
            if ((stepNumber === 1 && change === -1) || (stepNumber === formSteps.length + 1 && change === 1)) return;
            // setStepNumber((oldStep) => oldStep + change);

            if (change === 1) {
                dispatch(increaseStepNumber({ isCreateStep }));
            } else if (change === -1) {
                dispatch(decreaseStepNumber());
            }
        },
        [stepNumber],
    );

    const onPreviousClick = () => {
        changeStepNumber(-1);
    };

    useEffect(() => {
        const callback = () => {};

        dispatch(getCategories(callback));
    }, []);

    const onStepSave = (data, values, isCreateStep, index, isNew = false) => {
        if (data?.responseCode === 200) {
            let oldStepValues = [...stepValues];
            oldStepValues[stepNumber - 1] = values;

            setStepValues(oldStepValues);

            //     { data },
            //     { values },
            //     { isCreateStep },
            //     { index },
            //     { stepNumber },
            //     { applicationStepValues },
            //     { isNew },
            //     formSteps.length,
            //     !applicationStepValues[stepNumber - 1]?.length,
            //     { data },
            // );

            let isFoundObject = false;
            if (applicationStepValues[stepNumber - 1]?.length) {
                isFoundObject = applicationStepValues[stepNumber - 1]?.some((element) => {
                    if (element?.id) {
                        return true;
                    }
                    return false;
                });
            }

            if (stepNumber === formSteps.length) {
                // navigate("/");
                if (typeof index === "undefined") {
                    changeStepNumber(1, isCreateStep);
                } else {
                    if ((isCreateStep && (!applicationStepValues[stepNumber - 1]?.length || !isFoundObject)) || (isCreateStep && isNew))
                        dispatch(changeActualStep());
                }
                return;
            }

            if (typeof index === "undefined") {
                changeStepNumber(1, isCreateStep);
            } else {
                if ((isCreateStep && (!applicationStepValues[stepNumber - 1]?.length || !isFoundObject)) || (isCreateStep && isNew))
                    dispatch(changeActualStep());
            }
        }
    };

    const onNextClick = React.useCallback(
        async (values, formikBag, index, callback, currentStep = false) => {
            try {
                if (_.isEqual(values, applicationStepValues[stepNumber - 1])) {
                    // if (stepNumber === formSteps.length) {
                    //     navigate("/");
                    // }
                    // alert("HERE 1");
                    if (values?.entities_type === "1" || values?.entities_type === "5") {
                        navigate("/");
                    } else {
                        changeStepNumber(1);
                    }

                    return;
                }

                const dataForDiff = Array.isArray(applicationStepValues[stepNumber - 1])
                    ? applicationStepValues[stepNumber - 1]?.[index]
                    : applicationStepValues[stepNumber - 1];
                const changedValues = objectDiff(dataForDiff, values);
                const formData = new FormData();

                Object.keys(changedValues).forEach((v) => {
                    if (v === "director_additional_document" && changedValues?.[v]) {
                        changedValues[v]?.map((ad) => {
                            if (ad?.additional_document?.includes("https") || ad?.additional_document?.includes("http")) {
                            } else {
                                formData.append(`director_additional_document[]`, ad);
                            }
                        });
                    } else if (v === "share_holder_additional_document" && changedValues?.[v]) {
                        changedValues[v]?.map((ad) => {
                            if (ad?.additional_document?.includes("https") || ad?.additional_document?.includes("http")) {
                            } else {
                                formData.append(`share_holder_additional_document[]`, ad);
                            }
                        });
                    } else {
                        // if (changedValues[v]) {
                        formData.append(v, Array.isArray(changedValues[v]) ? changedValues[v][0] : changedValues[v]);
                        // }
                    }
                });

                let data;
                if (currentStep) {
                    let response = {};

                    Object.keys(values).forEach((item) => {
                        response[item] = values?.[item];
                    });
                    // alert("HERE 2");

                    dispatch(editStepDataEnd({ data: response, step: stepNumber, isCreate: true, index }));
                } else if (values?.director_id) {
                    if (values?.isNew) {
                        data = await submitStep({ director_id: values?.director_id }, stepNumber);

                        if (data) {
                            // alert("HERE 3");
                            let response = {};
                            Object.keys(values).forEach((item) => {
                                if (data?.data?.[item]) response[item] = data?.data?.[item];
                            });
                            response.id = data?.data?.id;
                            dispatch(editStepDataEnd({ data: response, step: stepNumber, isCreate: true, index }));

                            onStepSave(data, values, userData?.data?.step === 3 ? false : true, index, true);
                        }
                    } else {
                        // alert("HERE 4");
                        formData.append("director_id", values?.director_id);
                        await new Promise((resolve) => {
                            dispatch(
                                editStepDataStart(formData, stepNumber, values, (res) => {
                                    onStepSave(res, values, false, index);
                                    resolve();
                                }),
                            );
                        });
                    }
                } else if (
                    (Array.isArray(applicationStepValues[stepNumber - 1]) && applicationStepValues[stepNumber - 1]?.[index]) ||
                    (!Array.isArray(applicationStepValues[stepNumber - 1]) && applicationStepValues[stepNumber - 1])
                ) {
                    // alert("HERE 5");
                    await new Promise((resolve) => {
                        dispatch(
                            editStepDataStart(formData, stepNumber, values, (res) => {
                                onStepSave(res, values, false, index);
                                if (res?.data?.entities_type === "1" || res?.data?.entities_type === "5") {
                                    navigate("/");
                                }
                                resolve();
                            }),
                        );
                    });
                } else {
                    // alert("HERE 6");
                    data = await submitStep(formData, stepNumber);
                    if (data) {
                        // alert("HERE 7");
                        let response = {};
                        // alert("HERE 8");
                        Object.keys(values).forEach((item) => {
                            if (data?.data?.[item]) response[item] = data?.data?.[item];
                        });
                        // alert("HERE 9");
                        response.id = data?.data?.id;
                        // alert("HERE 10");
                        dispatch(editStepDataEnd({ data: response, step: stepNumber, isCreate: true, index }));
                        // alert("HERE 11");
                        onStepSave(data, values, true, index);
                        // alert("HERE 12");

                        if (data?.data?.entities_type === "1" || data?.data?.entities_type === "5") {
                            navigate("/");
                        }
                    }
                }
            } catch (error) {
            } finally {
                if (callback) {
                    callback();
                }
                dispatch(setLoading(false));
            }
        },
        [stepNumber, stepValues, applicationStepValues],
    );

    const CurrentForm = Forms[stepNumber >= Forms.length ? Forms.length - 1 : stepNumber - 1];

    const { applicationList } = useSelector((state) => state?.application);

    const onStepNumberChangeEffect = () => {
        // dispatch(getStepDataStart({ step: 2 }, () => setIsLoading(false)));
        if (applicationList?.status < 1) {
            if (applicationStepValues[stepNumber - 1]) {
                return;
            }
            setIsLoading(true);
            const payload = {
                step: stepNumber > formSteps.length ? formSteps.length : stepNumber,
            };
            dispatch(getStepDataStart(payload, () => setIsLoading(false)));

            if (payload.step === 1) {
                const callback = () => {};
                dispatch(getCategories(callback));
            }
        }

        if (stepNumber === 3 || stepNumber > formSteps.length) {
            dispatch(getStepDataStart({ step: 2 }, () => setIsLoading(false)));
        }
    };

    useEffect(onStepNumberChangeEffect, [stepNumber]);

    useEffect(() => {
        dispatch(setStepToActual());
    }, []);

    useEffect(() => {
        // if (Number(applicationPercent.toFixed(0) && userData?.data?.step !== "0")) {
        setIsVisible(isVisibleUpdate);
        // }
    }, []);

    return (
        <>
            <div className="content">
                {isVisible ? (
                    <>
                        <div className="flex items-center mt-3">
                            {/*<h2 className="intro-y text-lg font-medium mr-auto">Application Form</h2>*/}
                            {(applicationList?.status == 0 || applicationList?.status == 2) && (
                                <div
                                    className="w-full text-right"
                                    onClick={() => {
                                        if (isVisible) {
                                            if (
                                                applicationStepValues?.[0]?.entities_type === "1" ||
                                                applicationStepValues?.[0]?.entities_type === "5"
                                            ) {
                                                dispatch(jumpToStepNumber(1));
                                            }
                                        }
                                        setIsVisible(!isVisible);
                                        setEditClick(!editClick);
                                    }}>
                                    {isVisible ? (
                                        <button className="btn btn-primary text-white py-[10px] px-[16px]">
                                            <Icon.Edit size={15} className="mr-2" /> Edit
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary text-white py-[10px] px-[16px]">
                                            <Icon.Eye size={15} className="mr-2" />
                                            View
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <MerchantApplicationView />
                    </>
                ) : (
                    <div className="intro-y border border-1 border-[#E3E7ED] mt-5">
                        <div className="flex items-center px-5 md:px-20 py-5 md:py-8">
                            <h2 className="intro-y text-lg font-medium mr-auto text-[18px] text-[#001737]">Application Form</h2>

                            {(applicationList?.status == 0 || applicationList?.status == 2) && (
                                <div
                                    className="w-full sm:w-auto flex mt-4 sm:mt-0"
                                    onClick={() => {
                                        if (isVisible) {
                                            if (
                                                applicationStepValues?.[0]?.entities_type === "1" ||
                                                applicationStepValues?.[0]?.entities_type === "5"
                                            ) {
                                                dispatch(jumpToStepNumber(1));
                                            }
                                        }
                                        setIsVisible(!isVisible);
                                        setEditClick(!editClick);
                                    }}>
                                    <button className="btn btn-primary text-white py-[10px] px-[16px]">
                                        {isVisible ? (
                                            <>
                                                <Icon.Edit size={15} className="mr-2" /> Edit
                                            </>
                                        ) : (
                                            <>
                                                <Icon.Eye size={15} className="mr-2" />
                                                View
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                        {stepNumber >= Forms.length && false ? (
                            <h1 className="text-center">You have completed application submission</h1>
                        ) : (
                            <>
                                {/* <div className="bg-gray-100 w-full flex flex-row justify-between items-center px-5 md:px-12">
                                    <MultiStepForm disable={false} formSteps={formSteps} stepNumber={stepNumber - 1} />
                                </div> */}
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-[50vh]">
                                        <MiniLoader isLoading={isLoading} color="#1f3b8a" css="border-width: 6px" size={55} />
                                    </div>
                                ) : (
                                    <CurrentForm
                                        disable={false}
                                        editClick={editClick}
                                        onNextClick={onNextClick}
                                        onPreviousClick={onPreviousClick}
                                        changeStepNumber={changeStepNumber}
                                        stepValues={applicationStepValues[stepNumber - 1] || stepValues[stepNumber - 1]}
                                        entityType={applicationStepValues?.[0]?.entities_type}
                                    />
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default MerchantApplication;
