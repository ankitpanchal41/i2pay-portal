import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../../utils/methods";
import { DELETE_IP_WHITELIST_REQUEST } from "../../redux/actions/IPWhitelist";
import { ADD_API_KEY_REQUEST, GET_API_KEY_REQUEST, DELETE_API_KEY_REQUEST } from "../../redux/actions/APIKey";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));

const APIKey = () => {
    const dispatch = useDispatch();

    const [, setListingType] = useState("");
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const { ipWhitelist } = useSelector((state) => state.ipWhitelist);

    const { APIKeyList } = useSelector((state) => state.apiKey);

    const state = useSelector((state) => state);

    const onCloseModal = (e) => {
        setImageModal(false);
    };

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        setIsLoading(true);
        dispatch({ type: GET_API_KEY_REQUEST, callBack });
    }, []);

    const onClickDelete = () => {
        const callBack = () => {
            setIsLoadingDelete(false);
            onHandleDeleteModal();
        };

        setIsLoadingDelete(true);
        dispatch({ type: DELETE_IP_WHITELIST_REQUEST, payload: { id: deleteModalDetails }, callBack });
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const onGenerateAPIKey = () => {
        const callBack = () => {
            setIsLoadingButton(false);
            // dispatch(detailStart(userData?.data?.token));
        };

        setIsLoadingButton(true);
        dispatch({ type: ADD_API_KEY_REQUEST, callBack });
    };

    const onCopyText = (text) => {
        showToastMessage(`${text} copied to clipboard successfully`, 200);
    };

    const onClickRevokeAPI = () => {
        const callBack = () => {
            setIsLoadingButton(false);
            // dispatch(detailStart(userData?.data?.token));
        };

        setIsLoadingButton(true);
        dispatch({ type: DELETE_API_KEY_REQUEST, payload: { id: APIKeyList[0].id }, callBack });
    };

    const _renderModal = () => {
        const productDetails = ipWhitelist.find((item) => item?.id === imageModal);
        if (imageModal) {
            return (
                <>
                    {/* BEGIN: Modal */}
                    <div
                        className="backdrop-sepia-0 bg-black/50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog"
                        onClick={onCloseModal}>
                        <div className={`relative my-6 mx-auto min-w-[50vh]`} onClick={(e) => e.stopPropagation()}>
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none
                        focus:outline-none">
                                {/* BEGIN: Modal Header */}
                                <div className="relative flex-auto">
                                    <div className="max-w-[50vh]">
                                        <div className="absolute top-[10px] right-[10px] cursor-pointer" onClick={onCloseModal}>
                                            <Icon.X size={25} color="white" />
                                        </div>
                                        <img src={productDetails?.product_image} alt="product" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BEGIN: Modal */}
                </>
            );
        }
        return <div />;
    };

    // const onClickBack = () => {
    //     navigate(`/store-front`);
    // };

    const _renderHeading = () => {
        return (
            <div className="intro-y flex justify-between items-center mt-8">
                <h2 className="text-lg font-medium">API Key</h2>
                <div className="">
                    {APIKeyList?.length !== 0 && (
                        <button
                            disabled={isLoadingButton}
                            onClick={onGenerateAPIKey}
                            className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.X size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Re-Generate API KEY</span>
                            <MiniLoader isLoading={isLoadingButton} />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* BEGIN: Modal */}
            {_renderModal()}
            <DeleteModal
                isLoading={isLoadingDelete}
                visible={visibleDeleteModal}
                onClose={onHandleDeleteModal}
                onDelete={() => {
                    onClickDelete();
                }}
            />
            {/* END: Modal */}

            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y">
                    {isLoading ? (
                        <div className="flex justify-center h-48 items-center">
                            <ClipLoader
                                loading={true}
                                color="#1e3a8a"
                                size={55}
                                css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                            />
                        </div>
                    ) : (
                        <div className="overflow-x-auto scrollbar-hidden">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                    {/* BEGIN: Connector Table */}
                                    {/* {listingType === "box" ? _renderBoxTable() : _renderTable()} */}
                                    {APIKeyList?.length === 0 ? (
                                        <div className="flex justify-center flex-col items-center mt-3">
                                            <div className="text-primary dark:text-white text-xl">
                                                You don't have an API KEY. Please generate here.
                                            </div>
                                            <button disabled={isLoadingButton} onClick={onGenerateAPIKey} className="btn btn-primary mt-3">
                                                Generate API Key
                                                <MiniLoader isLoading={isLoadingButton} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-12 gap-6 box-without-margin mt-8">
                                                <div className="intro-y col-span-12">
                                                    <div className="">
                                                        <span className="font-normal text-[#3B4863] text-[14px] flex items-center mb-2">
                                                            Public Key:
                                                        </span>
                                                        <div className="flex flex-col lg:flex-row items-center p-5 bg-[#F8F8F8] shadow-[inset_1px_1px_15px_rgba(0,0,0,0.05)]">
                                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                                <span
                                                                    id="pub-22"
                                                                    className="text-[#001737] text-[18px] mont-normal flex items-center break-all">
                                                                    {APIKeyList[0].public_key}
                                                                </span>
                                                            </div>
                                                            <div className="flex lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                                <CopyToClipboard
                                                                    onCopy={() => onCopyText("Public key")}
                                                                    text={APIKeyList[0].public_key}>
                                                                    <div className="float-right cursor-pointer">
                                                                        <Icon.Copy color="#3B4863" size={24} />
                                                                    </div>
                                                                </CopyToClipboard>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="intro-y col-span-12 mt-6">
                                                    <div className="">
                                                        <span className="font-normal text-[#3B4863] text-[14px] flex items-center mb-2">
                                                            Secret Key:
                                                        </span>
                                                        <div className="flex flex-col lg:flex-row items-center p-5 bg-[#F8F8F8] shadow-[inset_1px_1px_15px_rgba(0,0,0,0.05)]">
                                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                                <span
                                                                    id="pub-22"
                                                                    className="text-[#001737] text-[18px] mont-normal flex items-center break-all">
                                                                    {APIKeyList[0].secret_key}
                                                                </span>
                                                            </div>
                                                            <div className="flex lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                                <CopyToClipboard
                                                                    onCopy={() => onCopyText("Secret Key")}
                                                                    text={APIKeyList[0].secret_key}>
                                                                    <div className="float-right">
                                                                        <Icon.Copy color="#3B4863" size={24} />
                                                                    </div>
                                                                </CopyToClipboard>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {/* END: Connector Table */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* END: Content */}
            {/* </MainMenu> */}
            {/* END: Menu */}
        </>
    );
};

export default APIKey;
