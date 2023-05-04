import { SYSTEM } from "./constants";
import BaseRepository from "./BaseRepository";
import config, { apiUrl } from "./config";
import getNetworkUrl from "../utils/getNetworkUrl";

export default class DiagnosticsRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.SYSTEM_URL, auth, "application/json", undefined, ignoreAuth);
    this.auth = auth;
  }

  getDiagnosticsReport = () => {
    const { username, password } = this.auth;
    const diagnosticsApi = `${apiUrl}/system${SYSTEM.DIAGNOSTICS_REPORT.url}`;
    const headers = new Headers();
    headers.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
    headers.set("Content-Type", "application/zip");
    headers.set("X-XP-Client", "xp-ui");
    const origin = getNetworkUrl(diagnosticsApi);
    return fetch(origin, {
      method: "GET",
      headers,
    });
  };
}
