import { useState, useEffect } from "react";

const Notification = (props) => {
    const { toastList, autoDelete, autoDeleteTime } = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);

        return () => {
            clearInterval(interval);
        };

        // eslint-disable-next-line
    }, [toastList, autoDelete, autoDeleteTime, list]);

    const deleteToast = (id) => {
        const listItemIndex = list.findIndex((e) => e.id === id);
        const toastListItem = toastList.findIndex((e) => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    };

    return (
        <>
            <div className={`notification-container`}>
                {list.map((toast, i) => (
                    <div key={i} className={`mt-3`}>
                        <div id="notification-with-avatar-content" className="animation toastify-content flex pr-0 w-[300px]">
                            {toast?.image && (
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden mr-4">
                                    <img alt="Icewall Tailwind HTML Admin Template" src={toast?.image} />
                                </div>
                            )}

                            <div className="sm:mr-4 w-full">
                                <div className="font-medium">{toast?.title}</div>
                                <div className="text-slate-500 mt-1">{toast?.body}</div>
                            </div>
                            <a
                                onClick={() => {
                                    deleteToast(toast?.id);
                                }}
                                data-dismiss="notification"
                                className="cursor-pointer flex items-center px-6 border-l border-slate-200/60 dark:border-darkmode-400 font-medium text-primary dark:text-slate-400">
                                Close
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Notification;
