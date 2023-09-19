import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Heading from "../../../components/common/Heading";
import { Link } from "react-router-dom";
import { settlementsConnectorList } from "../../../redux/services/MidAPI";

const CardDesign = ({ title, id }) => (
    <Link
        to={`/default-payout-report/${id}`}
        class="p-4 bg-white rounded-lg md:p-6 dark:bg-gray-800 col-span-12 sm:col-span-4 2xl:col-span-3 box cursor-pointer zoom-in">
        <h2 class="text-xl font-extrabold tracking-tight text-primary dark:text-white text-center"> {title}</h2>
    </Link>
);

const DefaultPayoutReports = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [connectors, setConnectors] = useState([]);
    const { enabledConnector } = useSelector((state) => state.connector);
    const dispatch = useDispatch();

    useEffect(() => {
        settlementsConnectorData();
    }, []);

    const settlementsConnectorData = async () => {
        setIsLoading(true);
        const data = await settlementsConnectorList();

        if (data?.responseCode === 200) {
            setConnectors(data?.data);
        }

        setIsLoading(false);
    };

    const _renderHeading = () => {
        return <Heading title={"Default Payout Reports"} displayBackButton={false} />;
    };

    return (
        <div className="content">
            {/* BEGIN: Heading */}
            {_renderHeading()}
            {/* END: Heading */}
            <div className="intro-y grid grid-cols-12 gap-5">
                <div className="intro-y col-span-12">
                    <div className="grid grid-cols-12 gap-5">
                        {isLoading ? (
                            <div className="flex justify-center h-48 items-center col-span-12">
                                <ClipLoader
                                    loading={true}
                                    color="#1e3a8a"
                                    size={55}
                                    css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                />
                            </div>
                        ) : connectors?.length <= 0 ? (
                            <div className="col-span-12 border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                                <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                            </div>
                        ) : (
                            connectors?.map((connector) => {
                                return <CardDesign title={connector?.name} id={connector?.id} />;
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultPayoutReports;
