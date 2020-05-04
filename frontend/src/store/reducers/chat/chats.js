import chatData from './chatData';

const chats = (state = chatData, action) => {
    switch (action.type) {
        case 'SEND_MSG':
            return state.map(chat =>
                (chat.id === action.id
                    ?
                    Object.assign({}, chat, chat.chatHistory[0][1]['to'].push(action.chatMsg))
                    : chat
                ));
        default: 
            return state
    }
}

export default chats;