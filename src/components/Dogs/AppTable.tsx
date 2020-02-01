import React, {ComponentType, useState, MouseEvent, ChangeEvent, useEffect} from "react";

import Grow from "@material-ui/core/Grow";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

export interface IAppTableToolbar {
    title: string;
    show: boolean;
    onClick: (selected: IAppTableSelected) => void;
    icon?: ComponentType<any>;
}

export interface IAppTableProps {
    title: string;
    headers: string[];
    cells: string[];
    data: Array<any>;

    toolbar?: IAppTableToolbar[];

    count: number;
    rowPerPage: number;
    page: number;

    sortBy: string;
    sortOrder: "desc" | "asc" | undefined;

    onSelectAll?: (selected: IAppTableSelected) => void;
    onSelect?: (row: any, selected: IAppTableSelected) => void;
    onChangePage: (event: unknown, newPage: number) => void;
    onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface IAppTableSelectChecked {
    [key: string]: boolean;
}

export interface IAppTableSelected {
    checked: IAppTableSelectChecked;
    selected: any[],
    total: number;
    all: boolean;
}

interface IAppTableSelectTotals extends Omit<IAppTableSelected, 'checked'>{
}

function AppTable(props: IAppTableProps) {
    const [selected, _setSelected] = useState<IAppTableSelected>(_initSelected(false));

    useEffect(() => {
        console.log('table use effect');

        setSelected(_initSelected(false));
    }, [props.data]);

    function _initSelected(value: boolean = false): IAppTableSelected {
        let checked = props.data.reduce((t, r) => Object.assign(t, {[`${r.id}`]: value}), {});

        return {checked, ..._getSelectedTotals(checked)}
    }

    function _getSelectedTotals(checked: IAppTableSelectChecked): IAppTableSelectTotals{
        let keys = Object.keys(checked);
        let selected: any[] = keys.filter(k => checked[k])
            .map(k => props.data.find(item => item.id === k));

        return {
            selected,
            total: selected.length,
            all: selected.length === props.data.length
        };
    }

    function setSelected(_selected: IAppTableSelected): IAppTableSelected {
        let value = {
            ..._selected,
            ..._getSelectedTotals(_selected.checked)
        };
        _setSelected(value);

        return value;
    }

    function handleSelectAll(event: ChangeEvent<HTMLInputElement>, checked: boolean) {
        let _selected = {...selected};
        _selected.checked = Object.keys(_selected.checked)
            .reduce((t, k) => Object.assign(t, {[`${k}`]: !_selected.all}), {});

        _selected = setSelected(_selected);
        if(props.onSelectAll) props.onSelectAll(_selected);
    }

    function handleRowSelect(row: any, index: number) {
        return (event: MouseEvent<unknown>) => {
            let _selected = {...selected};
            _selected.checked[row.id] = !_selected.checked[row.id];

            _selected = setSelected(_selected);
            if(props.onSelect) props.onSelect(row, _selected);
        }
    }

    function handleSort(header: string) {
        return (event: MouseEvent<unknown>) => {
            console.log('sort by', header);
        }
    }

    function handleToolbar(toolbar: IAppTableToolbar) {
        return (event: MouseEvent) => {
            if(toolbar.onClick) toolbar.onClick(selected);
        }
    }

    return <Grow in={props.data.length > 0}>
        <Paper>
            <Toolbar>
                {selected.total > 0
                    ? (<Typography color="inherit" variant="subtitle1" style={{flexGrow: 1}}>
                        {selected.total} selected
                    </Typography>)
                    : (<Typography variant="h6" style={{flexGrow: 1}}>
                        {props.title}
                    </Typography>)}

                {props.toolbar
                    ? props.toolbar.map((toolbar, index) => (
                        <Fade in={toolbar.show} key={index}>
                            <Tooltip title={toolbar.title}>
                                <IconButton onClick={handleToolbar(toolbar)}>
                                    {toolbar.icon ? (<toolbar.icon/>) : <AddIcon/>}
                                </IconButton>
                            </Tooltip>
                        </Fade>))
                    : null}
            </Toolbar>
            <TableContainer component={Paper}>
                <Table
                    aria-labelledby={props.title}
                    aria-label={props.title}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.total > 0 && !selected.all}
                                    checked={selected.all}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            {props.headers.map((header, index) => (
                                <TableCell key={index}>
                                    <TableSortLabel
                                        active={header === props.sortBy}
                                        direction={props.sortOrder}
                                        onClick={handleSort(header)}
                                    >
                                        {header}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row, index) => (
                            <TableRow
                                hover
                                role="checkbox"
                                key={index}
                                aria-checked={selected.checked[row.id]}
                                tabIndex={-1}
                                selected={selected.checked[row.id]}
                                onClick={handleRowSelect(row, index)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selected.checked[row.id]}
                                        value={selected.checked[row.id]}
                                    />
                                </TableCell>
                                {props.cells.map((cell, index) => (
                                    <TableCell key={index}>
                                        {row[cell]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.count}
                rowsPerPage={props.rowPerPage}
                page={props.page}
                onChangePage={props.onChangePage}
                onChangeRowsPerPage={props.onChangeRowsPerPage}
            />
        </Paper>
    </Grow>;
}

export default AppTable;
