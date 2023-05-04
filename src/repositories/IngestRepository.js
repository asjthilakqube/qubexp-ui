import Qs from "qs";
import { INGEST } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

const PING_INTERVAL = Number(config.INGEST_STATUS_PING_INTERVAL);

export default class IngestRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.INGEST_URL, auth, undefined, undefined, ignoreAuth);
  }

  parseQuery = (query) => Qs.parse(query, { ignoreQueryPrefix: true });

  startIngestsPoll = (onSubscribe, onError, query = "", pingInterval) => {
    this.client
      .get(INGEST.INGESTS.id, "", { params: this.parseQuery(query) })
      .pollEvery(pingInterval || PING_INTERVAL)
      .start(onSubscribe, onError);
  };

  getIngest = (query = "") =>
    this.client.get(INGEST.INGESTS.id, "", { params: this.parseQuery(query) }).promise();

  ingestActions = (id, action) => this.client.post(INGEST.INGESTS.id, `${id}/${action}`).promise();

  addToIngest = (ingestableEntity) =>
    this.client.post(INGEST.INGESTS.id, INGEST.INGESTS.url, ingestableEntity).promise();

  ingestEnumerate = (credentials) =>
    this.client
      .post(INGEST.INGEST_ENUMERATE.id, INGEST.INGEST_ENUMERATE.url, credentials)
      .promise();

  stopIngestsPoll = () => {
    this.client.stop(INGEST.INGESTS.id);
  };
}
