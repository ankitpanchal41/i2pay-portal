import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const AppLoader = ({ isLoading }) => {
    const { loading } = useSelector((state) => state.loader);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style = "";
        }
    }, [loading]);

    return (
        <>
            {loading || isLoading ? (
                <div className="fixed w-[100%] h-[100%] top-0 left-0 z-[100] flex justify-center items-center blurred-background">
                    <ClipLoader
                        loading={true}
                        color="#1E3A8A"
                        size={55}
                        css="border-width: 4px;border-color: #1E3A8A !important;border-bottom-color: transparent !important;"
                    />
                </div>
            ) : null}
        </>
    );
};

export default AppLoader;
