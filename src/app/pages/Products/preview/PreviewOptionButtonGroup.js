import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PreviewOptionButtonGroup = ({ productDetails, onChangeSetProductVariant }) => {
    const { mode } = useSelector((state) => state.persist);
    const [checkCheckedValue, setCheckCheckedValue] = useState(false);
    const [checkedValue, setCheckedValue] = useState([]);
    const [selectedVariable, setSelectedVariable] = useState({});

    useEffect(() => {
        const selectedVariable = {};
        const selectedCheckedValue = [];
        productDetails?.options &&
            Object.keys(productDetails?.options).map((optionLabel, index) =>
                Object.values(productDetails?.options[optionLabel]).map((optionValue, index) =>
                    index === 0 ? (selectedVariable[optionLabel] = optionValue) : "",
                ),
            );

        productDetails?.options &&
            Object.keys(productDetails?.options).map((optionLabel, mainIndex) =>
                Object.values(productDetails?.options[optionLabel]).map((optionValue, index) =>
                    index === 0 ? (selectedCheckedValue[mainIndex] = optionValue) : "",
                ),
            );
        setSelectedVariable(selectedVariable);
        onChangeSetProductVariant(selectedVariable);
        setCheckedValue(selectedCheckedValue);
    }, []);

    const handleInputChange = (optionLabel, inputValue, index) => {
        selectedVariable[optionLabel] = inputValue;
        setCheckCheckedValue(true);

        const newCheckedValue = [...checkedValue];
        newCheckedValue[index] = inputValue;
        setCheckedValue(newCheckedValue);
        onChangeSetProductVariant(selectedVariable);
    };

    return (
        <>
            {/* OPTION LABELS LOOP */}

            {/* {JSON.stringify(productDetails?.variant_values)} */}

            {productDetails?.options &&
                Object.keys(productDetails?.options).map((optionLabel, mainIndex) => (
                    <div className="flex items-center my-3" key={mainIndex}>
                        <span className="text-[16px] text-[#001737] font-semibold dark:text-white mb-1 capitalize mr-3">
                            {optionLabel}:
                        </span>
                        <ul className="flex items-center flex-wrap">
                            {/* LABEL VALUES LOOP */}
                            {productDetails?.options &&
                                Object.values(productDetails?.options[optionLabel]).map((optionValue, index) => (
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            checked={checkedValue[mainIndex] === optionValue}
                                            id={optionLabel + `-` + optionValue}
                                            name={optionLabel}
                                            value={optionValue}
                                            className="hidden peer"
                                            onChange={(e) => handleInputChange(optionLabel, e.target.value, mainIndex)}
                                        />
                                        <label
                                            htmlFor={optionLabel + `-` + optionValue}
                                            className={`inline-flex justify-between items-center text-center py-2 w-fit px-4 bg-white dark:bg-transparent border-2 cursor-pointer peer-checked:border-[#1E3A8A] border-[#E3E7ED] mr-4 mb-2`}>
                                            <div className="block w-full">
                                                <div className="text-[#8E8E8E] text-[14px] font-medium dark:text-white capitalize">
                                                    {optionValue}
                                                </div>
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            {/* LABEL VALUES LOOP */}
                        </ul>
                    </div>
                ))}
            {/* OPTION LABELS LOOP */}
        </>
    );
};

export default PreviewOptionButtonGroup;
