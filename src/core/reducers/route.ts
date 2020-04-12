import { RouteState, RouteAction, RouteActions } from "./../models/route";
import INIT_ROUTE_STATE from "./../constants/route";

export function RouteReducer(
  state: RouteState = INIT_ROUTE_STATE,
  action: RouteAction
) {
  switch (action.type) {
    case RouteActions.CHANGE_TITLE:
      return {
        ...state,
        route: action.payload,
      };

    case RouteActions.RESET:
      return INIT_ROUTE_STATE;

    default:
      return state;
  }
}

export default RouteReducer;
