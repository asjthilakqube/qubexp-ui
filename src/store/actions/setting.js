import _ from "lodash";
import fileDownload from "js-file-download";
import moment from "moment-timezone";
import * as Types from "../types/setting";
import { history } from "../../store";
import {
  systemRepository,
  DiagnosticRepository,
  ingestRepository,
  playbackRepository,
} from "../../repositories";
import BaseRepository from "../../repositories/BaseRepository";
import {
  errorHandler,
  setCurrentDateAndTime,
  setTimeDiff,
  setScreenHeaderInfo,
  displaySuccessToast,
  displayFailedToast,
  changeSelectedLanguage,
} from "./app";
import { formValidation } from "./helpers/settings";
import {
  stateKeys,
  updateListSourceType,
  daysInWeek,
  audioSamplerate as audioSamplerateFields,
  tabs,
} from "../../constant/settings";
import bulkAction from "../../utils/bulkAction";
import checkScopeAuth from "../../utils/checkScopeAuth";
import { SCOPES, SCOPE_ACTIONS } from "../../constant/user";
import { getSupportedLanguage } from "../../utils/languageSelector";
import { languageMap } from "../../constant/app";

const setSettingLoading = (payload) => ({ type: Types.IS_LOADING, payload });
const setFetchUpdateLoading = (payload) => ({ type: Types.FETCH_UPDATE_LOADING, payload });
const setMaintenanceLoader = (payload) => ({ type: Types.MAINTENANCE_LOADER, payload });
const setIsFormNotSaved = (payload) => ({ type: Types.IS_FORM_NOT_SAVED, payload });
const setAboutInfo = (payload) => ({ type: Types.ABOUT, payload });
const setAudioDelay = (payload) => ({ type: Types.AUDIO_DELAY, payload });
const setAudioSamplerate = (payload) => ({ type: Types.AUDIO_SAMPLERATE, payload });
const setScreenInfo = (payload) => ({ type: Types.SCREEN_INFO, payload });
const setDateAndTime = (payload) => ({ type: Types.DATE_AND_TIME, payload });
const setTimeZones = (payload) => ({ type: Types.TIME_ZONES, payload });
const setIpConfiguration = (payload) => ({ type: Types.IP_CONFIGURATION, payload });
const setEmptyFormFields = (payload) => ({ type: Types.EMPTY_FORM_FIELDS, payload });
const setUpdateList = (payload) => ({ type: Types.UPDATE_LIST, payload });
const setMediaBlock = (payload) => ({ type: Types.MEDIA_BLOCK, payload });
const setDns = (payload) => ({ type: Types.DNS, payload });
const resetSetting = () => ({ type: Types.RESET_SETTING });
const clearUpdateList = () => ({ type: Types.RESET_UPDATELIST });
const setDiagnosticsApiWaiting = (payload) => ({ type: Types.DIAGNOSTICS_LOADING, payload });
const setRealDDeghosting = (payload) => ({ type: Types.REALDDEGHOSTING, payload });
const shutDown = (payload) => ({ type: Types.SHUT_DOWN, payload });
const setChangedSettings = (payload) => ({ type: Types.CHANGED_SETTINGS, payload });
const setOutputMode = (payload) => ({ type: Types.OUTPUT_MODE, payload });
const setColorSpace = (payload) => ({ type: Types.COLOR_SPACE, payload });
const setThreeDEye = (payload) => ({ type: Types.THREED_EYE, payload });
const setfourKrender = (payload) => ({ type: Types.FOUR_K_STATUS, payload });
const setfourKcrop = (payload) => ({ type: Types.FOUR_K_CROP, payload });

const fetchOutputMode = () => async (dispatch) => {
  const { data: outputMode } = await systemRepository.getOutputMode();
  dispatch(setOutputMode(outputMode.mode));
};

