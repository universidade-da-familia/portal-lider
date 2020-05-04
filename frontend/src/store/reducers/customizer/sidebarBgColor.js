const sidebarBgColor = (state = "", action) => {  
    switch (action.type) {
        case 'BG_COLOR':
            return action.color
        default:
            return state
    }
}

export default sidebarBgColor