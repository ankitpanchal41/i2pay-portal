import React from "react";

const Footer = () => {
    return (
        <div className="h-[55px] w-full bg-[#FAFBFC] border-t border-[#E3E7ED] flex items-center justify-center fixed bottom-0 z-[99]">
            <div className="text-[#596882] text-[12px] font-medium">
                Copyright © {new Date().getFullYear()} <span className="text-[#0153C8]">Exotic</span> I All Rights
                Reserved.
            </div>
        </div>
    );
};

export default Footer;
