import {
   HANDLE_FILTER_USER,
   HANDLE_SELECT_USER,
   HANDLE_SEND_MESSAGE
} from "../actions/types/types";
import { chatUser } from "../../views/chat/chatData";

const initState = {
   users: chatUser,
   searchTerm: "",
   currentUser: chatUser[0],
   randomThumb: "https://randomuser.me/api/portraits/thumb/men/30.jpg"
};

const chatReducer = (state = initState, action) => {
   switch (action.type) {
      case HANDLE_FILTER_USER:
         const searchTerm = action.payload;
         return {
            ...initState,
            users: chatUser.filter(user =>
               user.name
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
            )
         };
      case HANDLE_SELECT_USER:
         const { users, id } = action.payload;
         return {
            ...initState,
            currentUser: users.find(user => user.id === id)
         };

      case HANDLE_SEND_MESSAGE:
         const { chatMsg, currentUser, Users } = action.payload;

         return {
            ...initState,
            users: Users.map(usr => {
               if (usr.id === currentUser.id) {
                  return {
                     ...currentUser,
                     msgs: [...currentUser.msgs, chatMsg]
                  };
               } else {
                  return usr;
               }
            })
         };
      default:
         return initState;
   }
};

export default chatReducer;
