export const sidebarImage = img => ({
    type: 'BG_IMAGE',
    img
})

export const sidebarImageUrl = imgurl => ({
    type: 'BG_IMAGE_URL',
    imgurl
})

export const sidebarBgColor = color => ({
    type: 'BG_COLOR',
    color
})

export const sidebarCollapsed = collapsed => ({
    type: 'SIDEBAR_COLLAPSED',
    collapsed
})

export const sidebarSize = size => ({
    type: 'SIDEBAR_SIZE',
    size
})