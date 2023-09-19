import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import MiniLoader from "../../../components/common/MiniLoader";
import { messages } from "../../../messages/merchantRegister";
import { subscribedEventWebhookData } from "../../../redux/services/Webhook";
import { Formik, Form, ErrorMessage } from "formik";
import { webhookTestSchema } from "../../../utils/validationSchema";
import Select from "react-select";
import { TEST_WEBHOOK_REQUEST } from "../../../redux/actions/Webhook";
import { useMemo } from "react";
import { useRef } from "react";

const WebhookTestReloadLogs = ({ setRefetchLogs, isSubmiting }) => {
    const [timeRemainingEmail, setTimeRemainingEmail] = useState(15);
    const intervalRefEmail = useRef(null);
    const counterRefEmail = useRef(15);

    useEffect(() => {
        startTimerEmail();
    }, []);

    const startTimerEmail = () => {
        if (intervalRefEmail.current) {
            clearTimerEmail();
        }

        intervalRefEmail.current = setInterval(timerEmail, 1000);
    };

    const timerEmail = () => {
        if (counterRefEmail.current <= 1) {
            clearTimerEmail();
        }
        setTimeRemainingEmail((t) => counterRefEmail.current - 1);
        counterRefEmail.current = counterRefEmail.current - 1;
    };

    const clearTimerEmail = () => {
        clearInterval(intervalRefEmail.current);
    };

    return (
        <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex w-full justify-center items-center flex-col">
            {/* Test Webhook */}
            <div className="text-xl font-medium text-slate-500 dark:text-white ">Webhook Logs not found.</div>
            <div className="text-slate-400 dark:text-white border-b pb-2">You can create logs by testing any webhook events.</div>
            <div className="intro-y p-5">
                {/* BEGIN: Webhook Test Form */}

                <div className="">
                    <div className="w-full">
                        <label className="form-label inline-block mb-2 text-gray-700 dark:text-white">Please reload your logs</label>

                        <div className="flex justify-center items-center mt-5">
                            <button
                                disabled={timeRemainingEmail}
                                type="buttons"
                                className="btn btn-primary w-40 ml-2"
                                onClick={setRefetchLogs}>
                                Reload Logs <MiniLoader isLoading={isSubmiting} />
                                {timeRemainingEmail !== 0 && <span className="ml-2">{timeRemainingEmail}</span>}
                            </button>
                        </div>
                    </div>
                </div>
                {/* END: Webhook Test Form */}
            </div>
            {/* Test Webhook */}
        </div>
    );
};

export default WebhookTestReloadLogs;
