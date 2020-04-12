import React, { FunctionComponent, ReactElement } from "react";
import { useDispatch } from "react-redux";

import useTitle from "../hooks/useTitle";
import useRoute from "../hooks/useRoute";
import { ChangeTitle } from "@core/actions/route";

export interface AppTitleProps {
  title: string;
  prefix?: boolean;
  children?: ReactElement;
}

export const AppTitle: FunctionComponent<AppTitleProps> = (props) => {
  useTitle(props.title);
  const route = useRoute();
  const dispatch = useDispatch();

  if (route) {
    route.title = props.title;
    dispatch(ChangeTitle(route));
  }

  if (props.children) return props.children;
  return <></>;
};

export default AppTitle;
