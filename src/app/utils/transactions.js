export const transactionsStatusLabels = (status) => {
    switch (status) {
        case 0:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium warning">Pending</span>;

        case 1:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-success">Success</span>;

        case 2:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-warning">Pending</span>;

        case 3:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-warning">Pending</span>;

        case 4:
            return (
                <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-warning">Pending</span>
            );

        case 5:
            return (
                <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-danger">
                    Blocked
                </span>
            );

        case 6:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium  bg-danger">Blocked</span>;

        case 7:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-danger">Declined</span>;

        case 8:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-danger">Declined</span>;

        default:
            break;
    }
};

export const transactionsConnectorAccountStatusLabels = (status) => {
    switch (status) {
        case 0:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium  bg-danger">Self</span>;

        case 1:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-success">Exotic</span>;

        default:
            break;
    }
};

export const transactionsFallBackStatusLabel = (status) => {
    switch (status) {
        case 0:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium  bg-danger">No</span>;

        case 1:
            return <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-success">Yes</span>;

        default:
            break;
    }
};

export const transactionsStatus = [
    { value: "1", label: "Success" },
    { value: "2", label: "Pending"},
    { value: "5", label: "Blocked" },
    { value: "7", label: "Declined" },
    // { value: "0", label: "Unauthorized" },
    // { value: "1", label: "Success" },
    // { value: "2", label: "Redirect" },
    // { value: "3", label: "Pending" },
    // { value: "4", label: "To be confirm" },
    // { value: "5", label: "Validation error" },
    // { value: "6", label: "Blocked" },
    // { value: "7", label: "Declined" },
];
