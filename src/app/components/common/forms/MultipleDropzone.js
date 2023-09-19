import React, { useRef, useCallback, useState, useEffect } from "react";
import * as Icon from "react-feather";
import { useDropzone } from "react-dropzone";
import { v4 as UUID } from "uuid";
import { imageMapping } from "../../../utils/helper";
import { ClipLoader } from "react-spinners";
import { showToastMessage } from "../../../utils/methods";
const Rest = React.lazy(() => import("../../../apiMethod/index"));

const MultipleDropzone = ({
    label,
    isRequiredField,
    setFieldValue,
    name,
    placeholder,
    error,
    touched,
    values,
    accept = "image/*",
    maxFiles = 1,
    disabled,
    allValue,
    type,
    onRemoveMultipleImage = () => {},
}) => {
    const inputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [panNumber, setPanNumber] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [isLoadingMultiImages, setIsLoadingMultiImages] = React.useState(false);

    const openPicker = useCallback(
        (e) => {
            e.stopPropagation();
            inputRef?.current?.click();
        },
        [inputRef],
    );

    const onDrop = useCallback(
        (files) => {
            const totalFilesAllowed = maxFiles - images.length;

            // console.log({ files });

            if (totalFilesAllowed > 0) {
                const previews = files.map((file) => ({ id: UUID(), preview: URL.createObjectURL(file), ...file }));
                setImages((oImages) => [...oImages, ...previews]);
            }
        },
        [images],
    );

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        accept,
        minSize: 0,
        maxSize: 5242880,
        onDrop: (acceptedFiles, fileRejections) => {
            const type = accept.split(",");
            let displayType = "";

            if (type?.length > 0) {
                type.map((item) => {
                    const data = item?.split("/");
                    // console.log({ data });
                    if (displayType !== "") {
                        displayType =
                            data[1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                ? displayType + ", xlsx"
                                : data[1] === "vnd.ms-excel"
                                ? displayType + ", xls"
                                : displayType + `, ${data[1]}`;
                    } else {
                        displayType =
                            data[1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                ? displayType + "xlsx"
                                : data[1] === "vnd.ms-excel"
                                ? displayType + "xls"
                                : displayType + `${data[1]}`;
                    }
                });
            }
            console.log({ fileRejections });

            let visibleError = true;
            fileRejections.forEach((file) => {
                file.errors.forEach((err) => {
                    if (visibleError) {
                        if (err.code === "too-many-files") {
                            visibleError = false;
                            if (acceptedFiles.length === 0) {
                                showToastMessage(`Please upload maximum ${maxFiles} files.`, 500);
                                return false;
                            }
                        }
                    }

                    if (err.code === "file-too-large") {
                        showToastMessage("You can't upload file more then 5MB", 500);
                    }

                    if (err.code === "file-invalid-type") {
                        showToastMessage("Please upload " + displayType, 500);
                    }
                });
            });
        },
        multiple: maxFiles > 1,
        maxFiles,
        disabled: disabled,
    });

    const removeImage = useCallback(
        (e, id, preview) => {
            console.log(e, id, preview);
            if (preview?.includes("blob:") || !maxFiles || maxFiles <= 1) {
                e.stopPropagation();
                if (disabled) return;
                const img = images.find((item) => item.id === id);
                const acceptedIndex = values.findIndex((item) => item.name === img.path);

                values.splice(acceptedIndex, 1);
                setImages((imgs) => imgs.filter((item) => item.id !== id));
                if (setFieldValue && !values.length) {
                    setFieldValue(name, "");
                }
                if (name === "director_pan_card") {
                    setPanNumber("");
                } else if (name === "director_aadhar_card_front_image" || name === "director_aadhar_card_back_image") {
                    setAadharNumber("");
                }
            } else {
                e.stopPropagation();
                if (disabled) return;
                onRemoveMultipleImageData(id, values);
            }
        },
        [images, disabled, acceptedFiles, setFieldValue, name],
    );
    console.log({ values });

    const onRemoveMultipleImageData = async (id, values) => {
        setIsLoadingMultiImages(true);
        await onRemoveMultipleImage(id, values);
        setIsLoadingMultiImages(false);
    };

    useEffect(() => {
        if (setFieldValue && acceptedFiles.length) {
            console.log({ values }, [...values, ...acceptedFiles]?.length, maxFiles);
            if ([...values, ...acceptedFiles]?.length > maxFiles) {
                showToastMessage(`Please upload maximum ${maxFiles} files.`, 500);
                return false;
            }
            if (process.env.REACT_APP_PAN_IMAGE_CHECK === "YES") {
                if (name === "director_pan_card") {
                    checkPanCardImage();
                    setFieldValue(name, [...values, ...acceptedFiles]);
                } else if (name === "director_aadhar_card_front_image" || name === "director_aadhar_card_back_image") {
                    checkAadharCardImage();
                    setFieldValue(name, [...values, ...acceptedFiles]);
                } else {
                    setFieldValue(name, [...values, ...acceptedFiles]);
                }
            } else {
                setFieldValue(name, [...values, ...acceptedFiles]);
            }
        }
    }, [acceptedFiles]);

    const checkPanCardImage = async () => {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        setIsLoading(true);
        const data = await Rest.checkPanCardImage(formData);

        if (data) {
            setPanNumber(data?.pan_card_detail?.pan_card_number);
            setFieldValue(name, acceptedFiles);
        } else {
            setFieldValue(name, "");
            setPanNumber("");
        }
        setIsLoading(false);
    };

    const checkAadharCardImage = async () => {
        if (
            (name === "director_aadhar_card_front_image" && allValue?.director_aadhar_card_back_image) ||
            (name === "director_aadhar_card_back_image" && allValue?.director_aadhar_card_front_image)
        ) {
            const formData = new FormData();

            if (name === "director_aadhar_card_front_image") {
                // console.log("FIRST", { image: acceptedFiles[0], back_side_image: allValue?.director_aadhar_card_back_image[0] });
                formData.append("image", acceptedFiles[0]);
                formData.append("back_side_image", allValue?.director_aadhar_card_back_image[0]);
            }

            if (name === "director_aadhar_card_back_image") {
                // console.log("SECOND", { image: allValue?.director_aadhar_card_front_image[0], back_side_image: acceptedFiles[0] });
                formData.append("image", allValue?.director_aadhar_card_front_image[0]);
                formData.append("back_side_image", acceptedFiles[0]);
            }

            setIsLoading(true);
            const data = await Rest.checkAadharCardImage(formData);

            if (data) {
                setAadharNumber(data?.aadhar_card_detail?.aadhar_card_number);
                setFieldValue(name, acceptedFiles);
            } else {
                setFieldValue("director_aadhar_card_front_image", "");
                setFieldValue("director_aadhar_card_back_image", "");
                setAadharNumber("");
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let previews;
        if (name?.includes("additional_document") && values) {
            previews = [];
            values?.map((file) => {
                if (file?.additional_document) {
                    // if (values?.length > 1) {
                    previews.push({ preview: file?.additional_document, id: file.id });
                    // } else {
                    //     previews.push(file?.additional_document);
                    // }
                } else {
                    previews.push({ id: UUID(), preview: URL.createObjectURL(file), ...file });
                }
            });
        } else {
            previews = Array.isArray(values)
                ? values?.map((file) => ({ id: UUID(), preview: URL.createObjectURL(file), ...file }))
                : [values];
        }
        console.log({ previews });
        setImages(previews);
    }, [values]);

    return (
        <>
            {label && (
                <div className="form-label">
                    {label} {isRequiredField && <span className="text-danger">*</span>}
                </div>
            )}
            {/* {isLoading && (
                <div className="absolute z-50 flex justify-center items-center h-[82%] w-full">
                    <ClipLoader
                        css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                        loading
                        size={50}
                    />
                </div>
            )} */}
            {isLoadingMultiImages ? (
                <div className="dropzone blurred-background w-full h-full flex justify-center items-center">
                    <ClipLoader
                        loading={true}
                        color="#1e3a8a"
                        size={30}
                        css="border-width: 3px; border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                    />
                </div>
            ) : (
                <div className="dropzone cursor-pointer relative" {...getRootProps()}>
                    {disabled ? (
                        <div className="absolute w-[100%] h-[100%] bg-slate-100 top-0 left-0 z-[1000] opacity-70 cursor-not-allowed" />
                    ) : null}
                    <div className="w-[100%] h-[100%]">
                        <div>
                            <input {...getInputProps()} ref={inputRef} />
                            <p className="text-slate-400">{placeholder}</p>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto  mt-[10px]">
                        {images?.map((img, index) =>
                            img ? (
                                <div className="relative rounded mr-[10px]" key={index}>
                                    {isLoading && (
                                        <div className="absolute z-50 flex justify-center items-center h-full w-full">
                                            <ClipLoader
                                                css="border-width: 3px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                                loading
                                                size={20}
                                            />
                                        </div>
                                    )}

                                    {type === "banner" ? (
                                        <img
                                            className="w-[100%] h-[100%] rounded inline"
                                            src={imageMapping(img?.path || img?.preview || img || "") || img?.preview || img}
                                            alt="upload-img"
                                        />
                                    ) : (
                                        <img
                                            className="w-[80px] h-[80px] rounded inline"
                                            src={imageMapping(img?.path || img?.preview || img || "") || img?.preview || img}
                                            alt="upload-img"
                                        />
                                    )}

                                    <div className="absolute w-[100%] h-[100%] hidden group-hover:visible flex items-center text-ellipsis overflow-hidden whitespace-nowrap top-0 left-0 text-slate-600 dark:text-slate-600">
                                        {img?.path}
                                    </div>
                                    <div className="absolute w-[100%] h-[100%] bg-[#333] opacity-30 top-0 left-0 rounded">
                                        <button
                                            className="absolute right-[5px] top-[5px]"
                                            type="button"
                                            onClick={(e) => removeImage(e, img.id, img.preview)}>
                                            <Icon.X color="white" />
                                        </button>
                                    </div>
                                </div>
                            ) : null,
                        )}
                    </div>
                </div>
            )}
            {panNumber && (
                <p className="text-slate-500 mt-2">
                    <span className="font-bold">PAN Number: </span>
                    {panNumber}
                </p>
            )}
            {aadharNumber && (
                <p className="text-slate-500 mt-2">
                    <span className="font-bold">Addhar Number: </span>
                    {aadharNumber}
                </p>
            )}

            {touched && error ? <p className="text-red-500 mt-2 ml-1">{error}</p> : null}
        </>
    );
};

export default MultipleDropzone;
