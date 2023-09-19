import { Field } from "formik";
import Select from "react-select";
import "../../styles/PhoneInput.css";
import { countryCodes } from "../../../utils/countryCode";
import { useSelector } from "react-redux";
import { decode } from "html-entities";

const PhoneInput = ({
    errorEnabled = true,
    setFieldValue,
    readOnly,
    marginTopNull,
    countryCodeValue,
    touched,
    label,
    extraLabel,
    isRequiredField,
    labelRightContent,
    containerClassName,
    placeholder,
    ...props
}) => {
    const { mode } = useSelector((state) => state.persist);

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
            {label && (
                <div className="form-label flex justify-between">
                    <div>
                        {label} {extraLabel} {isRequiredField && <span className="text-danger">*</span>}
                    </div>
                    {labelRightContent}
                </div>
            )}
            <div className={marginTopNull ? "relative rounded-md shadow-sm" : "mt-5 relative rounded-md shadow-sm"}>
                <div className="absolute inset-y-0 left-0 flex items-center z-[9999]" style={{ width: 70 }}>
                    <label htmlFor="countryCode" className="sr-only">
                        Code
                    </label>
                    <Select
                        menuPortalTarget={document.body}
                        defaultValue={countryCodeValue}
                        isDisabled={readOnly}
                        value={countryCodeValue}
                        styles={{
                            input: (styles) => ({
                                ...styles,
                                border: "none",
                                ":active": {
                                    ...styles[":active"],
                                    outline: "none",
                                },
                                ":focus": {
                                    ...styles[":focus"],
                                    borderColor: "transparent !important",
                                    border: "none !important",
                                },
                                width: "70px",
                                marginLeft: "0px",
                                marginRight: "0px",
                                margin: "0px",
                            }),
                            control: (styles, { isDisabled }) => ({
                                ...styles,
                                border: "none",
                                padding: "0px",
                                margin: "0px",
                                marginLeft: "1px",
                                marginRight: "0px",
                                fontSize: "13px",
                                boxShadow: "none",
                                color: mode === "dark" ? "#FFFFFF" : "#384252",
                                // backgroundColor: mode === "dark" ? "#1b253b" : "white",
                                // backgroundColor: mode === "dark" ? (isDisabled ? "#202a41" : "#1b253b") : isDisabled ? "#f1f5f9" : "white",
                                backgroundColor: "transparent",
                            }),
                            singleValue: (styles, { data }) => ({ ...styles, color: mode === "dark" ? "#FFFFFF" : "#384252" }),
                            indicatorSeparator: () => null,
                            menu: (styles) => ({
                                ...styles,
                                width: "130px",
                                backgroundColor: mode === "dark" ? "#1b253b" : "white",
                            }),
                            menuPortal: (base) => ({ ...base, zIndex: 999 }),
                            dropdownIndicator: () => null,
                        }}
                        options={countryCodes}
                        onChange={(e) => {
                            setFieldValue("countryCode", e);
                        }}
                        // className="py-0 pl-0 pr-3 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                        getOptionLabel={(e) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span style={{ marginLeft: 5 }}>
                                    <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                                </span>
                            </div>
                        )}
                    />
                    {/* <select
                        id="countryCode"
                        name="countryCode"
                        value={countryCodeValue}
                        onChange={(e) => setFieldValue("countryCode", e.target.value)}
                        className="py-0 pl-0 pr-3 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                        {countryCodes?.map((country) => (
                            <option key={country.code} value={country.dial_code}>{`${country.flag} ${country.dial_code}`}</option>
                        ))}
                    </select> */}
                </div>
                {/* <input
                type="number"
                name="mobile"
                style={{ paddingLeft: 85 }}
                className="intro-x login__input form-control py-2 px-3 block"
                placeholder="Mobile"
            /> */}
                <Field name={props.name}>
                    {({ field, form, meta }) => (
                        <>
                            <input
                                maxLength="12"
                                type="number"
                                style={{ paddingLeft: 88 }}
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={placeholder ? placeholder : "Mobile"}
                                readOnly={readOnly}
                                {...props}
                                {...field}
                                onPaste={onPaste}
                                onKeyPress={(e) => {
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
                                }}
                            />
                            {/* {meta.touched && meta.error ? <p className="text-red-500 mt-2 ml-1">{meta.error}</p> : null} */}
                        </>
                    )}
                </Field>
            </div>
            {errorEnabled && props.error && touched ? <p className="text-red-500 mt-2 ml-1">{props.error}</p> : null}
        </div>
    );
};

export default PhoneInput;
