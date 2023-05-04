export default {
  root: "/",
  login: "/login",
  logout: "/logout",
  playback: "/playback-control",
  shows: "/shows",
  cues: "/cues",
  importShow: "/shows/import-show",
  newShows: "/shows/new",
  viewShow: "/shows/:id",
  newCue: "/cues/new",
  editCue: "/cues/:id/edit",
  editShow: "/shows/:id/edit",
  schedules: "/schedules",
  addKey: "/content-keys/add-key",
  ingestContent: "/content-keys/ingest-content",
  viewPackageDetails: "/content-keys/packages/:id/:type?",
  viewCompositionDetails: "/content-keys/compositions/:id/:type?",
  contentAndKeysSubRoot: "/content-keys/:type",
  contentAndKeys: "/content-keys",
  contentAndKeyCompositions: "/content-keys/compositions",
  contentAndKeyPackages: "/content-keys/packages",
  setting: "/settings",
  settingSubRoot: "/settings/:type",
  settingGeneral: "/settings/general",
  deviceAndAutomation: "/automation",
  deviceAndAutomationSubRoot: "/automation/:type",
  deviceAndAutomationDevice: "/automation/devices",
  automationDeviceForm: "/automation/devices/:id?/form",
  automationActionForm: "/automation/devices/:name/actions/:actionName?/form",
  automationDeviceDetails: "/automation/devices/:id/:type?",
  automationCue: "/automation/cues",
  viewCueDetails: "/automation/cue/:name",
  logs: "/logs",
  logsSubRoot: "/logs/:type",
  logsSystem: "/logs/system",
  profile: "/profile",
};

const assets = "assets";
const edit = "edit";
const duplicate = "duplicate";

export { assets, edit, duplicate };
