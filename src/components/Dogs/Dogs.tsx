import React, {ChangeEvent, useState, MouseEvent} from "react";

import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AppTable, {IAppTableProps, IAppTableSelected, IAppTableToolbar} from "./AppTable";
import AlertDialog, {AlertDialogProps} from "../AlertDialog";

function Dogs() {
    const [selected, setSelected] = useState<any[]>([]);
    const [deleteAlert, setDeleteAlert] = useState<AlertDialogProps>({
        title: 'Delete Dogs',
        content: '',
        open: false,
    });
    const [data, setData] = useState<any[]>([
        {id: '1', name: 'Candy', age: 5},
        {id: '2', name: 'Blankita', age: 3},
        {id: '3', name: 'Sol', age: 1},
        {id: '4', name: 'Belen', age: 3},
        {id: '5', name: 'Camilo', age: 2},
        {id: '6', name: 'Kira', age: 2},
        {id: '7', name: 'Test 7', age: 2},
        {id: '8', name: 'Test 8', age: 2},
        {id: '9', name: 'Test 9', age: 2},
    ]);
    const [toolbar, _setToolbar] = useState<IAppTableToolbar[]>([
        {title: 'Delete', show: false, onClick: handleDelete, icon: DeleteIcon},
        {title: 'Add', show: true, onClick: handleAdd, icon: AddIcon}
    ]);
    const [tableProps, setTableProps] = useState<IAppTableProps>({
        title: 'Dogs',
        headers: ['Name', 'Age'],
        cells: ['name', 'age'],
        data,

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
        let _toolbar = toolbar.map(t => t.title === 'Delete'
            ? Object.assign(t, {show: !!selection.total})
            : t);

        _setToolbar(_toolbar);
    }

    function onSelectAll(selection: IAppTableSelected) {
        if(tableProps.toolbar) setToolbar(selection);
        setSelected(selection.selected);
    }

    function onSelect(row: any, selection: IAppTableSelected) {
        if(tableProps.toolbar) setToolbar(selection);
        setSelected(selection.selected);
    }

    function onChangePage(event: unknown, page: number) {
        // console.log('onChangePage', page)
    }

    function onChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
        // console.log('onChangeRowsPerPage', event)
    }

    function handleAdd(selection: IAppTableSelected) {
        console.log('ADD', selection);
        setSelected(selection.selected);
    }

    function handleDelete(selection: IAppTableSelected) {
        setDeleteAlert({
            ...deleteAlert, ...{
                open: true,
                onClose: deleteData(selection)
            }
        });
        setSelected(selection.selected);
    }

    function deleteData(selection: IAppTableSelected) {
        return (reason: boolean) => {
            console.log('selected to remove', reason, selection);
            setDeleteAlert({...deleteAlert, ...{open: false}});

            if(reason) console.log('remove data');
        }
    }

    return <Paper style={{marginTop: 65}}>
        <AppTable {...tableProps} />
        <AlertDialog
            onClose={() => setDeleteAlert({...deleteAlert, ...{open: false}})}
            {...deleteAlert}
        >
            <Typography>
                This action will delete {selected.length} items permanently.
            </Typography>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Delete details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List aria-label="delete details" dense={true}>
                        {selected.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </AlertDialog>
    </Paper>;
}

export default Dogs;
