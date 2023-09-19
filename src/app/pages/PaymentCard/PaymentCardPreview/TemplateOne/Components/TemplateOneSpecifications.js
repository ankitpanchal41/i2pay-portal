import React from 'react';

const TemplateOneSpecifications = ({data}) => {
    return (
        <>
            {data?.specifications && JSON.parse(data?.specifications)?.[0]?.value ? (
            <div className='mt-4 mb-5'>
                <div className="text-slate-600 mb-2">Specifications:</div>
                <table className="table-auto table-sm border table table-striped">
                    <tbody>
                    {data?.specifications && JSON.parse(data?.specifications).map((item, index) => (
                        <tr key={index}>
                            <td className="border text-slate-600 text-xs "> {item.key}</td>
                            <td className="border text-slate-600 text-xs"> {item.value}</td>
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
