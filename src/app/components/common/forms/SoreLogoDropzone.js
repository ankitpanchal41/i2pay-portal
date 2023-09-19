import React, { useRef, useCallback, useState, useEffect } from "react";
import * as Icon from "react-feather";
import { useDropzone } from "react-dropzone";
import { v4 as UUID } from "uuid";
import { imageMapping } from "../../../utils/helper";
import { ClipLoader } from "react-spinners";
import { showToastMessage } from "../../../utils/methods";
const Rest = React.lazy(() => import("../../../apiMethod/index"));

const SoreLogoDropzone = ({
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
            if (preview?.includes("blob:") || !maxFiles || maxFiles <= 1 || values?.length <= 1) {
                e.stopPropagation();
                if (disabled) return;
                const img = images.find((item) => item.id === id);
                const acceptedIndex = acceptedFiles.findIndex((item) => item.name === img.path);

                acceptedFiles.splice(acceptedIndex, 1);
                setImages((imgs) => imgs.filter((item) => item.id !== id));
                if (setFieldValue && !acceptedFiles.length) {
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
                onRemoveMultipleImage(id);
            }
        },
        [images, disabled, acceptedFiles, setFieldValue, name],
    );

    useEffect(() => {
        if (setFieldValue && acceptedFiles.length) {
            uploadImage(acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    useEffect(() => {
        let previews;
        if (name?.includes("additional_document") && values) {
            previews = [];
            values?.map((file) => {
                if (file?.additional_document) {
                    if (values?.length > 1) {
                        previews.push({ preview: file?.additional_document, id: file.id });
                    } else {
                        previews.push(file?.additional_document);
                    }
                } else {
                    previews = values?.map((file) => ({ id: UUID(), preview: URL.createObjectURL(file), ...file }));
                }
            });
        } else {
            previews = Array.isArray(values)
                ? values?.map((file) => ({ id: UUID(), preview: URL.createObjectURL(file), ...file }))
                : [values];
        }

        setImages(previews);
    }, [values]);

    const uploadImage = async (file) => {
        const base64 = await convertBase64(file);

        setFieldValue(name, base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

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
            <div className="dropzone cursor-pointer relative" {...getRootProps()}>
                {disabled ? (
                    <div className="absolute w-[100%] h-[100%] bg-slate-100 top-0 left-0 z-[1000] opacity-70 cursor-not-allowed" />
                ) : null}
                <div className="w-[100%] h-[100%]">
                    <div>
                        <input
                            {...getInputProps()}
                            onChange={(e) => {
                                uploadImage(e);
                            }}
                            ref={inputRef}
                        />
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

                                {images?.length > 1 ? (
                                    <>
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
                                    </>
                                ) : (
                                    <>
                                        {type === "banner" ? (
                                            <img
                                                className="w-[100%] h-[100%] rounded inline"
                                                src={imageMapping(img?.path || img || "") || img?.preview || img}
                                                alt="upload-img"
                                            />
                                        ) : (
                                            <img
                                                className="w-[80px] h-[80px] rounded inline"
                                                src={imageMapping(img?.path || img || "") || img?.preview || img}
                                                alt="upload-img"
                                            />
                                        )}
                                    </>
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

export default SoreLogoDropzone;
