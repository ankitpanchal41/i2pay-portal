import React from "react";

const OnSale = ({ values, setFieldValue, errors, touched }) => {
    return (
        <div className="border border-[#e3e7ed] p-10 mt-5 mx-2">
            <h2 className="text-lg font-medium mr-auto mb-2 p-5">On Sale</h2>
            <div className={"px-5 pb-8"}>
                <input
                    onClick={(e) => {
                        setFieldValue("on_sale", values?.on_sale === 1 ? 0 : 1);
                    }}
                    className="show-code form-check-input mr-0"
                    type="checkbox"
                    checked={values?.on_sale === 1 ? true : false}
                />

                <span className="text-slate-500 ml-2 mt-1">Is this product on sale?</span>
            </div>
        </div>
    );
};

export default OnSale;
