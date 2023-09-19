import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStepDataStart } from "../../../redux/actions/ApplicationAction";
import { jumpToStepNumber } from "../../../redux/actions/PersistActions";
import { STEP_CURRENT_CHANGE_REQUEST } from "../../../redux/types/StoreSteps";
import * as Icon from "react-feather";

const inactiveClasses = {
    container: "flex flex-row justify-center items-center",
    button: "w-[48px] h-[48px] bg-[#B4BDCE] rounded-full  text-white text-[14px] border-0 mr-3",
    textDiv: "text-[14px] text-[#B4BDCE] mr-3",
    icon: "text-[#B4BDCE]",
};

const activeClasses = {
    container: "flex flex-row justify-center items-center",
    button: "w-[48px] h-[48px] rounded-full bg-[#1E3A8A] text-white text-[14px] border-0 mr-3",
    textDiv: "text-[#1E3A8A] text-[14px] mr-3",
    icon: "text-[#1E3A8A] text-white",
};

const disableClasses = {
    button: "w-[48px] h-[48px]  rounded-full bg-[#F4F5F8] border-none",
    icon: "text-[#F4F5F8] border-none",
};

const MultiStepForm = ({ formSteps, stepNumber, storeFrontStep, disable }) => {
    // const currentStepNumber = stepNumber ? (stepNumber >= formSteps.length ? formSteps.length - 1 : stepNumber) : 0;
    // const progressWidth = useMemo(() => currentStepNumber * Math.ceil(85 / formSteps.length), [stepNumber]);
    const dispatch = useDispatch();

    const state = useSelector((state) => state);
    // console.log({ state });
    const changeStepNumber = (step) => {
        if (!disable) {
            if (step === 3) {
                dispatch(
                    getStepDataStart({ step: 3 }, () => {
                        if (storeFrontStep) {
                            if (state?.storeFrontStep?.defaultStep >= step) {
                                dispatch({
                                    type: STEP_CURRENT_CHANGE_REQUEST,
                                    payload: {
                                        currentStep: step,
                                    },
                                });
                            }
                        } else {
                            dispatch(jumpToStepNumber(step));
                        }
                    }),
                );
            } else {
                if (storeFrontStep) {
                    if (state?.storeFrontStep?.defaultStep >= step) {
                        dispatch({
                            type: STEP_CURRENT_CHANGE_REQUEST,
                            payload: {
                                currentStep: step,
                            },
                        });
                    }
                } else {
                    dispatch(jumpToStepNumber(step));
                }
            }
        }
    };

    return (
        <div
            // className={`relative flex flex-col lg:flex-row justify-center px-5 sm:px-20 before:hidden before:lg:block before:absolute before:w-[65%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-primary`}>
            className={`bg-gray-100 w-full flex flex-row justify-between items-center px-5 md:px-12`}>
            {/* <div
                className={`lg:block invisible lg:visible absolute h-[3px] top-0 bottom-0 mt-4 bg-slate-600 dark:bg-darkmode-600 left-[12rem] sm:left-[12rem]`}
                style={{ width: `${progressWidth}%` }}></div> */}

            {formSteps?.map((step, index) => (
                <div
                    key={index}
                    className={`${
                        stepNumber >= index
                            ? activeClasses.container +
                              (index === 0
                                  ? " flex flex-row py-3"
                                  : " flex flex-row py-3")
                            : inactiveClasses.container +
                              (index === 0
                                  ? " flex flex-row py-3"
                                  : " flex flex-row py-3")
                    }`}>
                    <button
                        onClick={() => changeStepNumber(index + 1)}
                        className={disable ? disableClasses.button : stepNumber >= index ? activeClasses.button : inactiveClasses.button}>
                        {index + 1}
                    </button>
                    <div className={stepNumber >= index ? activeClasses.textDiv : inactiveClasses.textDiv}>{step}</div>
                    <Icon.ArrowRight className={disable ? disableClasses.icon : stepNumber >= index ? activeClasses.icon : inactiveClasses.icon}/>
                </div>
            ))}
        </div>
    );
};

export default memo(MultiStepForm);
