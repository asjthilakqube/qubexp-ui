import { MEDIA } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class MediaRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.MEDIA_URL, auth, undefined, undefined, ignoreAuth);
  }

  cplById = (cplsQuery) =>
    this.client.get(MEDIA.CPLS.id, `${MEDIA.CPLS.url}?${cplsQuery}`).promise();

  cplAssets = (id) =>
    this.client.get(MEDIA.CPL_ASSETS.id, MEDIA.CPL_ASSETS.url.replace("%id", id)).promise();

  cpls = () => this.client.get(MEDIA.CPLS.id, MEDIA.CPLS.url).promise();

  deleteCpl = (id) => this.client.delete(MEDIA.CPLS.id, `${MEDIA.CPLS.url}/${id}`).promise();

  updateCpl = (id, cpl) =>
    this.client
      .request(MEDIA.CPLS.id, `${MEDIA.CPLS.url}/${id}`, cpl, {
        method: "patch",
      })
      .promise();

  deleteDcp = (id) => this.client.delete(MEDIA.DCPS.id, `${MEDIA.DCPS.url}/${id}`).promise();

  dcps = () => this.client.get(MEDIA.DCPS.id, MEDIA.DCPS.url).promise();

  dcpById = (dcpQuery) => this.client.get(MEDIA.DCPS.id, `${MEDIA.DCPS.url}?${dcpQuery}`).promise();

  dcpAssets = (id) =>
    this.client.get(MEDIA.DCP_ASSETS.id, MEDIA.DCP_ASSETS.url.replace("%id", id)).promise();

  kdms = (query = "") => this.client.get(MEDIA.KDMS.id, `${MEDIA.KDMS.url}${query}`).promise();

  kdmXML = (id) => this.client.get(MEDIA.KDMXML.id, MEDIA.KDMXML.url.replace("%id", id)).promise();

  deleteKdm = (id) => this.client.delete(MEDIA.KDMS.id, `${MEDIA.KDMS.url}?id=${id}`).promise();
}
