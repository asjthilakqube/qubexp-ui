import * as _ from "lodash";
import { bindActionCreators } from "redux";
import * as actions from "../store/actions";

const bindDispatch = _.memoize((dispatch) => ({
  dispatch,
  actions: bindActionCreators(actions, dispatch),
}));
export default bindDispatch;
