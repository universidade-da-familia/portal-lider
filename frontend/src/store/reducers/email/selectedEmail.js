const selectedEmail = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_EMAIL':
        if(action.checkStatus === 'checked')
            return state.concat(action.id)
        else
            return state.filter(t => t !== action.id)
    case 'TRASH_EMAIL':
        return state = []
    case 'ASSIGN_FOLDER':
        return state = []
    case 'ASSIGN_LABEL':
        return state = []
    default:
      return state
  }
}

export default selectedEmail