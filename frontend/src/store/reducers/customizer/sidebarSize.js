const sidebarSize = (state = 'sidebar-md', action) => {  
    switch (action.type) {
        case 'SIDEBAR_SIZE':
            return action.size
        default:
            return state
    }
}

export default sidebarSize