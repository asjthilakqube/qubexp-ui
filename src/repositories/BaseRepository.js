import Client from "polly/dist/Client";
import getNetworkUrl from "../utils/getNetworkUrl";
import config, { apiUrl } from "./config";
import { IAM, SYSTEM } from "./constants";

const { APP_TIMEOUT: timeout } = config;

export const cacheControl = { "Cache-Control": "no-cache, no-store" };
export default class BaseRepository {
  client;

  constructor(
    url,
    auth = {},
    contentType = "application/json",
    headerConfig = {},
    ignoreAuth = false
  ) {
    const origin = getNetworkUrl(url);
    const { username, password } = auth;
    const authHeader = `Basic ${btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`;
    if (ignoreAuth) {
      this.client = new Client(
        origin,
        {
          "Content-Type": contentType,
          "X-XP-Client": "xp-ui",
          ...headerConfig,
        },
        timeout
      );
    } else {
      this.client = new Client(
        origin,
        {
          "Content-Type": contentType,
          "X-XP-Client": "xp-ui",
          Authorization: authHeader,
          ...headerConfig,
        },
        timeout
      );
    }
  }

  validateAuth = (ignoreAuth) => {
    // if (ignoreAuth) {
    //   delete this.client.headers.Authorization;
    // }
    return this.client.get(IAM.IDENTITY.id, IAM.IDENTITY.url).promise();
  };

  getSelectedLanguage = () => {
    const languageApi = `${apiUrl}/system${SYSTEM.LANGUAGE.url}`;
    const origin = getNetworkUrl(languageApi);
    return this.client.get(SYSTEM.LANGUAGE.id, origin).promise();
  };
}
