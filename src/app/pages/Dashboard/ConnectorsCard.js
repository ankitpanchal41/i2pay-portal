import React, { useState, useEffect } from "react";
import PlaceholderLoading from "react-placeholder-loading";
import { getConnectorLogo } from "../../redux/services/Dashboard";
import { useSelector } from "react-redux";

const ConnectorsCard = () => {
    const { userData } = useSelector((state) => state.persist);
    const [isLoading, setIsLoading] = useState(false);
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        getStoreLogoData();
    }, []);

    const getStoreLogoData = async () => {
        setIsLoading(true);
        const payload = {
            logo_number: 3,
        };
        const data = await getConnectorLogo(payload);

        if (data?.responseCode === 200) {
            setPageData(data?.data);
        }

        setIsLoading(false);
    };

    return (
        <div className="grid grid-cols-12 gap-6 gap-y-12 py-[12px]">
            {isLoading ? (
                <>
                    <div className="intro-y col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center">
                        <PlaceholderLoading shape="rect" width={150} height={56} />
                    </div>
                    <div className="intro-y col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center">
                        <PlaceholderLoading shape="rect" width={150} height={56} />
                    </div>
                    <div className="intro-y col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center">
                        <PlaceholderLoading shape="rect" width={150} height={56} />
                    </div>
                </>
            ) : pageData?.length > 0 ? (
                pageData?.map((logo) => {
                    return (
                        <div className="intro-y col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center h-[57px]">
                            <img src={logo} className="py-[7px] max-h-[57px] w-[100%]" />
                        </div>
                    );
                })
            ) : (
                <div className="intro-y col-span-12 flex items-center justify-center text-[#97A3B9] h-[57px]">No Data Found</div>
            )}
        </div>
    );
};

export default ConnectorsCard;
