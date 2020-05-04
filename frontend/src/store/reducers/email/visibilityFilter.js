import { VisibilityFilters } from '../../actions/email/emailActions'

const visibilityFilter = (state = VisibilityFilters.SHOW_INBOX, action) => {
  switch (action.type) {
    case 'SET_EMAIL_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter