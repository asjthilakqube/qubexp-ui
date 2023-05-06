import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import app from "./app";
// import playbackControl from "./playbackControl";
// import contentAndKeys from "./contentAndKeys";
// import ingestContentAndKeys from "./ingestContentAndKeys";
// import ingest from "./ingest";
// import shows from "./shows";
// import ingestBookmarks from "./ingestBookmarks";
// import cue from "./cue";
// import schedule from "./schedule";
// import setting from "./setting";
// import automation from "./automation";
import user from "./user";
// import logs from "./logs";

const rootReducer = combineReducers({
  app,
//   playbackControl,
//   contentAndKeys,
//   ingestContentAndKeys,
//   ingest,
//   ingestBookmarks,
//   shows,
//   cue,
//   schedule,
//   setting,
//   automation,
  user,
  routing: routerReducer,
//   logs,
});

export default rootReducer;
