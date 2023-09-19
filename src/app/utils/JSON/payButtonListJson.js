import gpay from "../../../assets/images/gpay1.png";
import phonepe from "../../../assets/images/phone-pe1.png";
import amazonpay from "../../../assets/images/amazon-pay2.png";
import razorpay from "../../../assets/images/razor-pay2.png";

export const PayButtonListJSON = [
    {
        name: "Buy Now",
        button: (
            <button className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                <img src={gpay} className="w-4 h-4 mr-3 " alt="" />
                <span>Buy Now</span>
            </button>
        ),
        transactions: 12333547,
        totalTransactions: 4100,
    },
    {
        name: "Purchase",
        button: (
            <button className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-yellow-700 rounded-lg focus:shadow-outline hover:bg-yellow-800">
                <img src={amazonpay} className="w-4 h-4 mr-3" alt="" />
                <span>Purchase</span>
            </button>
        ),
        transactions: 12333548,
        totalTransactions: 1254,
    },
    {
        name: "Return",
        button: (
            <button className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-red-700 rounded-lg  hover:bg-red-800">
                <img src={phonepe} className="w-5 h-5 mr-3" alt="" />
                <span> Return</span>
            </button>
        ),
        transactions: 12333549,
        totalTransactions: 5000,
    },
    {
        name: "Wishlist",
        button: (
            <button className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">
                <img src={razorpay} className="w-4 h-4 mr-3" alt="" />

                <span>Wishlist</span>
            </button>
        ),
        transactions: 12333550,
        totalTransactions: 4578,
    },
];
