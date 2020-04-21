import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { AppLoading, AppInfo, AppTitle } from "../components";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

export interface ScreenProps {
  t: string;
  isLoaded: boolean;
  isEmpty: boolean;
  hideAdd?: boolean;
  onAdd?: () => void;
  children?: ReactElement;
}

export const Screen: FunctionComponent<ScreenProps> = (props): ReactElement => {
  const { t } = useTranslation();

  if (!props.isLoaded) return <AppLoading loading={true} />;
  if (props.isLoaded && props.isEmpty) {
    return (
      <AppInfo
        title={t(`${props.t}.errors.empty.title`)}
        message={t(`${props.t}.errors.empty.message`)}
        color="warning"
      >
        <AppTitle
          title={t(`${props.t}.errors.empty.title`)}
          route={t(`${props.t}.title`)}
        />
        {!props.hideAdd && (
          <Button
            variant="contained"
            color="primary"
            // onClick={() => history.push(ADMIN_EDIT_CASE_ROUTE.getPath())}
            startIcon={<AddIcon />}
          >
            {t(`${props.t}.add`)}
          </Button>
        )}
      </AppInfo>
    );
  }

  return (
    <AppTitle title={t(`${props.t}.title`)}>
      {props.children && props.children}
    </AppTitle>
  );
};

export default Screen;
