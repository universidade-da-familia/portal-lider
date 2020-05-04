const emailSearch = (state = '', action) => {  
    switch (action.type) {
      case 'FILTER_EMAIL':
        return action.searchTerm
      case 'SET_VISIBILITY_FILTER':
        return state = ''   
      default:
        return state
    }
  }
  
  export default emailSearch