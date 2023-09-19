import React from "react";
import * as Icon from "react-feather";

const TransactionBox = ({
    title,
    children,
    footerTitle,
    onClickFooter,
    rightTitle,
    onClickRightTitle,
    rightLayout,
    removeFooterIcon,
    removeBottomPadding,
    minHeight = 270,
    height,
    footerLayout,
}) => {
    let classVar = "border-t p-4 px-7 ";
    let classFooter = "h-[55px] flex items-center px-4 border-t justify-center";
    if (footerTitle && onClickFooter) {
        classVar += "min-h-[215px]";
    } else if (height) {
        classVar += "h-[417px]";
    } else {
        classVar += "min-h-[" + minHeight + "px]";
    }

    if (removeBottomPadding) {
        classVar += " pb-0";
    }

    if (onClickFooter) {
        classFooter += " cursor-pointer";
    }

    return (
        <div className="common-border-color border">
            <div className="h-[55px] flex items-center px-4 justify-between">
                <div className="font-semibold text-[#3B4863] text-[14px] mr-2 px-3">{title}</div>
                {rightLayout && rightLayout}
                {rightTitle && onClickRightTitle && (
                    <div className="h-[55px] flex items-center px-4 border-t justify-center cursor-pointer" onClick={onClickRightTitle}>
                        <div className="text-[#97A3B9] text-[12px] font-medium mr-1">{rightTitle}</div>
                        <Icon.ArrowRight color="#97A3B9" size={16} />
                    </div>
                )}
            </div>
            <div className={classVar}>{children}</div>
            {footerLayout && footerLayout}
            {footerTitle && (
                <div className={classFooter} onClick={onClickFooter}>
                    <div className="text-[#97A3B9] text-[12px] font-medium mr-1">{title}</div>
                    {removeFooterIcon ? null : <Icon.ArrowRight color="#97A3B9" size={16} />}
                </div>
            )}
        </div>
    );
};

export default TransactionBox;