const getSdiConfiguration = () => async (dispatch) => {
  const { data: colorSpace } = await systemRepository.getColorSpace();
  const { data: threeDEye } = await systemRepository.getThreeDEye();
  const { data: fourKrender } = await systemRepository.getFourKStatus();
  dispatch(setColorSpace(colorSpace.colorSpace));
  dispatch(setThreeDEye(threeDEye.threeDFramePreference));
  dispatch(setfourKrender(fourKrender["4KRenderMode"]));
  dispatch(setfourKcrop(fourKrender.quadrant));
};

const saveSdiConfiguration = () => async (dispatch, getState) => {
  try {
    const { colorSpace, threeDEye, fourKrender, quadrant, changedSettings } = getState().setting;
    if (changedSettings.includes("colorSpace"))
      await systemRepository.saveColorSpace({ colorSpace });

    if (changedSettings.includes("threeDEyeChange"))
      await systemRepository.saveThreeDEye({ threeDFramePreference: threeDEye });

    if (changedSettings.includes("fourKrender")) {
      if (fourKrender === "forceful2K") {
        await systemRepository.saveFourKStatus({ "4KRenderMode": fourKrender });
      } else {
        await systemRepository.saveFourKStatus({ "4KRenderMode": fourKrender, quadrant });
      }
    }

    if (fourKrender === "quadrant2K") {
      if (changedSettings.includes("quadrant"))
        await systemRepository.saveFourKStatus({ "4KRenderMode": fourKrender, quadrant });
    }

    dispatch(displaySuccessToast("Toast.sdiConfigurationSave"));
    dispatch(getSdiConfiguration());
    dispatch(setIsFormNotSaved(false));
    dispatch(setChangedSettings([]));
  } catch (err) {
    dispatch(errorHandler(err));
    dispatch(getSdiConfiguration());
    dispatch(setIsFormNotSaved(false));
  }
};

const handleFormChange = (formName, form) => (dispatch, getState) => {
  const stateFormMap = {
    [stateKeys.screenInfo]: setScreenInfo,
    [stateKeys.dateAndTime]: setDateAndTime,
    [stateKeys.ipConfiguration]: setIpConfiguration,
    [stateKeys.audioDelay]: setAudioDelay,
    [stateKeys.audioSamplerate]: setAudioSamplerate,
    [stateKeys.mediaBlock]: setMediaBlock,
    [stateKeys.dns]: setDns,
    [stateKeys.realDDeghosting]: setRealDDeghosting,
    [stateKeys.colorSpace]: setColorSpace,
    [stateKeys.threeDEyeChange]: setThreeDEye,
    [stateKeys.fourKrender]: setfourKrender,
    [stateKeys.quadrant]: setfourKcrop,
  };
  if (formName === stateKeys.selectedLanguage) {
    dispatch(setIsFormNotSaved(true));
  } else {
    dispatch(stateFormMap[formName](form));
  }
  dispatch(setIsFormNotSaved(true));
  const {
    setting: { changedSettings },
  } = getState();
  const newChangedSettings = [...changedSettings, formName];
  dispatch(setChangedSettings([...new Set(newChangedSettings)]));
};

const getGeneralSettingInfo = () => async (dispatch) => {
  try {
    dispatch(setSettingLoading(true));
    const { data: screenInfo } = await systemRepository.screenInfo();
    const { data: dateAndTime } = await systemRepository.dateAndTime();
    const { data: aboutSystem } = await systemRepository.aboutSystem();
    const { data: mediaBlock } = await systemRepository.mediaBlockConfig();
    const { dateTime, timeZone } = dateAndTime;
    const result = await systemRepository.getTimeZones();
    const timeZones = result.data.zoneInfo;
    const value = timeZones.find(({ name }) => timeZone === name);
    const [, defaultDayInfo] = daysInWeek;
    delete dateAndTime.timeZone;
    const newDateAndTime = {
      ...dateAndTime,
      timeZone: `(GMT${value.offset}) ${value.name}`,
    };
    const firstDayOfWeek = _.isEmpty(newDateAndTime.firstDayOfWeek)
      ? defaultDayInfo.name
      : newDateAndTime.firstDayOfWeek;
    dispatch(setScreenHeaderInfo({ ...screenInfo, about: aboutSystem, mediaBlock, dateTime }));
    dispatch(setScreenInfo(screenInfo));
    dispatch(setDateAndTime({ ...newDateAndTime, firstDayOfWeek }));
    dispatch(setTimeZones(timeZones));
    dispatch(setMediaBlock(mediaBlock));
    window.timeZone = timeZone;
    dispatch(setCurrentDateAndTime(dateTime));
    dispatch(setTimeDiff(moment(dateTime).diff(moment(), "s")));
    dispatch(setAboutInfo(aboutSystem));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(setSettingLoading(false));
  }
};

