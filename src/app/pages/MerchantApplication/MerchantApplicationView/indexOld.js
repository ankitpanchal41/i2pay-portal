import React from "react";
import MerchantBasicDetails from "./MerchantBasicDetails";
import MerchantStepView from "./MerchantStepView";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationListStart, getStepDataStart } from "../../../redux/actions/ApplicationAction";
import MiniLoader from "../../../components/common/MiniLoader";
import MerchantRateDetails from "./MerchantRateDetails";

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
            <MerchantBasicDetails
                name={userData?.data?.name}
                email={userData?.data?.email}
                phoneNo={userData?.data?.country_code + " " + userData?.data?.mobile_no}
                status={applicationList?.status}
                reason={applicationList?.reason}
            />

            {applicationList?.rates && <MerchantRateDetails data={applicationList?.rates} />}

            <div className="grid grid-cols-12 gap-6">
                <MerchantStepView
                    title="Company Details"
                    titleIcon={() => <Icon.Book className="feather feather-book w-4 h-4 mr-1" />}
                    data={applicationList?.company || {}}
                />
                {applicationList?.director?.length > 0 && (
                    <MerchantStepView
                        title="Director Details"
                        titleIcon={() => <Icon.Users className="feather feather-book w-4 h-4 mr-1" />}
                        data={applicationList?.director || []}
                    />
                )}
                {applicationList?.shareholder?.length > 0 && (
                    <MerchantStepView
                        title="Shareholder Details"
                        titleIcon={() => <Icon.Users className="feather feather-book w-4 h-4 mr-1" />}
                        data={applicationList?.shareholder || []}
                    />
                )}
            </div>
        </div>
    );
};

export default MerchantApplicationView;
