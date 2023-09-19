import React, {useRef, useState} from "react";
import * as Icon from "react-feather";
import {useNavigate} from "react-router";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Scrollspy = React.lazy(() => import("react-scrollspy"));
const ApiDocumentImageModal = React.lazy(() => import("../../components/common/ApiDocumentImageModal"));


const StoreIntegration = () => {
    const myRef = useRef(null);
    const [visibleBannerModal, setVisibleBannerModal] = useState("");
    const [bannerImages, setBannerImages] = useState([]);
    const navigate = useNavigate();
    // const { userData } = useSelector((state) => state.persist);

    const onClickBanner = (item) => {
        setVisibleBannerModal(!visibleBannerModal);
        const images = [];
        images.push(item);
        setBannerImages(images);
    };

    const goToSection = (scrollToID, el) => {
        let target = document.getElementById(scrollToID);
        target.scrollIntoView({
            behavior: "smooth",
        });
        document.querySelector(".scroll-to-link.active").classList.remove("active");
        document.querySelector("[ data-target='" + scrollToID + "']").classList.add("active");
    };

    const onClickBack = () => {
        navigate(`/api-document`);
    };

    const openMobileMenu = () => {
        document.querySelector("html").classList.toggle("menu-opened");
    };

    return (
        <>
            <ApiDocumentImageModal removeHeader={false} removeFooter={false} visible={visibleBannerModal}
                                   onClose={onClickBanner}>
                <div className="">
                    <AutoplaySlider
                        animation="foldOutAnimation"
                        bullets={false}
                        organicArrows={false}
                        className="h-full"
                        play={false}
                        interval={2000}>
                        <div>
                            <img src={bannerImages[0] || ""}/>
                        </div>
                    </AutoplaySlider>
                </div>
            </ApiDocumentImageModal>

            <div className="left-menu">
                <div className="api-document-logo">
                    <div className="logo">
                        <img alt="API documentation" title="API documentation" src="images/logo.png"
                             style={{height: 32}}/>
                        <span>API Documentation</span>
                    </div>
                    <button className="burger-menu-icon" id="button-menu-mobile" onClick={() => openMobileMenu()}>
                        <svg width="34" height="34" viewBox="0 0 100 100">
                            <path
                                className="line line1"
                                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"></path>
                            <path className="line line2" d="M 20,50 H 80"></path>
                            <path
                                className="line line3"
                                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"></path>
                        </svg>
                    </button>
                </div>
                <div className="mobile-menu-closer"></div>
                <div className="api-document-back-menu">
                    <ul>
                        <li className="flex" onClick={onClickBack}>
                            <Icon.ChevronLeft className="mr-2 cursor-pointer relative top-1" size={30} color="#777A7A"/>
                            <a className="" style={{cursor: "pointer"}}>
                                BACK
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="api-document-menu">
                    <Scrollspy
                        items={["create-api-keys", "activate-connector", "how-to-create-store", "store-add-products", "store-manage-blogs", "store-manage-collection-banners", "store-orders", "store-transactions"]}
                        currentClassName="active">
                        <li className="scroll-to-link" data-target="create-api-keys"
                            onClick={(e) => goToSection("create-api-keys", e)}>
                            <a>Create API Keys</a>
                        </li>
                        <li className="scroll-to-link" data-target="activate-connector"
                            onClick={(e) => goToSection("activate-connector", e)}>
                            <a>Activate Connector</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="how-to-create-store"
                            onClick={(e) => goToSection("how-to-create-store", e)}>
                            <a>How to create Store</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="store-add-products"
                            onClick={(e) => goToSection("store-add-products", e)}>
                            <a>Store - Manage Products/Categories</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="store-manage-blogs"
                            onClick={(e) => goToSection("store-manage-blogs", e)}>
                            <a>Store - Manage Blogs</a>
                        </li>

                        <li
                            className="scroll-to-link"
                            data-target="store-manage-collection-banners"
                            onClick={(e) => goToSection("store-manage-collection-banners", e)}>
                            <a>Store - Manage Collection Banners</a>
                        </li>

                        <li className="scroll-to-link" data-target="store-orders"
                            onClick={(e) => goToSection("store-orders", e)}>
                            <a>Store Orders</a>
                        </li>
                        <li
                            className="scroll-to-link"
                            data-target="store-transactions"
                            onClick={(e) => goToSection("store-transactions", e)}>
                            <a>Store Transactions</a>
                        </li>
                    </Scrollspy>
                </div>
            </div>
            <div className="api-document-page">
                <div ref={myRef} className="api-document api-document-single-content">
                    {/* START: CREATE API KEYS */}
                    <div className="overflow-hidden api-document-section" id="create-api-keys">
                        <h2>CREATE API KEYS</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `api-key`} target="_blank">
                                API KEY
                            </a>{" "}
                            page as shown.
                        </p>
                        <p>
                            After that, click on the <strong>Generate API Key</strong> button to create a new api keys.
                        </p>
                        <p>
                            <strong className="text-danger">Note: </strong> You don't need to regenerate API keys, if
                            it's already generated
                            previously.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/create-api-key-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/api_key/create-api-key-1.png"
                            />
                        </div>

                        <p>
                            Generated keys will shown as below, you can <strong>Revoke</strong> keys using <strong>Revoke
                            API Keys</strong>{" "}
                            buttons.
                        </p>
                        <p>
                            You can copy <strong>Public Key</strong> or <strong>Secret Key</strong> from here.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/api-keys-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="API Keys"
                                title="API Keys"
                                src="images/api_key/api-keys-2.png"
                            />
                        </div>
                        <hr/>
                    </div>
                    {/* END: CREATE API KEYS */}

                    {/* START: ACTIVATE CONNECTOR */}
                    <div className="overflow-hidden api-document-section" id="activate-connector">
                        <h2>ACTIVATE CONNECTOR</h2>
                        <p>
                            After generating <strong>API Keys</strong>, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `connector`} target="_blank">
                                <strong>Connectors</strong>
                            </a>{" "}
                            page as shown.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/create-api-key-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create API Key"
                                title="Create API Key"
                                src="images/connector/connector_list.png"
                            />
                        </div>

                        <p>
                            After that, click on the <strong>Status</strong> button
                            to <strong>activate</strong> connector. As you can see, you need to provide appropriate
                            credentials. On the other hand, you can use exotic connector by clicking <strong>Use
                            Exotic Connector</strong> too.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/api_key/api-keys-2.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="API Keys"
                                title="API Keys"
                                src="images/connector/enable_connector.png"
                            />
                        </div>
                        <hr/>
                    </div>
                    {/* END: ACTIVATE CONNECTOR */}

                    {/* START: HOW TO CREATE STORE */}
                    <div className="overflow-hidden api-document-section" id="how-to-create-store">
                        <h2>How to create Store</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `store-front`} target="_blank">
                                Store Front
                            </a>{" "}
                            page as shown.
                        </p>
                        <p>
                            After that, click on the <strong>Create New Store</strong> to create a new store.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/create-store-1.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create Store"
                                title="Create Store"
                                src="images/store/create-store-1.png"
                            />
                        </div>

                        <div className="mt-8">
                            <h4>MODIFY STORE</h4>
                            <p>
                                All of the available stores will be shown here. From here, you can
                                view <strong>Products</strong> of the
                                store. Also, you
                                can <strong>Preview</strong>, <strong>Modify</strong> and <strong>Delete</strong> store
                                from here.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/modify-store-2.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Modify Store"
                                    title="Modify Store"
                                    src="images/store/modify-store-2.png"
                                />
                            </div>
                            <hr/>
                        </div>

                        <div className="mt-8">
                            <h4>STEP 1: CREATE STORE DETAILS</h4>
                            <p>
                                First of all, you will be asked for the store details as shown below. Basically, it is
                                the home page of your store.
                            </p>
                            <p>
                                You can set your <strong>Store
                                Name</strong>, <strong>Currency</strong>, <strong>Description</strong> along with
                                your <strong>store
                                address</strong> details.
                            </p>


                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/create-store-step-one-1.1.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Store Details"
                                    title="Store Details"
                                    src="images/store/create-store-step-one-1.1.png"
                                />
                            </div>


                            <p>
                                After that, you can choose upto 3 homepage banners according to your need. It'll be
                                displayed into your store home page as sliders. You can add banner title and description
                                as well.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/create-store-step-one-1.2.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Store Details"
                                    title="Store Details"
                                    src="images/store/create-store-step-one-1.2.png"
                                />
                            </div>


                            <p>
                                After that, you can select store template from available templates as shown below.
                            </p>

                            <p>
                                <strong>Note: </strong> all of the stores have different functionalities from others.
                                You can preview them before selecting it. You can change store template later after
                                creating store.
                            </p>


                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/create-store-step-one-3.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Store Details"
                                    title="Store Details"
                                    src="images/store/create-store-step-one-3.png"
                                />
                            </div>


                            <hr/>
                        </div>

                        <div className="mt-8">
                            <h4>STEP 2: CREATE ABOUT US</h4>
                            <p>
                                Next section, you need to provide <strong>About Us</strong> details.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/about-us-4.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="About Us"
                                    title="About Us"
                                    src="images/store/about-us-4.png"
                                />
                            </div>
                            <hr/>
                        </div>

                        <div className="mt-8">
                            <h4>STEP 3: CREATE CONTACT US</h4>
                            <p>
                                In last, you need to provide <strong>Contact Us</strong> details.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/contact-us-5.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Contact Us"
                                    title="Contact Us"
                                    src="images/store/contact-us-5.png"
                                />
                            </div>
                            <hr/>
                        </div>
                    </div>
                    {/* END: HOW TO CREATE STORE */}

                    {/* START: Store Add Products */}
                    <div className="overflow-hidden api-document-section" id="store-add-products">
                        <h2>Store - Manage Products/Categories</h2>
                        <p>
                            After creating a store you can add products by clicking <strong>Products</strong> button.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/add-products-store-6.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Store Add Product"
                                title="Store Add Product"
                                src="images/store/add-products-store-6.png"
                            />
                        </div>

                        <div className="mt-8">
                            <h4>MODIFY PRODUCTS</h4>
                            <p>
                                All of the available <strong>Products</strong> will be listed there. You
                                can <strong>Add</strong>,{" "}
                                <strong>Modify</strong> and <strong>Delete</strong> products from here.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/modify-product-7.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Modify Product"
                                    title="Modify Product"
                                    src="images/store/modify-product-7.png"
                                />
                            </div>
                            <hr/>
                        </div>

                        <div className="mt-8">
                            <h4>CREATE PRODUCT CATEGORIES</h4>
                            <p>
                                In the products section you can also create product categories. To create product
                                category click on <strong>Product Categories</strong> button as shown below.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/product-categories-button.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Create Product Categories"
                                    title="Create Product Categories"
                                    src="images/store/product-categories-button.png"
                                />
                            </div>


                            <p>
                                In this section, you
                                can <strong>add</strong>, <strong>edit</strong> or <strong>delete</strong> product
                                categories.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/modify-product-categories.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Modify Product Categories"
                                    title="Modify Product Categories"
                                    src="images/store/modify-product-categories.png"
                                />
                            </div>


                            <p>
                                In the add product category section you can
                                provide <strong>title</strong>, <strong>description</strong> and <strong>image</strong> of
                                the product category.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/add-product-category-form.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Modify Product Categories"
                                    title="Modify Product Categories"
                                    src="images/store/add-product-category-form.png"
                                />
                            </div>


                            <hr/>
                        </div>

                        <div className="mt-8">
                            <h4>CREATE PRODUCT</h4>
                            <p>
                                To create product you will be asked for basic details, categories (optional) along with
                                pricing options as well.
                            </p>

                            <p>
                                <strong>NOTE: </strong> If you want to add product variants for product leave pricing
                                options section blank. Pricing options will be hide in below section if your
                                product has variants like color, material etc. You need to provide pricing options for
                                specific product variants. Which will discussed later in this documentation.
                            </p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/store-add-product-8.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Create Product"
                                    title="Create Product"
                                    src="images/store/store-add-product-8.png"
                                />
                            </div>


                            <p>Selecting on sale product will display <strong>Sale</strong> tag in the product.</p>
                            <p>You can create product specifications and product options (variants).</p>


                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/product-variant-form.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Create Product"
                                    title="Create Product"
                                    src="images/store/product-variant-form.png"
                                />
                            </div>


                            <p>Adding product options will automatically create product variants details for individual
                                product options. You will be asked for the each variants pricing options as discussed
                                above.</p>

                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/product-variants-list.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Create Product"
                                    title="Create Product"
                                    src="images/store/product-variants-list.png"
                                />
                            </div>


                            <p>Now click on the <strong>save</strong> button to create new product in the specific
                                store. </p>


                            <hr/>
                        </div>
                    </div>
                    {/*END: Store Add Products */}

                    {/* START: MANAGE STORE BLOGS */}
                    <div className="overflow-hidden api-document-section" id="store-manage-blogs">
                        <h2>Store - Manage Blogs</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `store-front`} target="_blank">
                                Store Front
                            </a>{" "}
                            to see all available stores.
                        </p>
                        <p>
                            After that, click on the <strong>blogs</strong> in the dropdown.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/store-manage-blogs.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create Store"
                                title="Create Store"
                                src="images/store/store-manage-blogs.png"
                            />
                        </div>

                        <p>In this section you can <strong>add</strong> or <strong>modify</strong> your blog. You can
                            also preview your blog with clicking the link provided in the blogs list.</p>

                        <p>
                            <strong>NOTE: </strong> Clicking on blog preview link will only preview blogs details in
                            detail design template to check blogs details only. Actual design of the blog depends on the
                            store template which you have selected while creating a store.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/blogs-list.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create Store"
                                title="Create Store"
                                src="images/store/blogs-list.png"
                            />
                        </div>


                        <div className="mt-8">
                            <h4>CREATE BLOG</h4>
                            <p>
                                To create blogs section you will be asked blog basic details
                                like <strong>title</strong>, <strong>description</strong> and <strong>image</strong>.
                                After that, clicking on <strong>save</strong> button will create new blog for specific
                                store.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/create-blog.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Modify Product"
                                    title="Modify Product"
                                    src="images/store/create-blog.png"
                                />
                            </div>
                            <hr/>
                        </div>


                        <hr/>
                    </div>
                    {/* END: MANAGE STORE BLOGS */}


                    {/* START: MANAGE STORE COLLECTION BANNERS */}
                    <div className="overflow-hidden api-document-section" id="store-manage-collection-banners">
                        <h2>Store - Manage Collection Banners</h2>
                        <p>
                            First of all, go to the{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `store-front`} target="_blank">
                                Store Front
                            </a>{" "}
                            to see all available stores.
                        </p>
                        <p>
                            <strong>NOTE: </strong> Collection banners are template design specific. Not all the store
                            templates supports this functionality. Please check template previews to check the
                            availability.
                        </p>
                        <p>
                            After that, click on the <strong>Collection Banner</strong> in the dropdown.
                        </p>
                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/manage-collection-banners.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create Store"
                                title="Create Store"
                                src="images/store/manage-collection-banners.png"
                            />
                        </div>


                        <p>In this section you can <strong>add</strong> or <strong>modify</strong> your collection
                            banner.</p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/collection-banner-list.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Create Store"
                                title="Create Store"
                                src="images/store/collection-banner-list.png"
                            />
                        </div>


                        <div className="mt-8">
                            <h4>CREATE COLLECTION BANNER</h4>
                            <p>
                                To create collection section you will be asked basic details
                                like <strong>title</strong>, <strong>category</strong>, <strong>description</strong> and <strong>image</strong>.
                                After that, clicking on <strong>save</strong> button will create new collection banner
                                for specific
                                store.
                            </p>
                            <div className="api-document-detail">
                                <img
                                    onClick={() => {
                                        onClickBanner("images/store/add-collection-banner.png");
                                    }}
                                    className="api-document-detail-image shadow-lg document-image-border"
                                    alt="Modify Product"
                                    title="Modify Product"
                                    src="images/store/add-collection-banner.png"
                                />
                            </div>
                            <hr/>
                        </div>


                        <hr/>


                    </div>
                    {/* END: MANAGE STORE COLLECTION BANNERS */}


                    {/* START: STORE ORDERS */}
                    <div className="overflow-hidden api-document-section" id="store-orders">
                        <h2>STORE ORDERS</h2>

                        <p>
                            You can check all of the store orders by clicking{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `orders`} target="_blank">
                                Orders
                            </a>{" "}
                            menu as shown below.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/store-orders-9.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Store Orders"
                                title="Store Orders"
                                src="images/store/store-orders-9.png"
                            />
                        </div>

                        <p>
                            Also, you can filter from many records from clicking <strong>Advance Filter</strong> button.
                            Further more, you
                            can export all orders by clicking <strong>Export Excel</strong> button.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/store-orders-filters-10.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Store Orders Filters"
                                title="Store Orders Filters"
                                src="images/store/store-orders-filters-10.png"
                            />
                        </div>

                        <hr/>
                    </div>
                    {/* END: STORE ORDERS */}

                    {/* START: STORE TRANSACTIONS */}
                    <div className="overflow-hidden api-document-section" id="store-transactions">
                        <h2>STORE TRANSACTIONS</h2>

                        <p>
                            You can check all of the store transactions by clicking{" "}
                            <a href={process.env.REACT_APP_MERCHANT_URL + `transactions`} target="_blank">
                                Transactions
                            </a>{" "}
                            menu as shown below. In addition, you can
                            retrieve <strong>Refund</strong>, <strong>Chargebacks</strong>, <strong>Suspicious</strong>, <strong>Remove
                            Suspicious</strong>, <strong>Retrieval</strong>, <strong>Remove Retrieval</strong>,
                            and <strong>Test Transactions</strong> too.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/transactions-list-11.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Store Transactions Filters"
                                title="Store Transactions Filters"
                                src="images/store/transactions-list-11.png"
                            />
                        </div>

                        <p>
                            Also, you can filter from many records from clicking <strong>Advance Filter</strong> button.
                            Further more, you
                            can export all transactions by clicking <strong>Export Excel</strong> button.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/transactions-filter-12.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Store Transactions Filters"
                                title="Store Transactions Filters"
                                src="images/store/transactions-filter-12.png"
                            />
                        </div>


                        <p>
                            You can also check detailed chart report by going {" "}
                            <a
                                href={process.env.REACT_APP_MERCHANT_URL} target="_blank">
                                Dashboard
                            </a>{" "} page as shown below.
                        </p>

                        <div className="api-document-detail">
                            <img
                                onClick={() => {
                                    onClickBanner("images/store/transactions-filter-12.png");
                                }}
                                className="api-document-detail-image shadow-lg document-image-border"
                                alt="Dashboard Chart Report"
                                title="Dashboard Chart Report"
                                src="images/common/dashboard-chart.png"
                            />
                        </div>

                    </div>
                    {/* END: STORE TRANSACTIONS */}
                </div>
            </div>
        </>
    );
};
export default StoreIntegration;
