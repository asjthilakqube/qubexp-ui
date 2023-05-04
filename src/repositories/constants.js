class IdURLMapping {
  id;

  url;

  constructor(id, url) {
    this.id = id;
    this.url = url;
  }
}

const PLAYBACK = {
  STATUS: new IdURLMapping("playback_status", "/status"),
  PLAY: new IdURLMapping("playback_play", "/play"),
  SEEK: new IdURLMapping("playback_seek", "/seek-position"),
  PAUSE: new IdURLMapping("playback_pause", "/pause"),
  STOP: new IdURLMapping("playback_stop", "/stop"),
  LOOP_MODE: new IdURLMapping("playback_loop_mode", "/loop-mode"),
  SEEK_CPL: new IdURLMapping("playback_cpl_seek", "/seek-cpl"),
  EJECT: new IdURLMapping("playback_eject", "/eject"),
  SHOW_SPL: new IdURLMapping("show_spl", "/show-spl"),
  SHOW_INFO: new IdURLMapping("show-info", "/show-info"),
  LOAD_SHOW: new IdURLMapping("load", "/load"),
  RESUME_SHOW: new IdURLMapping("resume", "/resume"),
};

const MEDIA = {
  CPLS: new IdURLMapping("cpls", "/cpls"),
  CPL_ASSETS: new IdURLMapping("cpls", "/cpls/%id/assets"),
  DCPS: new IdURLMapping("dcps", "/dcps"),
  DCP_ASSETS: new IdURLMapping("dcps", "/dcps/%id/assets"),
  KDMS: new IdURLMapping("kdms", "/kdms"),
  KDMXML: new IdURLMapping("kdmxml", "/kdms/%id/xml"),
};

const AUTOMATION = {
  DEVICE_TYPES: new IdURLMapping("deviceTypes", "/device-types"),
  DEVICES: new IdURLMapping("devices", "/devices"),
  VENDORS: new IdURLMapping("vendors", "/vendors"),
  MODELS: new IdURLMapping("models", "/models"),
  DEVICE_ACTIONS: new IdURLMapping("deviceActions", "/devices/%name/actions"),
  DEVICE_TRIGGERS: new IdURLMapping("deviceTriggers", "/devices/trigger-events"),
  ALL_DEVICE_ACTIONS: new IdURLMapping("allDeviceActions", "/devices/actions"),
  CUES: new IdURLMapping("cues", "/cues"),
  DELETE_CUES: new IdURLMapping("deleteCues", "/cues/%name"),
};

const LOGS = {
  GENERATE_LOGS: new IdURLMapping("generateLogs", "/security"),
  GENERATE_SYSTEM_LOGS: new IdURLMapping("generateSystemLogs", "/server"),
};

const BOOKMARK = {
  BOOKMARKS: new IdURLMapping("bookmarks", ""),
};

const INGEST = {
  INGESTS: new IdURLMapping("ingests", ""),
  INGEST_ENUMERATE: new IdURLMapping("ingests", "/enumerate"),
  INGEST_XML: new IdURLMapping("ingests_xml", ""),
};

const SHOWS = {
  SPLS: new IdURLMapping("spls", "/spls"),
  SPL: new IdURLMapping("spl", "/spls/%id"),
  SPLXML: new IdURLMapping("splxml", "/spls/%id/xml"),
  SPLJSON: new IdURLMapping("splJson", "/spls/%id/json"),
};

const SCHEDULE = {
  SCHEDULES: new IdURLMapping("schedules", ""),
};

const SYSTEM = {
  SCREEN_INFO: new IdURLMapping("screen", "/screen"),
  DATE_AND_TIME: new IdURLMapping("time", "/time"),
  TIME_ZONES: new IdURLMapping("timezone", "/time/zoneinfo"),
  RESTART: new IdURLMapping("restart", "/restart"),
  SHUTDOWN: new IdURLMapping("shutdown", "/shutdown"),
  REFRESH: new IdURLMapping("refresh", "/restart-services"),
  UPDATE_LIST: new IdURLMapping("updateList", "/drives/listupdatefile"),
  UPDATE: new IdURLMapping("update", "/update"),
  ABOUT: new IdURLMapping("about", "/about"),
  DRIVES: new IdURLMapping("external-drives", "/external-drives"),
  AUDIO_STATUS: new IdURLMapping("audioDevices", "/audio/status"),
  AUDIO_DELAY: new IdURLMapping("audiodelay", "/audio/audiodelay"),
  AUDIO_SAMPLERATE: new IdURLMapping("audioSamplerate", "/audio/samplerate"),
  MEDIA_BLOCK: new IdURLMapping("mediaBlock", "/mediablock/config"),
  CERTIFICATES_DOWNLOAD: new IdURLMapping("certificates", "/mediablock/certificates"),
  IP_CONFIGURATION: new IdURLMapping("ipConfiguration", "/network/interfaces"),
  DNS: new IdURLMapping("dns", "/network/dns"),
  RAID_STATUS: new IdURLMapping("raidStatus", "/storage/status"),
  IMB_STATUS: new IdURLMapping("imbStatus", "/imb/status"),
  FILES_LIST: new IdURLMapping("filesList", "/files/list"),
  UPDATE_FIRMWARE: new IdURLMapping("firmWareUpdate", "/mediablock/update"),
  DIAGNOSTICS_REPORT: new IdURLMapping("diagnostics", "/diagnostics"),
  NTPSERVER_SYNC: new IdURLMapping("ntpServerSync", "/time/sync"),
  GET_REALD_DEGHOSTING: new IdURLMapping("realDDeghosting", "/three-d/config"),
  LANGUAGE: new IdURLMapping("language", "/language"),
  OUTPUT_MODE: new IdURLMapping("outputMode", "/imb-configurations"),
  COLOR_SPACE: new IdURLMapping("colorSpace", "/color-space/config"),
  THEED_EYE: new IdURLMapping("theeDEye", "/threed-frame-preference/config"),
  FOUR_K_STATUS: new IdURLMapping("fourKrender", "/4Krender"),
};

const IAM = {
  IDENTITY: new IdURLMapping("identity", "/identity"),
  PASSWORD: new IdURLMapping("password", "/identity/password"),
};

export { PLAYBACK, MEDIA, INGEST, SHOWS, BOOKMARK, SCHEDULE, SYSTEM, AUTOMATION, IAM, LOGS };
