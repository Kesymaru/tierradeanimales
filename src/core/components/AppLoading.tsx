import React, { FunctionComponent, ReactElement } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

export interface AppLoadingProps {
  loading: boolean;
  title?: string;
}

export const AppLoading: FunctionComponent<AppLoadingProps> = (props) => {
  if (props.loading)
    return (
      <>
        <LinearProgress color="primary" variant="query" />
        {props.title && (
          <Typography variant="h4" align="center">
            {props.title}
          </Typography>
        )}
      </>
    );
  return props.children as ReactElement;
};

export default AppLoading;
