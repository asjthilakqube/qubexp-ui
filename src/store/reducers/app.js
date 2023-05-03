import * as Types from "../types/app";
import languageList from "./constants/languages.js";

export const initialState = {
  theme: "dark",
  isExpanded: false,
  currentDateAndTime: undefined,
  timeDiff: 0,
  onHover: false,
  isDocked: false,
  isRightNavOpen: false,
  currentNav: [],
  currentLoaderTypes: null,
  isAppLoading: false,
  fetchCallSucceeded: false,
  languageList,
  searchText: "",
  selectedLanguage: "Auto-Detect",
  selectedNavMenu: "Dashboard",
  screenHeaderInfo: {},
  errorInfo: {
    message: "Internal Error",
  },
  raidStatus: {},
  imbStaus: {},
  audioDevices: [],
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.IS_APP_LOADING:
      return { ...state, isAppBusy: payload };
    case Types.CURRENT_LOADER_TYPES:
      return { ...state, currentLoaderTypes: payload };
    case Types.ERROR_INFO:
      return { ...state, errorInfo: payload };
    case Types.SELECTED_NAV_MENU:
      return { ...state, selectedNavMenu: payload };
    case Types.FETCH_CALL_SUCCEEDED:
      return { ...state, fetchCallSucceeded: payload };
    case Types.SELECTED_LANGUAGE:
      return { ...state, selectedLanguage: payload };
    case Types.RIGHT_NAV:
      return { ...state, isRightNavOpen: payload };
    case Types.SEARCH_TEXT:
      return { ...state, searchText: payload };
    case Types.LEFT_NAV:
      return { ...state, leftNav: payload };
    case Types.SCREEN_HEADER_INFO:
      return { ...state, screenHeaderInfo: payload };
    case Types.CURRENT_DATE_AND_TIME:
      return { ...state, currentDateAndTime: payload };
    case Types.TIME_DIFF:
      return { ...state, timeDiff: payload };
    case Types.RAID_STATUS:
      return {
        ...state,
        raidStatus: {
          ...payload,
          availableInBytes: payload?.capacityInBytes - payload?.occupiedInBytes,
        },
      };
    case Types.IMB_STATUS:
      return {
        ...state,
        imbStatus: payload,
      };
    case Types.AUDIO_DEVICES:
      return { ...state, audioDevices: payload };
    case Types.PIN_NAV:
      return { ...state, pinNav: payload };
    case Types.RESET_PROFILE:
    case Types.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
