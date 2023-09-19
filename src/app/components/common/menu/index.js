import React from "react";
import { useSelector } from "react-redux";
const SideMenu = React.lazy(() => import("./SideMenu"));
const TopMenu = React.lazy(() => import("./TopMenu"));
const SimpleMenu = React.lazy(() => import("./SimpleMenu"));

function MainMenu(props) {
    // const [type, setType] = useState("top_menu");
    const { menuType } = useSelector((state) => state.menu_type);

    return <TopMenu {...props} />;

    // if (menuType === "top_menu") {
    //     return (
    //         <>
    //             <TopMenu {...props} />
    //         </>
    //     );
    // }

    // if (menuType === "slid_menu") {
    //     return (
    //         <>
    //             <SideMenu {...props} />
    //         </>
    //     );
    // }

    // if (menuType === "simple_menu") {
    //     return (
    //         <>
    //             <SimpleMenu {...props} />
    //         </>
    //     );
    // }
    return <div />;
}

export default React.memo(MainMenu);
