export const Types = {
  BG_IMAGE_REQUEST: "BG_IMAGE_REQUEST",
  BG_IMAGE_SUCCESS: "BG_IMAGE_SUCCESS",
  BG_IMAGE_URL_REQUEST: "BG_IMAGE_URL_REQUEST",
  BG_IMAGE_URL_SUCCESS: "BG_IMAGE_URL_SUCCESS",
  BG_COLOR_REQUEST: "BG_COLOR_REQUEST",
  BG_COLOR_SUCCESS: "BG_COLOR_SUCCESS",
  SIDEBAR_COLLAPSED_REQUEST: "SIDEBAR_COLLAPSED_REQUEST",
  SIDEBAR_COLLAPSED_SUCCESS: "SIDEBAR_COLLAPSED_SUCCESS",
  SIDEBAR_SIZE_REQUEST: "SIDEBAR_SIZE_REQUEST",
  SIDEBAR_SIZE_SUCCESS: "SIDEBAR_SIZE_SUCCESS",
  LAYOUT_REQUEST: "LAYOUT_REQUEST",
  LAYOUT_SUCCESS: "LAYOUT_SUCCESS",
  FAILURE: "CUSTOMIZER_FAILURE"
};

const INITIAL_STATE = {
  img: "",
  imgUrl: "",
  color: "",
  collapsed: true,
  size: "",
  layout: "layout-dark",
  error: false
};

export default function customizer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.BG_IMAGE_SUCCESS:
      return { ...state, img: action.payload.img };
    case Types.BG_IMAGE_URL_SUCCESS:
      return { ...state, imgUrl: action.payload.imgurl };
    case Types.BG_COLOR_SUCCESS:
      return { ...state, color: action.payload.color };
    case Types.SIDEBAR_COLLAPSED_SUCCESS:
      return { ...state, collapsed: action.payload.collapsed };
    case Types.SIDEBAR_SIZE_SUCCESS:
      return { ...state, size: action.payload.size };
    case Types.LAYOUT_SUCCESS:
      return { ...state, layout: action.payload.layout };
    case Types.FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
}

export const Creators = {
  sidebarImageRequest: img => ({
    type: Types.BG_IMAGE_REQUEST,
    payload: {
      img
    }
  }),

  sidebarImageSuccess: img => ({
    type: Types.BG_IMAGE_SUCCESS,
    payload: {
      img
    }
  }),

  sidebarImageUrlRequest: imgurl => ({
    type: Types.BG_IMAGE_URL_REQUEST,
    payload: {
      imgurl
    }
  }),

  sidebarImageUrlSuccess: imgurl => ({
    type: Types.BG_IMAGE_URL_SUCCESS,
    payload: {
      imgurl
    }
  }),

  sidebarBgColorRequest: color => ({
    type: Types.BG_COLOR_REQUEST,
    payload: {
      color
    }
  }),

  sidebarBgColorSuccess: color => ({
    type: Types.BG_COLOR_SUCCESS,
    payload: {
      color
    }
  }),

  sidebarCollapsedRequest: collapsed => ({
    type: Types.SIDEBAR_COLLAPSED_REQUEST,
    payload: {
      collapsed
    }
  }),

  sidebarCollapsedSuccess: collapsed => ({
    type: Types.SIDEBAR_COLLAPSED_SUCCESS,
    payload: {
      collapsed
    }
  }),

  sidebarSizeRequest: size => ({
    type: Types.SIDEBAR_SIZE_REQUEST,
    payload: {
      size
    }
  }),

  sidebarSizeSuccess: size => ({
    type: Types.SIDEBAR_SIZE_SUCCESS,
    payload: {
      size
    }
  }),

  changeLayoutRequest: layout => ({
    type: Types.LAYOUT_REQUEST,
    payload: {
      layout
    }
  }),

  changeLayoutSuccess: layout => ({
    type: Types.LAYOUT_SUCCESS,
    payload: {
      layout
    }
  }),

  customizerFailure: () => ({
    type: Types.FAILURE
  })
};
