import { toast } from "react-toastify";

export const showToastMessage = (text, responseCode, options) => {
    const type = responseCode === 200 ? "success" : responseCode === "info" ? "info" : "error";

    const toastAlert = toast?.[type || "success"];

    toastAlert(text, {
        ...options,
    });

    <div className="toastify on toastify-content toastify-right toastify-top" style={{ transform: "translate(0px, 0px)", top: "15px" }}>
        Copied!<span className="toast-close">✖</span>
    </div>;
};

export const showCopyText = () => {
    toast("Copied!");

    // <div className="toastify on toastify-content toastify-right toastify-top" style="transform: translate(0px, 0px); top: 15px;">
    //     Copied!
    // </div>;
};
