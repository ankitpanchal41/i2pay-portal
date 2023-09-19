import React from 'react';
import {getFileType} from "../../utils/helper";
import * as Icon from "react-feather";
import Images from "../../../assets/images";

const DisplayFileType = ({extension, name, url}) => {

    function getExtensionImage(extension) {
        switch (extension) {
            case 'pdf':
                return <img src={Images.FileIconPDF} className="mr-2 h-[35px]"/>;
            case 'xlsx' || "xls":
                return <img src={Images.FileIconExcel} className="mr-2 h-[35px]"/>;
            case 'jpg' || "jpeg" || "png":
                return <img src={Images.FileIconImage} className="mr-2 h-[35px]"/>;
            default:
                return (
                    <span className="relative">
                        <span className="absolute text-white left-[12px] top-[10px]">{extension.charAt(1).toUpperCase()}</span>
                        <img src={Images.FileIconOther} className="mr-2 h-[35px]"/>
                    </span>
                );
        }
    }

    return (
        <a href={url}
           target="_blank"
           className="border border-1 border-[#B4BDCE] color-[#3B4863] px-3 py-2 w-auto mr-3 mb-2 rounded-md flex flex-row justify-center items-center h-[50px]"
        >
            {getExtensionImage(extension)}
            {name}
        </a>
    );
};

export default DisplayFileType;