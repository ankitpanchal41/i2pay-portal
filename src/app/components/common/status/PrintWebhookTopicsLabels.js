import React from "react";
import { v4 as UUID } from "uuid";

/**
 * @param connectors  = ["paypal", "stripe"]
 */
const PrintWebhookTopicsLabels = ({ topics }) => {
    return (
        <div className="flex flex-wrap">
            {topics &&
                Object.keys(topics).map((index) => {
                    return (
                        <span
                            key={UUID()}
                            className="ml-1 mt-1 py-0.5 px-2 rounded-full text-xs text-white font-medium bg-primary custom-badge text-[11px]">
                            {topics[index]}
                        </span>
                    );
                })}
        </div>
    );
};

export default PrintWebhookTopicsLabels;
