import React, {ChangeEvent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';

import AppTable from "../AppTable/AppTable";

import {DOG_EDIT_ROUTE} from "../../constants";
import {IAppState, TStatus} from "../../store";
import {IDog, IDogState} from "../../store/dogs/dogs.types";
import DogsActions from "../../store/dogs/dogs.actions";
import {IAppTableFooterProps} from "../AppTable/AppTableFooter";

interface IDogProps extends Pick<IDogState, 'dogs'> {
}

function Dogs(props: IDogProps) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [dogs, _setDogs] = useState<IDog[]>(props.dogs.data);
    const [selected, seSelected] = useState<IDog[]>([]);
    const [loading, setLoading] = useState<boolean>(_getLoading());
    // const [pagination, setPagination] = useState<IAppTableFooterProps>(_getPagination());

    useEffect(() => {
        setDogs(props.dogs.data);
        setLoading(_getLoading());
        // setPagination(_getPagination());
    }, [props.dogs]);

    function _getLoading(): boolean {
        return props.dogs.status === TStatus.Fetching
    }

    /*function _getPagination(): IAppTableFooterProps {
        return {
            count: props.dogs.data.length,
            rowPerPage: 10,
            page: 1,
            onChangePage,
            onChangeRowsPerPage,
        };
    }*/

    function setDogs(_dogs: IDog[]) {
        seSelected(_dogs.filter(dog => dog._selected));
        _setDogs(_dogs);
    }

    if (props.dogs.status === TStatus.Empty)
        dispatch(DogsActions.All());

    function onChangePage(event: unknown, page: number) {
        console.log('onChangePage', page)
    }

    function onChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
        console.log('onChangeRowsPerPage', event)
    }

    return <Paper>
        <AppTable
            data={dogs}
            cells={['name', 'age', 'sex', 'status']}
            loading={loading}
            onSelect={selected => setDogs(selected)}
        >
            <Toolbar>
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
                            onClick={() => history.push(DOG_EDIT_ROUTE.getPath(dogs.filter(i => i._selected)[0]))}
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
                            onClick={() => history.push(DOG_EDIT_ROUTE.getPath())}
                        >
                            <AddIcon/>
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

const mapStateToProps = (state: IAppState): IDogProps => ({
    dogs: state.dogs.dogs
});
export default connect(mapStateToProps)(Dogs);
