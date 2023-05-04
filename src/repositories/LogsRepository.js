import { LOGS } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class LogsRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.LOGS, auth, "application/xml", undefined, ignoreAuth);
  }

  generateLogs = ({ startDate, endDate }) =>
    this.client
      .get(
        LOGS.GENERATE_LOGS.id,
        `${LOGS.GENERATE_LOGS.url}?start-timestamp=${startDate}&end-timestamp=${endDate}`,
        { timeout: 300000 }
      )
      .promise();

  generateSystemLogs = (queryParameter) =>
    this.client
      .get(LOGS.GENERATE_SYSTEM_LOGS.id, `${LOGS.GENERATE_SYSTEM_LOGS.url}${queryParameter}`)
      .promise();
}
