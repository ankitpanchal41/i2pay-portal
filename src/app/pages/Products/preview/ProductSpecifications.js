import React from "react";

const ProductSpecifications = ({ specifications }) => {
    return (
        <>
            <div className="text-[18px] text-[#3B4863] font-medium mb-2">Specifications:</div>
            <table style={{ borderWidth: "0" }} className="table-auto table rounded-lg mt-4">
                <tbody>
                    {JSON.parse(specifications).map((item, index) => (
                        <tr key={index} className={`h-[50px] ${index % 2 === 0 ? "bg-[#F7F7F780]" : ""}`}>
                            <td className="text-slate-600 dark:text-white"> {item.key}</td>
                            <td className="text-slate-600 dark:text-white"> {item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ProductSpecifications;
