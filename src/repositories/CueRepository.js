import { MEDIA } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class CueRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.MEDIA_URL, auth, undefined, undefined, ignoreAuth);
  }

  allCues = () => this.client.get(MEDIA.CUES.id, MEDIA.CUES.url).promise();

  getCuesList = () => this.client.get(MEDIA.CUES.id, MEDIA.CUES.url).promise();
}
