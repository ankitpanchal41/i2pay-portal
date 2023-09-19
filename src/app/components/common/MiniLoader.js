import React from "react";
import { ClipLoader } from "react-spinners";

const MiniLoader = ({ isLoading, size = 10, css, color = "#fff" }) => {
    return (
        <ClipLoader
            loading={isLoading}
            color={color}
            size={size}
            css={"border-width: 1px;border-bottom-color: transparent !important; margin-left: 5px; " + css}
        />
    );
};
export default React.memo(MiniLoader);
