import { RouteActions, RouteAction, Route } from "../models/route";

export function ChangeTitle(payload: Route): RouteAction {
  return { type: RouteActions.CHANGE_TITLE, payload };
}

export function Reset(): RouteAction {
  return { type: RouteActions.RESET };
}
