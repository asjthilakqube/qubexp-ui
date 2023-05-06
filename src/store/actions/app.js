import _ from "lodash";
import * as Types from "../types/app";
import { history } from "../../store";
import { getOnGoingIngestList } from "./contentAndKeys";
import bluePrintToast from "../../utils/toast";
import moment from "../../utils/moment";
import { defaultErrorMessage } from "../../constant/app";
import { systemRepository } from "../../repositories";
import { getDateandTimeInfo } from "./setting";

const changeAppLoading = (payload) => ({ type: Types.IS_APP_LOADING, payload });
const changeErrorInfo = (payload) => ({ type: Types.ERROR_INFO, payload });
const changeActiveNav = (payload) => ({ type: Types.SELECTED_NAV_MENU, payload });
const setRightNavOpen = (payload) => ({ type: Types.RIGHT_NAV, payload });
const changeLeftNav = (payload) => ({ type: Types.LEFT_NAV, payload });
const setScreenHeaderInfo = (payload) => ({ type: Types.SCREEN_HEADER_INFO, payload });
const changeNavDocked = (payload) => ({ type: Types.PIN_NAV, payload });
const changeSelectedLanguage = (payload) => ({ type: Types.SELECTED_LANGUAGE, payload });
const setFetchCallSucceeded = (payload) => ({ type: Types.FETCH_CALL_SUCCEEDED, payload });
const setCurrentDateAndTime = (payload) => ({ type: Types.CURRENT_DATE_AND_TIME, payload });
const setTimeDiff = (payload) => ({ type: Types.TIME_DIFF, payload });
const setCurrentLoaderTypes = (payload) => ({ type: Types.CURRENT_LOADER_TYPES, payload });
const setSearchText = (payload) => ({ type: Types.SEARCH_TEXT, payload });
const setRaidStatus = (payload) => ({ type: Types.RAID_STATUS, payload });
const setImbStatus = (payload) => ({ type: Types.IMB_STATUS, payload });
const setAudioDevices = (payload) => ({ type: Types.AUDIO_DEVICES, payload });
const reset = (payload) => ({ type: Types.RESET });
const showToast = (toastList, isSuccessful = false) => () => {
  toastList.map((info) => bluePrintToast(info.message || info.error, info.values, isSuccessful));
};

const errorHandler = (caughtError) => async (dispatch, getState) => {
  let errPayload = [];
  try {
    const { errorInfo } = getState().app;
    errPayload = [errorInfo];
    const {
      response: { data },
    } = caughtError;
    errPayload =
      data.errors.length !== 0 ? data.errors : [{ code: data.httpStatus, message: data.httpCode }];
    if (data.httpStatus === 401) {
      // Unauthorized when changed password
      history.push("/logout");
      errPayload = [
        {
          code: data.httpStatus,
          message: `${data.httpCode}! The account credentials might have changed. Please login again.`,
        },
      ];
    }
  } catch (err) {
    errPayload = [{ message: defaultErrorMessage }];
  } finally {
    const [error] = errPayload;
    const isValidError = error.message !== defaultErrorMessage;
    if (isValidError) await dispatch(showToast(_.filter(errPayload)));
  }
};

const handleError = (err) => (dispatch) => dispatch(changeErrorInfo(err));

const displaySuccessToast = (message = "Succeed", values = {}) => (dispatch) =>
  dispatch(showToast([{ message, values }], true));

const displayFailedToast = (message = "Internal Error", values = {}) => (dispatch) =>
  dispatch(showToast([{ message, values }]));

const initializeRightNavActions = () => (dispatch) => dispatch(getOnGoingIngestList());

const handleLoaderType = (loaderType, isFinished = false) => (dispatch) => {
  const newLoaderTypes = isFinished ? null : loaderType;
  dispatch(setCurrentLoaderTypes(newLoaderTypes));
};

const updateTimer = () => (dispatch, getState) => {
  const { timeDiff, currentDateAndTime } = getState().app;
  const time = moment().add(timeDiff, "s");
  if (
    time.diff(moment(currentDateAndTime), "s") > 3 ||
    time.diff(moment(currentDateAndTime), "s") < -2
  ) {
    // Since there is a high deviation, we suspect that either the browser time or server time has changed
    dispatch(getDateandTimeInfo());
  } else {
    dispatch(setCurrentDateAndTime(time.format("")));
  }
};

const startRaidStatusPolling = () => async (dispatch) => {
  systemRepository.startRaidStatusPoll(
    (res) => dispatch(setRaidStatus(res.data)),
    (err) => dispatch(errorHandler(err))
  );
};

const stopRaidStatusPolling = () => () => {
  systemRepository.stopRaidStatusPoll();
};

const startImbStatusPolling = () => async (dispatch) => {
  systemRepository.startImbStatusPoll(
    (res) => dispatch(setImbStatus(res.data)),
    (err) => dispatch(errorHandler(err))
  );
};

const stopImbStatusPolling = () => () => {
  systemRepository.stopImbStatusPoll();
};

const startAudioDevicesPolling = () => async (dispatch) => {
  systemRepository.startAudioStatusPoll(
    (res) => dispatch(setAudioDevices(res.data?.["audio-devices"])),
    (err) => dispatch(errorHandler(err))
  );
};

const stopAudioDevicesPolling = () => () => {
  systemRepository.stopImbStatusPoll();
};

export {
  changeAppLoading,
  changeErrorInfo,
  changeActiveNav,
  setRightNavOpen,
  changeNavDocked,
  showToast,
  setScreenHeaderInfo,
  displaySuccessToast,
  displayFailedToast,
  changeLeftNav,
  changeSelectedLanguage,
  errorHandler,
  handleError,
  initializeRightNavActions,
  setCurrentLoaderTypes,
  reset,
  updateTimer,
  setSearchText,
  setCurrentDateAndTime,
  setTimeDiff,
  handleLoaderType,
  setFetchCallSucceeded,
  startRaidStatusPolling,
  stopRaidStatusPolling,
  startImbStatusPolling,
  stopImbStatusPolling,
  startAudioDevicesPolling,
  stopAudioDevicesPolling,
};
