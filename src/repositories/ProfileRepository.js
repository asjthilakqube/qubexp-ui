import { IAM } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class ProfileRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.IAM_URL, auth, "application/json", undefined, ignoreAuth);
    this.auth = auth;
  }

  setPassword = (data) => this.client.post(IAM.PASSWORD.id, IAM.PASSWORD.url, data).promise();
}
