import { Field, ErrorMessage } from "formik";
import * as Icon from "react-feather";
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

const Input = ({ errorEnabled = true, label, isRequiredField, containerClassName, extraLabel, labelRightContent, info, ...props }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onClickPasswordEye = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onPaste = (e) => {
        if (props?.type === "number") {
            const str = e.clipboardData.getData("Text");
            const re = /^[0-9]*[.]?[0-9]*$/;
            if (!re.test(str)) {
                e.preventDefault();
            }
        }
    };

    return (
        <div className={containerClassName}>
            <Field name={props.name}>
                {({ field, form, meta }) => (
                    <>
                        {label && (
                            <div className="form-label flex justify-between">
                                <div className="text-[#001737] flex items-center">
                                    {label} {extraLabel} {isRequiredField && <span className="text-danger">*</span>}
                                    {info && (
                                        <div data-tip data-for={info} className="cursor-pointer">
                                            <Icon.Info fill="#1d3a8a" color="#FFFFFF" size={15} className="ml-1" />
                                            <ReactTooltip id={info} type="dark" place="bottom" effect="solid">
                                                <div>{info}</div>
                                            </ReactTooltip>
                                        </div>
                                    )}
                                </div>
                                {labelRightContent}
                            </div>
                        )}
                        {props?.textarea === "true" ? (
                            <textarea {...props} {...field} autoComplete="off" />
                        ) : props?.type === "password" ? (
                            <div className={`intro-x p-0 flex items-center`}>
                                <input {...field} {...props} autoComplete="off" type={passwordVisible ? "text" : "password"} />
                                <div
                                    onClick={onClickPasswordEye}
                                    className="cursor-pointer flex justify-center items-center absolute z-50 right-0 mr-3">
                                    {passwordVisible ? <Icon.EyeOff className="w-4 h-4" /> : <Icon.Eye className="w-4 h-4" />}
                                </div>
                            </div>
                        ) : (
                            <input
                                {...field}
                                {...props}
                                autoComplete="off"
                                onPaste={onPaste}
                                onKeyPress={(e) => {
                                    if (props?.type === "number") {
                                        if (
                                            e.key === "1" ||
                                            e.key === "2" ||
                                            e.key === "3" ||
                                            e.key === "4" ||
                                            e.key === "5" ||
                                            e.key === "6" ||
                                            e.key === "7" ||
                                            e.key === "8" ||
                                            e.key === "9" ||
                                            e.key === "0" ||
                                            e.key === "."
                                        ) {
                                        } else {
                                            e.preventDefault();
                                        }
                                    }
                                }}
                            />
                        )}
                        {errorEnabled && meta.touched && meta.error ? <p className="text-red-500 text-[12px] mt-2">{meta.error}</p> : null}
                    </>
                )}
            </Field>
        </div>
    );
};

export default Input;
