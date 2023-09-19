import React, { useState } from "react";
import MerchantStepViewAccordian from "./MerchantStepViewAccordian";
import MerchantStepViewItem from "./MerchantStepViewItem";
import Box from "../../../components/common/Box";
import Slider from "react-slick";
import * as Icon from "react-feather";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MerchantStepView = ({ title, titleIcon, data, entitiesType, label }) => {
    const [sliderIndex, setSliderIndex] = useState(1);

    const onSliderChange = (e) => {
        setSliderIndex(e + 1);
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style }} onClick={onClick}>
                <Icon.ChevronRight size={24} />
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;

        return (
            <div className={className} style={{ ...style }} onClick={onClick}>
                <Icon.ChevronLeft color="#3b4863" size={24} />
            </div>
        );
    }

    var settings = {
        dots: false,
        infinite: false,
        // speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        buttons: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <>
            <div className="intro-y">
                {Array.isArray(data) ? (
                    <Box header={title} noBodyDesign={true} sliderIndex={sliderIndex}>
                        <div className={`bg-white border h-auto md:px-16`}>
                            <Slider {...settings} afterChange={onSliderChange}>
                                {data?.map((item, index) => (
                                    <div className="p-8" key={index}>
                                        <MerchantStepViewItem entitiesType={entitiesType} label={label} data={item} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Box>
                ) : (
                    <Box header={title}>
                        <div className="px-1">
                            <MerchantStepViewItem entitiesType={entitiesType} label={label} data={data} />
                        </div>
                    </Box>
                )}
            </div>
        </>
    );
};

export default MerchantStepView;
