import * as Types from "../types/user";

const initialState = {
  isLoading: false,
  isError: null,
  isFormNotSaved: false,
  user: {
    loggedIn: false,
    loggedOut: false,
  },
  emptyFormFields: [],
  profileInfo: {
    username: "",
    newPassword: "",
    confirmpassword: "",
    currentPassword: "",
  },
  passwordError: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.IS_LOADING:
      return { ...state, isLoading: payload };
    case Types.IS_ERROR:
      return { ...state, isError: payload };
    case Types.LOGIN_USER:
      return { ...state, user: payload };
    case Types.PROFILE_NAME:
      return { ...state, profileInfo: payload };
    case Types.NEW_PASSWORD:
      return { ...state, profileInfo: payload };
    case Types.IS_FORM_NOT_SAVED:
      return { ...state, isFormNotSaved: payload };
    case Types.EMPTY_FORM_FIELDS:
      return { ...state, emptyFormFields: payload };
    case Types.PASSWORD_ERROR:
      return { ...state, passwordError: payload };
    case Types.LOGOUT_USER:
      return { ...initialState, user: { loggedIn: false, loggedOut: true } };
    default:
      return state;
  }
}
