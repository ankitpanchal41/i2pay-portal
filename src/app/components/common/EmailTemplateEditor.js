import React, { useEffect, useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import { useSelector } from "react-redux";
import { EmailTemplateCurrency } from "../../utils/currency";

const EmailTemplateEditor = ({ json, onSaveData, id }) => {
    const { mode } = useSelector((state) => state.persist);

    let emailEditorRef = useRef(null);

    // const exportHtml = () => {
    //     emailEditorRef?.current?.editor?.exportHtml((data) => {
    //         const { design, html } = data;
    //         console.log("exportHtml", html);
    //     });
    // };

    const customPaymentButton = [
        {
            name: "phone",
            enabled: false,
        },
        {
            name: "email",
            enabled: false,
        },
        {
            name: "sms",
            enabled: false,
        },
        {
            name: "my_custom_link_type",
            label: "Payment Button",
            attrs: {
                href: `${process.env.REACT_APP_API_URL}email/campaign/pay?amount={{amount}}&currency={{currency}}&id=${id}`,
                target: "_blank",
            },
            fields: [
                {
                    name: "amount",
                    label: "Amount",
                    defaultValue: "",
                    inputType: "number",
                    minValue: 0,
                    placeholderText: null,
                    options: [],
                },
                {
                    name: "currency",
                    label: "Currency",
                    defaultValue: "INR",
                    inputType: null,
                    placeholderText: null,
                    options: EmailTemplateCurrency,
                },
            ],
        },
    ];

    useEffect(() => {
        emailEditorRef?.current?.editor?.loadDesign(json);
        emailEditorRef?.current?.editor?.setLinkTypes(customPaymentButton);
        onSaveData(emailEditorRef);
    }, [emailEditorRef?.current?.editor]);

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
        if (emailEditorRef?.current) {
            emailEditorRef?.current?.editor?.loadDesign(json);
            emailEditorRef?.current?.editor?.setLinkTypes(customPaymentButton);
            onSaveData(emailEditorRef);
        }
    };

    const onReady = () => {
        // editor is ready
        // console.log("onReady");
    };

    return (
        <div>
            {/* <div>
                <button onClick={exportHtml}>Export HTML</button>
            </div> */}

            <EmailEditor
                minHeight={"calc(100vh - 54px)"}
                appearance={{
                    theme: mode === "dark" ? "dark" : "light",
                    panels: {
                        tools: {
                            dock: "left",
                        },
                    },
                }}
                ref={emailEditorRef}
                onLoad={onLoad}
                onReady={onReady}
            />
        </div>
    );
};

export default EmailTemplateEditor;
