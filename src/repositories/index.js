import IngestRepo from "./IngestRepository";
import IngestXmlRepo from "./IngestXmlRepository";
import MediaRepo from "./MediaRepository";
import BookmarkRepo from "./BookmarkRepository";
import CueRepo from "./CueRepository";
import ScheduleRepo from "./ScheduleRepository";
import PlaybackRepo from "./PlaybackRepository";
import SystemRepo from "./SystemRepository";
import AutomationRepo from "./AutomationRepository";
import ShowsRepo from "./ShowsRepository";
import LogsRepo from "./LogsRepository";
import DiagnosticRepo from "./DiagnosticsRepository";
import ProfileRepo from "./ProfileRepository";

let ingestRepository;
let mediaRepository;
let ingestXmlRepository;
let bookmarkRepository;
let cueRepository;
let playbackRepository;
let scheduleRepository;
let systemRepository;
let automationRepository;
let showsRepository;
let logsRepository;
let DiagnosticRepository;
let profileRepository;

const initAuth = (auth, ignoreAuth) => {
  ingestRepository = new IngestRepo(auth, ignoreAuth);
  mediaRepository = new MediaRepo(auth, ignoreAuth);
  ingestXmlRepository = new IngestXmlRepo(auth, ignoreAuth);
  bookmarkRepository = new BookmarkRepo(auth, ignoreAuth);
  cueRepository = new CueRepo(auth, ignoreAuth);
  scheduleRepository = new ScheduleRepo(auth, ignoreAuth);
  playbackRepository = new PlaybackRepo(auth, ignoreAuth);
  systemRepository = new SystemRepo(auth, ignoreAuth);
  automationRepository = new AutomationRepo(auth, ignoreAuth);
  showsRepository = new ShowsRepo(auth, ignoreAuth);
  logsRepository = new LogsRepo(auth, ignoreAuth);
  DiagnosticRepository = new DiagnosticRepo(auth, ignoreAuth);
  profileRepository = new ProfileRepo(auth, ignoreAuth);
};

export {
  initAuth,
  ingestRepository,
  mediaRepository,
  ingestXmlRepository,
  bookmarkRepository,
  cueRepository,
  playbackRepository,
  scheduleRepository,
  systemRepository,
  automationRepository,
  showsRepository,
  logsRepository,
  DiagnosticRepository,
  profileRepository,
};
