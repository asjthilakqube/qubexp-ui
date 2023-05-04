import { SCHEDULE } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class ScheduleRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.SCHEDULE_URL, auth, undefined, undefined, ignoreAuth);
  }

  allSchedule = (params = {}) =>
    this.client.get(SCHEDULE.SCHEDULES.id, `${SCHEDULE.SCHEDULES.url}`, { params }).promise();

  createSchedule = (scheduleInfo) =>
    this.client.post(SCHEDULE.SCHEDULES.id, SCHEDULE.SCHEDULES.url, scheduleInfo).promise();

  deleteSchedule = (id) =>
    this.client.delete(SCHEDULE.SCHEDULES.id, `${SCHEDULE.SCHEDULES.url}/${id}`).promise();
}
