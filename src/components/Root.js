import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import path from "../constant/path";
// import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./auth/Login";
// import Logout from "./auth/Logout";
// import NotFound from "./common/NotFoundPage";
// import Logs from "./pages/Logs";
// // Content And Keys Roots
// import ContentAndKeys from "./pages/ContentAndKeys";
// import AddKey from "./pages/AddKey";
// import IngestContent from "./pages/IngestContent";
// import ContentDetails from "./pages/ContentDetails";
// import PackageDetails from "./pages/PackageDetails";
// // Dashboard Roots
// import PlaybackControl from "./pages/PlaybackControl";
// // Schedule Roots
// import Schedule from "./pages/Schedule";
// // Show Roots
// import ShowsList from "./pages/ShowsList";
// import ShowDetails from "./pages/ShowDetails";
// import ShowEdit from "./pages/ShowEdit";
// import ShowImport from "./pages/ShowImport";
// // System Settings Root
// import Setting from "./pages/Setting";
// // System Settings Root
// import Automation from "./pages/Automation";
// import AutomationDeviceForm from "./pages/AutomationDeviceForm";
// import AutomationActionForm from "./pages/AutomationActionForm";
// import AutomationDeviceDetails from "./pages/AutomationDeviceDetails";
// import AutomationCueDetails from "./pages/AutomationCueDetails";
// import AutomationCueEdit from "./pages/AutomationCueEdit";
// import Profile from "./pages/Profile";
import ErrorBoundary from "./ErrorBoundary";
// import Layout from "./common/Layout";

import bindDispatch from "../utils/actions";
import BaseRepository from "../repositories/BaseRepository";
import config from "../repositories/config";
import { initAuth } from "../repositories";
// import { SCOPES, SCOPE_ACTIONS } from "../constant/user";

// const redirectFunction = (redirectionPath) => <Redirect to={redirectionPath} replace />;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authChecked: false,
    };
  }

  componentDidMount() {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth) this.validate(auth);
      else this.invalidate();
    } catch {
      // eslint-disable-next-line no-console
      console.log("Local Storage Error");
    }
  }

  validate = (auth) => {
    const { actions } = this.props;
    const base = new BaseRepository(config.IAM_URL, auth);
    base
      .validateAuth()
      .then((response) => {
        initAuth(auth);
        actions.loginUser({ loggedIn: true, auth, ...response.data });
        this.setState({ authChecked: true });
      })
      .catch(this.invalidate);
  };

  invalidate = () => {
    localStorage.clear();
    this.setState({ authChecked: true });
  };

  render() {
    const { authChecked } = this.state;
    if (!authChecked) return null;
    return (
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/logout" component={Logout} />
          <Layout>
            <Switch> */}
              {/* <ProtectedRoute
                exact
                path={path.root}
                scope={SCOPES.PLAYBACK}
                render={() => redirectFunction(path.playback)}
              /> */}
              {/* <ProtectedRoute
                path={path.playback}
                scope={SCOPES.PLAYBACK}
                component={PlaybackControl}
              />
              <ProtectedRoute exact path={path.shows} scope={SCOPES.SHOWS} component={ShowsList} />
              <ProtectedRoute
                path={path.importShow}
                scope={SCOPES.SHOWS}
                scopeAction={SCOPE_ACTIONS.WRITE}
                component={ShowImport}
              />
              <ProtectedRoute
                exact
                path={path.newShows}
                scope={SCOPES.SHOWS}
                scopeAction={SCOPE_ACTIONS.WRITE}
                component={ShowEdit}
              />
              <ProtectedRoute
                exact
                path={path.viewShow}
                scope={SCOPES.SHOWS}
                component={ShowDetails}
              />
              <ProtectedRoute
                exact
                path={path.editShow}
                scope={SCOPES.SHOWS}
                scopeAction={SCOPE_ACTIONS.WRITE}
                component={ShowEdit}
              />
              <ProtectedRoute path={path.schedules} scope={SCOPES.SCHEDULE} component={Schedule} />
              <ProtectedRoute
                path={path.addKey}
                scope={SCOPES.INGEST}
                scopeAction={SCOPE_ACTIONS.WRITE}
                component={AddKey}
              />
              <ProtectedRoute
                path={path.ingestContent}
                scope={SCOPES.INGEST}
                scopeAction={SCOPE_ACTIONS.WRITE}
                component={IngestContent}
              />
              <ProtectedRoute
                path={path.viewPackageDetails}
                scope={SCOPES.SHOWS}
                component={PackageDetails}
              />
              <ProtectedRoute
                path={path.viewCompositionDetails}
                scope={SCOPES.SHOWS}
                component={ContentDetails}
              />
              <ProtectedRoute
                path={path.contentAndKeysSubRoot}
                scope={SCOPES.SHOWS}
                component={ContentAndKeys}
              />
              <ProtectedRoute
                path={path.contentAndKeys}
                scope={SCOPES.SHOWS}
                render={() => redirectFunction(path.contentAndKeyCompositions)}
              />
              <ProtectedRoute
                path={path.settingSubRoot}
                scope={SCOPES.SYSTEM}
                component={Setting}
              />
              <ProtectedRoute
                path={path.setting}
                scope={SCOPES.SYSTEM}
                render={() => redirectFunction(path.settingGeneral)}
              />
              <ProtectedRoute
                exact
                scope={SCOPES.AUTOMATION}
                scopeAction={SCOPE_ACTIONS.WRITE}
                path={path.automationActionForm}
                component={AutomationActionForm}
              />
              <ProtectedRoute
                exact
                scope={SCOPES.AUTOMATION}
                scopeAction={SCOPE_ACTIONS.WRITE}
                path={path.automationDeviceForm}
                component={AutomationDeviceForm}
              />
              <ProtectedRoute
                exact
                scope={SCOPES.AUTOMATION}
                path={path.viewCueDetails}
                component={AutomationCueDetails}
              />
              <ProtectedRoute
                exact
                scope={SCOPES.AUTOMATION}
                path={path.automationDeviceDetails}
                component={AutomationDeviceDetails}
              />
              <ProtectedRoute
                path={path.deviceAndAutomationSubRoot}
                scope={SCOPES.AUTOMATION}
                component={Automation}
              />
              <ProtectedRoute
                path={path.deviceAndAutomation}
                scope={SCOPES.AUTOMATION}
                render={() => redirectFunction(path.deviceAndAutomationDevice)}
              />
              <ProtectedRoute path={path.logsSubRoot} scope={SCOPES.LOGS} component={Logs} />
              <ProtectedRoute
                path={path.logs}
                scope={SCOPES.LOGS}
                render={() => redirectFunction(path.logsSystem)}
              />
              <ProtectedRoute
                exact
                path={path.editCue}
                scope={SCOPES.AUTOMATION}
                scopeAction={SCOPE_ACTIONS.WRITE}
                component={AutomationCueEdit}
              />
              <ProtectedRoute
                exact
                path={path.newCue}
                scope={SCOPES.AUTOMATION}
                scopeAction={SCOPE_ACTIONS.WRITE}
                component={AutomationCueEdit}
              /> */}
              {/* <ProtectedRoute exact path={path.profile} scope={SCOPES.SYSTEM} component={Profile} /> */}
              {/* <ProtectedRoute scope={SCOPES.SELF} component={NotFound} /> */}
            {/* </Switch>
          </Layout> */}
        </Switch>
      </ErrorBoundary>
    );
  }
}

Root.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, bindDispatch)(Root);

// export default Root;
