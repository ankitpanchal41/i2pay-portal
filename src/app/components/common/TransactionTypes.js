import React from "react";

function TransactionTypes({ item }) {
    return (
        <div className="flex flex-wrap">
            {item?.is_refund === 1 && (
                <span
                    className="py-0.5 px-2 ml-1 rounded-full text-xs bg-warning text-white cursor-pointer font-medium">Refund</span>
            )}
            {item?.is_chargeback === 1 && (
                <span
                    className="py-0.5 px-2 ml-1 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">Chargeback</span>
            )}
            {item?.is_suspicious === 1 && (
                <span
                    className="py-0.5 px-2 ml-1 rounded-full text-xs bg-slate-600 text-white cursor-pointer font-medium">Suspicious</span>
            )}
            {item?.is_remove_suspicious === 1 && (
                <span
                    className="py-0.5 px-2 ml-1 rounded-full text-xs bg-success text-white cursor-pointer font-medium">Remove Suspicious</span>
            )}
            {item?.is_remove_suspicious === 1 && (
                <span
                    className="py-0.5 px-2 ml-1 rounded-full text-xs bg-success text-white cursor-pointer font-medium">Remove Suspicious</span>
            )}
            {item?.is_retrieval === 1 && (
                <span
                    className="py-0.5 px-2 ml-1 rounded-full text-xs bg-primary text-white cursor-pointer font-medium">Retrieval</span>
            )}
            {item?.is_remove_retrieval === 1 && (
                <span
                    className="py-0.5 px-2 ml-1 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">Remove Retrieval</span>
            )}
        </div>
    );
}

export default TransactionTypes;
