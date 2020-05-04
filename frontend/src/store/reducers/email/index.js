// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import emails from "./emails";
import visibilityFilter from "./visibilityFilter";
import selectedEmail from "./selectedEmail";
import emailSearch from "./emailSearch";
import emailContent from "./emailContent";

const emailReducer = combineReducers({
    emails,
    visibilityFilter,
    selectedEmail,
    emailSearch,
    emailContent
});

export default emailReducer;