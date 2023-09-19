import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Icon from "react-feather";
import { setThemeColor } from "../../redux/actions/PersistActions";

const ThemeSwitch = ({ from }) => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.persist);

    const setTheme = useCallback((theme) => {
        document.getElementsByTagName("html")[0].classList.add(theme);
    }, []);

    const changeMode = useCallback(() => {
        const newTheme = mode === "dark" ? "light" : "dark";

        dispatch(setThemeColor(newTheme));
    }, [mode]);

    useEffect(() => {
        setTheme(mode);

        return () => {
            document.getElementsByTagName("html")[0].classList.remove(mode);
        };
    }, [mode]);

    if (window.location.pathname.includes("/payment/page/") || window.location.pathname.includes("/payment/card/")) {
        return null;
    }

    switch (from) {
        case "header":
            return (
                <div
                    className={`cursor-pointer shadow-md box border rounded-full flex items-center justify-center z-50 mr-5 h-10" "h-10
                    `}
                    onClick={changeMode}>
                    <div onChange={changeMode} className={`wrg-toggle ${mode === "dark" ? "wrg-toggle--checked" : ""}`}>
                        <div className={mode === "dark" ? "wrg-toggle-container-dark" : "wrg-toggle-container"}>
                            <div className="wrg-toggle-check">
                                <Icon.Moon size={15} className={"mt-[-2px] ml-[-4px]"} />
                            </div>
                            <div className="wrg-toggle-uncheck">
                                <Icon.Sun size={15} className={"mt-[-2px]"} />
                            </div>
                        </div>
                        <div className="wrg-toggle-circle"></div>
                        <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
                    </div>
                    {/* <div
                        className={`dark-mode-switcher__toggle border  ${
                            mode === "dark" ? "dark-mode-switcher__toggle--active border flex items-center" : ""
                        }`}>
                        
                    </div> */}
                </div>
            );

        default:
            return (
                <div
                    className={`dark-mode-switcher cursor-pointer shadow-md box border rounded-full w-40 flex items-center justify-center z-50 mr-10 h-12 mb-10 fixed bottom-0 right-0 `}
                    onClick={changeMode}>
                    <div className="mr-4 text-slate-600 dark:text-slate-200 capitalize select-none">Dark Mode</div>
                    <div
                        className={`dark-mode-switcher__toggle border ${
                            mode === "dark" ? "dark-mode-switcher__toggle--active border" : ""
                        }`}></div>
                </div>
            );
    }
};

export default ThemeSwitch;
