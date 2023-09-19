import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { decode } from "js-base64";

const Step3 = ({ id }) => {
    const getHeight = useRef(null);
    const { detailEmailCampaign } = useSelector((state) => state.emailCampaign);

    let HTML = "";

    if (detailEmailCampaign?.content) {
        HTML = decode(detailEmailCampaign?.content);
    }

    return (
        <>
            {HTML && (
                <div className="pt-5 intro-y">
                    <div dangerouslySetInnerHTML={{ __html: HTML }}></div>
                </div>
            )}
        </>
    );
};
export default Step3;
