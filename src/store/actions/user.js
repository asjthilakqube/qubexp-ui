/* eslint-disable no-console */
import { history } from "../../store";
import * as Types from "../types/user";
import { PLAYBACK_STATE } from "../../constant/playbackControl";
import parseRoles from "../../utils/parseRoles";
// import { formValidation } from "./helpers/user";
import { errorHandler, displaySuccessToast, displayFailedToast } from "./app";
import { ingestRepository, systemRepository, profileRepository } from "../../repositories";
import { STATE_KEYS, TABS } from "../../constant/user";

const setLoginUser = (payload) => ({ type: Types.LOGIN_USER, payload });
const setIsFormNotSaved = (payload) => ({ type: Types.IS_FORM_NOT_SAVED, payload });
const setNewPassword = (payload) => ({ type: Types.NEW_PASSWORD, payload });
const setLogoutUser = () => ({ type: Types.LOGOUT_USER });
const setEmptyFormFields = (payload) => ({ type: Types.EMPTY_FORM_FIELDS, payload });
const setProfileLoading = (payload) => ({ type: Types.IS_LOADING, payload });
const setErrorPassword = (payload) => ({ type: Types.PASSWORD_ERROR, payload });

const loginUser = (user) => {
  return (dispatch) => {
    const { auth, roles, ...rest } = user;
    const scopes = parseRoles(roles);
    try {
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch {
      console.log("Local Storage Error");
    }
    const userData = { scopes, roles, ...rest };
    console.log("user", userData);
    dispatch(setLoginUser(userData));
  };
};
const logoutUser = () => {
  return (dispatch) => {
    ingestRepository.stopIngestsPoll();
    systemRepository.stopAudioStatusPoll();
    dispatch(setLogoutUser());
    localStorage.clear();
  };
};

const handleFormChanges = (formName, form) => async (dispatch, getState) => {
  const { user } = getState();
  const { profileInfo } = user;
  const stateFormMap = {
    [STATE_KEYS.profileInfo]: setNewPassword,
  };

  await dispatch(stateFormMap[formName](form)); // change data for form fields
  if (
    user.user.username !== form.username.toLowerCase() // if username is changed
  ) {
    dispatch(setIsFormNotSaved(true)); // show the cancel button
  } else if (
    // if username is not changed and the fields are not empty
    user.user.username === form.username.toLowerCase() &&
    (form.confirmpassword?.length > 0 ||
      form.newPassword?.length > 0 ||
      form.currentPassword?.length > 0)
  ) {
    dispatch(setIsFormNotSaved(true));
  } else {
    dispatch(setIsFormNotSaved(false)); // hide the cancel button
  }
  if (
    form.newPassword !== form.confirmpassword &&
    form.confirmpassword?.length > 0 &&
    form.newPassword?.length > 0
  ) {
    dispatch(setErrorPassword(true));
  } else {
    dispatch(setErrorPassword(false));
  }
};

const savePassword = () => async (dispatch, getState) => {
  const { user } = getState();
  const { playbackControl } = getState();
  const { profileInfo } = user;

  const loggedInUser =
    user.user.username[0].slice(0, 1).toUpperCase() + user.user.username.slice(1); // first letter will be Uppercase
  if (playbackControl.playbackState === PLAYBACK_STATE.NOT_LOADED) {
    // if playback state is not loaded

    try {
      if (profileInfo.username === "") {
        profileInfo.username = loggedInUser;
      } // if username is empty(default value), use the username from the logged in user state
      const { confirmpassword, ...rest } = profileInfo; // remove confirmpassword from the object
      const newCredentials = { ...rest, username: profileInfo.username.toLowerCase() };
      const responce = await profileRepository.setPassword(newCredentials); // post new password data to the server
      dispatch(displaySuccessToast("Toast.newPasswordSave"));
      if (responce.status === 200) {
        dispatch(setIsFormNotSaved(false)); // hide the cancel button
        if (user.user.username !== profileInfo.username.toLowerCase()) {
          // don`t logout for current user if we change password for another user
          dispatch(
            setNewPassword({
              username:
                user.user.username[0].slice(0, 1).toUpperCase() + user.user.username.slice(1), // clear the form fields
            })
          );
          return;
        }
        history.push("/logout");
      }
    } catch (err) {
      dispatch(errorHandler(err));
    }

    dispatch(setProfileLoading(true));

    try {
      dispatch(setEmptyFormFields([]));
      dispatch(setIsFormNotSaved(false)); // hide the cancel button
    } catch (err) {
      dispatch(errorHandler(err));
    } finally {
      dispatch(setProfileLoading(false));
    }
  } else {
    dispatch(displayFailedToast("Toast.cantChangePassword"));
  }
};

const userHandleCancel = (formName) => (dispatch, getState) => {
  const { user } = getState();
  const stateFormMap = {
    [TABS.PASSWORD]: setNewPassword,
  };
  dispatch(
    stateFormMap[formName]({
      username: user.user.username[0].slice(0, 1).toUpperCase() + user.user.username.slice(1),
    })
  ); // reset form fields
  dispatch(setIsFormNotSaved(false)); // hide the cancel button
};

export { loginUser, logoutUser, handleFormChanges, setNewPassword, savePassword, userHandleCancel };
