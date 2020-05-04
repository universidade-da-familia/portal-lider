const chatContent = (state = 1, action) => {  
    switch (action.type) {
      case 'OPEN_CHAT':
        return action.id
      default:
        return state
    }
  }
  
  export default chatContent