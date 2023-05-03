import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
// Disable check for history since it is a sub-dep of react-router-dom
// Importing it separately can cause 2 conflicting versions of history
// TODO: Refactor this to avoid using history directly and instead use via React Router API
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from "history";
import rootReducer from "./store/reducers";
export const history = createBrowserHistory();
export default function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./store/reducers", () => store.replaceReducer(rootReducer));
  }
  return store;
}