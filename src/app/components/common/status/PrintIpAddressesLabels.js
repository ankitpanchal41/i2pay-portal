import React from 'react';
import { v4 as UUID } from "uuid";

/**
 * @param ipAddresses = ["127.0.0.1", "127.0.0.2"]
 */

const PrintIpAddressesLabels = ({ ipAddresses }) => {
    return (
        <div>
            {Object.keys(ipAddresses).map((index) => {
                return <span key={UUID()}
                    className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer bg- font-medium bg-primary mr-1">{ipAddresses[index]}</span>
            })}
        </div>
    );
};

export default PrintIpAddressesLabels;
