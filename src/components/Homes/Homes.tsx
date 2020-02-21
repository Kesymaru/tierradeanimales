import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AppTable from "../AppTable/AppTable";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ADMIN_DOG_EDIT_ROUTE} from "../Dogs/Dogs.routes";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import AlertDialog from "../AlertDialog";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useHistory} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IHomeState, {IHome} from "../../store/homes/homes.types";
import {ISort} from "../../constants/firebase/database";
import {GetDogs} from "../../store/dogs/dogs.actions";
import {ADMIN_HOME_EDIT_ROUTE} from "./Homes.routes";
import IAppState, {TStatus} from "../../store/app.types";
import {GetHomes} from "../../store/homes/homes.actions";

interface IHomeProps extends Pick<IHomeState, 'homes'> {
}

const Homes: FunctionComponent<IHomeProps> = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [homes, _setHomes] = useState<IHome[]>(props.homes.data);
    const [selected, seSelected] = useState<IHome[]>([]);
    const [loading, setLoading] = useState<boolean>(getLoading());
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    useEffect(() => {
        setHomes(props.homes.data);
        setLoading(getLoading());
    }, [props.homes]);

    init();

    function init() {
        if (props.homes.status === TStatus.Empty)
            dispatch(GetHomes());
    }

    function getLoading(): boolean {
        return props.homes.status === TStatus.Fetching;
    }

    function setHomes(value: IHome[]) {
        seSelected(value.filter(home => home._selected));
        _setHomes(value);
    }

    function onSort(sort: ISort) {
        console.log('sort', sort);
    }

    function onChangePage(event: unknown, page: number) {
        console.log('onChangePage', page);
    }

    function onChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
        const rowPerPage = parseInt(event.target.value);
        console.log('onChangeRowsPerPage', rowPerPage);
    }

    function handleDelete() {
        // dispatch(DeleteDogs(selected))
        setOpenDelete(true);
    }

    return <Paper>
        <AppTable
            data={homes}
            cells={['name']}
            loading={loading}
            pagination={props.homes.pagination}
            onSelect={selected => setHomes(selected)}
            onSort={onSort}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
        >
            <Toolbar variant={isSm ? 'dense' : 'regular'}>
                {selected.length
                    ? <Typography variant="subtitle1" style={{flex: '1 1 100%'}}>
                        {selected.length} homes selected
                    </Typography>
                    : <Typography variant="h6" style={{flex: '1 1 100%'}}>
                        Homes
                    </Typography>}

                <Fade in={selected.length === 1}>
                    <Tooltip title="Edit Dog">
                        <IconButton
                            onClick={() => history.push(ADMIN_HOME_EDIT_ROUTE.getPath(homes.filter(i => i._selected)[0]))}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </Fade>
                <Fade in={!!selected.length}>
                    <Tooltip
                        title={`Delete Home${selected.length > 1 ? 's' : ''}`}
                    >
                        <IconButton
                            onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </Fade>
                <Fade in={true}>
                    <Tooltip title="Add Home">
                        <IconButton
                            onClick={() => history.push(ADMIN_DOG_EDIT_ROUTE.getPath())}
                        >
                            <AddIcon/>
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
            title={selected.length > 1 ? 'Delete Homes' : 'Delete Home'}
            open={openDelete}
            okTitle="Delete"
            okColor="secondary"
            okIcon={<DeleteIcon/>}
            cancelColor="primary"
            onClose={() => setOpenDelete(false)}
        >
            {selected.length > 1
                ? <>
                    <Typography variant="subtitle1">
                        This action will delete {selected.length} homes permanently.
                    </Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography>Delete details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{padding: '0 8px'}}>
                            <List dense={true}>
                                {selected.map((home, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={home.name}/>
                                    </ListItem>
                                ))}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </>
                : <Typography variant="subtitle1">
                    {selected[0]
                        ? `This action will delete ${selected[0].name} permanently`
                        : 'Selected dog will be deleted permanently.'}
                </Typography>}
        </AlertDialog>
    </Paper>;
};

const mapStateToProps = (state: IAppState): IHomeProps => ({
    homes: state.homes.homes,
});

export default connect(mapStateToProps)(Homes);
