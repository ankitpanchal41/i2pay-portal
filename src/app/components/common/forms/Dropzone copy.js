import React, { useRef, useCallback, useState, useEffect } from "react";
import * as Icon from "react-feather";
import { useDropzone } from "react-dropzone";
import { v4 as UUID } from "uuid";
import { imageMapping } from "../../../utils/helper";
import { ClipLoader } from "react-spinners";
const Rest = React.lazy(() => import("../../../apiMethod/index"));

const DropzoneComponent = ({
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
        onDrop,
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
                setFieldValue(name, "");
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
            if (process.env.REACT_APP_PAN_IMAGE_CHECK === "YES") {
                if (name === "director_pan_card") {
                    checkPanCardImage();
                    setFieldValue(name, acceptedFiles);
                } else if (name === "director_aadhar_card_front_image" || name === "director_aadhar_card_back_image") {
                    checkAadharCardImage();
                    setFieldValue(name, acceptedFiles);
                } else {
                    setFieldValue(name, acceptedFiles);
                }
            } else {
                console.log({ acceptedFiles });
                setFieldValue(name, acceptedFiles);
            }
        }
    }, [acceptedFiles]);

    const checkPanCardImage = async () => {
        console.log({ acceptedFiles });
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        setIsLoading(true);
        const data = await Rest.checkPanCardImage(formData);

        if (data) {
            console.log(data?.pan_card_detail);
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
                console.log("FIRST", { image: acceptedFiles[0], back_side_image: allValue?.director_aadhar_card_back_image[0] });
                formData.append("image", acceptedFiles[0]);
                formData.append("back_side_image", allValue?.director_aadhar_card_back_image[0]);
            }

            if (name === "director_aadhar_card_back_image") {
                console.log("SECOND", { image: allValue?.director_aadhar_card_front_image[0], back_side_image: acceptedFiles[0] });
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
        const previews = values?.map ? values.map((file) => ({ id: UUID(), preview: URL.createObjectURL(file), ...file })) : [values];

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
                    {images?.map((img) =>
                        img ? (
                            <div className="relative rounded mr-[10px]">
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
                                    className="w-[80px] h-[80px] rounded inline"
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
            {touched && error ? <p className="text-red-500 mt-2 ml-1">{error}</p> : null}
        </>
    );
};

export default DropzoneComponent;
