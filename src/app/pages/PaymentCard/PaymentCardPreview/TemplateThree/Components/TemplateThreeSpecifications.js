import React from 'react';

const TemplateOneSpecifications = ({data}) => {
    return (
        <>
            {data?.specifications && JSON.parse(data?.specifications)?.[0]?.value ? (
                <div>
                    <div className="color-teal mt-3 font-extrabold mb-2">Specifications:</div>
                    <table className="table-auto table-sm border table table-striped color-teal">
                        <tbody>
                        {data?.specifications && JSON.parse(data?.specifications).map((item, index) => (
                            <tr key={index}>
                                <td className="border color-teal text-xs "> {item.key}</td>
                                <td className="border color-teal text-xs"> {item.value}</td>
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
