// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import chats from "./chats";
import chatSearch from "./chatSearch";
import chatContent from "./chatContent";

const chatReducer = combineReducers({
    chats,
    chatSearch,
    chatContent
});

export default chatReducer;