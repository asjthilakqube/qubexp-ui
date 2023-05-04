const API_VERSION = "v1";
const APP_TIMEOUT = "30000";
const INGEST_STATUS_PING_INTERVAL = 10;
const PLAYBACK_STATUS_PING_INTERVAL = 1;
const RAID_STATUS_PING_INTERVAL = 30;
const IMB_STATUS_PING_INTERVAL = 10;
const AUDIO_STATUS_PING_INTERVAL = 10;

const { REACT_APP_API_BASE_URL = "." } = process.env;

const endPointPrefix = `/api/${API_VERSION}`;

const apiUrl = `${REACT_APP_API_BASE_URL}${endPointPrefix}`;

export default {
  IAM_URL: `${apiUrl}/iam`,
  PLAYBACK_URL: `${apiUrl}/playback`,
  MEDIA_URL: `${apiUrl}/media`,
  INGEST_URL: `${apiUrl}/ingests`,
  BOOKMARK_URL: `${apiUrl}/ingests/bookmarks`,
  SCHEDULE_URL: `${apiUrl}/schedules`,
  SYSTEM_URL: `${apiUrl}/system`,
  AUTOMATION: `${apiUrl}/automation`,
  LOGS: `${apiUrl}/logs`,
  APP_TIMEOUT,
  INGEST_STATUS_PING_INTERVAL,
  PLAYBACK_STATUS_PING_INTERVAL,
  RAID_STATUS_PING_INTERVAL,
  IMB_STATUS_PING_INTERVAL,
  AUDIO_STATUS_PING_INTERVAL,
};

export { apiUrl };
