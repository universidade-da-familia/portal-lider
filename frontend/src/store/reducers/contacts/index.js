import { combineReducers } from "redux";
import contacts from "./contacts";
import contactsDetails from "./contactsDetails";
import contactsVisibilityFilter from "./contactsVisibilityFilter";
import contactsSearch from "./contactsSearch";
import editContact from "./editContact";

export default combineReducers({
   contacts,
   contactsDetails,
   contactsVisibilityFilter,
   contactsSearch,
   editContact
});
