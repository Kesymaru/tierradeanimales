import React, { FunctionComponent, ReactElement } from "react";
import { useDispatch } from "react-redux";

import useTitle from "../hooks/useTitle";
import useRoute from "../hooks/useRoute";
import { ChangeTitle } from "@core/actions/route";

export interface AppTitleProps {
  title: string;
  route?: string;
  children?: ReactElement | null;
}

export const AppTitle: FunctionComponent<AppTitleProps> = (
  props
): ReactElement => {
  useTitle(props.title);
  const route = useRoute();
  const dispatch = useDispatch();

  if (route) {
    route.title = props.route || props.title;
    dispatch(ChangeTitle(route));
  }

  // if (props.children) return props.children;
  return (
    <React.Fragment>{props.children && props.children}</React.Fragment>
  ) as ReactElement;
};

export default AppTitle;
