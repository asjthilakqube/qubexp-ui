import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Redirect } from "react-router";
import ClassNames from "classnames";
import { Button } from "@blueprintjs/core";
import bindDispatch from "../../utils/actions";
import path from "../../constant/path";
import BaseRepository from "../../repositories/BaseRepository";
import config from "../../repositories/config";
import { initAuth } from "../../repositories";
import flattenMessages from "../../localization/flattenMessages";
import styles from "../../styles/components/auth/Login.module.scss";
import buttonStyles from "../../styles/components/common/InputButton.module.scss";
import { QubeLogoExpanded } from "../../assets/icons";
import { Intents, languageMap } from "../../constant/app";
import languageSelector, { getSupportedLanguage } from "../../utils/languageSelector";

const enUs = {
  userNamePlaceholder: "Enter UserName",
  passwordPlaceholder: "Enter Password",
};

const ta = {
  userNamePlaceholder: "பயனர் பெயரை உள்ளிடவும்",
  passwordPlaceholder: "கடவுச்சொல்லை உள்ளிடவும்",
};

const zhCn = {
  userNamePlaceholder: "输入用户名",
  passwordPlaceholder: "输入密码",
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: false,
      serverError: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const base = new BaseRepository();
    const browserAddress = window.location.href.indexOf("127.0.0.1") !== -1;
    base
      .getSelectedLanguage()
      .then((response) => {
        actions.changeSelectedLanguage(languageMap[response?.data?.language]);
      })
      .catch(() => {
        this.setState({ loading: false, serverError: true });
      });
    if (browserAddress) {
      this.autoLogin();
    }
  }

  onKeyPress = (event) => {
    if (event.key === "Enter") {
      this.manualLogin();
    }
  };

  autoLogin = () => {
    const {
      user: { loggedOut },
      actions,
    } = this.props;
    if (loggedOut) {
      return;
    }
    const { username, password } = this.state;
    const auth = { username, password };
    // we have to ignore the authentication when the user logs in for the first time
    const ignoreAuth = true;
    const base = new BaseRepository(config.IAM_URL, auth, undefined, undefined, ignoreAuth);
    const baseLang = new BaseRepository(undefined, undefined, undefined, undefined, ignoreAuth);
    this.login(base, baseLang, auth, true, actions);
  };

  manualLogin = () => {
    this.setState({ loading: true });
    const { actions } = this.props;
    const { username, password } = this.state;
    const auth = { username, password };
    const base = new BaseRepository(config.IAM_URL, auth);
    const baseLang = new BaseRepository();
    this.login(base, baseLang, auth, false, actions);
  };

  login = (base, baseLang, auth, ignoreAuth, actions) => {
    baseLang
      .getSelectedLanguage()
      .then((response) => {
        actions.changeSelectedLanguage(languageMap[response?.data?.language]);
        this.setState({ loading: false, serverError: false });
        base
          .validateAuth()
          .then((validateResponse) => {
            initAuth(ignoreAuth ? undefined : auth, ignoreAuth);
            this.setState({ loading: false });
            actions.loginUser({ loggedIn: true, auth, ...validateResponse.data });
          })
          .catch(() => {
            this.setState({ loading: false, error: true });
          });
      })
      .catch(() => {
        this.setState({ loading: false, serverError: true });
      });
  };

  render() {
    const {
      user: { loggedIn },
      app: { selectedLanguage },
    } = this.props;
    const selectedLangObject = languageSelector(enUs, ta, zhCn, selectedLanguage);
    const { loading, error, username, password, serverError } = this.state;
    if (loggedIn) return <Redirect to={path.playback} replace />;
    const intent = serverError || error ? Intents.ERROR : Intents.DEFAULT;
    return (
      <IntlProvider
        locale={selectedLanguage === "Auto-Detect" ? getSupportedLanguage() : selectedLanguage}
        textComponent="span"
        messages={flattenMessages(
          selectedLanguage === "Auto-Detect" ? getSupportedLanguage() : selectedLanguage
        )}
      >
        <div className={`theme-dark ${styles.cardContainer}`}>
          <div className={styles.card}>
            <div className={styles.logo}>
              <img src={QubeLogoExpanded} alt="Qube Logo" />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.header}>
                <FormattedMessage id="Login.userName" />
              </div>
              <div className={styles.container}>
                <div
                  className={ClassNames(styles.input, styles[intent], {
                    [styles.intentBorder]: error,
                  })}
                >
                  <input
                    onChange={(e) => this.setState({ username: e.target.value })}
                    onKeyPress={this.onKeyPress}
                    value={username}
                    placeholder={selectedLangObject.userNamePlaceholder}
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.header}>
                <FormattedMessage id="Login.password" />
              </div>
              <div className={styles.container}>
                <div
                  className={ClassNames(styles.input, styles[intent], {
                    [styles.intentBorder]: error,
                  })}
                >
                  <input
                    onChange={(e) => this.setState({ password: e.target.value })}
                    onKeyPress={this.onKeyPress}
                    value={password}
                    placeholder={selectedLangObject.passwordPlaceholder}
                    type="password"
                  />
                </div>
                {error && !serverError && (
                  <div className={ClassNames(styles.intent, styles[intent])}>
                    Invalid Username or Password
                  </div>
                )}
                {serverError && (
                  <div className={ClassNames(styles.intent, styles[intent])}>
                    Internal Server Error
                  </div>
                )}
              </div>
            </div>
            <Button
              loading={loading}
              disabled={loading}
              className={ClassNames(
                buttonStyles.container,
                buttonStyles.primary,
                buttonStyles.background,
                styles.button
              )}
              onClick={this.manualLogin}
            >
              <div className={ClassNames(buttonStyles.text)}>
                <FormattedMessage id="Login.login" />
              </div>
            </Button>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

const selector = createSelector(
  (state) => state.user,
  (state) => state.app,
  (userData, app) => ({ user: userData.user, app })
);

export default connect(selector, bindDispatch)(Login);

Login.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};
