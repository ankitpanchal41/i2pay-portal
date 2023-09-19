import React from "react";
import MerchantBasicDetails from "./MerchantBasicDetails";
import MerchantStepView from "./MerchantStepView";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationListStart, getStepDataStart } from "../../../redux/actions/ApplicationAction";
import MiniLoader from "../../../components/common/MiniLoader";
import MerchantRateDetails from "./MerchantRateDetails";
import Images from "../../../../assets/images";

const MerchantApplicationView = () => {
    const dispatch = useDispatch();
    const { applicationList } = useSelector((state) => state?.application);
    const { userData } = useSelector((state) => state.persist);
    const [isLoading, setIsLoading] = React.useState(false);

    const onLoadEffect = () => {
        setIsLoading(true);
        // dispatch(getStepDataStart({ step: 3 }, () => {}));
        dispatch(getStepDataStart({ step: 1 }, () => {}));
        dispatch(getApplicationListStart(() => setIsLoading(false)));
    };
    React.useEffect(onLoadEffect, []);

    if (isLoading) {
        return (
            <div className="flex justify-center h-48 items-center">
                <MiniLoader isLoading={isLoading} color="#1f3b8a" css="border-width: 6px" size={55} />
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-12 border-0 md:border md:border-1  py-5 pr-5 mt-5 border-[#E3E7ED] pb-0">
                <div className="md:col-span-3 col-span-12 sm:px-0 md:px-5">
                    <MerchantBasicDetails
                        name={userData?.data?.name}
                        email={userData?.data?.email}
                        id={userData?.data?.id}
                        profileImage={userData?.data?.image || Images.profileImage}
                        phoneNo={userData?.data?.country_code + " " + userData?.data?.mobile_no}
                        status={applicationList?.status}
                        reason={applicationList?.reason}
                        entitiesType={applicationList?.entities_type}
                        agreementToken={applicationList?.agreement_token}
                    />
                </div>
                <div className="md:col-span-9 col-span-12">
                    {applicationList?.rates && <MerchantRateDetails data={applicationList?.rates} />}

                    <MerchantStepView
                        title={
                            applicationList?.entities_type === "1" || applicationList?.entities_type === "5"
                                ? "Documents"
                                : "Company Details"
                        }
                        titleIcon={() => <Icon.Book className="feather feather-book w-4 h-4 mr-1" />}
                        data={applicationList?.company || {}}
                        entitiesType={applicationList?.entities_type}
                    />

                    {(applicationList?.entities_type === "2" ||
                        applicationList?.entities_type === "3" ||
                        applicationList?.entities_type === "4" ||
                        applicationList?.entities_type === "6") &&
                        applicationList?.director?.length > 0 && (
                            <MerchantStepView
                                label={
                                    applicationList?.entities_type === "2"
                                        ? "Director"
                                        : applicationList?.entities_type === "3" || applicationList?.entities_type === "4"
                                        ? "Partner"
                                        : applicationList?.entities_type === "6"
                                        ? "Trust"
                                        : "Director"
                                }
                                title={
                                    applicationList?.entities_type === "2"
                                        ? "Director Details"
                                        : applicationList?.entities_type === "3" || applicationList?.entities_type === "4"
                                        ? "Partner Details"
                                        : applicationList?.entities_type === "6"
                                        ? "Trust Details"
                                        : "Director Details"
                                }
                                titleIcon={() => <Icon.Users className="feather feather-book w-4 h-4 mr-1" />}
                                data={applicationList?.director || []}
                            />
                        )}
                    {(applicationList?.entities_type === "2" ||
                        applicationList?.entities_type === "3" ||
                        applicationList?.entities_type === "4" ||
                        applicationList?.entities_type === "6") &&
                        applicationList?.shareholder?.length > 0 && (
                            <MerchantStepView
                                title="Shareholder Details"
                                titleIcon={() => <Icon.Users className="feather feather-book w-4 h-4 mr-1" />}
                                data={applicationList?.shareholder || []}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

// const oldDesign  = () => {
//     return (
//         <>
//             <MerchantBasicDetails
//                 name={userData?.data?.name}
//                 email={userData?.data?.email}
//                 phoneNo={userData?.data?.country_code + " " + userData?.data?.mobile_no}
//                 status={applicationList?.status}
//                 reason={applicationList?.reason}
//             />
//
//             {applicationList?.rates && <MerchantRateDetails data={applicationList?.rates}/>}
//
//             <div className="grid grid-cols-12 gap-6">
//                 <MerchantStepView
//                     title="Company Details"
//                     titleIcon={() => <Icon.Book className="feather feather-book w-4 h-4 mr-1"/>}
//                     data={applicationList?.company || {}}
//                 />
//                 {applicationList?.director?.length > 0 && (
//                     <MerchantStepView
//                         title="Director Details"
//                         titleIcon={() => <Icon.Users className="feather feather-book w-4 h-4 mr-1"/>}
//                         data={applicationList?.director || []}
//                     />
//                 )}
//                 {applicationList?.shareholder?.length > 0 && (
//                     <MerchantStepView
//                         title="Shareholder Details"
//                         titleIcon={() => <Icon.Users className="feather feather-book w-4 h-4 mr-1"/>}
//                         data={applicationList?.shareholder || []}
//                     />
//                 )}
//             </div>
//         </>
//     )
// }

export default MerchantApplicationView;
