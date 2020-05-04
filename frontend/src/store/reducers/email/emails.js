import emailData from './emailData';

const emails = (state = emailData, action) => {
    switch (action.type) {
        case 'STAR_EMAIL':
            return state.map(email =>
                (email.id === action.id)
                    ? {...email, starred: !email.starred}
                    : email
                )
        case 'IMPORTANT_EMAIL':
            return state.map(email =>
                (email.id === action.id)
                    ? {...email, important: !email.important}
                    : email
                )
        case 'TRASH_EMAIL':
            let emails = [];
            for(let i = 0; i < state.length; i++){
                emails.push(state[i]);
                for(let j = 0; j < action.id.length; j++){
                    if(state[i].id === action.id[j]){   
                        emails[i].trash = true
                    }
                }
            }
            return emails
        case 'ASSIGN_FOLDER':
            let folderEmails = [];
            for(let a = 0; a < state.length; a++){
                folderEmails.push(state[a]);
                for(let b = 0; b < action.id.length; b++){
                    if(state[a].id === action.id[b]){ 
                        switch(action.folder){
                            case 'inbox':
                                folderEmails[a].inbox = true
                                folderEmails[a].sent = false
                                folderEmails[a].draft = false
                                folderEmails[a].spam = false
                                folderEmails[a].trash = false
                                break;
                            case 'sent':
                                folderEmails[a].inbox = false
                                folderEmails[a].sent = true
                                folderEmails[a].draft = false
                                folderEmails[a].spam = false
                                folderEmails[a].trash = false
                                break;
                            case 'draft':
                                folderEmails[a].inbox = false
                                folderEmails[a].sent = false
                                folderEmails[a].draft = true
                                folderEmails[a].spam = false
                                folderEmails[a].trash = false
                                break;
                            case 'spam':
                                folderEmails[a].inbox = false
                                folderEmails[a].sent = false
                                folderEmails[a].draft = false
                                folderEmails[a].spam = true
                                folderEmails[a].trash = false
                                break;
                            case 'trash':
                                folderEmails[a].inbox = false
                                folderEmails[a].sent = false
                                folderEmails[a].draft = false
                                folderEmails[a].spam = false
                                folderEmails[a].trash = true
                                break;
                            default:
                                folderEmails[a].inbox = true
                                folderEmails[a].sent = false
                                folderEmails[a].draft = false
                                folderEmails[a].spam = false
                                folderEmails[a].trash = false
                                break;
                        }
                    }
                }
            }
            return folderEmails
        case 'ASSIGN_LABEL':
            let labelEmails = [];
            for(let c = 0; c < state.length; c++){
                labelEmails.push(state[c]);
                for(let d = 0; d < action.id.length; d++){
                    if(state[c].id === action.id[d]){
                        labelEmails[c].label = action.label
                    }
                }
            }
            return labelEmails
       default:
            return state
    }
 }
 export default emails