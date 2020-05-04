const EditContact = (state = false, action) => {
   switch (action.type) {
      case "EDIT_CONTACT":
         return !state ? true : false;
      case "CONTACT_DETAILS":
         return state = false;
      default:
         return state;
   }
};

export default EditContact;
