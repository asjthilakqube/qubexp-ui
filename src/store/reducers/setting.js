import * as Types from "../types/setting";
import * as AppTypes from "../types/app";

export const initialState = {
  isLoading: false,
  isDiagnosticLoading: false,
  fetchUpdateLoading: false,
  isFormNotSaved: false,
  screenInfo: {
    theatreName: "",
    screenName: "",
  },
  dateAndTime: {
    dateTime: "",
    timeZone: "",
    firstDayOfWeek: "Monday",
    isAutoNtpSyncEnabled: false,
    ntpServerAddress: "",
  },
  timeZones: [],
  audioDelay: {
    audioDelayInMilliseconds: 10,
  },
  audioSamplerate: {
    sampleRate: "",
  },
  realDDeghosting: {
    isRealDDeghostingEnabled: true,
  },
  mediaBlock: {
    configs: [],
  },
  ipConfiguration: [],
  dns: [],
  showMaintenanceLoader: false,
  emptyFormFields: [],
  updateList: {
    drives: [],
    paths: [],
  },
  about: {},
  credentialsError: {
    url: "",
    userName: "",
    password: "",
  },
  validationError: false,
  isShutDown: false,
  changedSettings: [],
  outputMode: "projector",
  colorSpace: "",
  threeDEye: "",
  fourKrender: {},
  quadrant: {},
};

const reducer = (state = initialState, action) => {
  const initialUpdateListState = {
    drives: [],
    paths: [],
  };
  const { payload, type } = action;
  const { dateAndTime, screenInfo } = state;
  switch (type) {
    case Types.IS_LOADING:
      return { ...state, isLoading: payload };
    case Types.FETCH_UPDATE_LOADING:
      return { ...state, fetchUpdateLoading: payload };
    case Types.SCREEN_INFO:
      return { ...state, screenInfo: payload };
    case Types.DATE_AND_TIME:
      return { ...state, dateAndTime: payload };
    case Types.TIME_ZONES:
      return { ...state, timeZones: payload };
    case Types.EMPTY_FORM_FIELDS:
      return { ...state, emptyFormFields: payload };
    case Types.MAINTENANCE_LOADER:
      return { ...state, showMaintenanceLoader: payload };
    case Types.UPDATE_LIST:
      return { ...state, updateList: payload };
    case Types.IS_FORM_NOT_SAVED:
      return { ...state, isFormNotSaved: payload };
    case Types.IP_CONFIGURATION:
      return { ...state, ipConfiguration: payload };
    case Types.MEDIA_BLOCK:
      return { ...state, mediaBlock: payload };
    case Types.AUDIO_DELAY:
      return { ...state, audioDelay: payload };
    case Types.AUDIO_SAMPLERATE:
      return { ...state, audioSamplerate: payload };
    case Types.REALDDEGHOSTING:
      return { ...state, realDDeghosting: payload };
    case Types.ABOUT:
      return { ...state, about: payload };
    case Types.DNS:
      return { ...state, dns: payload };
    case Types.DIAGNOSTICS_LOADING:
      return { ...state, isDiagnosticLoading: payload };
    case Types.RESET_UPDATELIST:
      return { ...state, updateList: initialUpdateListState };
    case Types.RESET_SETTING:
      return { ...initialState, dateAndTime, screenInfo };
    case Types.SHUT_DOWN:
      return { ...initialState, isShutDown: payload };
    case Types.OUTPUT_MODE:
      return { ...state, outputMode: payload };
    case Types.COLOR_SPACE:
      return { ...state, colorSpace: payload };
    case Types.THREED_EYE:
      return { ...state, threeDEye: payload };
    case Types.FOUR_K_STATUS:
      return { ...state, fourKrender: payload };
    case Types.FOUR_K_CROP:
      return { ...state, quadrant: payload };
    case Types.CHANGED_SETTINGS:
      return { ...state, changedSettings: payload };
    case AppTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
