import React from "react";

const MerchantStepViewAccordian = ({ index, children, title, accordionIndex, setAccordionIndex }) => {
    return (
        <div key={index} id="faq-accordion-2" className="accordion accordion-boxed mb-4">
            <div className="accordion-item">
                <div id="faq-accordion-content-1" className="accordion-header">
                    <button
                        onClick={() => setAccordionIndex(accordionIndex === index ? null : index)}
                        className="accordion-button"
                        type="button"
                        data-tw-toggle="collapse"
                        data-tw-target="#faq-accordion-collapse-5"
                        aria-expanded="false"
                        aria-controls="faq-accordion-collapse-5">
                        {index + 1}. {title}
                    </button>
                </div>
                <div
                    id="shareholder-faq-accordion-collapse-4"
                    className={`accordion-collapse collapse ${accordionIndex === index && "show"} `}
                    aria-labelledby="shareholder-faq-accordion-content-2"
                    data-tw-parent="#faq-accordion-3"
                    how="">
                    <div className="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default MerchantStepViewAccordian;
