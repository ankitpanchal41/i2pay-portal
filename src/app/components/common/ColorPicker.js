import { createPortal } from "react-dom";
import { SketchPicker } from "react-color";

const Dropdown = () => {
    return (
        <>
            <div className="">
                <SketchPicker />
            </div>
        </>
    );
};

const ColorPicker = (props) => {
    return createPortal(
        <>
            <Dropdown {...props} />
        </>,
    );
};

export default ColorPicker;
