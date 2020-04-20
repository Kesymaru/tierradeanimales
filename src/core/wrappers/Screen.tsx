import React, { FunctionComponent, ReactElement } from "react";

import { AppLoading, AppInfo, AppTitle } from "../components";

export interface ScreenProps {
  title: string;
  isLoaded: boolean;
  isEmpty: boolean;
  infoActions?: ReactElement;
  children?: ReactElement;
}

export const Screen: FunctionComponent<ScreenProps> = (props): ReactElement => {
  if (!props.isLoaded) return <AppLoading loading={true} />;
  else if (props.isLoaded && props.isEmpty) {
    return (
      <AppInfo title={``} message={``} color="warning">
        {props.infoActions && props.infoActions}
      </AppInfo>
    );
  }

  return (
    <AppTitle title={props.title}>{props.children && props.children}</AppTitle>
  );
};

export default Screen;
