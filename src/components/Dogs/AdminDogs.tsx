import React, {ChangeEvent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';

import AppTable from "../AppTable/AppTable";
import AlertDialog from "../AlertDialog";

import IAppState, {TStatus} from "../../store/app.types";
import IDogState, {IDog} from "../../store/dogs/dogs.types";
import {GetDogs} from "../../store/dogs/dogs.actions";
import {ISort} from "../../constants/firebase/database";
import {ADMIN_DOG_EDIT_ROUTE} from "./Dogs.routes";

interface IAdminDogs extends Pick<IDogState, 'dogs'> {
}

function AdminDogs(props: IAdminDogs) {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [dogs, _setDogs] = useState<IDog[]>(props.dogs.data);
    const [selected, seSelected] = useState<IDog[]>([]);
    const [loading, setLoading] = useState<boolean>(_getLoading());
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    useEffect(() => {
        setDogs(props.dogs.data);
        setLoading(_getLoading());
    }, [props.dogs]);

    function _getLoading(): boolean {
        return props.dogs.status === TStatus.Fetching
    }

    function setDogs(_dogs: IDog[]) {
        seSelected(_dogs.filter(dog => dog._selected));
        _setDogs(_dogs);
    }

    if (props.dogs.status === TStatus.Empty)
        dispatch(GetDogs());

    function onChangePage(event: unknown, page: number) {
        if (!props.dogs.pagination || page === props.dogs.pagination.page) return;
        const pagination = {...props.dogs.pagination, page};
        dispatch(GetDogs(pagination));
    }

    function onChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
        const rowPerPage = parseInt(event.target.value);
        if (!props.dogs.pagination || rowPerPage === props.dogs.pagination.rowPerPage) return;
        const pagination = {...props.dogs.pagination, rowPerPage};
        dispatch(GetDogs(pagination));
    }

    function onSort(sort: ISort) {
        console.log('on sort', sort);
        dispatch(GetDogs(props.dogs.pagination, sort));
    }

    function handleDelete() {
        // dispatch(DeleteDogs(selected))
        setOpenDelete(true);
    }

    return <Paper>
        <AppTable
            data={dogs}
            cells={['name', 'age', 'sex', 'status']}
            loading={loading}
            pagination={props.dogs.pagination}
            onSelect={selected => setDogs(selected)}
            onSort={onSort}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
        >
            <Toolbar variant={isSm ? 'dense' : 'regular'}>
                {selected.length
                    ? <Typography variant="subtitle1" style={{flex: '1 1 100%'}}>
                        {selected.length} dogs selected
                    </Typography>
                    : <Typography variant="h6" style={{flex: '1 1 100%'}}>
                        Dogs
                    </Typography>}

                <Fade in={selected.length === 1}>
                    <Tooltip title="Edit Dog">
                        <IconButton
                            onClick={() => history.push(ADMIN_DOG_EDIT_ROUTE.getPath(dogs.filter(i => i._selected)[0]))}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </Fade>
                <Fade in={!!selected.length}>
                    <Tooltip
                        title={`Delete Dog${selected.length > 1 ? 's' : ''}`}
                    >
                        <IconButton
                            onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </Fade>
                <Fade in={true}>
                    <Tooltip title="Add Dog">
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
            title={selected.length > 1 ? 'Delete Dogs' : 'Delete Dog'}
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
                        This action will delete {selected.length} dogs permanently.
                    </Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography>Delete details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{padding: '0 8px'}}>
                            <List aria-label="delete details" dense={true}>
                                {selected.map((dog, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={dog.name}/>
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
}

const mapStateToProps = (state: IAppState): IAdminDogs => ({
    dogs: state.dogs.dogs
});
export default connect(mapStateToProps)(AdminDogs);
