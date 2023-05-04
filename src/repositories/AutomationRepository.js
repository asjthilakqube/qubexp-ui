import { AUTOMATION } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class AutomationRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.AUTOMATION, auth, undefined, undefined, ignoreAuth);
  }

  getDeviceTypes = () =>
    this.client.get(AUTOMATION.DEVICE_TYPES.id, AUTOMATION.DEVICE_TYPES.url).promise();

  getDevices = () => this.client.get(AUTOMATION.DEVICES.id, AUTOMATION.DEVICES.url).promise();

  getDeviceInfo = (name = "") =>
    this.client.get(AUTOMATION.DEVICES.id, `${AUTOMATION.DEVICES.url}?name=${name}`).promise();

  deleteDevice = (name = "") =>
    this.client.delete(AUTOMATION.DEVICES.id, `${AUTOMATION.DEVICES.url}/${name}`).promise();

  saveDevices = (device) =>
    this.client.post(AUTOMATION.DEVICES.id, AUTOMATION.DEVICES.url, device).promise();

  saveTriggers = (device) =>
    this.client
      .post(AUTOMATION.DEVICES.id, `${AUTOMATION.DEVICES.url}?skipValidation=false`, device)
      .promise();

  getVendors = () => this.client.get(AUTOMATION.VENDORS.id, AUTOMATION.VENDORS.url).promise();

  getModels = () => this.client.get(AUTOMATION.MODELS.id, AUTOMATION.MODELS.url).promise();

  getDeviceActions = (name) =>
    this.client
      .get(AUTOMATION.DEVICE_ACTIONS.id, AUTOMATION.DEVICE_ACTIONS.url.replace("%name", name))
      .promise();

  getAllDevicesActions = () =>
    this.client.get(AUTOMATION.ALL_DEVICE_ACTIONS.id, AUTOMATION.ALL_DEVICE_ACTIONS.url).promise();

  getTriggers = () =>
    this.client.get(AUTOMATION.DEVICE_TRIGGERS.id, AUTOMATION.DEVICE_TRIGGERS.url).promise();

  importAction = (action) =>
    this.client.post(AUTOMATION.DEVICES.id, AUTOMATION.DEVICES.url, action).promise();

  saveCue = (cue) => this.client.post(AUTOMATION.CUES.id, AUTOMATION.CUES.url, cue).promise();

  getCuesList = () => this.client.get(AUTOMATION.CUES.id, AUTOMATION.CUES.url).promise();

  saveCue = (cue) => this.client.post(AUTOMATION.CUES.id, AUTOMATION.CUES.url, cue).promise();

  deleteCue = (cueName) =>
    this.client
      .delete(AUTOMATION.DELETE_CUES.id, AUTOMATION.DELETE_CUES.url.replace("%name", cueName))
      .promise();
}
