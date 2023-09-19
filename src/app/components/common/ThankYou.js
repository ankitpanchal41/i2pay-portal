import React from "react";
import * as Icon from "react-feather";
import { useLocation } from "react-router-dom";

const ThankYou = () => {
    const { search } = useLocation();
    const [params, setParams] = React.useState({});

    React.useEffect(() => {
        // document.body.classList.remove("login");
        document.body.classList.add("main");
        const tempParams = {};
        decodeURIComponent(search)
            ?.split("?")?.[1]
            ?.split("&")
            ?.forEach((item) => {
                const [key, value] = item.split("=");
                tempParams[key] = value;
            });
        setParams(tempParams);
    }, [search]);

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[#1e3181]">
            <div className="flex justify-center items-center h-full">
                <div className="box w-max p-[30px] m-auto">
                    {params?.status ? (
                        <div className="flex justify-center items-center flex-col">
                            {params?.status === "1" ? (
                                <Icon.CheckCircle size={70} color="green" className="my-2" />
                            ) : (
                                <Icon.XCircle size={70} color="red" className="my-2" />
                            )}
                            {params?.response && <div className="text-2xl my-2">{params?.response}</div>}
                            {params?.order_id && <div className="text-lg my-2">Order Id: {params?.order_id}</div>}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
