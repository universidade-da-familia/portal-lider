const chatSearch = (state = '', action) => {  
    switch (action.type) {
      case 'FILTER_CHAT':
        return action.searchTerm
      default:
        return state
    }
}

export default chatSearch