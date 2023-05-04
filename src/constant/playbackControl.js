const CURRENT_STATE = {
  IN_PROGRESS: "inprogress",
  COMPLETED: "completed",
  QUEUED: "queued",
};

const PLAYBACK_STATE = {
  PLAYING: "playing",
  PAUSED: "paused",
  STOPPED: "stopped",
  NOT_LOADED: "not_loaded",
  SEEKING: "seeking",
  LOADING: "loading",
  EJECTING: "ejecting",
  STARTING: "starting",
  PAUSING: "pausing",
  STOPPING: "stopping",
};

const TRANSIENT_STATE = ["seeking", "starting", "pausing", "stopping"];

const TRANSIENT_PLAYBACK_STATES = [
  PLAYBACK_STATE.LOADING,
  PLAYBACK_STATE.PAUSING,
  PLAYBACK_STATE.SEEKING,
  PLAYBACK_STATE.STARTING,
  PLAYBACK_STATE.EJECTING,
  PLAYBACK_STATE.STOPPING,
];

const TAGS = {
  AUDIO_ATMOS: "aux-data",
  VIDEO_3D: "mainStreoscopicPicture",
};

const FORMATS = {
  AUDIO_ATMOS: "ATMOS",
  VIDEO_3D: "3D",
  VIDEO_2D: "2D",
};

const SEEK_FROM = {
  CURRENT: "current",
  START: "start",
};

export {
  CURRENT_STATE,
  TAGS,
  FORMATS,
  PLAYBACK_STATE,
  TRANSIENT_PLAYBACK_STATES,
  SEEK_FROM,
  TRANSIENT_STATE,
};
