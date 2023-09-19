import React from 'react';
import * as Icon from "react-feather";
import { decode } from "html-entities";
import { Currency } from "../../../../../utils/currency";

const TemplateOneQuantityAndPrice = ({ data, productVariant }) => {
    return (
        <div className='flex gap-2 items-center justify-between my-3 px-5'>
            {/* PRICE */}
            <div className='flex gap-2 items-center'>
                <div className="t5-color-brown">Price:</div>
                <div className="text-2xl text-center t5-color-brown">
                    {decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}
                    {(productVariant && productVariant.price) || data?.price}
                </div>
                {data?.compare_price ? (
                    <span className="ml-2 text-sm t5-color-brown line-through dark:text-white">
                        {decode(
                            Currency.find((c) => c?.value === data?.currency)?.symbol,
                        )}
                        {data?.compare_price}
                    </span>
                ) : null}
            </div>
            {/* PRICE */}

            {/* QUANTITY */}
            <div className="mb-1 relative top-[2px]">
                {(productVariant && productVariant?.quantity || data?.quantity) > 0 ? (
                    <div className="text-success flex items-center">
                        <div className="mr-1">
                            <Icon.CheckCircle size={16} />
                        </div>
                        <div>
                            <span className="font-bold">{productVariant?.quantity || data?.quantity}</span> Quantity available
                        </div>
                    </div>
                ) : (
                    <div className="text-danger flex items-center">
                        <div className="mr-1">
                            <Icon.XCircle size={16} />
                        </div>
                        <div>Out of stock</div>
                    </div>
                )}
            </div>
            {/* QUANTITY */}

        </div>
    );
};

export default TemplateOneQuantityAndPrice;
