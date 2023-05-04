import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindDispatch from "../../utils/actions";
import checkScopeAuth from "../../utils/checkScopeAuth";
import NotFoundPage from "../common/NotFoundPage";

const ProtectedRoute = (props) => {
  const { user, scope, scopeAction, ...rest } = props;
  const { loggedIn } = user;
  if (loggedIn) {
    // Check if the user has access to the route based on the scope and scope action
    const isAllowedRoute = checkScopeAuth(user, scope, scopeAction);
    if (isAllowedRoute) return <Route {...rest} />;
    return <NotFoundPage messageId="Common.pageNotAllowed" />;
  }
  return <Redirect to="/login" replace />;
};

const selector = createSelector(
  (state) => state.user,
  (userData) => ({ user: userData.user })
);

export default connect(selector, bindDispatch)(ProtectedRoute);

ProtectedRoute.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.object.isRequired,
  scope: PropTypes.string.isRequired,
  scopeAction: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  scopeAction: "",
};
