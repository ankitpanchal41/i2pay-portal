const NormalInput = ({ errorEnabled = true, extraItem = false, label, isRequiredField, containerClassName, extraLabel, ...props }) => {
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
            <>
                {label && (
                    <div className="form-label">
                        {label} {extraLabel} {isRequiredField && <span className="text-danger">*</span>}
                    </div>
                )}
                {props?.textarea === "true" ? (
                    <textarea {...props} autoComplete="off" />
                ) : (
                    <div className="flex items-center">
                        <input
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
                        {extraItem}
                    </div>
                )}
            </>
        </div>
    );
};

export default NormalInput;
