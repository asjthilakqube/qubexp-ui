import { SYSTEM } from "./constants";
import BaseRepository from "./BaseRepository";
import config, { apiUrl } from "./config";
import getNetworkUrl from "../utils/getNetworkUrl";

const AUDIO_PING_INTERVAL = Number(config.AUDIO_STATUS_PING_INTERVAL);

const RAID_PING_INTERVAL = Number(config.RAID_STATUS_RAID_PING_INTERVAL);
const IMB_PING_INTEVAL = Number(config.IMB_STATUS_PING_INTERVAL);
const forceRestart = { forceRestart: true };
const forceShutdown = { forceShutdown: true };
export default class SystemRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.SYSTEM_URL, auth, "application/json", undefined, ignoreAuth);
    this.auth = auth;
  }

  screenInfo = () => this.client.get(SYSTEM.SCREEN_INFO.id, SYSTEM.SCREEN_INFO.url).promise();

  aboutSystem = () => this.client.get(SYSTEM.ABOUT.id, SYSTEM.ABOUT.url).promise();

  driveInfo = () => this.client.get(SYSTEM.DRIVES.id, SYSTEM.DRIVES.url).promise();

  saveScreenInfo = (screenInfo) =>
    this.client.post(SYSTEM.SCREEN_INFO.id, SYSTEM.SCREEN_INFO.url, screenInfo).promise();

  dateAndTime = () => this.client.get(SYSTEM.DATE_AND_TIME.id, SYSTEM.DATE_AND_TIME.url).promise();

  getTimeZones = () => this.client.get(SYSTEM.TIME_ZONES.id, SYSTEM.TIME_ZONES.url).promise();

  mediaBlockConfig = () => this.client.get(SYSTEM.MEDIA_BLOCK.id, SYSTEM.MEDIA_BLOCK.url).promise();

  saveMediaBlockConfig = (configInfo) =>
    this.client.post(SYSTEM.MEDIA_BLOCK.id, SYSTEM.MEDIA_BLOCK.url, configInfo).promise();

  saveDateAndTime = (dateAndTime) =>
    this.client.post(SYSTEM.DATE_AND_TIME.id, SYSTEM.DATE_AND_TIME.url, dateAndTime).promise();

  restart = () => this.client.post(SYSTEM.RESTART.id, SYSTEM.RESTART.url, forceRestart).promise();

  shutdown = () =>
    this.client.post(SYSTEM.SHUTDOWN.id, SYSTEM.SHUTDOWN.url, forceShutdown).promise();

  refresh = () => this.client.post(SYSTEM.REFRESH.id, SYSTEM.REFRESH.url, forceRestart).promise();

  updateSoftware = (data) => this.client.post(SYSTEM.UPDATE.id, SYSTEM.UPDATE.url, data).promise();

  getIpConfiguration = () =>
    this.client.get(SYSTEM.IP_CONFIGURATION.id, SYSTEM.IP_CONFIGURATION.url).promise();

  getAudioStatus = () => this.client.get(SYSTEM.AUDIO_STATUS.id, SYSTEM.AUDIO_STATUS.url).promise();

  startAudioStatusPoll = (onSubscribe, onError, pingInterval) => {
    this.client
      .get(SYSTEM.AUDIO_STATUS.id, SYSTEM.AUDIO_STATUS.url)
      .pollEvery(pingInterval || AUDIO_PING_INTERVAL)
      .start(onSubscribe, onError);
  };

  stopAudioStatusPoll = () => {
    this.client.stop(SYSTEM.AUDIO_STATUS.id);
  };

  getAudioDelay = () => this.client.get(SYSTEM.AUDIO_DELAY.id, SYSTEM.AUDIO_DELAY.url).promise();

  saveAudioDelay = (data) =>
    this.client.post(SYSTEM.AUDIO_DELAY.id, SYSTEM.AUDIO_DELAY.url, data).promise();

  getAudioSamplerate = () =>
    this.client.get(SYSTEM.AUDIO_SAMPLERATE.id, SYSTEM.AUDIO_SAMPLERATE.url).promise();

  saveAudioSamplerate = (data) =>
    this.client.post(SYSTEM.AUDIO_SAMPLERATE.id, SYSTEM.AUDIO_SAMPLERATE.url, data).promise();

  saveIpConfiguration = (credential) =>
    this.client
      .post(
        SYSTEM.IP_CONFIGURATION.id,
        `${SYSTEM.IP_CONFIGURATION.url}/${credential.name}`,
        credential
      )
      .promise();

  getDns = () => this.client.get(SYSTEM.DNS.id, SYSTEM.DNS.url).promise();

  saveDns = (data) => this.client.post(SYSTEM.DNS.id, SYSTEM.DNS.url, data).promise();

  startRaidStatusPoll = (onSubscribe, onError, pingInterval) =>
    this.client
      .get(SYSTEM.RAID_STATUS.id, SYSTEM.RAID_STATUS.url)
      .pollEvery(pingInterval || RAID_PING_INTERVAL)
      .start(onSubscribe, onError);

  stopRaidStatusPoll = () => {
    this.client.stop(SYSTEM.RAID_STATUS.id);
  };

  startImbStatusPoll = (onSubscribe, onError, pingInterval) => {
    this.client
      .get(SYSTEM.IMB_STATUS.id, SYSTEM.IMB_STATUS.url)
      .pollEvery(pingInterval || IMB_PING_INTEVAL)
      .start(onSubscribe, onError);
  };

  stopImbStatusPoll = () => {
    this.client.stop(SYSTEM.IMB_STATUS.id);
  };

  getFilesList = (data) =>
    this.client.post(SYSTEM.FILES_LIST.id, SYSTEM.FILES_LIST.url, data).promise();

  updateFirmware = (data) =>
    this.client.post(SYSTEM.UPDATE_FIRMWARE.id, SYSTEM.UPDATE_FIRMWARE.url, data).promise();

  ntpServerSync = () =>
    this.client.post(SYSTEM.NTPSERVER_SYNC.id, SYSTEM.NTPSERVER_SYNC.url).promise();

  getRealDDeghosting = () =>
    this.client.get(SYSTEM.GET_REALD_DEGHOSTING.id, SYSTEM.GET_REALD_DEGHOSTING.url).promise();

  saveRealDDeghosting = (data) =>
    this.client
      .post(SYSTEM.GET_REALD_DEGHOSTING.id, SYSTEM.GET_REALD_DEGHOSTING.url, data)
      .promise();

  saveLanguage = (data) =>
    this.client.post(SYSTEM.LANGUAGE.id, SYSTEM.LANGUAGE.url, data).promise();

  getOutputMode = () => this.client.get(SYSTEM.OUTPUT_MODE.id, SYSTEM.OUTPUT_MODE.url).promise();

  getCertificates = () => {
    const { username, password } = this.auth;
    const diagnosticsApi = `${apiUrl}/system${SYSTEM.CERTIFICATES_DOWNLOAD.url}`;
    const headers = new Headers();
    headers.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
    headers.set("Content-Type", "application/zip");
    headers.set("X-XP-Client", "xp-ui");
    const origin = getNetworkUrl(diagnosticsApi);
    return fetch(origin, {
      method: "GET",
      headers,
    });
  };

  getColorSpace = () => this.client.get(SYSTEM.COLOR_SPACE.id, SYSTEM.COLOR_SPACE.url).promise();

  saveColorSpace = (data) =>
    this.client.post(SYSTEM.COLOR_SPACE.id, SYSTEM.COLOR_SPACE.url, data).promise();

  getThreeDEye = () => this.client.get(SYSTEM.THEED_EYE.id, SYSTEM.THEED_EYE.url).promise();

  saveThreeDEye = (data) =>
    this.client.post(SYSTEM.THEED_EYE.id, SYSTEM.THEED_EYE.url, data).promise();

  getFourKStatus = () =>
    this.client.get(SYSTEM.FOUR_K_STATUS.id, SYSTEM.FOUR_K_STATUS.url).promise();

  saveFourKStatus = (data) =>
    this.client.post(SYSTEM.FOUR_K_STATUS.id, SYSTEM.FOUR_K_STATUS.url, data).promise();
}
