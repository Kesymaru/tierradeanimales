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
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';

import AppTable from "../AppTable/AppTable";
import {ADMIN_DOG_EDIT_ROUTE} from "../../constants";
import {IAppState, TStatus} from "../../store";
import {IDog, IDogState} from "../../store/dogs/dogs.types";
import DogsActions from "../../store/dogs/dogs.actions";
import {IAppTableFooterProps} from "../AppTable/AppTableFooter";
import {IFilter, ISort} from "../../constants/firebase/database";

const DOGS_FILTER: IFilter[] = [
    {
        name: 'Name',
        key: 'name',
        condition: '==',
        value: ''
    },
    {
        name: 'Age',
        key: 'age',
        condition: '==',
        value: ''
    }
];

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
        dispatch(DogsActions.All());

    function onChangePage(event: unknown, page: number) {
        if (page === props.dogs.pagination.page) return;
        const pagination = {...props.dogs.pagination, page};
        dispatch(DogsActions.All(pagination));
    }

    function onChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
        const rowPerPage = parseInt(event.target.value);
        if (rowPerPage === props.dogs.pagination.rowPerPage) return;
        const pagination = {...props.dogs.pagination, rowPerPage};
        dispatch(DogsActions.All(pagination));
    }

    function onSort(sort: ISort) {
        const pagination = {...props.dogs.pagination, sort};
        console.log('sort', sort, pagination);
        dispatch(DogsActions.All(pagination));
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
                        title={`Delete Dog${selected.length ? 's' : ''}`}
                    >
                        <IconButton
                            onClick={() => dispatch(DogsActions.Delete(selected[0]))}>
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
                <Fade in={true}>
                    <Tooltip title="Filter">
                        <IconButton>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                </Fade>
            </Toolbar>
        </AppTable>

        {/*<AlertDialog
            onClose={() => setDeleteAlertProps({...deleteAlertProps, ...{open: false}})}
            {...deleteAlertProps}
        >
            <Typography>
                This action will delete {selected.length} items permanently.
            </Typography>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Delete details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {selected.length
                        ? <List aria-label="delete details" dense={true}>
                            {selected.map((item, index) => (
                                <ListItem sortBy={index}>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            ))}
                        </List> : null}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </AlertDialog>*/}
    </Paper>;
}

const mapStateToProps = (state: IAppState): IAdminDogs => ({
    dogs: state.dogs.dogs
});
export default connect(mapStateToProps)(AdminDogs);
