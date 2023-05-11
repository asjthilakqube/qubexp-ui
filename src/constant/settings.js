const general = "general";
const systemSetting = "systemSetting";
const maintenance = "maintenance";
const ipConfiguration = "ipConfiguration";
const sdiConfiguration = "sdiConfiguration";

const maxAudioDelay = 500;

const updateListSourceType = {
  drives: "drives",
  path: "path",
};

const tabs = {
  general,
  systemSetting,
  maintenance,
  ipConfiguration,
  sdiConfiguration,
};

const constructObject = (array) => Object.assign({}, ...array.map((key) => ({ [key]: key })));

const systemTaskOptions = constructObject([
  "restart",
  "shutdown",
  "refresh",
  "shutDownSuccess",
  "refreshModal",
  "restartModal",
  "shutdownModal",
  "shutDownSuccessModal",
]);
const stateKeys = constructObject([
  "screenInfo",
  "dateAndTime",
  "dns",
  "ipConfiguration",
  "audioDelay",
  "audioSamplerate",
  "mediaBlock",
  "realDDeghosting",
  "selectedLanguage",
  "colorSpace",
  "threeDEyeChange",
  "fourKrender",
  "quadrant",
]);

const placeholder = {
  enterIpAddress: "Enter IP Address",
  enterSubnetMask: "Enter Subnet Mask",
  enterGatewayAddress: "Enter Gateway Address",
  enterTheatreName: "Enter Theatre Name",
  enterScreenName: "Enter Screen Name",
  enterServerDetail: "Enter NTP server URL or IP Address",
};
const placeholderTa = {
  enterIpAddress: "ஐபி முகவரியை உள்ளிடவும்",
  enterSubnetMask: "சப்நெட் மாஸ்கை உள்ளிடவும்",
  enterGatewayAddress: "நுழைவாயில் முகவரியை உள்ளிடவும்",
  enterTheatreName: "தியேட்டர் பெயரை உள்ளிடவும்",
  enterScreenName: "திரை பெயரை உள்ளிடவும்",
};
const placeholderZhCn = {
  enterIpAddress: "输入 IP 地址",
  enterSubnetMask: "输入子网掩码",
  enterGatewayAddress: "输入网关地址",
  enterTheatreName: "输入剧院名称",
  enterScreenName: "输入屏幕名称",
};

const panel = [
  {
    id: general,
    title: `Settings.general`,
  },
  {
    id: systemSetting,
    title: `Settings.systemSetting`,
  },
];

const header = [
  {
    name: "Setting.header",
  },
];

const settingGetActionMapping = {
  general: "getGeneralSettingInfo",
  maintenance: "getGeneralSettingInfo",
  ipConfiguration: "getIpConfiguration",
  systemSetting: "getSystemSettingInfo",
  sdiConfiguration: "getSdiConfiguration",
};

const settingSaveActionMapping = {
  general: "saveGeneralSettingInfo",
  systemSetting: "saveSystemSettingInfo",
  ipConfiguration: "saveIpConfiguration",
  sdiConfiguration: "saveSdiConfiguration",
};

const formInputTypes = constructObject([
  "text",
  "password",
  "dropdown",
  "radioButton",
  "element",
  "label",
  "number",
  "switch",
]);

const daysInWeek = [
  { name: "Monday", id: 1 },
  { name: "Tuesday", id: 2 },
  { name: "Wednesday", id: 3 },
  { name: "Thursday", id: 4 },
  { name: "Friday", id: 5 },
  { name: "Saturday", id: 6 },
  { name: "Sunday", id: 7 },
];

const audioSamplerate = [
  { name: "48 kHz", id: "48000" },
  { name: "96 kHz", id: "96000" },
  { name: "Same as Source", id: "0" },
];

const tipsInfos = [
  { name: "Setting.shutdownTips", key: "shutdownTips" },
  { name: "Setting.restartTips", key: "restartTips" },
];

const confirmationContent = {
  [systemTaskOptions.restart]: "Setting.restartConfirmation",
  [systemTaskOptions.shutdown]: "Setting.shutdownConfirmation",
  [systemTaskOptions.refresh]: "Setting.refreshConfirmation",
};

const confirmationTitle = {
  [systemTaskOptions.restart]: "Setting.restartConfirmationTitle",
  [systemTaskOptions.shutdown]: "Setting.shutdownConfirmationTitle",
  [systemTaskOptions.refresh]: "Setting.refreshConfirmationTitle",
  [systemTaskOptions.shutDownSuccess]: "Setting.shutDownSuccessConfirmationTitle",
};

const confirmationModal = {
  [systemTaskOptions.restartModal]: "Setting.restartConfirmationBody",
  [systemTaskOptions.shutdownModal]: "Setting.shutdownConfirmationBody",
  [systemTaskOptions.refreshModal]: "Setting.refreshConfirmationBody",
  [systemTaskOptions.shutDownSuccessModal]: "Setting.shutDownSuccessConfirmationBody",
};

const confirmationButton = {
  [systemTaskOptions.restart]: "Setting.restart",
  [systemTaskOptions.shutdown]: "Setting.shutdown",
  [systemTaskOptions.refresh]: "Setting.refresh",
};

const updateSource = [
  {
    header: "Setting.updateInDrives",
    key: "drives",
  },
  {
    header: "Setting.updateInPaths",
    key: "paths",
  },
];

const textMap = { confirmationContent, confirmationTitle, confirmationButton, confirmationModal };

const isAutoNtpSyncEnabled = "isAutoNtpSyncEnabled";

const DynamicList = "DynamicList";

const DynamicCommentList = "DynamicCommentList";

export default panel;

export {
  tabs,
  header,
  systemTaskOptions,
  settingGetActionMapping,
  settingSaveActionMapping,
  daysInWeek,
  formInputTypes,
  stateKeys,
  tipsInfos,
  maxAudioDelay,
  textMap,
  updateSource,
  updateListSourceType,
  confirmationButton,
  placeholder,
  audioSamplerate,
  isAutoNtpSyncEnabled,
  DynamicList,
  DynamicCommentList,
  placeholderTa,
  placeholderZhCn,
};
