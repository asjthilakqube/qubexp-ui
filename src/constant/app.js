const maxScreenWidth = 1024;
const smallScreenWidth = 500;
const oneSecond = 1000;
const Intents = {
  DEFAULT: "default",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};
const ingestSuccessMessage = {
  cpls: "Composition Ingest Started",
  kdms: "Added key successfully",
  spls: "Imported show successfully",
};
const defaultErrorMessage = "Internal Error";

const appTheme = {
  DARK: "dark",
  LIGHT: "light",
};

const timeRange = {
  morning: 6,
  evening: 18,
};

const HEADER_TYPES = {
  DEFAULT: "default",
  ACTION: "action",
  REDIRECT: "redirect",
};

const emptyDateSymbol = "";
const DND_TEMP_KEY = "temp";

const progressBarType = {
  progressLine: "line",
  progressForeground: "foreground",
};

const loadingType = {
  table: "table",
  list: "list",
  schedule: "schedule",
  playback: "playback",
};

const languageMap = {
  en: "en-US",
  zh: "zh-CN",
  ta: "ta",
  "browser-preference": "Auto-Detect",
};

const defaultFormMattedMessage = "Not Available";

export default maxScreenWidth;

export {
  Intents,
  ingestSuccessMessage,
  HEADER_TYPES,
  smallScreenWidth,
  progressBarType,
  defaultErrorMessage,
  timeRange,
  DND_TEMP_KEY,
  emptyDateSymbol,
  appTheme,
  loadingType,
  oneSecond,
  defaultFormMattedMessage,
  languageMap,
};
