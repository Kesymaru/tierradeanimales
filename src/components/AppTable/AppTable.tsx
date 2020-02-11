import React, {MouseEvent, ReactElement, useEffect, useState} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import LinearProgress from "@material-ui/core/LinearProgress";

import AppTableHeader, {IAppTableHeaderProps} from "./AppTableHeader";
import AppTableFooter, {IAppTableFooterProps} from "./AppTableFooter";
import {IPagination} from "../../constants/firebase/database";

export interface IAppTableProps extends Omit<IAppTableHeaderProps, 'total' | 'selected' | 'cells'>, Omit<IAppTableFooterProps, 'pagination'> {
    data: any[];

    cells?: string[];
    loading?: boolean;
    pagination?: IPagination;

    onSelect?: (selected: any[]) => void;
    children?: ReactElement;
}

function AppTable(props: IAppTableProps) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [data, setData] = useState(props.data);
    const [cells, setCells] = useState<string[]>(_getCells());
    const [loading, setLoading] = useState<boolean>(!!props.loading);

    useEffect(() => {
        setData(props.data);
        setCells(_getCells());
        setLoading(!!props.loading);
    }, [props.data, props.loading, _getCells]);

    function _getCells(): string[] {
        if (props.cells) return props.cells;
        if (data.length) Object.keys(data[0]).filter(k => k !== 'id');
        return [];
    }

    function handleSelect(row: any) {
        return (event: MouseEvent<unknown>) => {
            row._selected = typeof row._selected === 'undefined' ? true : !row._selected;
            let _data = data.map(item => item.id === row.id ? {...row} : item);

            setData(_data);
            if (props.onSelect) props.onSelect(_data);
        }
    }

    function handleSelectAll(checked: boolean) {
        let _data = data.map(item => ({...item, _selected: checked}));
        setData(_data);
        if (props.onSelect) props.onSelect(_data);
    }

    return <Grow in={true}>
        <Paper>
            {props.children
                ? props.children
                : null}
            <TableContainer component={Paper}>
                <Table size={isSm ? 'small' : 'medium'}>
                    <AppTableHeader
                        selected={data.filter(i => i._selected).length}
                        total={data.length}
                        cells={cells}
                        onSelectAll={handleSelectAll}
                        sort={props.sort}
                        onSort={props.onSort}
                    />
                    <TableBody>
                        {data.length === 0
                            ? <TableRow>
                                <TableCell colSpan={cells.length + 1}>
                                    {loading
                                        ? <LinearProgress color="primary"/>
                                        : 'No Data'}
                                </TableCell>
                            </TableRow> : null}

                        {data.length
                            ? props.data.map((row, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={index}
                                    tabIndex={-1}
                                    selected={row._selected}
                                    onClick={handleSelect(row)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={row._selected}
                                            value={row._selected}
                                        />
                                    </TableCell>
                                    {cells.map((cell, index) => (
                                        <TableCell key={index}>
                                            {row[cell]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {props.pagination
                ? <AppTableFooter
                    pagination={props.pagination}
                    onChangePage={props.onChangePage}
                    onChangeRowsPerPage={props.onChangeRowsPerPage}
                /> : null}
        </Paper>
    </Grow>;
}

export default AppTable;
