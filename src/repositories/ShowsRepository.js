import { SHOWS } from "./constants";
import BaseRepository, { cacheControl } from "./BaseRepository";
import config from "./config";

export default class ShowsRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.MEDIA_URL, auth, undefined, cacheControl, ignoreAuth);
  }

  allShows = (query = "") => this.client.get(SHOWS.SPLS.id, `${SHOWS.SPLS.url}${query}`).promise();

  showXML = (id) => this.client.get(SHOWS.SPLXML.id, SHOWS.SPLXML.url.replace("%id", id)).promise();

  deleteShow = (id) => this.client.delete(SHOWS.SPL.id, SHOWS.SPL.url.replace("%id", id)).promise();

  showDetailsJson = (id) =>
    this.client.get(SHOWS.SPLJSON.id, SHOWS.SPLJSON.url.replace("%id", id)).promise();
}
