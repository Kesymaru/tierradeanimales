import React, { FunctionComponent, ReactElement } from "react";

import useTitle from "../hooks/useTitle";

export interface AppTitleProps {
  title: string;
  children?: ReactElement;
}

export const AppTitle: FunctionComponent<AppTitleProps> = (props) => {
  useTitle(props.title);
  if (props.children) return props.children;
  return <></>;
};

export default AppTitle;
