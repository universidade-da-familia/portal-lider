const ContactSearch = (state = '', action) => {  
  switch (action.type) {
    case 'FILTER_CONTACT':
      return action.payload
    case 'SET_VISIBILITY_FILTER':
      return state = ''   
    default:
      return state
  }
}

export default ContactSearch