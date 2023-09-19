import React, { useEffect, useRef, useState } from "react";
import ProductDropzone from "../../components/common/forms/ProductDropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Icon from "react-feather";

const Variants = ({ options, values, setFieldValue, errors, touched, apiVariantError, onChangeVariantsValue, disableFields }) => {
    const [imageCropModalVisible, setImageCropModalVisible] = useState(false);
    const [cropper, setCropper] = useState();
    const [imageCropData, setImageCropData] = useState({ index: "", value: "" });
    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
    };

    useEffect(() => {
        if (options?.length > 0) {
            const calculateArray = [];

            options?.map((o) => {
                const aaa = [];
                o?.value?.map((v) => {
                    aaa.push(v?.value);
                });
                calculateArray.push(aaa);
            });

            var combos = createCombinations(calculateArray);

            const variants = [];
            for (var i = 0; i < combos.length; i++) {
                if (combos[i]) {
                    const ids = [];
                    options?.map((o) => {
                        o?.value?.map((v) => {
                            combos[i]?.split("/")?.map((s) => {
                                if (v?.value === s.trim()) {
                                    ids.push(v?.id);
                                }
                            });
                        });
                    });

                    if (values?.variants?.[i]?.displayVariant) {
                        variants.push({
                            variant: ids,
                            displayVariant: combos[i],
                            quantity: values?.variants?.[i]?.quantity,
                            price: values?.variants?.[i]?.price,
                            image: values?.variants?.[i]?.image,
                            sku: values?.variants?.[i]?.sku,
                            id: values?.variants?.[i]?.id,
                        });
                    } else {
                        variants.push({
                            variant: ids,
                            displayVariant: combos[i],
                            quantity: "",
                            price: "",
                            image: "",
                            sku: "",
                        });
                    }
                }
            }
            setFieldValue(`variants`, variants);
        }
    }, [JSON.stringify(options)]);

    function createCombinations(fields, currentCombinations) {
        var tempFields = fields.slice();

        var delimiter = " / ";
        if (!tempFields || tempFields.length == 0) {
            return currentCombinations;
        } else {
            var combinations = [];
            var field = tempFields.pop();

            for (var valueIndex = 0; valueIndex < field.length; valueIndex++) {
                var valueName = field[valueIndex];
                if (valueName) {
                    if (!currentCombinations || currentCombinations.length == 0) {
                        var combinationName = valueName;
                        combinations.push(combinationName);
                    } else {
                        for (var combinationIndex = 0; combinationIndex < currentCombinations.length; combinationIndex++) {
                            var currentCombination = currentCombinations[combinationIndex];
                            if (currentCombination) {
                                var combinationName = valueName + delimiter + currentCombination;
                                combinations.push(combinationName);
                            }
                        }
                    }
                }
            }
            return createCombinations(tempFields, combinations);
        }
    }

    const onPaste = (e) => {
        const str = e.clipboardData.getData("Text");
        const re = /^[0-9]*[.]?[0-9]*$/;
        if (!re.test(str)) {
            e.preventDefault();
        }
    };

    const onSaveImage = (setFieldValue) => {
        if (typeof cropper !== "undefined") {
            values.variants[imageCropData?.index].image = cropper.getCroppedCanvas().toDataURL();
            setFieldValue(`variants`, values?.variants);
            // setFieldValue(imageCropData?.name, cropper.getCroppedCanvas().toDataURL());

            setImageCropModalVisible(false);
        }
    };

    const onCloseBannerImage = () => {
        setImageCropModalVisible(false);
    };

    if (values?.variants[0]?.displayVariant) {
        return (
            <>
                {imageCropModalVisible && (
                    <div className="justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                        <div className="relative my-6 mx-auto h-full w-full bg-white flex flex-col items-center justify-around">
                            <div className="flex flex-col items-center">
                                <h1 className="text-lg font-medium mt-2">Crop Image</h1>
                                <small class="text-gray-500">
                                    <em>To set the product image you need to set the image to 1:1 aspect ratio</em>
                                </small>
                                <button
                                    type="button"
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500 absolute right-5"
                                    onClick={onCloseBannerImage}>
                                    <Icon.X size={25} />
                                </button>
                            </div>
                            <div className="crop-container">
                                <Cropper
                                    src={imageCropData?.value}
                                    style={{ height: "400px", width: "100%" }}
                                    zoomTo={0.5}
                                    aspectRatio={1 / 1}
                                    minCropBoxHeight={750}
                                    minCropBoxWidth={750}
                                    zoomOnWheel={false}
                                    crop={onCrop}
                                    ref={cropperRef}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    onInitialized={(instance) => {
                                        setCropper(instance);
                                    }}
                                    guides={true}
                                    viewMode={1}
                                    preview=".img-preview"
                                />
                            </div>
                            <div className="controls">
                                <div className="flex justify-center">
                                    <button
                                        type="buttons"
                                        className="btn btn-primary w-24 ml-2"
                                        onClick={() => {
                                            onSaveImage(setFieldValue);
                                        }}>
                                        Save
                                    </button>
                                    <button className="btn btn-danger w-24 ml-4" type="button" onClick={onCloseBannerImage}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="border border-[#e3e7ed] p-10 mt-5 mx-2">
                    <h2 className="text-lg font-medium mr-auto mb-2 p-5">Variants</h2>

                    <div className="px-5 pb-5">
                        <table className="table" style={{ border: "2px solid rgb(229, 231, 235)" }}>
                            <thead style={{ backgroundColor: "#f4f6fa" }}>
                                <tr>
                                    <th className="w-32"></th>
                                    <th>Variant</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>SKU</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            {values?.variants?.map((v, index) => {
                                if (v?.displayVariant) {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <ProductDropzone
                                                        accept="image/png,image/jpg,image/jpeg"
                                                        disabled={disableFields}
                                                        error={errors?.variants?.[index]?.image}
                                                        touched={touched?.variants?.[index]?.image}
                                                        setFieldValue={(name, value, tag = "") => {
                                                            if (tag === "remove") {
                                                                values.variants[index].image = "";
                                                                setFieldValue(`variants`, values?.variants);
                                                            } else {
                                                                if (value) {
                                                                    setImageCropModalVisible(true);
                                                                }
                                                                setImageCropData({ index, value });
                                                            }
                                                        }}
                                                        values={values?.variants?.[index]?.image}
                                                        name="image"
                                                    />
                                                </td>
                                                <td>{v?.displayVariant}</td>
                                                <td
                                                    className={`${
                                                        errors?.variants?.[index]?.price && touched?.variants?.[index]?.price
                                                            ? "has-error"
                                                            : ""
                                                    }`}>
                                                    <input
                                                        disabled={disableFields}
                                                        type="number"
                                                        className="intro-x login__input form-control p-1 block w-40"
                                                        onChange={(e) => {
                                                            values.variants[index].price = e.target.value;
                                                            setFieldValue(`variants`, values?.variants);
                                                            // onChangeVariantsValue("price", index, values.variants, e.target.value);
                                                        }}
                                                        value={values?.variants?.[index]?.price}
                                                        onPaste={onPaste}
                                                        onKeyPress={(e) => {
                                                            if (
                                                                e.key === "1" ||
                                                                e.key === "2" ||
                                                                e.key === "3" ||
                                                                e.key === "4" ||
                                                                e.key === "5" ||
                                                                e.key === "6" ||
                                                                e.key === "7" ||
                                                                e.key === "8" ||
                                                                e.key === "9" ||
                                                                e.key === "0" ||
                                                                e.key === "."
                                                            ) {
                                                            } else {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                    {apiVariantError?.price?.[index] && (
                                                        <p className="text-red-500 mt-2 ml-1">{apiVariantError?.price?.[index]}</p>
                                                    )}
                                                </td>
                                                <td
                                                    className={`${
                                                        errors?.variants?.[index]?.quantity && touched?.variants?.[index]?.quantity
                                                            ? "has-error"
                                                            : ""
                                                    }`}>
                                                    <input
                                                        readOnly={disableFields}
                                                        type="number"
                                                        className="intro-x login__input form-control p-1 block w-40"
                                                        onChange={(e) => {
                                                            values.variants[index].quantity = e.target.value;
                                                            setFieldValue(`variants`, values?.variants);
                                                            // onChangeVariantsValue("quantity", index, values.variants, e.target.value);
                                                        }}
                                                        value={values?.variants?.[index]?.quantity}
                                                        onPaste={onPaste}
                                                        onKeyPress={(e) => {
                                                            if (
                                                                e.key === "1" ||
                                                                e.key === "2" ||
                                                                e.key === "3" ||
                                                                e.key === "4" ||
                                                                e.key === "5" ||
                                                                e.key === "6" ||
                                                                e.key === "7" ||
                                                                e.key === "8" ||
                                                                e.key === "9" ||
                                                                e.key === "0" ||
                                                                e.key === "."
                                                            ) {
                                                            } else {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                    {apiVariantError?.quantity?.[index] && (
                                                        <p className="text-red-500 mt-2 ml-1">{apiVariantError?.quantity?.[index]}</p>
                                                    )}
                                                </td>
                                                <td
                                                    className={`${
                                                        errors?.variants?.[index]?.sku && touched?.variants?.[index]?.sku ? "has-error" : ""
                                                    }`}>
                                                    <input
                                                        readOnly={disableFields}
                                                        type="text"
                                                        className="intro-x login__input form-control p-1 block w-48"
                                                        onChange={(e) => {
                                                            values.variants[index].sku = e.target.value;
                                                            setFieldValue(`variants`, values?.variants);
                                                            // onChangeVariantsValue("sku", index, values.variants, e.target.value);
                                                        }}
                                                        value={values?.variants?.[index]?.sku}
                                                    />
                                                    {apiVariantError?.sku?.[index] && (
                                                        <p className="text-red-500 mt-2 ml-1">{apiVariantError?.sku?.[index]}</p>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    );
                                }
                            })}
                        </table>
                    </div>
                </div>
            </>
        );
    } else {
        return false;
    }
};

export default Variants;
