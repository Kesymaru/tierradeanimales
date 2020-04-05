import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import AlertDialog from "../../components/AlertDialog";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AppTable from "../../components/AppTable/AppTable";
import { EDIT_FOSTER_HOME_ROUTE } from "../routes";

export const FosterHomes: FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [homes, _setHomes] = useState<Home[]>(props.homes.data);
  const [selected, seSelected] = useState<Home[]>([]);
  const [loading, setLoading] = useState<boolean>(getLoading());
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  useEffect(() => {
    setHomes(props.homes.data);
    setLoading(getLoading());
  }, [props.homes]);

  init();

  function init() {
    if (props.homes.status === TStatus.Empty) dispatch(GetHomes());
  }

  function getLoading(): boolean {
    return props.homes.status === TStatus.Fetching;
  }

  function setHomes(value: Home[]) {
    seSelected(value.filter((home) => home._selected));
    _setHomes(value);
  }

  function onSort(sort: ISort) {
    console.log("sort", sort);
  }

  function onChangePage(event: unknown, page: number) {
    console.log("onChangePage", page);
  }

  function onChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    const rowPerPage = parseInt(event.target.value);
    console.log("onChangeRowsPerPage", rowPerPage);
  }

  function handleDelete() {
    console.log("delete homes", selected);
  }

  return (
    <Paper>
      <AppTable
        data={homes}
        cells={["name"]}
        loading={loading}
        pagination={props.homes.pagination}
        onSelect={(selected) => setHomes(selected)}
        onSort={onSort}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      >
        <Toolbar variant={isSm ? "dense" : "regular"}>
          {selected.length ? (
            <Typography variant="subtitle1" style={{ flex: "1 1 100%" }}>
              {selected.length} homes selected
            </Typography>
          ) : (
            <Typography variant="h6" style={{ flex: "1 1 100%" }}>
              Homes
            </Typography>
          )}

          <Fade in={selected.length === 1}>
            <Tooltip title="Edit HomePage">
              <IconButton
                onClick={() =>
                  history.push(
                    EDIT_FOSTER_HOME_ROUTE.getPath(
                      homes.filter((i) => i._selected)[0]
                    )
                  )
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Fade>
          <Fade in={!!selected.length}>
            <Tooltip title={`Delete HomePage${selected.length > 1 ? "s" : ""}`}>
              <IconButton onClick={() => setOpenDelete(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Fade>
          <Fade in={true}>
            <Tooltip title="Add HomePage">
              <IconButton
                onClick={() => history.push(EDIT_FOSTER_HOME_ROUTE.getPath())}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Fade>
          {/*<Fade in={true}>
                    <Tooltip title="Filter">
                        <IconButton>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                </Fade>*/}
        </Toolbar>
      </AppTable>

      <AlertDialog
        title={selected.length > 1 ? "Delete Homes" : "Delete HomePage"}
        open={openDelete}
        okTitle="Delete"
        okColor="secondary"
        okIcon={<DeleteIcon />}
        cancelColor="primary"
        onClose={(reason) => {
          if (reason) handleDelete();
          setOpenDelete(false);
        }}
      >
        {selected.length > 1 ? (
          <>
            <Typography variant="subtitle1">
              This action will delete {selected.length} homes permanently.
            </Typography>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Delete details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ padding: "0 8px" }}>
                <List dense={true}>
                  {selected.map((home, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={home.name} />
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        ) : (
          <Typography variant="subtitle1">
            {selected[0]
              ? `This action will delete ${selected[0].name} permanently`
              : "Selected dog will be deleted permanently."}
          </Typography>
        )}
      </AlertDialog>
    </Paper>
  );
};

export default FosterHomes;
