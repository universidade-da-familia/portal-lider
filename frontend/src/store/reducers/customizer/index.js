// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import sidebarBgColor from "./sidebarBgColor";
import sidebarImage from "./sidebarImage";
import sidebarImageUrl from "./sidebarImageUrl";
import sidebarSize from "./sidebarSize";
import sidebarCollapsed from "./sidebarCollapsed";

const emailReducer = combineReducers({
    sidebarBgColor,
    sidebarImage,
    sidebarImageUrl,
    sidebarSize,
    sidebarCollapsed
});

export default emailReducer;