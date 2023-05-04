import { BOOKMARK } from "./constants";
import BaseRepository from "./BaseRepository";
import config from "./config";

export default class BookmarkRepository extends BaseRepository {
  constructor(auth, ignoreAuth) {
    super(config.BOOKMARK_URL, auth, undefined, undefined, ignoreAuth);
  }

  getBookmark = () => this.client.get(BOOKMARK.BOOKMARKS.id, BOOKMARK.BOOKMARKS.url).promise();

  createBookmark = (bookmarkDetails) =>
    this.client.post(BOOKMARK.BOOKMARKS.id, BOOKMARK.BOOKMARKS.url, bookmarkDetails).promise();

  updateBookmark = (bookmarkDetails) =>
    this.client.post(BOOKMARK.BOOKMARKS.id, BOOKMARK.BOOKMARKS.url, bookmarkDetails).promise();

  deleteBookmark = (name) =>
    this.client.delete(BOOKMARK.BOOKMARKS.id, `${BOOKMARK.BOOKMARKS.url}/${name}`).promise();
}
