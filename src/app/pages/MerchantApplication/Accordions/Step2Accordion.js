import React, { useCallback, useMemo } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { v4 as UUID } from "uuid";

import { messages } from "../../../messages/merchantRegister";
import Step2 from "../Step2";
import { increaseStepNumber, jumpToStepNumber } from "../../../redux/actions/PersistActions";
import {
    deleteDirectorShareholderStart,
    deleteDirectorShareholderEnd,
    createStepValue,
    getStepDataStart,
} from "../../../redux/actions/ApplicationAction";
import { setLoading } from "../../../redux/actions/Loader";
import MiniLoader from "../../../components/common/MiniLoader";
import { TOTAL_MERCHANT_APPLICATION_STEP } from "../../../utils/constants";

function generateArray(length, stepValues) {
    return new Array(length).fill("0").map((_, index) => ({ id: stepValues?.[index]?.id || UUID() }));
}

const Step2Accordian = ({ onNextClick, changeStepNumber, stepValues, totalForm, onPreviousClick, editClick, entityType }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = React.useState(0);
    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const { userData } = useSelector((state) => state.persist);
    const stepNumber = Number(userData?.data?.step);

    const applicationPercent = useMemo(() => (100 * stepNumber) / TOTAL_MERCHANT_APPLICATION_STEP, [stepNumber]);

    // const [formsArr, setFormsArr] = React.useState(new Array(stepValues?.length).fill("0"));
    const [formsArr, setFormsArr] = React.useState(generateArray(stepValues?.length || 1, stepValues));
    const [removingEelements, setRemovingElements] = React.useState(true);

    const onAddForm = () => {
        const arr = [...formsArr, { id: UUID() }];
        setIsVisible(arr.length - 1);
        setFormsArr(arr);
        dispatch(createStepValue("director"));
    };

    let stepValuesDisable = true;

    stepValues?.map((item) => {
        if (item && stepValuesDisable) {
            stepValuesDisable = false;
        }
    });

    // const handleAddRemoveElement = (id) => {
    //     if (removingEelements.includes(id)) {
    //         setRemovingElements((elements) => elements.filter((item) => item !== id));
    //     } else {
    //         setRemovingElements((elements) => [...elements, id]);
    //     }
    // };

    const onRemoveForm = (e, index, id) => {
        e.stopPropagation();
        const callback = () => {
            const tempFormsArr = [...formsArr];
            tempFormsArr.splice(index, 1);
            if (isVisible === index) {
                setIsVisible("");
            }
            setFormsArr([...tempFormsArr]);
        };

        if (stepValues?.[index]) {
            const formData = new FormData();
            formData.append("director_id", stepValues?.[index]?.id);
            dispatch(deleteDirectorShareholderStart(formData, "director", stepValues?.[index]?.id, callback));
        } else {
            setIsVisible("");
            dispatch(setLoading(true));
            dispatch(deleteDirectorShareholderEnd(undefined, "director", index));
            setTimeout(() => {
                callback();
                dispatch(setLoading(false));
            }, 1000);
        }
    };

    const handleNext = useCallback(() => {
        if (Number(applicationPercent.toFixed(0)) >= 67) {
            setIsSubmiting(true);
            dispatch(
                getStepDataStart({ step: 3 }, () => {
                    dispatch(jumpToStepNumber(3));
                    setIsSubmiting(false);
                }),
            );
        } else {
            setIsSubmiting(true);
            dispatch(
                getStepDataStart({ step: 3 }, () => {
                    if (stepValues?.length) dispatch(increaseStepNumber({}));
                    setIsSubmiting(false);
                }),
            );
        }
    }, [stepValues, dispatch]);

    // React.useEffect(() => {
    //     const newLength = formsArr.length > (stepValues?.length || 0) ? formsArr.length : stepValues?.length;
    //     // setFormsArr(new Array(newLength).fill("0").map((_, index) => ({ id: stepValues?.[index]?.id || UUID() })));
    //     if (newLength > formsArr.length) {
    //         setFormsArr((old) => [...old, ...generateArray(newLength - formsArr.length, stepValues)]);
    //     }
    // }, [stepValues, formsArr.length]);

    const onSubmit = useCallback(
        (args, index) => {
            const [values, actions, callback] = args;
            const payload = {
                ...values,
                director_id: stepValues?.[index]?.id,
            };
            onNextClick(payload, actions, index, callback);
        },
        [onNextClick, stepValues],
    );

    return (
        <div id="faq-accordion-2" className="accordion accordion-boxed">
            {/* {removingEelements ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <MiniLoader isLoading={removingEelements} color="#1f3b8a" css="border-width: 6px" size={55} />
                </div>
            ) : (
                ""
            )} */}
            <div className="px-5 sm:px-20">
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    <button className="btn btn-primary text-white p-[13px]" onClick={onAddForm}>
                        <Icon.PlusSquare size={15} className="mr-2" /> Add
                    </button>
                </div>
                {formsArr.map((item, index) => (
                    <div className="accordion-item" key={item?.id}>
                        <div id="faq-accordion-content-2" className="accordion-header">
                            <button
                                className="accordion-button collapsed flex justify-between items-center"
                                type="button"
                                onClick={(e) => setIsVisible(isVisible === index ? "" : index)}
                                aria-controls="faq-accordion-collapse-6">
                                <span className="flex items-center">
                                    <span className="h-[25px] w-[25px] bg-[#EEEEEE] rounded-full text-[12px] flex items-center justify-center">{`${
                                        index + 1
                                    }`}</span>
                                    <span className="ml-[15px]">
                                        {entityType === "2"
                                            ? "Directors Details"
                                            : entityType === "3" || entityType === "4"
                                            ? "Partner Details"
                                            : entityType === "6"
                                            ? "Trust Details"
                                            : "Directors Details"}
                                    </span>
                                    {isVisible === index ? (
                                        <Icon.ChevronUp className="ml-2 mt-[2px]" size={18} />
                                    ) : (
                                        <Icon.ChevronDown className="ml-2 mt-[2px]" size={18} />
                                    )}
                                </span>
                                {formsArr?.length > 1 ? (
                                    <button onClick={(e) => onRemoveForm(e, index, item?.id)} className="btn btn-danger w-10 h-10 ml-2">
                                        <Icon.Minus size={20} color="#FFFFFF" />
                                    </button>
                                ) : null}
                            </button>
                        </div>
                        <div
                            id="faq-accordion-collapse-6"
                            className={`accordion-collapse ${isVisible === index ? "show block" : "collapse none"}`}
                            aria-labelledby="faq-accordion-content-2"
                            data-tw-parent="#faq-accordion-2">
                            <div className="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                                <Step2
                                    entityType={entityType}
                                    index={index}
                                    editClick={editClick}
                                    changeStepNumber={changeStepNumber}
                                    stepValues={stepValues?.[index]}
                                    onNextClick={(...args) => onSubmit(args, index)}
                                    onPreviousClick={onPreviousClick}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5 mb-5">
                    <button className="btn btn-secondary w-24" type="button" onClick={onPreviousClick}>
                        Previous
                    </button>
                    <button className="btn btn-primary w-24 ml-2" disabled={stepValuesDisable} onClick={handleNext}>
                        Next
                        <MiniLoader isLoading={isSubmiting} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Step2Accordian);
