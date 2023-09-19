import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TemplateOneOptionGroup = ({ productDetails, onChangeSetProductVariant }) => {
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
    }, [productDetails]);

    const handleInputChange = (optionLabel, inputValue, index) => {
        selectedVariable[optionLabel] = inputValue;
        setCheckCheckedValue(true);

        const newCheckedValue = [...checkedValue];
        newCheckedValue[index] = inputValue;
        setCheckedValue(newCheckedValue);
        onChangeSetProductVariant(selectedVariable);
    };

    return (
        <div className="px-5">
            {/* OPTION LABELS LOOP */}

            {/* {JSON.stringify(productDetails?.variant_values)} */}
            {productDetails?.options ? <div className="text-white mb-2 text-left text-big font-bold">Options:</div> : null}

            {productDetails?.options &&
                Object.keys(productDetails?.options).map((optionLabel, mainIndex) => (
                    <div className="flex my-1" key={mainIndex}>
                        <div className="text-big col-span-1 text-white mb-1 text-left capitalize mr-2">{optionLabel}</div>
                        <ul className="flex text-left">
                            {/* LABEL VALUES LOOP */}
                            {productDetails?.options &&
                                Object.values(productDetails?.options[optionLabel]).map((optionValue, index) => (
                                    <li key={index} className="px-4">
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
                                            className={`inline-flex items-center text-center p-1 bg-white border-2 rounded-lg cursor-pointer ${
                                                mode === "dark" ? "peer-checked:border-gray-200" : "peer-checked:border-gray-600"
                                            }`}>
                                            <div className="block w-full">
                                                <div className="text-xs lg:text-big lg:font-semibold capitalize px-3">{optionValue}</div>
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            {/* LABEL VALUES LOOP */}
                        </ul>
                    </div>
                ))}
            {/* OPTION LABELS LOOP */}
        </div>
    );
};

export default TemplateOneOptionGroup;
