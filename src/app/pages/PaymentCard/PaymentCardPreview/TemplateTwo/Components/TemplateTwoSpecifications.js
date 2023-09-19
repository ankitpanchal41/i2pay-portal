import React from 'react';

const TemplateOneSpecifications = ({data}) => {
    return (
        <>
            {data?.specifications && JSON.parse(data?.specifications)?.[0]?.value ? (
                <div>
                    <div className="text-white mb-2 mt-2">Specifications:</div>
                    <table className="table-auto table-sm border table">
                        <tbody>
                        {data?.specifications && JSON.parse(data?.specifications).map((item, index) => (
                            <tr key={index}>
                                <td className="border text-white text-xs "> {item.key}</td>
                                <td className="border text-white text-xs"> {item.value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </>
    );
};

export default TemplateOneSpecifications;
