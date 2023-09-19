import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { messages } from "../../messages/merchantRegister";
import { editProductStart, getProductDetailsStart } from "../../redux/actions/Product";
import { editProductSchema } from "../../utils/validationSchema";
import { ClipLoader } from "react-spinners";
import { store } from "../../redux/store";
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Dropzone = React.lazy(() => import("../../components/common/forms/Dropzone"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { storeId, productId } = useParams();
    const { productDetails } = useSelector((state) => state?.product);
    const { userData } = store.getState()?.persist;

    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        product_image: "",
        price: "",
        store_id: storeId,
        product_id: productId,
        sku: "",
    });

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onSubmit = (values) => {
        setIsSubmiting(true);
        const formData = new FormData();
        Object.keys(values).forEach((item) => {
            if (values[item] !== productDetails[item]) {
                if (item === "product_image") {
                    formData.append(item, values[item][0]);
                } else {
                    formData.append(item, values[item]);
                }
            }
        });

        const callback = () => {
            setIsSubmiting(false);
        };
        dispatch(editProductStart(formData, callback, () => navigate(`/products/${storeId}`)));
    };

    const onClickBack = () => {
        navigate(`/products/${storeId}`);
    };

    const onLoadEffect = () => {
        const formData = new FormData();
        formData.append("product_id", productId);
        formData.append("user_id", userData?.data?.id);

        const navigateListing = () => {
            navigate(`/products/${storeId}`);
        };

        dispatch(getProductDetailsStart(formData, () => setIsLoading(false), navigateListing));
    };

    const onProductDetailsChange = () => {
        if (productDetails) {
            setInitialValues({
                ...initialValues,
                name: productDetails?.name,
                product_image: productDetails?.product_image,
                price: productDetails?.price,
                description: productDetails?.description,
                sku: productDetails?.sku,
            });
        }
    };

    useEffect(() => {
        onProductDetailsChange();
        return true;
    }, [productDetails]);
    useEffect(() => {
        onLoadEffect();
        return true;
    }, []);

    const _renderHeading = () => {
        return <Heading title={"Edit Product"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    return (
        <>
            {/* BEGIN: Modal */}
            {/* {_renderModal()} */}
            {/* END: Modal */}

            {/* <div className="mobile-menu md:hidden">
                <div className="mobile-menu-bar">
                    <a href className="flex mr-auto">
                        <img alt="logo" className="w-[30%]" src={Images.logoImage} />
                    </a>
                    <a href="javascript:;" id="mobile-menu-toggler">
                        {" "}
                        <Icon.BarChart2 className="w-8 h-8 text-white transform -rotate-90" />{" "}
                    </a>
                </div>
                <ul className="border-t border-white/[0.08] py-5 hidden">
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Home />{" "}
                            </div>
                            <div className="menu__title">Dashboard</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Box />{" "}
                            </div>
                            <div className="menu__title">Application</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Box />{" "}
                            </div>
                            <div className="menu__title">Connector</div>
                        </a>
                    </li>
                </ul>
            </div> */}
            {/* END: Mobile Menu */}

            {/* BEGIN: Header */}
            {/* <Header /> */}
            {/* END: Header */}

            {/* BEGIN: Menu */}
            {/* <MainMenu active={5}> */}
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
                                    <div className="intro-y box p-5 mt-5">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={editProductSchema}
                                            enableReinitialize
                                            validateOnMount
                                            onSubmit={onSubmit}>
                                            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                                                <Form className="">
                                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.productTitles.productName}
                                                                name="name"
                                                                label={messages.productTitles.productName}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                type="number"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.productTitles.amount}
                                                                name="price"
                                                                label={messages.productTitles.amount}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                rows="6"
                                                                textarea="true"
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.productTitles.description}
                                                                name="description"
                                                                label={messages.productTitles.description}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <label className="form-label">
                                                                {messages.productTitles.image}
                                                                <span className="text-danger"> *</span>
                                                            </label>
                                                            <Dropzone
                                                                error={errors.product_image}
                                                                touched={touched.product_image}
                                                                setFieldValue={setFieldValue}
                                                                name="product_image"
                                                                placeholder={messages.productTitles.image}
                                                                values={values.product_image}
                                                                accept="image/png,image/jpg,image/jpeg"
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.productTitles.sku}
                                                                name="sku"
                                                                label={messages.productTitles.sku}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                            <button
                                                                type="buttons"
                                                                className="btn btn-primary w-24 ml-2"
                                                                onClick={handleSubmit}>
                                                                Save <MiniLoader isLoading={isSubmiting} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
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

export default EditProduct;
