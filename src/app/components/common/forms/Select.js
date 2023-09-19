import { Field, ErrorMessage } from "formik";

const Select = ({
    errorEnabled = true,
    label,
    isRequiredField,
    containerClassName,
    firstDisableLabel,
    firstEnableLabel,
    data,
    ...props
}) => {
    return (
        <div className={containerClassName}>
            <Field name={props.name}>
                {({ field, form, meta }) => (
                    <>
                        {label && (
                            <div className="form-label">
                                {label} {isRequiredField && <span className="text-danger">*</span>}
                            </div>
                        )}
                        {
                            <select {...field} {...props} autoComplete="off">
                                {firstDisableLabel && (
                                    <option disabled value="">
                                        {firstDisableLabel}
                                    </option>
                                )}
                                {firstEnableLabel && <option value="">{firstEnableLabel}</option>}
                                {data?.map((item, index) => {
                                    return <option key={index} value={item?.value}>{item?.label}</option>;
                                })}
                            </select>
                        }
                        {errorEnabled && meta.touched && meta.error ? <p className="text-red-500 text-[12px] mt-2">{meta.error}</p> : null}
                    </>
                )}
            </Field>
        </div>
    );
};

export default Select;
