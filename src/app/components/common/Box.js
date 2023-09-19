import React from 'react';
import * as Icon from "react-feather";

const Box = (props) => {
    return (
        <div className="bg-white mb-5">
            <h2 className="bg-[#1d3a8a] font-medium text-white text-[14px] h-[54px] px-7 flex flex-row items-center rounded-t">
                {/*{props?.icon ? props.icon : null}*/}
                {props.sliderIndex ? props.sliderIndex + '. ' : null}
                {props.header}
            </h2>
            <div className={!props.noBodyDesign ? `text-gray-600 border border-1 p-4 border-[#E3E7ED] rounded-b` : ``}>
                {props.children}
            </div>
        </div>
    );
};

export default Box;