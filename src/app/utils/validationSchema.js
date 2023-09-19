import * as Yup from "yup";
import { messages } from "../messages/validations/index";

export const numberOnlyPattern = /^\d*$/;

// function checkCorruptedImage(value) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(value[0]);
//         reader.onload = function (value) {
//             const img = new Image();
//             img.src = value.target.result;
//             img.onload = function () {

//                 // console.log("this", this.width, this.height);
//                 // if (this.width && this.height) {
//                 //     console.log("IMAGE IS OK");
//                 //     // resolve();
//                 // } else {
//                 //     // reject();
//                 //     console.log("IMAGE IS NOT OK");
//                 // }
//                 // // resolve(this.width >= width && this.height >= height);

//             };
//         };
//     });
// }

function checkAspectRatio(value, width, height) {
    // console.log({ value, width, height });
    if (!value || typeof value === "string") {
        return true;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(value[0]);
        reader.onload = function (value) {
            const img = new Image();
            img.src = value.target.result;
            img.onload = function () {
                resolve(this.width >= width && this.height >= height);
            };
        };
    });
}

function emailValidation() {
    return Yup.string().email(messages.email.invalid).required(messages.email.required);
}

function bannerImageValidation() {
    return Yup.mixed().test("fileAspectRatio", "Please upload image min 1920x1080", (value) => {
        return checkAspectRatio(value, 1920, 1080);
    });
}

// function corruptedImageValidation() {
//     return Yup.mixed().test("fileAspectRatio", "Please select valid image", (value) => {
//         return checkCorruptedImage(value);
//     });
// }

function bannerImageRequiredValidation(msg) {
    return Yup.mixed()
        .required(msg)
        .test("fileAspectRatio", "Please upload image min 700x500", (value) => {
            return checkAspectRatio(value, 700, 500);
        });
}

function productImageValidation(msg) {
    return Yup.mixed()
        .required(msg)
        .test("fileAspectRatio", "Please upload image min 200x300", (value) => {
            return checkAspectRatio(value, 200, 300);
        });
}

function collectionBannerImageValidation(msg) {
    return Yup.mixed()
        .required(msg)
        .test("fileAspectRatio", "Please upload image min 750x700", (value) => {
            return checkAspectRatio(value, 750, 700);
        });
}

function mobileValidation() {
    return Yup.string()
        .trim()
        .required(messages.mobile.required)
        .min(8, messages.mobile.min)
        .max(12, messages.mobile.max)
        .test("number_only_test", messages.mobile.invalid, (val) => numberOnlyPattern.test(val));
}

export const loginSchema = Yup.object().shape({
    email: emailValidation(),
    password: Yup.string().required(messages.password.required),
});

export const registerValidations = Yup.object().shape({
    email: emailValidation(),
    mobile: mobileValidation(),
    termsCheck: Yup.bool().equals([true]),
});

