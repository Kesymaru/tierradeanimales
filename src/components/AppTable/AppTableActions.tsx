import React, {
  FunctionComponent,
  ComponentType,
  useState,
  useRef,
  MouseEvent,
} from "react";
import { useTranslation } from "react-i18next";

import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import { PropTypes } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import EditIcon from "@material-ui/icons/Edit";

export interface TableAction {
  title: string;
  color?: PropTypes.Color;
  icon?: ComponentType<any>;
  onClick?: (items: Array<any>) => void;
  disabled?: (items: Array<any>) => boolean;
}
export type TableActions = Array<TableAction>;

interface AppTableActionsProps {
  actions: TableActions;
  selected: Array<string>;
}

export const AppTableActions: FunctionComponent<AppTableActionsProps> = (
  props
) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<TableAction>(props.actions[0]);
  const anchorRef = useRef<HTMLDivElement>(null);

  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose(event: MouseEvent<Document>) {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  }

  function renderMenu() {
    return (
      <MenuList id="split-button-menu">
        {props.actions.map((item: TableAction) => (
          <MenuItem
            key={item.title}
            disabled={item.disabled ? item.disabled(props.selected) : false}
            selected={item === action}
            onClick={() => {
              setAction(item);
              setOpen(false);
            }}
          >
            <ListItemIcon>
              {item.icon ? (
                <item.icon fontSize="small" />
              ) : (
                <EditIcon fontSize="small" />
              )}
            </ListItemIcon>
            <Typography variant="inherit">{t(item.title)}</Typography>
          </MenuItem>
        ))}
      </MenuList>
    );
  }

  return (
    <ButtonGroup
      variant="outlined"
      color="primary"
      ref={anchorRef}
      size="small"
      disabled={props.selected.length <= 0}
    >
      <Tooltip title={t(action.title)}>
        <Button
          onClick={() => action.onClick && action.onClick(props.selected)}
          startIcon={action.icon ? <action.icon /> : undefined}
          color={action.color ? action.color : "default"}
          disabled={action.disabled ? action.disabled(props.selected) : false}
        >
          {t(action.title)}
        </Button>
      </Tooltip>
      <Tooltip title={t("app.changeAction")}>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {renderMenu()}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ButtonGroup>
  );
};

export default AppTableActions;
