import React, {ChangeEvent, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from "@material-ui/core/LinearProgress";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';

import AppTable, {IAppTableProps, IAppTableSelected, IAppTableToolbar} from "./AppTable";
import AlertDialog, {AlertDialogProps} from "../AlertDialog";
import {DOG_EDIT_ROUTE} from "../../constants";
import {IAppState, TStatus} from "../../store";
import {IDogState} from "../../store/dogs/dogs.types";
import DogsActions from "../../store/dogs/dogs.actions";

interface IDogProps extends Pick<IDogState, 'dogs'> {
}

function Dogs({dogs}: IDogProps) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [selected, setSelected] = useState<any[]>([]);
    const [deleteAlertProps, setDeleteAlertProps] = useState<AlertDialogProps>({
        title: 'Delete Dogs',
        content: '',
        open: false,
    });
    const [toolbar, _setToolbar] = useState<IAppTableToolbar[]>([
        {title: 'Edit', show: false, onClick: handleEdit, icon: EditIcon},
        {title: 'Delete', show: false, onClick: handleDelete, icon: DeleteIcon},
        {title: 'Add', show: true, onClick: handleAdd, icon: AddIcon}
    ]);
    const [tableProps, setTableProps] = useState<IAppTableProps>({
        title: 'Dogs',
        headers: ['Name', 'Age'],
        cells: ['name', 'age'],
        data: null,
        toolbar,
        count: 100,
        rowPerPage: 10,
        page: 1,
        sortBy: '',
        sortOrder: 'asc',
        onSelectAll,
        onSelect,
        onChangePage,
        onChangeRowsPerPage
    });

    function setToolbar(selection: IAppTableSelected) {
        let _toolbar = toolbar.map(t => {
            switch (t.title) {
                case 'Edit':
                    return Object.assign(t, {show: 1 === selection.total});
                case 'Delete':
                    return Object.assign(t, {show: !!selection.total});
                default:
                    return t;
            }
        });
        _setToolbar(_toolbar);
    }

    function onSelectAll(selection: IAppTableSelected) {
        if (tableProps.toolbar) setToolbar(selection);
        setSelected(selection.selected);
    }

    function onSelect(row: any, selection: IAppTableSelected) {
        if (tableProps.toolbar) setToolbar(selection);
        setSelected(selection.selected);
    }

    function onChangePage(event: unknown, page: number) {
        // console.log('onChangePage', page)
    }

    function onChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
        // console.log('onChangeRowsPerPage', event)
    }

    function handleAdd(selection: IAppTableSelected) {
        history.push(DOG_EDIT_ROUTE.getPath())
    }

    function handleDelete(selection: IAppTableSelected) {
        setDeleteAlertProps({
            ...deleteAlertProps, ...{
                open: true,
                onClose: deleteData(selection)
            }
        });
        setSelected(selection.selected);
    }

    function deleteData(selection: IAppTableSelected) {
        return (reason: boolean) => {
            console.log('selected to remove', reason, selection);
            setDeleteAlertProps({...deleteAlertProps, ...{open: false}});

            if (reason) console.log('remove data');
        }
    }

    function handleEdit(selection: IAppTableSelected) {
        console.log('handle edit', selection);
        // history.push(DOG_EDIT_ROUTE.getPath(selection.selected[0]));
    }

    if (dogs.status === TStatus.Fetching)
        return <Paper>
            <Typography>Loading...</Typography>
            <LinearProgress color="primary"/>
        </Paper>;
    if (dogs.status === TStatus.Empty)
        dispatch(DogsActions.GetAll());
    if (dogs.status === TStatus.Loaded && tableProps.data === null)
        setTableProps({...tableProps, ...{data: dogs.data}});

    return <Paper>
        <AppTable {...tableProps} />
        <AlertDialog
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
                                <ListItem key={index}>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            ))}
                        </List> : null}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </AlertDialog>
    </Paper>;
}

const mapStateToProps = (state: IAppState): IDogProps => ({
    dogs: state.dogs.dogs
});
export default connect(mapStateToProps)(Dogs);
