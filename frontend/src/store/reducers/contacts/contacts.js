import contactList from "./contactsData";

const contacts = (state = contactList, action) => {
   switch (action.type) {
      case "ADD_CONTACT":
         return [
            ...state,
            {
               id: action.id,
               firstname: action.firstname,
               lastname: action.lastname,
               image: action.image,
               department: action.department,
               company: action.company,
               phone: action.phone,
               email: action.email,
               address: action.address,
               notes: action.notes,
               frequentlycontacted: false,
               starred: false,
               deleted: false
            }
         ];
      
      case "UPDATE_CONTACT":         
         return state.map(contact => (contact.id === action.id ? { ...contact, [action.field]: action.value } : contact));

      case "TOGGLE_STARRED_CONTACT":
         return state.map(contact => (contact.id === action.id ? { ...contact, starred: !contact.starred } : contact));

      case "DELETE_CONTACT":
         return state.map(contact => (contact.id === action.id ? { ...contact, deleted: !contact.deleted } : contact));

      default:
         return state;
   }
};

export default contacts;
