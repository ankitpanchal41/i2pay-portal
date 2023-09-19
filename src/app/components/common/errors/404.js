import React from "react";
import * as Icon from "react-feather";
import { Link, useLocation } from "react-router-dom";

const PageNotFound = () => {
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
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="flex justify-center items-center h-full">
                <div className="box w-max p-[50px] m-auto">
                    <div className="flex justify-center items-center flex-col">
                        <Icon.AlertCircle size={70} color="red" className="my-2 mb-5" />
                        <h2 className="text-4xl">404</h2>
                        <p className="text-2xl">
                            <span className="text-red-500">OOPS!</span> PAGE NOT FOUND
                        </p>
                        <p>Sorry, the page you are looking for doesn't exist.</p>
                        <Link to="/" className="btn btn-primary mt-5">
                            Go To Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