const saveDateandTimeInfo = () => async (dispatch, getState) => {
  try {
    const { setting } = getState();
    const { dateAndTime } = setting;
    const clonedDateandTime = {
      ...dateAndTime,
      timeZone: dateAndTime?.timeZone?.split(") ")[1],
    };
    await systemRepository.saveDateAndTime(clonedDateandTime);
    dispatch(displaySuccessToast("Toast.dateandTimeSettingSave"));
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

const getLanguage = () => async (dispatch) => {
  try {
    systemRepository.getSelectedLanguage().then((response) => {
      dispatch(changeSelectedLanguage(languageMap[response?.data?.language]));
      window.CURRENT_LANGUAGE =
        response?.data?.language === "browser-preference"
          ? getSupportedLanguage()
          : languageMap[response?.data?.language];
    });
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

const getDateandTimeInfo = () => async (dispatch, getState) => {
  try {
    const { data } = await systemRepository.dateAndTime();
    const { setting, app } = getState();
    const { dateAndTime } = setting;
    const { screenHeaderInfo: screenInfo } = app;
    dispatch(
      setDateAndTime({
        ...dateAndTime,
        dateAndTime: data.dateTime,
        isAutoNtpSyncEnabled: data.isAutoNtpSyncEnabled,
        ntpServerAddress: data.ntpServerAddress,
      })
    );
    dispatch(setScreenHeaderInfo({ ...screenInfo, dateAndTime }));
    dispatch(setCurrentDateAndTime(data.dateTime));
    dispatch(setTimeDiff(moment(data.dateTime).diff(moment(), "s")));
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

const saveGeneralSettingInfo = (ntpSync, selectedLanguage) => async (dispatch, getState) => {
  const ApiLanguageMap = {
    "en-US": "en",
    "zh-CN": "zh",
    ta: "ta",
    "Auto-Detect": "browser-preference",
  };
  const {
    user: { user },
    setting,
    app,
  } = getState();
  const { screenInfo, dateAndTime, mediaBlock, changedSettings } = setting;

  const cloneDateAndTime = {
    ...dateAndTime,
    timeZone: dateAndTime?.timeZone?.split(") ")[1],
  };
  const hasAdminAccess = checkScopeAuth(user, SCOPES.SYSTEM, SCOPE_ACTIONS.ADMIN);
  const { validForm, inValidFields } = formValidation({ ...mediaBlock });
  if (ntpSync === "ntpSync") {
    try {
      await dispatch(saveDateandTimeInfo());
      await systemRepository.ntpServerSync();
      await dispatch(getDateandTimeInfo());
      dispatch(displaySuccessToast("Toast.ntpSyncNow"));
      return;
    } catch (err) {
      dispatch(errorHandler(err));
      return;
    }
  }
  if (!validForm) {
    try {
      dispatch(setEmptyFormFields(inValidFields));
      dispatch(displayFailedToast("Toast.ipFieldMandatory"));
    } catch (err) {
      dispatch(errorHandler(err));
    }
  }
  dispatch(setSettingLoading(true));
  if (changedSettings.includes(stateKeys.selectedLanguage)) {
    try {
      await systemRepository.saveLanguage({
        language: selectedLanguage
          ? ApiLanguageMap[selectedLanguage]
          : ApiLanguageMap[app.selectedLanguage],
      });
      dispatch(displaySuccessToast("Toast.languageSave"));
    } catch (err) {
      dispatch(errorHandler(err));
    }
  }
  if (changedSettings.includes(stateKeys.screenInfo)) {
    try {
      await systemRepository.saveScreenInfo(screenInfo);
      dispatch(displaySuccessToast("Toast.screenInfoSave"));
    } catch (err) {
      dispatch(errorHandler(err));
    }
  }
  if (changedSettings.includes(stateKeys.dateAndTime)) {
    try {
      await systemRepository.saveDateAndTime(cloneDateAndTime);
      dispatch(displaySuccessToast("Toast.dateAndTimeSave"));
    } catch (err) {
      dispatch(errorHandler(err));
    }
  }
  if (hasAdminAccess && changedSettings.includes(stateKeys.mediaBlock)) {
    try {
      await systemRepository.saveMediaBlockConfig(mediaBlock);
      dispatch(displaySuccessToast("Toast.mediaBlockConfigSave"));
    } catch (err) {
      dispatch(errorHandler(err));
    }
  }
  try {
    dispatch(setEmptyFormFields([]));
    dispatch(getGeneralSettingInfo());
    dispatch(getLanguage());
    dispatch(setIsFormNotSaved(false));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(setChangedSettings([]));
    dispatch(setSettingLoading(false));
  }
};

const systemTask = (task) => async (dispatch) => {
  try {
    await systemRepository[task]();
    if (task === "restart" || task === "refresh") {
      dispatch(setMaintenanceLoader(true));
    }
    // added 2 second sleep as the API will respond to the http request and then restart the services after 1 second
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (task === "restart" || task === "refresh" || task === "shutdown") {
      await ingestRepository.startIngestsPoll(
        (res) => {
          if (res instanceof Error) {
            if (task === "shutdown") {
              dispatch(shutDown(true));
              ingestRepository.stopIngestsPoll();
            }
            return;
          }
          ingestRepository.stopIngestsPoll();
          history.push("");
        },
        (err) => () => {
          if (task === "shutdown") {
            dispatch(shutDown(true));
            ingestRepository.stopIngestsPoll();
          }
        },
        "?status=queued,copying,verification_pending,verifying,suspended",
        3
      );
    }
  } catch (err) {
    dispatch(errorHandler(err));
    dispatch(setMaintenanceLoader(false));
  }
};

const closeShutDownSuccess = () => async (dispatch) => {
  try {
    dispatch(shutDown(false));
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

const findNewUpdateInDrives = () => async (dispatch, getState) => {
  try {
    dispatch(setFetchUpdateLoading(true));
    const { updateList } = getState().setting;
    const { data } = await systemRepository.driveInfo();
    dispatch(setUpdateList({ ...updateList, drives: data?.drives }));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(setFetchUpdateLoading(false));
  }
};

const updateSoftware = (url, updateType, successCallback, failureCallback) => async (dispatch) => {
  try {
    if (updateType === "os") await systemRepository.updateSoftware({ url });
    else await systemRepository.updateFirmware({ url, address: "10.7.75.1" });
    successCallback();
  } catch (err) {
    failureCallback();
    dispatch(errorHandler(err));
  }
};

const findNewUpdateInNetwork = () => {};

const fetchSoftwareUpdateList = (type = updateListSourceType.drives) =>
  type === updateListSourceType.drives ? findNewUpdateInDrives() : findNewUpdateInNetwork();

const getIpConfiguration = () => async (dispatch) => {
  try {
    dispatch(setSettingLoading(true));
    const { data: ipConig } = await systemRepository.getIpConfiguration();
    const { data: dns } = await systemRepository.getDns();
    dispatch(setIpConfiguration(ipConig.interfaces));
    dispatch(setDns(dns.addresses));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(setSettingLoading(false));
  }
};

const getFilesList = (
  url,
  type,
  credentials,
  successCallback,
  failureCallback,
  updateType
) => async (dispatch, getState) => {
  try {
    if (url.length === 0) {
      await dispatch(findNewUpdateInDrives());
      return null;
    }
    if (!url.includes("http") && !url.includes("ftp")) {
      await dispatch(setFetchUpdateLoading(true));
      const { updateList } = getState().setting;
      const { data } = await systemRepository.getFilesList({ url, fileType: type });
      dispatch(setUpdateList({ ...updateList, drives: data.files }));
      return null;
    }
    if (url.includes("http")) {
      if (updateType === "os") await systemRepository.updateSoftware({ url });
      else await systemRepository.updateFirmware({ url, address: "10.7.75.1" });
      successCallback();
    } else {
      await dispatch(setFetchUpdateLoading(true));
      const { updateList } = getState().setting;
      if (url.split("//")[1]?.includes(":")) {
        const { data } = await systemRepository.getFilesList({ url, fileType: type });
        dispatch(setUpdateList({ ...updateList, drives: data.files }));
      } else {
        const { password, userName } = credentials;
        if (url.includes("@")) {
          const urlWithCredentials = `ftp://${userName}:${password}@${url.split("@").pop()}`;
          const { data } = await systemRepository.getFilesList({
            url: urlWithCredentials,
            fileType: type,
          });
          dispatch(setUpdateList({ ...updateList, drives: data.files }));
        } else {
          const urlWithCredentials = `ftp://${userName}:${password}@${url.split("//").pop()}`;
          const { data } = await systemRepository.getFilesList({
            url: urlWithCredentials,
            fileType: type,
          });
          dispatch(setUpdateList({ ...updateList, drives: data.files }));
        }
      }
    }
  } catch (err) {
    failureCallback();
    dispatch(errorHandler(err));
  } finally {
    dispatch(setFetchUpdateLoading(false));
  }
  return null;
};

const getSystemSettingInfo = () => async (dispatch) => {
  try {
    const { data: audioDelay } = await systemRepository.getAudioDelay();
    dispatch(setAudioDelay(audioDelay));
    const { data: sampleRateData } = await systemRepository.getAudioSamplerate();
    const audioSampleRateValue = audioSamplerateFields.find(
      (f) => f.id === sampleRateData.sampleRate
    );
    dispatch(setAudioSamplerate({ sampleRate: audioSampleRateValue.name }));
    const { data: isRealDDeghostingEnabled } = await systemRepository.getRealDDeghosting();
    dispatch(setRealDDeghosting(isRealDDeghostingEnabled));
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

const getCertificatesFunc = () => async (dispatch) => {
  try {
    localStorage.setItem("isCertificatesLoading", true);
    window.dispatchEvent(new Event("storage"));
    const response = await systemRepository.getCertificates();
    const { data: aboutSystem } = await systemRepository.aboutSystem();
    const certificateName = aboutSystem.mediaBlocks?.[0]?.serialNumber;
    if (response.status !== 200) {
      const res = await response.json();
      // eslint-disable-next-line no-throw-literal
      throw {
        response: {
          data: {
            errors:
              res?.errors?.length > 0
                ? res?.errors
                : [
                    {
                      message: response?.statusText,
                    },
                  ],
          },
        },
      };
    }
    const blob = await response.blob();
    fileDownload(blob, `${certificateName}.zip`);
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    localStorage.removeItem("isCertificatesLoading");
    window.dispatchEvent(new Event("storage"));
  }
};

const getDiagnostics = () => async (dispatch) => {
  try {
    await dispatch(setDiagnosticsApiWaiting(true));
    localStorage.setItem("diagnosticsApiWaiting", true);
    window.dispatchEvent(new Event("storage"));
    const response = await DiagnosticRepository.getDiagnosticsReport();

    if (response.status !== 200) {
      const res = await response.json();
      // eslint-disable-next-line no-throw-literal
      throw {
        response: {
          data: {
            errors:
              res?.errors?.length > 0
                ? res?.errors
                : [
                    {
                      message: response?.statusText,
                    },
                  ],
          },
        },
      };
    }
    const blob = await response.blob();
    const cdVal = response.headers
      .get("Content-Disposition")
      ?.split('filename="')?.[1]
      ?.split('"')?.[0];
    fileDownload(blob, cdVal);
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(setDiagnosticsApiWaiting(false));
    localStorage.removeItem("diagnosticsApiWaiting");
    window.dispatchEvent(new Event("storage"));
  }
};

const saveSystemSettingInfo = () => async (dispatch, getState) => {
  try {
    const { audioDelay, audioSamplerate, realDDeghosting } = getState().setting;
    await systemRepository.saveRealDDeghosting(realDDeghosting);
    await systemRepository.saveAudioDelay(audioDelay);
    const audioSampleRateValue = audioSamplerateFields.find(
      (f) => f.name === audioSamplerate.sampleRate
    );
    if (audioSampleRateValue)
      await systemRepository.saveAudioSamplerate({ sampleRate: audioSampleRateValue.id });
    dispatch(displaySuccessToast("Toast.systemSettingSave"));
    dispatch(getSystemSettingInfo());
    dispatch(setIsFormNotSaved(false));
  } catch (err) {
    dispatch(errorHandler(err));
    dispatch(getSystemSettingInfo());
    dispatch(setIsFormNotSaved(false));
  }
};

const saveIpConfiguration = () => async (dispatch, getState) => {
  try {
    const dnsAddress = {};
    const { ipConfiguration, dns } = getState().setting;
    const linkStateUpConfigs = ipConfiguration.filter((ipconfig) => ipconfig.linkState === "up");
    await bulkAction(systemRepository.saveIpConfiguration, linkStateUpConfigs);
    dnsAddress.addresses = dns.filter(Boolean);
    await systemRepository.saveDns(dnsAddress);
    dispatch(displaySuccessToast("Toast.ipconfigSave"));
    dispatch(getIpConfiguration());
    dispatch(setIsFormNotSaved(false));
  } catch (err) {
    dispatch(errorHandler(err));
    dispatch(getIpConfiguration());
    dispatch(setIsFormNotSaved(false));
  }
};

const resetUpdateList = () => async (dispatch) => {
  try {
    await dispatch(clearUpdateList());
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

const handleCancel = (formName) => (dispatch) => {
  const stateFormMap = {
    [tabs.general]: getGeneralSettingInfo,
    [tabs.systemSetting]: getSystemSettingInfo,
    [tabs.ipConfiguration]: getIpConfiguration,
    [tabs.sdiConfiguration]: getSdiConfiguration,
  };
  dispatch(stateFormMap[formName]());
  dispatch(setIsFormNotSaved(false));
};

const isShowLoaded = () => async () => {
  try {
    const res = await playbackRepository.getPlaybackStatus();
    if (res.data.playbackState === "not_loaded") {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export {
  setScreenInfo,
  systemTask,
  updateSoftware,
  setDateAndTime,
  saveIpConfiguration,
  setMaintenanceLoader,
  getGeneralSettingInfo,
  saveSystemSettingInfo,
  saveGeneralSettingInfo,
  findNewUpdateInDrives,
  setIsFormNotSaved,
  setMediaBlock,
  fetchSoftwareUpdateList,
  getSystemSettingInfo,
  getIpConfiguration,
  resetSetting,
  setDns,
  setAudioDelay,
  handleFormChange,
  getFilesList,
  resetUpdateList,
  handleCancel,
  getDiagnostics,
  getCertificatesFunc,
  getDateandTimeInfo,
  closeShutDownSuccess,
  setChangedSettings,
  isShowLoaded,
  fetchOutputMode,
  getSdiConfiguration,
  saveSdiConfiguration,
};
