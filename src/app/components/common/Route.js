import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { store } from "../../redux/store";

export const PrivateRoute = ({ children, ...rest }) => {
    const { isLoggedIn, userData } = store.getState()?.persist;
    const applicationStatus = store.getState()?.persist?.userData?.data?.application_status;
    // console.log({ userData });

    useEffect(() => {
        // document.body.classList.remove("login");
        document.body.classList.add("main");
    }, []);
    if (isLoggedIn && userData?.data?.redirect_screen === "1") return <Navigate to="/change-password" />;
    else if (applicationStatus == "0" || applicationStatus == "") {
        if (
            window.location.pathname === "/" ||
            window.location.pathname.includes("merchant-register") ||
            window.location.pathname.includes("notifications") ||
            window.location.pathname.includes("profile")
        ) {
            return (
                <>
                    {/* BEGIN: Setting Option */}
                    {/* <Setting /> */}
                    {/* END: Setting Option */}

                    {children}
                </>
            );
        } else {
            return <Navigate to="/" />;
        }
    } else if ((isLoggedIn && userData?.data?.redirect_screen !== "1") || window?.location?.search?.split("=")[1])
        return (
            <>
                {/* BEGIN: Setting Option */}
                {/* <Setting /> */}
                {/* END: Setting Option */}

                {children}
            </>
        );
    else if (!isLoggedIn) return <Navigate to="/login" />;
};

export const AuthRoute = ({ children, ...rest }) => {
    const { isLoggedIn } = useSelector((state) => state.persist);

    useEffect(() => {
        // document.body.classList.remove("main");
        // document.body.classList.add("login");
    }, []);

    return !isLoggedIn ? children : <Navigate to="/" />;
};
