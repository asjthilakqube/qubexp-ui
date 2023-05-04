import { PLAYBACK } from "./constants";
import { SEEK_FROM } from "../constant/playbackControl";
import BaseRepository from "./BaseRepository";
import config from "./config";

const PING_INTERVAL = Number(config.PLAYBACK_STATUS_PING_INTERVAL);

export default class PlaybackRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.PLAYBACK_URL, auth, undefined, undefined, ignoreAuth);
  }

  startStatus = (onSubscribe, onError) => {
    this.client
      .get(PLAYBACK.STATUS.id, PLAYBACK.STATUS.url)
      .pollEvery(PING_INTERVAL)
      .start(onSubscribe, onError);
  };

  getPlaybackStatus = () => this.client.get(PLAYBACK.STATUS.id, PLAYBACK.STATUS.url).promise();

  stopStatus = () => {
    this.client.stop(PLAYBACK.STATUS.id);
  };

  play = (onSubscribe, onError) => {
    this.client
      .post(PLAYBACK.PLAY.id, PLAYBACK.PLAY.url, null)
      .promise()
      .then(() => onSubscribe())
      .catch((err) => onError(err));
  };

  seek = (seekOffset) =>
    this.client.post(PLAYBACK.SEEK.id, PLAYBACK.SEEK.url, seekOffset).promise();

  pause = (onSubscribe, onError) => {
    this.client.post(PLAYBACK.PAUSE.id, PLAYBACK.PAUSE.url).start(onSubscribe, onError);
  };

  stop = (onSubscribe, onError) => {
    this.client.post(PLAYBACK.STOP.id, PLAYBACK.STOP.url).start(onSubscribe, onError);
  };

  loopMode = (loopMode, onSubscribe, onError) => {
    this.client
      .post(PLAYBACK.LOOP_MODE.id, PLAYBACK.LOOP_MODE.url, {
        loopMode,
      })
      .start(onSubscribe, onError);
  };

  next = (onSubscribe, onError) => {
    this.client
      .post(PLAYBACK.SEEK_CPL.id, PLAYBACK.SEEK_CPL.url, {
        seekFrom: SEEK_FROM.CURRENT,
        offset: 1,
      })
      .start(onSubscribe, onError);
  };

  previous = (onSubscribe, onError) => {
    this.client
      .post(PLAYBACK.SEEK_CPL.id, PLAYBACK.SEEK_CPL.url, {
        seekFrom: SEEK_FROM.CURRENT,
        offset: -1,
      })
      .start(onSubscribe, onError);
  };

  seekCpl = (seekDetails) =>
    this.client.post(PLAYBACK.SEEK_CPL.id, PLAYBACK.SEEK_CPL.url, seekDetails).promise();

  showSpl = () => this.client.get(PLAYBACK.SHOW_SPL.id, PLAYBACK.SHOW_SPL.url).promise();

  showInfo = () => this.client.get(PLAYBACK.SHOW_INFO.id, PLAYBACK.SHOW_INFO.url).promise();

  loadShow = (show, onSuccess, onFailure) => {
    this.client
      .post(PLAYBACK.LOAD_SHOW.id, PLAYBACK.LOAD_SHOW.url, { showId: show.id })
      .start(onSuccess, onFailure);
  };

  resumeShow = (show, onSuccess, onFailure) => {
    this.client
      .post(PLAYBACK.RESUME_SHOW.id, PLAYBACK.RESUME_SHOW.url, { showId: show.id })
      .start(onSuccess, onFailure);
  };

  eject = (onSubscribe, onError) => {
    this.client.post(PLAYBACK.EJECT.id, PLAYBACK.EJECT.url).start(onSubscribe, onError);
  };
}
