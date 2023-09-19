import Images from "../../assets/images";
import { numberOnlyPattern } from "./validationSchema";

export const objectDiff = (oldObj = {}, newObj) => {
    let diff = {};
    Object.keys(newObj).forEach((key) => {
        if (oldObj[key] !== newObj[key]) {
            diff[key] = newObj[key];
        }
    });

    return diff;
};

const images = {
    pdf: Images.pdfLogo,
    xlsx: Images.excelLogo,
    xls: Images.excelLogo,
};

export const getFileType = (path) => {
    if (path) {
        const splitedPath = path?.split("?")?.[0] ? path?.split("?")?.[0]?.split(".") : path?.split(".");
        return splitedPath[splitedPath.length - 1].toLowerCase();
    }
};

export const imageMapping = (path) => {
    return images[getFileType(path)];
};

export const checkIsValidPhoneNo = (value, setFieldValue) => {
    if ((!numberOnlyPattern.test(value) && value) || String(value).length > 12) {
        return;
    }
    setFieldValue(value);
};

export const addDaysInDate = (date, days) => {
    if (date) {
        const newDate = new Date(Number(date));
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    return null;
};

export const adminConnectorStatusLabels = (status) => {
    switch (status) {
        case 0:
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-cyan-400">Not using</span>;
            break;
        case 1:
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-success">Approved</span>;
            break;
        case 2:
            return (
                <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-pending">Pending for approval</span>
            );
            break;
        case 3:
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-danger">Rejected</span>;
            break;
        default:
            break;
    }
};

export const printConnectorsLabels = (connectors) => {
    let html = "";
    Object.keys(connectors).forEach((index) => {
        html += (
            <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer bg- font-medium bg-primary mr-1">
                {connectors[index]}
            </span>
        );
    });

    return html;
};

export const printIpAddressesLabels = (ipAddresses) => {
    let html = "";
    Object.keys(ipAddresses).forEach((index) => {
        html += (
            <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer bg- font-medium bg-primary mr-1">
                {ipAddresses[index]}
            </span>
        );
    });

    return html;
};

export const campaignStatusLabels = (status) => {
    switch (status) {
        case "0":
            return <span class="rounded-full text-[11px] text-[#FFFFFF] cursor-pointer font-medium bg-warning py-[5px] px-[11px]">Incomplete</span>;
            break;
        case "1":
            return <span class="rounded-full text-[11px] text-[#FFFFFF] cursor-pointer font-medium bg-success py-[5px] px-[11px]">Complete</span>;
            break;
        default:
            break;
    }
};

export const printPaymentLinkStatus = (status) => {
    switch (status) {
        case "active":
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-cyan-400">Active</span>;
            break;
        case "inactive":
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-warning">Inactive</span>;
            break;
        case "expired":
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-danger">Expired</span>;
            break;
        default:
            break;
    }
};

export const printPaymentCardStatus = (status) => {
    switch (status) {
        case "active":
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-cyan-400">Active</span>;
            break;
        case "inactive":
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-warning">Inactive</span>;
            break;
        case "expired":
            return <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-danger">Expired</span>;
            break;
        default:
            break;
    }
};

export const truncateString = (str, n) => {
    return str?.length > n ? str?.slice(0, n - 1) + "..." : str;
};

export const checkStatusForPassword = (password) => {
    var strength = {
        0: { percentage: "0%", style: "#ed5565", text: "" },
        1: { percentage: "20%", style: "#ed5565", text: "Worst" },
        2: { percentage: "40%", style: "#ed5565", text: "Bad" },
        3: { percentage: "60%", style: "#f8ac59", text: "Fair" },
        4: { percentage: "80%", style: "#f8ac59", text: "Medium" },
        5: { percentage: "100%", style: "#1ab394", text: "Strong" },
    };

    var result = 0;
    if (/[A-Z]/.test(password)) {
        result = result + 1;
    }
    if (/[a-z]/.test(password)) {
        result = result + 1;
    }
    if (/[0-9]/.test(password)) {
        result = result + 1;
    }
    if (/[!@#\$%\^&\*]/.test(password)) {
        result = result + 1;
    }
    if (password?.length >= 8) {
        result = result + 1;
    }

    return { strength, result };
};

function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = "";
    words[1] = "One";
    words[2] = "Two";
    words[3] = "Three";
    words[4] = "Four";
    words[5] = "Five";
    words[6] = "Six";
    words[7] = "Seven";
    words[8] = "Eight";
    words[9] = "Nine";
    words[10] = "Ten";
    words[11] = "Eleven";
    words[12] = "Twelve";
    words[13] = "Thirteen";
    words[14] = "Fourteen";
    words[15] = "Fifteen";
    words[16] = "Sixteen";
    words[17] = "Seventeen";
    words[18] = "Eighteen";
    words[19] = "Nineteen";
    words[20] = "Twenty";
    words[30] = "Thirty";
    words[40] = "Forty";
    words[50] = "Fifty";
    words[60] = "Sixty";
    words[70] = "Seventy";
    words[80] = "Eighty";
    words[90] = "Ninety";
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        var value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && n_array[i + 1] != 0 && n_array[i + 2] != 0) {
                words_string += "Hundred ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

export function withDecimal(n) {
    var nums = n.toString().split(".");
    var whole = convertNumberToWords(nums[0]);
    if (nums.length == 2) {
        var fraction = convertNumberToWords(nums[1]);
        if (nums[0] <= 0 && (nums[1] === "00" || nums[1] === "0")) {
            return "Zero";
        } else {
            console.log(nums[1])
            if (nums[1] === "00" || nums[1] === "0") {
                return whole + fraction + "Only";
            } else {
                return whole + "Point " + fraction + "Only";
            }
        }
    } else {
        return whole;
    }
}
