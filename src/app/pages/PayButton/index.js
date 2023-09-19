import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { SketchPicker } from "react-color";
import { showToastMessage } from "../../utils/methods";
import { paymentButton } from "../../utils/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { ADD_PAY_BUTTON_REQUEST, DETAIL_PAY_BUTTON_REQUEST, EDIT_PAY_BUTTON_REQUEST } from "../../redux/types/PayButton";
import { ClipLoader } from "react-spinners";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Modal = React.lazy(() => import("../../components/common/Modal"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const initialValuesObj = { name: "" };

const PayButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isEdit = location?.pathname?.includes("edit");

    // const history = useHis;
    const [textSlider, setTextSlider] = useState(18);
    const [borderSlider, setBorderSlider] = useState(10);
    const [weight, setWeight] = useState(500);
    // const [paddingTop,setPaddingTop]=useState(5)
    // const [paddingBottom,setPaddingBottom]=useState(5)
    const [vertical, setVertical] = useState(12);
    const [paddingHorizontal, setPaddingHorizontal] = useState(30);
    const [initialValues, setInitialValues] = useState(initialValuesObj);

    // const [horizontal,setHorizontal]=useState(0)
    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(20);
    const [btnText, setBtnText] = useState("I2pay");
    const [bgColor, setBgColor] = useState(`rgba(${29}, ${58}, ${138}, ${100})`);
    const [textColor, setTextColor] = useState(`rgba(${255}, ${255}, ${255}, ${100})`);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [image, setImage] = useState("");
    const [imageData, setImageData] = useState("");
    const [visibleCopyToast, setVisibleCopyToast] = useState(false);
    const [modal, setModal] = useState(false);
    const [apiLoading, setAPILoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const state = useSelector((state) => state);

    const handleChange = (e) => {
        setBtnText(e.target.value);
    };

    let font = {
        fontSize: textSlider + "px",
        borderRadius: borderSlider + "px",
        fontWeight: weight,
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: vertical + "px",
        paddingBottom: vertical + "px",
        paddingRight: paddingHorizontal + "px",
        paddingLeft: paddingHorizontal + "px",
        minWidth: "200px",
    };

    let logo = {
        width: width + "px",
        height: height + "px",
    };

    useEffect(() => {
        if (isEdit && Object.keys(state?.payButton?.payButtonDetail).length) {
            // const previews = { id: UUID(), preview: URL.createObjectURL(state?.payButton?.payButtonDetail?.image) };

            setImage(state?.payButton?.payButtonDetail?.image);
            const object = JSON.parse(state?.payButton?.payButtonDetail?.buttonStyle);
            setTextSlider(object?.fontSize.substring(0, object?.fontSize?.length - 2));
            setBorderSlider(object?.borderRadius.substring(0, object?.borderRadius?.length - 2));
            setWeight(object?.fontWeight);
            setBgColor(object?.backgroundColor);
            setTextColor(object?.color);
            setVertical(object?.paddingBottom.substring(0, object?.paddingBottom?.length - 2));
            setPaddingHorizontal(object?.paddingLeft.substring(0, object?.paddingLeft?.length - 2));
            setWidth(object?.width.substring(0, object?.width?.length - 2));
            setHeight(object?.height.substring(0, object?.height?.length - 2));
            setHeight(object?.height.substring(0, object?.height?.length - 2));
            setInitialValues({ name: state?.payButton?.payButtonDetail?.name });
            setBtnText(state?.payButton?.payButtonDetail?.buttonName);
        }
    }, [state?.payButton?.payButtonDetail]);

    useEffect(() => {
        if (isEdit) {
            const callBack = () => {
                setIsLoading(false);
            };

            const navigateListing = () => {
                navigate("/pay-button-list");
            };

            setIsLoading(true);
            const array = location?.pathname?.split("/");
            const id = array[array?.length - 1];
            dispatch({ type: DETAIL_PAY_BUTTON_REQUEST, payload: { payButton_id: id }, callBack, navigateListing });
        }
    }, []);

    const changeImage = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };

        if (
            e.target.files?.[0]?.type === "image/jpeg" ||
            e.target.files?.[0]?.type === "image/jpg" ||
            e.target.files?.[0]?.type === "image/png"
        ) {
            if (e.target.files?.[0]?.size <= 2097152) {
                reader.readAsDataURL(e.target.files[0]);
                setImageData(e.target.files[0]);
            } else {
                showToastMessage("You can't upload file more then 2MB", 500);
                return false;
            }
        } else {
            showToastMessage("Please upload jpg, jpeg, png", 500);
            return false;
        }
    };

    const onClickBack = () => {
        navigate(`/pay-button-list`);
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const onCopyText = () => {
        showToastMessage(`Your button text is copied.`, 200);
        setVisibleCopyToast(!visibleCopyToast);
    };

    const onClickAddButton = (value) => {
        if (isEdit) {
            const array = location?.pathname?.split("/");
            const id = array[array?.length - 1];
            const payload = {
                ...value,
                buttonStyle: JSON.stringify({ ...font, ...logo }),
                buttonName: btnText,
                buttonString: `<button class="submit_button" data-id="${id}"  data-url="" type="button" buttonStyle="border: none; cursor: pointer; width:fit-content; font-size:${
                    font.fontSize
                }; border-radius:${font.borderRadius}; font-weight:${font.fontWeight}; background-color:${font.backgroundColor}; color:${
                    font.color
                }; padding-top:${font.paddingTop}; padding-bottom:${font.paddingBottom}; padding-right:${font.paddingRight}; padding-left:${
                    font.paddingLeft
                }; min-Width:${
                    font.minWidth
                }; max-width:350px; display:flex; justify-content:center; align-items:center; text-decoration: none;">${
                    image
                        ? `<img src="https://admin.payomatix.com/storage/theme/assets/dist/images/logo-sm.png" imageStyle="height:${logo.height}; width:${logo.width}; margin-right: 0.25rem;" />`
                        : ""
                }${btnText}</button>`,
                payButton_id: id,
            };

            let formData = new FormData();
            for (const property in payload) {
                formData.append(property, payload[property]);
            }
            if (imageData !== "") {
                formData.append("image", imageData);
            }

            const callBack = () => {
                setAPILoading(false);
            };

            const navigateState = () => {
                navigate(`/pay-button-list`);
            };
            setAPILoading(true);
            dispatch({ type: EDIT_PAY_BUTTON_REQUEST, payload: formData, callBack, navigateState });
        } else {
            const payload = {
                ...value,
                buttonStyle: JSON.stringify({ ...font, ...logo }),
                buttonName: btnText,
                buttonString: `<button class="submit_button" data-id="" data-url="" type="button" buttonStyle="border: none; cursor: pointer; width:fit-content; font-size:${
                    font.fontSize
                }; border-radius:${font.borderRadius}; font-weight:${font.fontWeight}; background-color:${font.backgroundColor}; color:${
                    font.color
                }; padding-top:${font.paddingTop}; padding-bottom:${font.paddingBottom}; padding-right:${font.paddingRight}; padding-left:${
                    font.paddingLeft
                }; min-Width:${
                    font.minWidth
                }; max-width:350px; display:flex; justify-content:center; align-items:center; text-decoration: none;">${
                    image
                        ? `<img src="https://admin.payomatix.com/storage/theme/assets/dist/images/logo-sm.png" imageStyle="height:${logo.height}; width:${logo.width}; margin-right: 0.25rem;" />`
                        : ""
                }${btnText}</button>`,
            };

            let formData = new FormData();
            for (const property in payload) {
                formData.append(property, payload[property]);
            }

            if (imageData !== "") {
                formData.append("image", imageData);
            }

            const callBack = () => {
                setAPILoading(false);
            };

            const navigateState = () => {
                navigate(`/pay-button-list`);
            };
            setAPILoading(true);
            dispatch({ type: ADD_PAY_BUTTON_REQUEST, payload: formData, callBack, navigateState });
        }
    };

    const _renderModal = () => {
        return (
            <>
                <Modal
                    heading={"Add Button"}
                    visible={modal}
                    onClickCancel={toggleModal}
                    onClickSave={onClickAddButton}
                    onClose={toggleModal}
                    useFormik
                    initialValues={initialValues}
                    validationState={paymentButton}
                    modalMinWidth={"50%"}
                    buttonLoading={apiLoading}>
                    <div className="flex items-center flex-col">
                        <button
                            type="button"
                            style={font}
                            className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed flex justify-center items-center min-w-[150px] max-w-[350px] text-left">
                            {image && <img src={image} alt="" className="h-4 w-4 mr-1" style={logo} />}

                            {btnText}
                        </button>
                    </div>

                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                        <Input
                            type="text"
                            className="intro-x login__input form-control py-2 px-3 block mt-3"
                            placeholder={"Enter Name"}
                            name={"name"}
                            label="Enter name"
                            isRequiredField
                        />
                    </label>
                </Modal>
            </>
        );
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={isEdit ? "Edit Pay Button" : "Create Pay Button"}
                displayBackButton={true}
                onClickBack={onClickBack}
                titleButton={
                    <div className="absolute right-0">
                        <button onClick={toggleModal} className="btn btn-primary w-24 ml-2">
                            <Icon.Save size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Save</span>
                        </button>
                    </div>
                }
            />
        );
    };

    return (
        <>
            {_renderModal()}

            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2 bg-white dark:bg-darkmode-500">
                    {isLoading ? (
                        <div className="flex justify-center h-48 items-center">
                            {/* BEGIN: Step Loading */}
                            <ClipLoader
                                loading={true}
                                color="#1e3a8a"
                                size={55}
                                css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                            />
                            {/* END: Step Loading */}
                        </div>
                    ) : (
                        <div className="intro-y mt-12 sm:mt-5">
                            <div className="border border-[#E3E7ED] sm:flex">
                                <div className="px sm:max-w-[50%] sm:flex justify-center flex-col bg-[#F8F8F8] px-8">
                                    <div className="flex space-x-2 mb-6">
                                        <button
                                            type="button"
                                            style={font}
                                            className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed flex justify-center items-center min-w-[150px] max-w-[350px] text-left">
                                            {image && <img src={image} alt="" className="h-4 w-4 mr-1" style={logo} />}
                                            {btnText}
                                        </button>
                                    </div>

                                    <div
                                        onCopy={(e) => {
                                            e.preventDefault();
                                            return false;
                                        }}
                                        className="overflow-y-auto mt-2 rounded-md">
                                        <p id="copy-basic-dropdowns" className="source-preview">
                                            <code className="text-xs p-0 rounded-md hljs html bg-[#FFFFFF] pt-10 pb-4 px-4">
                                                <span className="hljs-tag">
                                                    &lt;<span className="hljs-name">button</span> <span className="hljs-attr">class</span>=
                                                    <span className="hljs-string">"submit_button"</span>{" "}
                                                    <span className="hljs-attr">type</span>=<span className="hljs-string">"button" </span>
                                                    <span className="hljs-attr">style</span>=
                                                    <span className="hljs-string">{`"font-size:${font.fontSize}; border-radius:${font.borderRadius}; font-weight:${font.fontWeight}; background-color:${font.backgroundColor}; color:${font.color}; padding-top:${font.paddingTop}; padding-bottom:${font.paddingBottom}; padding-right:${font.paddingRight}; padding-left:${font.paddingLeft}; min-Width:${font.minWidth}; max-width:350px; display:flex; justify-content:center; align-items:center; text-decoration: none;"`}</span>
                                                    &gt;
                                                </span>
                                                {(image?.includes("https://") || image?.includes("http://")) && (
                                                    <>
                                                        <br />
                                                        <span className="hljs-tag">
                                                            &lt;<span className="hljs-name">img</span>{" "}
                                                            <span className="hljs-attr">src</span>=
                                                            <span className="hljs-string">{image}</span>
                                                            <span className="hljs-attr"> style</span>=
                                                            <span className="hljs-string">{`"height:${logo.height}; width:${logo.width}; margin-right: 0.25rem;" `}</span>
                                                            /&gt;
                                                        </span>
                                                    </>
                                                )}
                                                <br />
                                                <span className="hljs-tag">{btnText}</span>
                                                <br />
                                                <span className="hljs-tag">
                                                    &lt;<span className="hljs-name">/button</span>&gt;
                                                </span>
                                            </code>
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 py-6 flex-1 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-darkmode-300 border-dashed h-[500px] overflow-hidden overflow-y-auto flex justify-center mb-8">
                                    <div className="w-full sm:max-w-[70%]">
                                        <div className="text-slate-500 text-xs  mb-3  dark:text-white">BUTTON TEXT</div>
                                        <input
                                            className="intro-x login__input form-control py-2 px-3 block w-full"
                                            type="text"
                                            placeholder="Enter Text"
                                            onChange={handleChange}
                                            value={btnText}
                                        />
                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">LOGO</div>

                                        <div
                                            className={`border border-dashed relative w-full relative ${
                                                image ? "flex justify-center items-center" : ""
                                            }`}>
                                            <div className="absolute h-full">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="image-upload"
                                                    id="input"
                                                    onChange={changeImage}
                                                    multiple
                                                    className="cursor-pointer relative block opacity-0 w-full h-full z-50"
                                                />
                                            </div>
                                            {image ? (
                                                <img src={image} alt="" className="w-2/4" />
                                            ) : (
                                                <div className="text-center m-auto w-2/4 mb-6 mt-6">
                                                    <h4>Drop files here or</h4>
                                                    <p className="">click to upload.</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            <div className="dropdown ml-auto sm:ml-0">
                                                <button
                                                    onClick={() => setShow1(!show1)}
                                                    className="btn btn-primary py-2 px-4 rounded-1 mt-10 mr-[20px]"
                                                    aria-expanded="false"
                                                    data-tw-toggle="dropdown">
                                                    Background Color
                                                </button>
                                            </div>

                                            <button onClick={() => setShow2(!show2)} className="btn btn-primary py-2 px-4 rounded-1 mt-10">
                                                Font Color
                                            </button>
                                            <div className="flex items-center"></div>
                                        </div>
                                        {show1 ? (
                                            <SketchPicker
                                                color={bgColor}
                                                onChange={(color) => {
                                                    setBgColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
                                                }}
                                            />
                                        ) : null}

                                        {show2 ? (
                                            <div>
                                                <SketchPicker
                                                    color={textColor}
                                                    onChange={(color) => {
                                                        setTextColor(
                                                            `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">FONT SIZE</div>
                                        <div className="flex items-center">
                                            <input
                                                type="range"
                                                className="w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow mr-3 rounded-[100px] h-[10px] slider"
                                                min={10}
                                                max={30}
                                                value={textSlider}
                                                onChange={(e) => setTextSlider(e.target.value)}
                                                id="customRange2"
                                            />
                                            <div className="w-[40px] flex items-center justify-center border-2 border-[#E3E7ED] rounded">
                                                <div className="p-1 text-[10px]">{textSlider}</div>
                                            </div>
                                        </div>

                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">BORDER RADIUS</div>
                                        <div className="flex items-center w-full">
                                            <input
                                                type="range"
                                                className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow mr-3 rounded-[100px] h-[10px] slider"
                                                min={1}
                                                max={100}
                                                value={borderSlider}
                                                onChange={(e) => setBorderSlider(e.target.value)}
                                                id="customRange2"
                                            />
                                            <div className="w-[40px] flex items-center justify-center border-2 border-[#E3E7ED] rounded">
                                                <div className="p-1 text-[10px]">{borderSlider}</div>
                                            </div>
                                        </div>
                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">FONT WEIGHT</div>
                                        <div className="flex items-center w-full">
                                            <input
                                                type="range"
                                                className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow mr-3 rounded-[100px] h-[10px] slider"
                                                min={100}
                                                max={800}
                                                step={100}
                                                duration={100}
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                id="customRange2"
                                            />
                                            <div className="w-[40px] flex items-center justify-center border-2 border-[#E3E7ED] rounded">
                                                <div className="p-1 text-[10px]">{weight}</div>
                                            </div>
                                        </div>
                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">VERTICAL PADDING</div>
                                        <div className="flex items-center w-full">
                                            <input
                                                type="range"
                                                className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow mr-3 rounded-[100px] h-[10px] slider"
                                                min={1}
                                                max={20}
                                                step={1}
                                                value={vertical}
                                                onChange={(e) => setVertical(e.target.value)}
                                                id="customRange2"
                                            />
                                            <div className="w-[40px] flex items-center justify-center border-2 border-[#E3E7ED] rounded">
                                                <div className="p-1 text-[10px]">{vertical}</div>
                                            </div>
                                        </div>

                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">HORIZONTAL PADDING</div>
                                        <div className="flex items-center w-full">
                                            <input
                                                type="range"
                                                className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow mr-3 rounded-[100px] h-[10px] slider"
                                                min={30}
                                                max={80}
                                                step={1}
                                                value={paddingHorizontal}
                                                onChange={(e) => setPaddingHorizontal(e.target.value)}
                                                id="customRange2"
                                            />
                                            <div className="w-[40px] flex items-center justify-center border-2 border-[#E3E7ED] rounded">
                                                <div className="p-1 text-[10px]">{paddingHorizontal}</div>
                                            </div>
                                        </div>

                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">LOGO WIDTH</div>
                                        <div className="flex items-center w-full">
                                            <input
                                                type="range"
                                                className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow mr-3 rounded-[100px] h-[10px] slider"
                                                min={20}
                                                max={40}
                                                step={1}
                                                value={width}
                                                onChange={(e) => setWidth(e.target.value)}
                                                id="customRange2"
                                            />
                                            <div className="w-[40px] flex items-center justify-center border-2 border-[#E3E7ED] rounded">
                                                <div className="p-1 text-[10px]">{width}</div>
                                            </div>
                                        </div>

                                        <div className="text-slate-500 text-xs mt-6 dark:text-white">LOGO HEIGHT</div>
                                        <div className="flex items-center w-full">
                                            <input
                                                type="range"
                                                className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow mr-3 rounded-[100px] h-[10px] slider"
                                                min={20}
                                                max={40}
                                                step={1}
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                id="customRange2"
                                            />
                                            <div className="w-[40px] flex items-center justify-center border-2 border-[#E3E7ED] rounded">
                                                <div className="p-1 text-[10px]">{height}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/*</div>*/}
            {/* END: Content */}
        </>
    );
};

export default PayButton;
