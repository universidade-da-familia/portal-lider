const sidebarCollapsed = (state = false, action) => {  
    switch (action.type) {
        case 'SIDEBAR_COLLAPSED':
            return action.collapsed
        default:
            return state
    }
}

export default sidebarCollapsed