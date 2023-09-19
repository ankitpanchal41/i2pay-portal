import React from "react";
import Images from "../../../assets/images";
import PlaceholderLoading from "react-placeholder-loading";

const OverViewCard = ({ isLoading = false, data }) => {
    return (
        <div className="grid grid-cols-12 gap-6 mt-6 md:mt-0">
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-medium text-lg leading-6">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-normal text-xs mt-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                        <div>
                            <img src={Images.FeaturesOfCategory} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">Our Category</div>
                            <div className="text-white font-medium text-lg leading-6">Features of Category</div>
                            {/* <div className="text-white font-normal text-xs mt-3">Total 35 application</div> */}
                        </div>
                        <div>
                            <img src={Images.FeaturesOfCategory} />
                        </div>
                    </div>
                </div>
            )}
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-medium text-lg leading-6">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-normal text-xs mt-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                        <div>
                            <img src={Images.MerchantDetails} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">Merchant</div>
                            <div className="text-white font-medium text-lg leading-6">
                                Merchant
                                <br /> Details
                            </div>
                            <div className="text-[#E74C3C] font-medium text-[10px] bg-[#FFFFFF] rounded-full px-2 mt-3">
                                {data?.application_status == 0 && "In Progress"}
                                {data?.application_status == 1 && "Approved"}
                                {data?.application_status == 2 && "Reassigned"}
                                {data?.application_status == 3 && "Rejected"}
                                {data?.application_status == 4 && "Agreement Send"}
                                {data?.application_status == 5 && "Agreement Received"}
                                {data?.application_status == 6 &&
                                    (data?.application_status?.reason ? "Reassigned Agreement" : "Signed Agreement")}
                                {data?.application_status == 7 && "Rate Accepted"}
                                {data?.application_status == 8 && "Not Interested"}
                                {data?.application_status == 9 && "Terminated"}
                                {data?.application_status == 10 && "Decline"}
                            </div>
                        </div>
                        <div>
                            <img src={Images.MerchantDetails} />
                        </div>
                    </div>
                </div>
            )}
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-medium text-lg leading-6">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-normal text-xs mt-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                        <div>
                            <img src={Images.EmailAndSMSMarketing} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">Campaigns</div>
                            <div className="text-white font-medium text-lg leading-6">
                                E-mail and
                                <br />
                                SMS marketing
                            </div>
                            <div className="text-white font-normal text-xs mt-3">View Campaigns</div>
                        </div>
                        <div>
                            <img src={Images.EmailAndSMSMarketing} />
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-medium text-lg leading-6">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-white font-normal text-xs mt-3">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                        <div>
                            <img src={Images.LiveTransactionAndRoses} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="over-view-bg-box flex items-center justify-between p-5">
                        <div>
                            <div className="text-white font-normal text-xs mb-3">Transaction</div>
                            <div className="text-white font-medium text-lg leading-6">
                                Live Transaction
                                <br />
                                and Processing
                            </div>
                            <div className="text-white font-normal text-xs mt-3">View Transaction</div>
                        </div>
                        <div>
                            <img src={Images.LiveTransactionAndRoses} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverViewCard;
