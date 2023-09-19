import React from "react";
import Images from "../../../../assets/images";


const Templates = ({onChooseTemplate}) => {
    return (
        <div className="flex justify-center items-center flex-col pb-8 bg-black/40 h-full">
            <span className="text-white text-xl mt-5 mb-5">Choose the templates</span>
            <div className="grid grid-cols-12 gap-5 gap-y-5 mx-8">
                <div className="intro-y col-span-12 lg:col-span-4 items-center flex flex-col">
                    <span className="text-white text-md mt-2 mb-2">Template 1</span>
                    <img
                        onClick={() => {
                            onChooseTemplate(1);
                        }}
                        src={Images.PaymentCardTemplateOne}
                        className="cursor-pointer"
                    />
                </div>
                <div className="intro-y col-span-12 lg:col-span-4 items-center flex flex-col">
                    <span className="text-white text-md mt-2 mb-2">Template 2</span>
                    <img
                        onClick={() => {
                            onChooseTemplate(2);
                        }}
                        src={Images.PaymentCardTemplateTwo}
                        className="cursor-pointer"
                    />
                </div>
                <div className="intro-y col-span-12 lg:col-span-4 items-center flex flex-col">
                    <span className="text-white text-md mt-2 mb-2">Template 3</span>
                    <img
                        onClick={() => {
                            onChooseTemplate(3);
                        }}
                        src={Images.PaymentCardTemplateThree}
                        className="cursor-pointer"
                    />
                </div>
                <div className="intro-y col-span-12 lg:col-span-4 items-center flex flex-col">
                    <span className="text-white text-md mt-2 mb-2">Template 4</span>
                    <img
                        onClick={() => {
                            onChooseTemplate(4);
                        }}
                        src={Images.PaymentCardTemplateFour}
                        className="cursor-pointer"
                    />
                </div>
                <div className="intro-y col-span-12 lg:col-span-4 items-center flex flex-col">
                    <span className="text-white text-md mt-2 mb-2">Template 5</span>
                    <img
                        onClick={() => {
                            onChooseTemplate(5);
                        }}
                        src={Images.PaymentCardTemplateFive}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default Templates;
