import React, { useCallback } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { v4 as UUID } from "uuid";

import { messages } from "../../../messages/merchantRegister";
import Step3 from "../Step3";
import {
    deleteDirectorShareholderStart,
    deleteDirectorShareholderEnd,
    createStepValue,
    getStepDataStart,
} from "../../../redux/actions/ApplicationAction";
import { setLoading } from "../../../redux/actions/Loader";
import { useNavigate } from "react-router-dom";

function generateArray(length, stepValues) {
    return new Array(length).fill("0").map((_, index) => ({
        id: stepValues?.[index]?.id || UUID(),
        director_id: stepValues?.[index]?.director_id,
        isNew: stepValues?.[index]?.id == undefined ? true : false,
    }));
}

const Step3Accordian = ({ onNextClick, changeStepNumber, stepValues, totalForm, onPreviousClick, editClick }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = React.useState(0);
    const navigate = useNavigate();

    // const [formsArr, setFormsArr] = React.useState(new Array(stepValues?.length).fill("0"));
    const { applicationStepValues } = useSelector((state) => state.application);

    const [formsArr, setFormsArr] = React.useState([]);

    const onAddForm = () => {
        const arr = [...formsArr, { id: UUID(), isNew: true }];

        setIsVisible(arr.length - 1);
        setFormsArr(arr);
        dispatch(createStepValue("shareholder"));
    };

    React.useEffect(() => {
        setFormsArr(generateArray(stepValues?.length || 1, stepValues));
    }, [stepValues]);

    let stepValuesDisable = true;

    stepValues?.map((item) => {
        if (item && stepValuesDisable) {
            stepValuesDisable = false;
        }
    });

    const onRemoveForm = (e, index) => {
        e.stopPropagation();
        const callback = (index) => {
            const tempFormsArr = [...formsArr];
            tempFormsArr.splice(index, 1);
            if (isVisible === index) {
                setIsVisible("");
            }
            setFormsArr([...tempFormsArr]);
            // dispatch(deleteDirectorShareholderEnd(undefined, "shareholder", index));
        };

        if (stepValues?.[index] && !stepValues?.[index]?.isNew) {
            const formData = new FormData();
            formData.append("share_holder_id", stepValues?.[index]?.id);
            dispatch(
                deleteDirectorShareholderStart(formData, "shareholder", stepValues?.[index]?.id, () => {
                    callback(index);
                }),
            );
        } else {
            setIsVisible("");
            dispatch(setLoading(true));
            dispatch(deleteDirectorShareholderEnd(undefined, "shareholder", index));
            setTimeout(() => {
                callback();
                dispatch(setLoading(false));
            }, 1000);
        }
    };

    const handleNext = useCallback(() => {
        // if (stepValues?.length) dispatch(increaseStepNumber({}));
        navigate("/");
    }, [stepValues, dispatch]);

    React.useEffect(() => {
        dispatch(getStepDataStart({ step: 3 }, () => {}));
    }, []);

    const onSubmit = useCallback(
        (args, index) => {
            const [values, actions, callback] = args;
            const payload = {
                ...values,
                share_holder_id: stepValues?.[index]?.id,
            };

            onNextClick(payload, actions, index, callback);
        },
        [onNextClick, stepValues],
    );

    const onPressSameAsDirectorDetails = (e, index, id, isNew) => {
        const value = applicationStepValues[1][e.target.value];
        const payload = {
            share_holder_aadhar_card_back_image: value?.director_aadhar_card_back_image,
            share_holder_aadhar_card_front_image: value?.director_aadhar_card_front_image,
            share_holder_address: value?.director_address,
            share_holder_bank_statement: value?.director_bank_statement,
            share_holder_email: value?.director_email,
            share_holder_latest_utility_bill: value?.director_latest_utility_bill,
            share_holder_name: value?.director_name,
            share_holder_pan_card: value?.director_pan_card,
            share_holder_passport: value?.director_passport,
            share_holder_phone_num: value?.director_phone_num,
            director_id: value?.id,
            // share_holder_articles_of_incorporation: value?.director_articles_of_incorporation,
            // share_holder_ubo_bank_statement: value?.director_ubo_bank_statement,
            // share_holder_processing_history: value?.director_processing_history,
            // share_holder_memorandum_of_association: value?.director_memorandum_of_association,
            // share_holder_additional_document: value?.director_additional_document,
            share_holder_country: value?.director_country,
            id: id,
            isNew,
        };

        onNextClick(payload, "", index, "", 3);
    };

    let unique = [];
    if (applicationStepValues[2]) {
        const existData = [];
        applicationStepValues[2]?.map((data) => {
            if (data) {
                existData.push(data);
            }
        });

        unique = [...new Map(existData.map((item) => [item?.director_id, item?.director_id])).values()];
    }

    return (
        <div id="faq-accordion-2" className="accordion accordion-boxed">
            <div className="px-5 sm:px-20">
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    <button className="btn btn-primary text-white p-[13px]" onClick={onAddForm}>
                        <Icon.PlusSquare size={15} className="mr-2" /> Add
                    </button>
                </div>
                {/* <button onClick={onPressSameAsDirectorDetails} className="btn btn-primary">
                    Same as Directors Details
                </button> */}
                {formsArr.map((item, index) => (
                    <div className="accordion-item" key={item?.id}>
                        <div id="faq-accordion-content-2" className="accordion-header flex items-center">
                            <button
                                className="accordion-button collapsed flex justify-between items-center"
                                type="button"
                                onClick={(e) => setIsVisible(isVisible === index ? "" : index)}
                                aria-controls="faq-accordion-collapse-6">
                                <span className="flex items-center">
                                    <span className="h-[25px] w-[25px] bg-[#EEEEEE] rounded-full text-[12px] flex items-center justify-center">{`${
                                        index + 1
                                    }`}</span>
                                    <span className="ml-[15px]">{messages.formStepTitles.step3}</span>

                                    {isVisible === index ? (
                                        <Icon.ChevronUp className="ml-2 mt-[2px]" size={18} />
                                    ) : (
                                        <Icon.ChevronDown className="ml-2 mt-[2px]" size={18} />
                                    )}
                                </span>
                            </button>

                            <div className="flex items-center">
                                {(item?.isNew || item?.director_id) && (
                                    <select
                                        name="listingType"
                                        className="form-select min-w-[200px] rounded-none py-[6px] text-[12px]"
                                        onChange={(e) => {
                                            onPressSameAsDirectorDetails(e, index, item?.id, item?.isNew);
                                        }}
                                        value={
                                            applicationStepValues[1]?.findIndex(
                                                (d) => d?.id === applicationStepValues[2]?.[index]?.director_id,
                                            ) === -1
                                                ? ""
                                                : applicationStepValues[1]?.findIndex(
                                                      (d) => d?.id === applicationStepValues[2]?.[index]?.director_id,
                                                  )
                                        }
                                        defaultValue={""}>
                                        <option value="" disabled>
                                            Select same as director
                                        </option>

                                        {applicationStepValues[1]?.map((item, index) => {
                                            if (item?.director_name) {
                                                return (
                                                    <option value={index} disabled={unique?.includes(item?.id)}>
                                                        {item?.director_name}
                                                    </option>
                                                );
                                            }
                                        })}
                                    </select>
                                )}

                                {formsArr?.length > 1 ? (
                                    <button
                                        onClick={(e) => onRemoveForm(e, index)}
                                        className="btn btn-danger w-[32px] h-[32px] p-[6px] ml-2">
                                        <Icon.Minus size={20} color="#FFFFFF" />
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        <div
                            id="faq-accordion-collapse-6"
                            className={`accordion-collapse ${isVisible === index ? "show block" : "collapse none"}`}
                            aria-labelledby="faq-accordion-content-2"
                            data-tw-parent="#faq-accordion-2">
                            <div className="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                                <Step3
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
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Step3Accordian);
