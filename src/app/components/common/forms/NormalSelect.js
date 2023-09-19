import React from "react";

const NormalSelect = ({
    errorEnabled = true,
    label,
    isRequiredField,
    containerClassName,
    firstDisableLabel,
    firstEnableLabel,
    data,
    error,
    value,
    ...props
}) => {
    return (
        <div className={containerClassName}>
            {label && (
                <div className="form-label">
                    {label} {isRequiredField && <span className="text-danger">*</span>}
                </div>
            )}
            {
                <select {...props} autoComplete="off">
                    {firstDisableLabel && (
                        <option disabled selected={value === "" ? true : false} value="">
                            {firstDisableLabel}
                        </option>
                    )}
                    {firstEnableLabel && <option value="">{firstEnableLabel}</option>}
                    {data?.map((item, index) => {
                        return (
                            <option key={index} value={item?.value} selected={value === item?.value ? true : false}>
                                {item?.label}
                            </option>
                        );
                    })}
                </select>
            }
            {errorEnabled && error ? <p className="text-red-500 text-[12px] mt-2">{error}</p> : null}
        </div>
    );
};

export default NormalSelect;
