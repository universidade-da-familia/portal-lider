export const starEmail = id => ({
    type: 'STAR_EMAIL',
    id
})

export const importantEmail = id => ({
    type: 'IMPORTANT_EMAIL',
    id
})

export const openEmail = id => ({
    type: 'OPEN_EMAIL',
    id
})

export const trashEmail = id => ({
    type: 'TRASH_EMAIL',
    id
})

export const assignFolder = (id, folder) => ({
    type: 'ASSIGN_FOLDER',
    id,
    folder
})

export const assignLabel = (id, label) => ({
    type: 'ASSIGN_LABEL',
    id,
    label
})

export const setSelectedEmail = (id, checkStatus) => ({
    type: 'SET_SELECTED_EMAIL',
    id,
    checkStatus
})

export const emailSearch = (searchTerm) => ({
    type: 'FILTER_EMAIL',
    searchTerm
})

export const setVisibilityFilter = filter => ({
    type: 'SET_EMAIL_VISIBILITY_FILTER',
    filter
})

export const VisibilityFilters = {
  SHOW_INBOX: 'SHOW_INBOX',
  SHOW_SENT: 'SHOW_SENT',
  SHOW_DRAFTS: 'SHOW_DRAFTS',
  SHOW_SPAM: 'SHOW_SPAM',
  SHOW_TRASH: 'SHOW_TRASH',
  SHOW_STARRED: 'SHOW_STARRED',
  SHOW_IMPORTANT: 'SHOW_IMPORTANT',
  SHOW_TECHNOLOGY: 'SHOW_TECHNOLOGY',
  SHOW_FINANCE: 'SHOW_FINANCE',
  SHOW_HEALTH: 'SHOW_HEALTH'
};
