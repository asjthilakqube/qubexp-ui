import { reduce, flatten, compact, uniq } from "lodash";
import { USER_ACTIONS_MAP } from "../constant/user";

const parseRoles = (roles) =>
  reduce(
    roles,
    (result, value) => {
      const scopeUser = value;
      const [scope, action] = scopeUser.split("_");
      const modifiedResult = { ...result };
      if (!modifiedResult[scope]) modifiedResult[scope] = [];
      modifiedResult[scope] = uniq(
        compact(flatten([...modifiedResult[scope], USER_ACTIONS_MAP[action]]))
      );
      return modifiedResult;
    },
    {}
  );

export default parseRoles;
