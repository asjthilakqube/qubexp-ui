import { compact } from "lodash";
import { SCOPES, SCOPE_ACTIONS } from "../constant/user";

// Checks if the given user has access to the given scope and action.
// By default READ action is checked, and so scopeAction can be treated as optional.
const checkScopeAuth = (user, scope, scopeAction) => {
  // Invalid case if no user or scope passed.
  // Likely a bug, return unauthorised just to be safe and not show/allow something the user might not have access to.
  if (!user || !user.scopes || !scope) {
    return false;
  }

  // Skip scope check if it is an internal or UI only item. For instance, it can be used for the Logout NavMenu Item.
  // NOTE: Should use only if there's literally no other scope used.
  const skipScopeCheck = scope === SCOPES.SELF;
  if (skipScopeCheck) {
    return true;
  }

  // Check if it is a valid scope, and if user has access to both READ and the given scope
  const scopeActions = compact([SCOPE_ACTIONS.READ, scopeAction]);
  return scopeActions.every((action) => user.scopes[scope] && user.scopes[scope].includes(action));
};

export default checkScopeAuth;
