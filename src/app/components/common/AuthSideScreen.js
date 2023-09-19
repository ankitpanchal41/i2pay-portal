import Images from "../../../assets/images";

const AuthSideScreen = ({ illustrationImage, textLine1, textLine2, subText }) => {
    return (
        <div className="hidden lg:flex flex-col flex justify-center items-center">
            <div className="hidden lg:block">
                <img alt="illustration" className="-intro-x -mt-16" src={illustrationImage || Images.illustration} />
                <div className="-intro-x text-white text-center font-medium text-2xl leading-tight mt-10">
                    {textLine1 || ""}
                    <br />
                    {textLine2 || ""}
                </div>
                {/* <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">{subText}</div> */}
            </div>
        </div>
    );
};

export default AuthSideScreen;
