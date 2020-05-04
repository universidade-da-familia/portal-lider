const sidebarImage = (state = '', action) => {  
    switch (action.type) {
        case 'BG_IMAGE':
            return action.img
        default:
            return state
    }
}

export default sidebarImage