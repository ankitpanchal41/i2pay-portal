import React from "react";
import * as Icon from "react-feather";

const Specifications = ({ values, setFieldValue, errors, touched }) => {
    return (
        <div className="border border-[#e3e7ed] p-10 mt-5 mx-2">
            <h2 className="text-lg font-medium mr-auto mb-2 p-5">Specifications</h2>
            <div className={"px-5 pb-8"}>
                <input
                    onClick={(e) => {
                        setFieldValue("specifications_enable", values?.specifications_enable === "1" ? "0" : "1");
                        setFieldValue("specifications", [{ key: "", value: "" }]);
                    }}
                    className="show-code form-check-input mr-0"
                    type="checkbox"
                    checked={values?.specifications_enable === "1" ? true : false}
                />

                <span className="text-slate-500 ml-2 mt-1">This product has specifications, like brand or system</span>
            </div>
            {values?.specifications_enable === "1" &&
                values?.specifications?.map((s, index) => {
                    return (
                        <div className="grid grid-cols-12 gap-4 gap-y-5 items-center">
                            <div className="intro-y col-span-12 sm:col-span-11 mx-5">
                                <div className="grid grid-cols-12 gap-4 gap-y-5">
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <input
                                            onChange={(e) => {
                                                values.specifications[index].key = e?.target?.value;
                                                setFieldValue("specifications", values.specifications);
                                            }}
                                            value={s?.key || ""}
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={index === 0 ? "Brand" : "Key"}
                                            name="key"
                                        />
                                        {errors.specifications?.[index]?.key && touched.specifications?.[index]?.key ? (
                                            <p className="text-red-500 mt-2 ml-1">{errors.specifications?.[index]?.key}</p>
                                        ) : null}
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <input
                                            onChange={(e) => {
                                                values.specifications[index].value = e?.target?.value;
                                                setFieldValue("specifications", values.specifications);
                                            }}
                                            value={s?.value || ""}
                                            type="text"
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            placeholder={index === 0 ? "Apple" : "Value"}
                                            name="value"
                                        />
                                        {errors.specifications?.[index]?.value && touched.specifications?.[index]?.value ? (
                                            <p className="text-red-500 mt-2 ml-1">{errors.specifications?.[index]?.value}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-1">
                                {values?.specifications?.length > 1 && (
                                    <button
                                        className="btn btn-danger btn-sm ml-auto mr-2"
                                        type="button"
                                        onClick={() => {
                                            const filterValue = values?.specifications?.filter((_, i) => i !== index);
                                            setFieldValue("specifications", filterValue);
                                        }}>
                                        <Icon.Minus size={14} />
                                    </button>
                                )}
                                {values?.specifications?.length === index + 1 && (
                                    <button
                                        className="btn btn-primary bg-primary btn-sm ml-auto"
                                        type="button"
                                        onClick={() => {
                                            values.specifications = [...values.specifications, { key: "", value: "" }];

                                            setFieldValue("specifications", values.specifications);
                                        }}
                                        style={{
                                            backgroundColor: "rgb(30,58,138)",
                                        }}>
                                        <Icon.Plus size={14} />
                                    </button>
                                )}
                            </div>
                            {values?.specifications?.length !== index + 1 ? (
                                <div className="intro-y col-span-12 sm:col-span-12 border-t mb-4 border-slate-400/60 dark:border-darkmode-400 flex items-center justify-between"></div>
                            ) : (
                                <div className="intro-y col-span-12 sm:col-span-12 mb-2 border-slate-400/60 dark:border-darkmode-400 flex items-center justify-between"></div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

export default Specifications;
