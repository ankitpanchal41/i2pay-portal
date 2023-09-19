import React from 'react';
import * as Icon from "react-feather";
import { decode } from "html-entities";
import { Currency } from "../../../../../utils/currency";

const TemplateOneQuantityAndPrice = ({ data, productVariant }) => {
    return (
        <div className='flex gap-2 items-center justify-between my-3 w-full px-5'>
            {/* PRICE */}
            <div className='flex gap-2 items-center'>
                <div className="text-white">Price:</div>
                <div className="text-2xl text-center text-white">
                    {decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}
                    {(productVariant && productVariant.price) || data?.price}
                </div>
                {data?.compare_price ? (
                    <span className="ml-2 text-sm text-white line-through">
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
                    <div className="text-green-300 flex items-center">
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
