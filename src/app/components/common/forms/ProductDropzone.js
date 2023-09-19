import React, { useRef, useCallback, useState, useEffect } from "react";
import * as Icon from "react-feather";
import { useDropzone } from "react-dropzone";
import { v4 as UUID } from "uuid";
import { imageMapping } from "../../../utils/helper";
import { ClipLoader } from "react-spinners";
import Images from "../../../../assets/images";
import { showToastMessage } from "../../../utils/methods";

const ProductDropzone = ({
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
}) => {
    const inputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [panNumber, setPanNumber] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");

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
                        displayType = displayType + `, ${data[1]}`;
                    } else {
                        displayType = displayType + `${data[1]}`;
                    }
                });
            }

            fileRejections.forEach((file) => {
                file.errors.forEach((err) => {
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
        (e, id) => {
            e.stopPropagation();
            if (disabled) return;
            const img = images.find((item) => item.id === id);
            const acceptedIndex = acceptedFiles.findIndex((item) => item.name === img.path);

            acceptedFiles.splice(acceptedIndex, 1);
            setImages((imgs) => imgs.filter((item) => item.id !== id));
            if (setFieldValue && !acceptedFiles.length) {
                setFieldValue(name, "", "remove");
            }
            if (name === "director_pan_card") {
                setPanNumber("");
            } else if (name === "director_aadhar_card_front_image" || name === "director_aadhar_card_back_image") {
                setAadharNumber("");
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
                    previews.push(file?.additional_document);
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
            <div
                className="dropzone cursor-pointer relative h-[80px] w-[80px]"
                {...getRootProps()}
                onChange={(e) => {
                    uploadImage(e);
                }}
                style={{ minHeight: "80px", border: touched && error ? "2px dashed red" : "" }}>
                {disabled ? (
                    <div className="absolute w-[100%] h-[100%] bg-slate-100 top-0 left-0 z-[1000] opacity-70 cursor-not-allowed" />
                ) : null}
                <div className="w-[100%] h-[100%]">
                    <div>
                        <input {...getInputProps()} ref={inputRef} />
                        <img src={Images.Image} />
                    </div>
                </div>
                <div className="absolute left-0 top-0 h-full w-full">
                    {images?.map((img, index) =>
                        img ? (
                            <div className="relative rounded h-full w-full" key={index}>
                                {isLoading && (
                                    <div className="absolute z-50 flex justify-center items-center h-full w-full">
                                        <ClipLoader
                                            css="border-width: 3px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                            loading
                                            size={20}
                                        />
                                    </div>
                                )}

                                <img
                                    className="w-full h-full rounded inline"
                                    src={imageMapping(img?.path || img || "") || img?.preview || img}
                                    alt="upload-img"
                                />

                                <div className="absolute w-[100%] h-[100%] hidden group-hover:visible flex items-center text-ellipsis overflow-hidden whitespace-nowrap top-0 left-0 text-slate-600 dark:text-slate-600">
                                    {img?.path}
                                </div>
                                <div className="absolute w-[100%] h-[100%] bg-[#333] opacity-30 top-0 left-0 rounded">
                                    <button
                                        className="absolute right-[5px] top-[5px]"
                                        type="button"
                                        onClick={(e) => removeImage(e, img.id)}>
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

            {/* {touched && error ? <p className="text-red-500 mt-2 ml-1">{error}</p> : null} */}
        </>
    );
};

export default ProductDropzone;
