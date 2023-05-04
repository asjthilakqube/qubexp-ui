import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/ErrorBounary.module.scss";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {} };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.header}>Something Went Wrong</div>
          <div className={styles.message}>{error.message}</div>
          <div className={styles.link}>
            <a href="/">Go Back to Playback Control</a>
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
};
