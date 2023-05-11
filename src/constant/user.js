
const constructObject = (array) => Object.assign({}, ...array.map((key) => ({ [key]: key })));

const SCOPES = {
  IAM: "iam",
  AUTOMATION: "automation",
  INGEST: "ingest",
  LOGS: "log",
  PLAYBACK: "playback",
  SCHEDULE: "schedule",
  SHOWS: "shows",
  SYSTEM: "system",
  SELF: "__SELF__",
  PROFILE: "profile",
};

const SCOPE_ACTIONS = {
  READ: "READ",
  WRITE: "WRITE",
  ADMIN: "ADMIN",
  POWER: "POWER",
};

const USER_ROLE_ACTIONS = {
  VIEWER: "viewer",
  EDITOR: "editor",
  ADMIN: "admin",
  POWER: "power",
};

const USER_ACTIONS_MAP = {
  [USER_ROLE_ACTIONS.VIEWER]: [SCOPE_ACTIONS.READ],
  [USER_ROLE_ACTIONS.EDITOR]: [SCOPE_ACTIONS.READ, SCOPE_ACTIONS.WRITE],
  [USER_ROLE_ACTIONS.ADMIN]: [SCOPE_ACTIONS.READ, SCOPE_ACTIONS.WRITE, SCOPE_ACTIONS.ADMIN],
  [USER_ROLE_ACTIONS.POWER]: [SCOPE_ACTIONS.POWER],
};

const FORM_INPUT_TYPES = constructObject([
  "text",
  "password",
  "dropdown",
  "radioButton",
  "element",
  "label",
  "number",
  "switch",
]);

const TABS = {
  PASSWORD: "password",
};

const STATE_KEYS = constructObject(["password", "newpassword", "profileInfo"]);

export {
  SCOPES,
  SCOPE_ACTIONS,
  USER_ROLE_ACTIONS,
  USER_ACTIONS_MAP,
  FORM_INPUT_TYPES,
  TABS,
  STATE_KEYS,
};
