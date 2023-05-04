/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindDispatch from "../../utils/actions";
import path from "../../constant/path";

class Logout extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.logoutUser();
  }

  render() {
    const { user } = this.props;
    const { loggedIn } = user;
    if (!loggedIn) {
      return <Redirect to={path.login} />;
    }
    return null;
  }
}

const selector = createSelector(
  (state) => state.user,
  (userData) => ({ user: userData.user })
);

export default connect(selector, bindDispatch)(Logout);

Logout.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.object.isRequired,
};