export const companyDetails = Yup.object().shape({
    merchant_name: Yup.string().trim().required(messages.company_name.required),
    company_name: Yup.string().when("entities_type", {
        is: (value) => value === "2" || value === "3" || value === "4" || value === "6",
        then: Yup.string().trim().required(messages.company_name.required),
        otherwise: Yup.string(),
    }),

    categories: Yup.string().when("entities_type", {
        is: (value) => value === "2" || value === "3" || value === "4" || value === "6",
        then: Yup.string()
            .trim()
            .required(messages.category.required)
            .test("string_only_test", messages.category.required, (val) => val !== "[]"),
        otherwise: Yup.string(),
    }),

    company_registration_num: Yup.string().when("entities_type", {
        is: (value) => value === "2" || value === "3" || value === "4" || value === "6",
        then: Yup.string().trim().required(messages.registrationNo.required),
        otherwise: Yup.string(),
    }),

    company_gst_num: Yup.string()
        .trim()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, messages.gstNo.valid),

    // business_activity: Yup.string().when("entities_type", {
    //     is: (value) => value === "2" || value === "3" || value === "4" || value === "6",
    //     then: Yup.string().trim().required(messages.business_activity.required),
    //     otherwise: Yup.string(),
    // }),

    website: Yup.string().when("entities_type", {
        is: (value) => value === "2" || value === "3" || value === "4" || value === "6",
        then: Yup.string().trim().required(messages.website.required).url(messages.website.valid),
        otherwise: Yup.string(),
    }),

    company_address: Yup.string().when("entities_type", {
        is: (value) => value === "2" || value === "3" || value === "4" || value === "6",
        then: Yup.string().trim().required(messages.fullAddress.required),
        otherwise: Yup.string(),
    }),

    // categories: Yup.number().typeError(messages.category.required).required(messages.category.required),

    // country_registration: Yup.string().trim().required(messages.registrationCountry.required),
    // company_year_of_register: Yup.string()
    //     .trim()
    //     .required(messages.registrationYear.required)
    //     .length(4, messages.registrationYear.length)
    //     .test("len", messages.registrationYear.year, (val) => val && Number(val) <= new Date().getFullYear())
    //     .test("len", messages.registrationYear.year_lan, (val) => val && Number(val) >= 1900),

    // company_gst_num: Yup.string().when("country_registration", {
    //     is: (value) => value === "IN",
    //     then: Yup.string()
    //         .trim()
    //         .required(messages.gstNo.required)
    //         .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, messages.gstNo.valid),
    //     otherwise: Yup.string(),
    // }),

    entities_type: Yup.string().trim().required(messages.entityType.required),

    aadhar_card_front_image: Yup.mixed().when("entities_type", {
        is: (value) => value === "1" || value === "5",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    aadhar_card_back_image: Yup.mixed().when("entities_type", {
        is: (value) => value === "1" || value === "5",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    cancel_cheque: Yup.mixed().when("entities_type", {
        is: (value) => value === "1",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    certificate_of_incorporation: Yup.mixed().when("entities_type", {
        is: (value) => value === "2" || value === "4",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    personalised_cancel_cheque_of_account: Yup.mixed().when("entities_type", {
        is: (value) => value === "2" || value === "3" || value === "4" || value === "5" || value === "6",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    // memorandum_article_of_association_of_company: Yup.mixed().when("entities_type", {
    //     is: (value) => value === "2",
    //     then: Yup.mixed().required("Please upload"),
    //     otherwise: Yup.mixed(),
    // }),

    board_resolution_company_stamp: Yup.mixed().when("entities_type", {
        is: (value) => value === "2" || value === "6",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    registration_certificate: Yup.mixed().when("entities_type", {
        is: (value) => value === "3" || value === "6",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    shops_and_establishment_document: Yup.mixed().when("entities_type", {
        is: (value) => value === "5",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    trust_deed: Yup.mixed().when("entities_type", {
        is: (value) => value === "6",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    moa: Yup.mixed().when("entities_type", {
        is: (value) => value === "4" || value === "2",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    aoa: Yup.mixed().when("entities_type", {
        is: (value) => value === "4" || value === "2",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    business_address_proof: Yup.mixed().when("entities_type", {
        is: (value) => value === "4",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    gst_doc: Yup.mixed(),

    resolution_letter: Yup.mixed().when("entities_type", {
        is: (value) => value === "4",
        then: Yup.mixed().required("Please upload"),
        otherwise: Yup.mixed(),
    }),

    pan_card: Yup.mixed().required("Please upload"),

    // pan_card: Yup.mixed().when("pan_card", {
    //     is: (value) => value === undefined || value.length === 0,
    //     then: Yup.mixed().when("passport", {
    //         is: (value) => value === undefined || value.length === 0,
    //         then: Yup.mixed().when("voter_id", {
    //             is: (value) => value === undefined || value.length === 0,
    //             then: Yup.mixed().when("driving_license", {
    //                 is: (value) => value === undefined || value.length === 0,
    //                 then: Yup.mixed().required("Please upload"),
    //                 otherwise: Yup.mixed(),
    //             }),
    //             otherwise: Yup.mixed(),
    //         }),
    //         otherwise: Yup.mixed(),
    //     }),
    //     otherwise: Yup.mixed(),
    // }),

    // pan_card: Yup.mixed().when("pan_card", {
    //     is: (value) => value === undefined || value.length === 0,
    //     then: Yup.mixed().required("Please upload"),
    //     otherwise: Yup.mixed(),
    // }),
    // passport: Yup.mixed().when("passport", {
    //     is: (value) => value === undefined || value.length === 0,
    //     then: Yup.mixed().required("Please upload"),
    //     otherwise: Yup.mixed(),
    // }),
    // voter_id: Yup.mixed().when("voter_id", {
    //     is: (value) => value === undefined || value.length === 0,
    //     then: Yup.mixed().required("Please upload"),
    //     otherwise: Yup.mixed(),
    // }),
    // driving_license: Yup.mixed().when("driving_license", {
    //     is: (value) => value === undefined || value.length === 0,
    //     then: Yup.mixed().required("Please upload"),
    //     otherwise: Yup.mixed(),
    // }),
});

export const directorDetails = Yup.object().shape({
    director_name: Yup.string().trim().required(messages.name.required),
    director_address: Yup.string().trim().required(messages.address.required),
    director_email: emailValidation(),
    director_phone_num: mobileValidation(),
    // director_pan_card: Yup.mixed().required(messages.panCard.required),
    // director_passport: Yup.mixed().required(messages.passport.required),
    // director_aadhar_card_front_image: Yup.mixed().required(messages.aadharCard.required),
    // director_aadhar_card_back_image: Yup.mixed().required(messages.aadharCard.required),
    // director_bank_statement: Yup.mixed().required(messages.bankStatement.required),
    // director_latest_utility_bill: Yup.mixed().required(messages.latestUtilityBill.required),
    // director_articles_of_incorporation: Yup.mixed().required(messages.articlesOfIncorporation.required),
    // director_ubo_bank_statement: Yup.mixed().required(messages.uboBankStatement.required),
    // director_processing_history: Yup.mixed().required(messages.processingHistory.required),
    // director_memorandum_of_association: Yup.mixed().required(messages.memorandumOfAssociation.required),
    // director_additional_document: Yup.mixed().required(messages.additionalDocument.required),

    // director_pan_card: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed().required(messages.panCard.required),
    //     otherwise: Yup.mixed(),
    // }),

    director_aadhar_card_front_image: Yup.mixed().required(messages.aadharCard.required),
    director_aadhar_card_back_image: Yup.mixed().required(messages.aadharCard.required),
    director_pan_card: Yup.mixed().required(messages.panCard.required),

    // director_aadhar_card_back_image: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed().required(messages.aadharCard.required),
    //     otherwise: Yup.mixed(),
    // }),

    // director_articles_of_incorporation: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.articlesOfIncorporation.required),
    // }),

    // director_aadhar_card_front_image: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed().required(messages.aadharCard.required),
    //     otherwise: Yup.mixed(),
    // }),

    // director_aadhar_card_back_image: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed().required(messages.aadharCard.required),
    //     otherwise: Yup.mixed(),
    // }),

    // director_articles_of_incorporation: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.articlesOfIncorporation.required),
    // }),

    // director_ubo_bank_statement: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.uboBankStatement.required),
    // }),

    // director_processing_history: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.processingHistory.required),
    // }),

    // director_memorandum_of_association: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.memorandumOfAssociation.required),
    // }),

    // director_additional_document: Yup.mixed().when("director_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.additionalDocument.required),
    // }),
});

export const shareHolderSchema = Yup.object().shape({
    share_holder_name: Yup.string().trim().required(messages.name.required),
    share_holder_address: Yup.string().trim().required(messages.address.required),
    share_holder_email: emailValidation(),
    share_holder_phone_num: mobileValidation(),
    // share_holder_pan_card: Yup.mixed().required(messages.panCard.required),
    // share_holder_passport: Yup.mixed().required(messages.passport.required),
    // share_holder_aadhar_card_front_image: Yup.mixed().required(messages.aadharCard.required),
    // share_holder_aadhar_card_back_image: Yup.mixed().required(messages.aadharCard.required),
    // share_holder_bank_statement: Yup.mixed().required(messages.bankStatement.required),
    // share_holder_latest_utility_bill: Yup.mixed().required(messages.latestUtilityBill.required),
    // share_holder_articles_of_incorporation: Yup.mixed().required(messages.articlesOfIncorporation.required),
    // share_holder_ubo_bank_statement: Yup.mixed().required(messages.uboBankStatement.required),
    // share_holder_processing_history: Yup.mixed().required(messages.processingHistory.required),
    // share_holder_memorandum_of_association: Yup.mixed().required(messages.memorandumOfAssociation.required),
    // share_holder_additional_document: Yup.mixed().required(messages.additionalDocument.required),
    // share_holder_pan_card: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed().required(messages.panCard.required),
    //     otherwise: Yup.mixed(),
    // }),

    // share_holder_aadhar_card_front_image: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed().required(messages.aadharCard.required),
    //     otherwise: Yup.mixed(),
    // }),

    // share_holder_aadhar_card_back_image: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed().required(messages.aadharCard.required),
    //     otherwise: Yup.mixed(),
    // }),

    share_holder_pan_card: Yup.mixed().required(messages.panCard.required),
    share_holder_aadhar_card_front_image: Yup.mixed().required(messages.aadharCard.required),
    share_holder_aadhar_card_back_image: Yup.mixed().required(messages.aadharCard.required),

    // share_holder_articles_of_incorporation: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.articlesOfIncorporation.required),
    // }),

    // share_holder_ubo_bank_statement: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.uboBankStatement.required),
    // }),

    // share_holder_processing_history: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.processingHistory.required),
    // }),

    // share_holder_memorandum_of_association: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.memorandumOfAssociation.required),
    // }),

    // share_holder_additional_document: Yup.mixed().when("share_holder_country", {
    //     is: (value) => value === "IN",
    //     then: Yup.mixed(),
    //     otherwise: Yup.mixed().required(messages.additionalDocument.required),
    // }),
});

export const businessValidation = Yup.object().shape({
    business_activity: Yup.string().trim().required(messages.business_activity.required),
    business_details: Yup.string().trim().required(messages.business_details.required),
    business_email: emailValidation(),
    business_phone_num: mobileValidation(),
    business_plan: Yup.mixed().required(messages.business_plan.required),
    business_license: Yup.mixed().required(messages.business_license.required),
    business_financial: Yup.mixed().required(messages.business_financial.required),
});

export const otpValidation = Yup.object().shape({
    otp: Yup.string().required(messages.otp.required).length(6, messages.otp.invalid),
});

export const changePasswordValidation = Yup.object().shape({
    newPassword: Yup.string()
        .required(messages.newPassword.required)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ),
    confirmPassword: Yup.string()
        .required(messages.confirmPassword.required)
        .oneOf([Yup.ref("newPassword"), null], messages.confirmPassword.different),
});

export const setNewPasswordValidation = Yup.object().shape({
    oldPassword: Yup.string().required(messages.oldPassword.required),
    newPassword: Yup.string()
        .required(messages.newPassword.required)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ),
    confirmPassword: Yup.string()
        .required(messages.confirmPassword.required)
        .oneOf([Yup.ref("newPassword"), null], messages.confirmPassword.different),
});

export const editProfileSchema = Yup.object().shape({
    name: Yup.string().required(messages.name.required),
    email: emailValidation(),
    mobile_num: mobileValidation(),
});

export const forgotPasswordValidation = Yup.object().shape({
    email: emailValidation(),
});

export const resetPasswordValidations = Yup.object().shape({
    newPassword: Yup.string()
        .required(messages.newPassword.required)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ),
    confirmPassword: Yup.string()
        .required(messages.confirmPassword.required)
        .oneOf([Yup.ref("newPassword"), null], messages.confirmPassword.different),
});

export const invoiceProduct = Yup.object().shape({
    name: Yup.string().required(messages.invoiceName.required),
    description: Yup.string().max(200, messages.invoiceDescription.max),
    qty: Yup.number().required(messages.invoiceQty.required).min(1),
    price: Yup.number().required(messages.invoicePrice.required).min(0.1),
    tax_type: Yup.number().required(messages.tax_type.required),
    tax_value: Yup.string().when("tax_type", {
        is: (value) => value != "1",
        then: Yup.string().required(messages.tax_value.required),
        otherwise: Yup.string(),
    }),
});

export const storeDetails = Yup.object().shape({
    store_name: Yup.string().trim().required(messages.store_name.required),
    store_description: Yup.string().trim().required(messages.store_description.required),
    logo: Yup.mixed().required(messages.logo.required),
    store_banner_1: bannerImageValidation(),
    store_banner_2: bannerImageValidation(),
    store_banner_3: bannerImageValidation(),
    address_line_1: Yup.string().trim().required(messages.store_address_line_1.required),
    city: Yup.string().trim().required(messages.store_city.required),
    state: Yup.string().trim().required(messages.store_state.required),
    pincode: Yup.string().trim().required(messages.store_pincode.required),
    country: Yup.string().trim().required(messages.store_country.required),
    // store_banner_1: Yup.mixed().required(messages.store_banner_1.required),
    // store_banner_2: Yup.mixed().required(messages.store_banner_2.required),
    // store_banner_3: Yup.mixed().required(messages.store_banner_3.required),
    store_currency: Yup.string().trim().required(messages.store_currency.required),
    // template_banner: Yup.number().required(messages.store_template_banner.required),
});

export const productDetails = Yup.object().shape({
    name: Yup.string().required(messages.store_name.required),
    description: Yup.string().required(messages.store_description.required),
    sku: Yup.string().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.string().required(messages.product_sku.required),
        otherwise: Yup.string(),
    }),
    price: Yup.number().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.number().required(messages.product_price.required).min(0.1),
        otherwise: Yup.number(),
    }),
    compare_price: Yup.number().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.number().min(0.1),
        otherwise: Yup.number(),
    }),
    quantity: Yup.number().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.number().required(messages.product_quantity.required).min(1).integer(),
        otherwise: Yup.number(),
    }),
    product_image: productImageValidation(messages.store_banner.required),
    options: Yup.array().when("pricing_option", {
        is: (value) => value === "1",
        then: Yup.array(
            Yup.object({
                name: Yup.object({
                    value: Yup.string().required(messages.option.required),
                }),

                value: Yup.array(
                    Yup.object({
                        value: Yup.string().required(messages.option_value.required),
                    }),
                ),
            }),
        )
            .required()
            .min(1),
        otherwise: Yup.array(),
    }),
    variants: Yup.array().when("pricing_option", {
        is: (value) => value === "1",
        then: Yup.array(
            Yup.object({
                quantity: Yup.string().required(messages.product_quantity.required),
                // image: Yup.array(productImageValidation(messages.required)),
                sku: Yup.string().required(messages.product_sku.required),
                price: Yup.string().required(messages.store_currency.required),
            }),
        ),
        otherwise: Yup.array(),
    }),
    specifications: Yup.array().when("specifications_enable", {
        is: (value) => value === "1",
        then: Yup.array(
            Yup.object({
                key: Yup.string().required(messages.product_specifications__key.required),
                value: Yup.string().required(messages.product_specifications_value.required),
            }),
        ),
        otherwise: Yup.array(),
    }),
});

export const productCategorySchema = Yup.object().shape({
    name: Yup.string().required(messages.category_name.required),
    description: Yup.string().required(messages.category_description.required),
    image: productImageValidation(messages.category_image.required),
});

export const contactSchema = Yup.object().shape({
    first_name: Yup.string().required(messages.first_name.required),
    last_name: Yup.string().required(messages.last_name.required),
    email: emailValidation(),
    mobile_no: mobileValidation(),
});

export const editProductSchema = Yup.object().shape({
    name: Yup.string().required(messages.store_name.required),
    description: Yup.string().required(messages.store_description.required),
    product_image: productImageValidation(messages.store_banner.required),
    price: Yup.string().required(messages.store_currency.required),
    sku: Yup.string().required(messages.product_sku.required),
});

export const storeAboutDetails = Yup.object().shape({
    about_description: Yup.string().trim().required(messages.about_us_description.required),
    about_image: bannerImageRequiredValidation(messages.about_us_image.required),
});

export const storeContactDetails = Yup.object().shape({
    store_contact_email: emailValidation(),
    store_contact_description: Yup.string().trim().required(messages.store_contact_description.required),
    contact_image: bannerImageRequiredValidation(messages.contact_us_image.required),
    store_contact_mobile: mobileValidation(),
});

export const paymentButton = Yup.object().shape({
    name: Yup.string().trim().required(messages.payment_button_name.required),
});

export const ipWhitelist = Yup.object().shape({
    website: Yup.string().trim().required(messages.website_name.required).url(messages.website_name.valid),
    // connectors_id: Yup.number().typeError(messages.connector.required).required(messages.connector.required),
    ip_addresses: Yup.array(
        Yup.object({
            address: Yup.string()
                .matches(
                    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    messages.ip_address.valid,
                )
                .required(messages.ip_address.required),
        }),
    )
        .required()
        .min(1),
});

export const connectorLimitSettings = Yup.object().shape({
    minimum_transaction_limit: Yup.number()
        .integer()
        .min(0, messages.minimum_transaction_limit.valid)
        .required(messages.minimum_transaction_limit.required),
    daily_transaction_limit: Yup.string()
        .min(0, messages.daily_transaction_limit.valid)
        .required(messages.daily_transaction_limit.required),
    maximum_transaction_limit: Yup.string()
        .min(0, messages.maximum_transaction_limit.valid)
        .required(messages.maximum_transaction_limit.required),
});

export const connectorRules = Yup.object().shape({
    rule_name: Yup.string().required(messages.rule_name.required),
    connector_id: Yup.string().required(messages.connector_id.required),
    connector_type: Yup.array().min(1, "Connector type is required field").required(messages.connector_type.required),
    formValues: Yup.array(
        Yup.object({
            rule_type: Yup.string().required("Rule type is required field"),
            condition: Yup.string().required("Please select condition"),
            value: Yup.lazy((val) =>
                Array.isArray(val)
                    ? Yup.array().min(1, "Value is required field").required("Value is required field").nullable(false)
                    : Yup.mixed().required("Value is required field").nullable(false),
            ),
        }),
    )
        .required()
        .min(1),
});

export const vendorsSelectSchema = Yup.object().shape({
    amounts: Yup.array(Yup.number().required("Amount is required").min(1, "Please enter valid amount")),
    amount_type: Yup.bool().required("Amount Type is required"),
});

export const vendorsSelectAutoSplitSchema = Yup.object().shape({
    is_auto_split_enabled: Yup.bool().required("Amount Type is required"),
    percentage: Yup.array().when("is_auto_split_enabled", {
        is: (value) => value === true,
        then: Yup.array(Yup.number().required("Percentage is required").min(1, "Please enter valid percentage")),
        otherwise: Yup.array(),
    }),
    split_type: Yup.bool().when("is_auto_split_enabled", {
        is: (value) => value === true,
        then: Yup.bool().required("Split Type is required"),
        otherwise: Yup.bool(),
    }),
    // percentage: Yup.array(Yup.number().required("Percentage is required").min(1, "Please enter valid percentage")),
    // split_type: Yup.bool().required("Split Type is required"),
});

export const advanceSearchSchema = Yup.object().shape({
    email: Yup.string().email(messages.email.invalid),
    from_amount: Yup.number(messages.amount.valid)
        .min(0, messages.amount.valid)
        .when("to_amount", {
            is: true,
            then: Yup.number().required("Please enter from amount"),
        }),
    to_amount: Yup.number(messages.amount.valid)
        .min(0, messages.amount.valid)
        .moreThan(Yup.ref("from_amount"), "Amount must be greater than from amount"),
    ip_address: Yup.string().matches(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        messages.ip_address.valid,
    ),
});

export const orderAdvanceSearchSchema = Yup.object().shape({
    customer_email: Yup.string().email(messages.email.invalid),
    from_amount: Yup.number(messages.amount.valid)
        .min(0, messages.amount.valid)
        .when("to_amount", {
            is: true,
            then: Yup.number().required("Please enter from amount"),
        }),
    to_amount: Yup.number(messages.amount.valid)
        .min(0, messages.amount.valid)
        .moreThan(Yup.ref("from_amount"), "Amount must be greater than from amount"),
});

export const invoiceSendSchema = Yup.object().shape({
    email: emailValidation(),
    subject: Yup.string().required(messages.subject.required),
    body: Yup.string().required(messages.body.required),
    timeline: Yup.string(),
    timeline_type: Yup.string().when("timeline", {
        is: (value) => value !== undefined && value !== "1",
        then: Yup.string().required(messages.timeline_type.required),
        otherwise: Yup.string(),
    }),
    // contact_image: bannerImageRequiredValidation(messages.contact_us_image.required),
});

export const payoutSettingSchema = Yup.object().shape({
    timeline: Yup.string().required(messages.timeline.required),
    timeline_type: Yup.string().when("timeline", {
        is: (value) => value !== undefined && value !== "1",
        then: Yup.string().required(messages.timeline_type.required),
        otherwise: Yup.string(),
    }),
    timeline_time: Yup.string().required(messages.timeline_time.required),
});

export const payoutSchema = Yup.object().shape({
    connector_id: Yup.mixed().required(messages.name.required),
    name: Yup.string().required(messages.name.required),
    email: emailValidation(),
    phone: mobileValidation(),
    address: Yup.string().required(messages.address.required),
    account_no: Yup.string()
        .required(messages.account_no.required)
        .min(9, "Please enter minimum 9 digit")
        .max(18, "Please enter maximum 18 digit"),
    ifsc_code: Yup.string()
        .required(messages.ifsc_code.required)
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter valid IFSC code"),
    payout_mode: Yup.string().required(messages.payout_mode.required),
    // amount: Yup.number().required(messages.amount.required),
});

export const transactionRefundSchema = Yup.object().shape({
    reason: Yup.string().trim().required("Please enter reason"),
});

export const smsSendSchema = Yup.object().shape({
    phone_number: mobileValidation(),
});

export const templateSendSchema = Yup.object().shape({
    email: emailValidation(),
});

export const smsTemplates = Yup.object().shape({
    template_name: Yup.string().trim().required(messages.template_name.required),
    template: Yup.string().trim().required(messages.template.required),

    // name: Yup.string().required(messages.sms_content_name.required),
    //
    // amount: Yup.number(messages.sms_content_amount.valid)
    //     .min(0, messages.sms_content_amount.valid).required(messages.sms_content_amount.required),
    //
    // link: Yup.string().required(messages.sms_content_link.required).url(messages.sms_content_link.valid),

    // name: Yup.string().when('template',{
    //     is: (value) => value != "",
    //     then: Yup.string().required(messages.sms_content_name.required)
    // }),
    //
    // amount: Yup.string().when('template',{
    //     is: (value) => value != "",
    //     then: Yup.number(messages.amount.valid)
    //         .min(0, messages.amount.valid).required(messages.sms_content_amount.required)
    // }),
    //
    // link: Yup.string().when('template',{
    //     is: (value) => value != "",
    //     then: Yup.string().required(messages.sms_content_link.required)
    // })
});

export const agreementUploadSchema = Yup.object().shape({
    merchant_application_agreement: Yup.mixed().required(messages.uploadAgreement.required),
});

export const Step1EmailCampaignDetails = Yup.object().shape({
    name: Yup.string().required(messages.emailCampaign.step1.name.required),
    subject: Yup.string().required(messages.emailCampaign.step1.subject.required),
});

export const Step2EmailToSection = Yup.object().shape(
    {
        contact_category: Yup.array().when("contact_email", {
            is: (value) => value === undefined || value.length === 0,
            then: Yup.array()
                .min(1, messages.emailCampaign.step2.contact_category.required)
                .required(messages.emailCampaign.step2.contact_category.required)
                .nullable(false),
            otherwise: Yup.array(),
        }),
        contact_email: Yup.array().when("contact_category", {
            is: (value) => value === undefined || value.length === 0,
            then: Yup.array()
                .min(1, messages.emailCampaign.step2.contact_email.required)
                .required(messages.emailCampaign.step2.contact_email.required)
                .nullable(false),
            otherwise: Yup.array(),
        }),
    },
    [["contact_category", "contact_email"]],
);

export const Step3EmailContentSection = Yup.object().shape({
    content: Yup.string().required(messages.emailCampaign.step3.content.required),
});

export const Step1SmsCampaignDetails = Yup.object().shape({
    name: Yup.string().required(messages.smsCampaign.step1.name.required),
});

export const Step2SMSToSection = Yup.object().shape(
    {
        contact_category: Yup.array().when("contact_sms", {
            is: (value) => value === undefined || value.length === 0,
            then: Yup.array()
                .min(1, messages.smsCampaign.step2.contact_category.required)
                .required(messages.smsCampaign.step2.contact_category.required)
                .nullable(false),
            otherwise: Yup.array(),
        }),
        contact_sms: Yup.array().when("contact_category", {
            is: (value) => value === undefined || value.length === 0,
            then: Yup.array()
                .min(1, messages.smsCampaign.step2.contact_sms.required)
                .required(messages.smsCampaign.step2.contact_sms.required)
                .nullable(false),
            otherwise: Yup.array(),
        }),
    },
    [["contact_category", "contact_sms"]],
);

export const Step3SMSContentSection = Yup.object().shape({
    content: Yup.string().required(messages.smsCampaign.step3.content.required),
});

export const paymentLinkSchema = Yup.object().shape({
    title: Yup.string().required(messages.paymentLink.title.required),
    email: emailValidation(),
    mobile_no: mobileValidation(),
    payment_type: Yup.string().required(messages.paymentLink.payment_type.required),
    amount: Yup.number(messages.paymentLink.amount.valid).required(messages.paymentLink.amount.required).min(0.1),
});

export const paymentPageSchema = Yup.object().shape({
    title: Yup.string().required(messages.paymentPage.title.required),
    description: Yup.string().required(messages.paymentPage.description.required),
    mobile: mobileValidation(),
    email: emailValidation(),
    amount: Yup.number().when("amount_type", {
        is: (value) => value === "fixed",
        then: Yup.number(messages.paymentPage.amount.valid).required(messages.paymentPage.amount.required).min(0.1),
        otherwise: Yup.number(),
    }),
    logo: Yup.mixed().when("logo_type", {
        is: (value) => value === "" || value === undefined || value === null,
        then: Yup.mixed(),
        otherwise: Yup.mixed().required("Please select image"),
    }),
});

export const blogsSchema = Yup.object().shape({
    title: Yup.string().required(messages.blogs.title.required),
    description: Yup.string().required(messages.blogs.description.required),
    short_description: Yup.string().required(messages.blogs.short_description.required),
    blog_image: bannerImageRequiredValidation(messages.blogs.blog_image.required),
});

export const collectionBannerSchema = Yup.object().shape({
    name: Yup.string().required(messages.collectionBanner.name.required),
    description: Yup.string().required(messages.collectionBanner.name.required),
    banner_image: bannerImageRequiredValidation(messages.collectionBanner.banner_image.required),
    category_id: Yup.string().required(messages.collectionBanner.category_id.required),
});

export const paymentPageUserSchema = Yup.object().shape({
    amount: Yup.number().when("amount_type", {
        is: (value) => value === "multiple",
        then: Yup.number(),
        otherwise: Yup.number(messages.paymentPage.amount.valid).required(messages.paymentPage.amount.required).min(0.1),
    }),
    currency: Yup.string().required(messages.store_currency.required),
    mobile_no: mobileValidation(),
    email: emailValidation(),
});

export const webhookSchema = Yup.object().shape({
    endpoint_url: Yup.string().trim().required(messages.webhook.endpoint_url.required).url(messages.webhook.endpoint_url.valid),
    // description: Yup.string().required(messages.webhook.description.required),
    topics: Yup.array()
        .typeError(messages.webhook.topic.required)
        .required(messages.webhook.topic.required)
        .min(1, messages.webhook.topic.min),
});

export const webhookTestSchema = Yup.object().shape({
    topics: Yup.object().required(messages.webhook.event.required),
});

export const paymentCardSchema = Yup.object().shape({
    title: Yup.mixed().required(messages.product_name.required),
    description: Yup.string().required(messages.store_description.required),
    sku: Yup.string().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.string().required(messages.product_sku.required),
        otherwise: Yup.string(),
    }),
    price: Yup.number().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.number().required(messages.product_price.required).min(0.1),
        otherwise: Yup.number(),
    }),
    compare_price: Yup.number().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.number().min(0.1),
        otherwise: Yup.number(),
    }),
    quantity: Yup.number().when("pricing_option", {
        is: (value) => value === "0",
        then: Yup.number().required(messages.product_quantity.required).min(1).integer(),
        otherwise: Yup.number(),
    }),
    logo: productImageValidation(messages.product_image.required),
    options: Yup.array().when("pricing_option", {
        is: (value) => value === "1",
        then: Yup.array(
            Yup.object({
                name: Yup.object({
                    value: Yup.string().required(messages.option.required),
                }),

                value: Yup.array(
                    Yup.object({
                        value: Yup.string().required(messages.option_value.required),
                    }),
                ),
            }),
        )
            .required()
            .min(1),
        otherwise: Yup.array(),
    }),
    variants: Yup.array().when("pricing_option", {
        is: (value) => value === "1",
        then: Yup.array(
            Yup.object({
                quantity: Yup.string().required(messages.product_quantity.required),
                // image: Yup.array(productImageValidation(messages.required)),
                sku: Yup.string().required(messages.product_sku.required),
                price: Yup.string().required(messages.store_currency.required),
            }),
        ),
        otherwise: Yup.array(),
    }),
    specifications: Yup.array().when("specifications_enable", {
        is: (value) => value === "1",
        then: Yup.array(
            Yup.object({
                key: Yup.string().required(messages.product_specifications__key.required),
                value: Yup.string().required(messages.product_specifications_value.required),
            }),
        ),
        otherwise: Yup.array(),
    }),
    currency: Yup.string().required(messages.store_currency.required),
});

export const paymentCardUserSchema = Yup.object().shape({
    mobile_no: mobileValidation(),
    email: emailValidation(),
});
