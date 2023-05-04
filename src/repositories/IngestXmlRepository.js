import { INGEST } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class IngestRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.INGEST_URL, auth, "application/xml", undefined, ignoreAuth);
  }

  importShow = (xml) =>
    this.client.post(INGEST.INGEST_XML.id, INGEST.INGEST_XML.url, xml).promise();
}
