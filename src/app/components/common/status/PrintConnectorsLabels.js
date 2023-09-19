import React from 'react';
import { v4 as UUID } from "uuid";

/**
 * @param connectors  = ["paypal", "stripe"]
 */
const PrintConnectorsLabels = ({ connectors }) => {
    return (
        <div>
            { Object.keys(connectors).map( (index) => {
                return  <span key={UUID()} className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer bg- font-medium bg-primary mr-1">{ connectors[index] }</span>
            })}
        </div>
    );
};

export default PrintConnectorsLabels;
