import React, {ChangeEvent, FunctionComponent, MouseEvent, useState} from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {ISort} from "../../constants/firebase/database";

export interface IAppTableHeaderProps {
    selected: number;
    total: number;
    cells: string[];

    sort?: ISort;
    onSort?: (sort: ISort) => void;
    onSelectAll?: (checked: boolean) => void;
}

const AppTableHeader: FunctionComponent<IAppTableHeaderProps> = (props) => {
    const [sort, setSort] = useState<ISort>(props.sort || {key: '', order: 'desc'});

    function handleSelectAll(event: ChangeEvent<HTMLInputElement>, checked: boolean) {
        if(props.onSelectAll) props.onSelectAll(checked);
    }

    function handleSort(cell: string) {
        return (event: MouseEvent<unknown>) => {
            let order = sort.order;
            let key = cell;
            if (cell === sort.key)
                order = order === "desc" ? "asc" : "desc";
            else order = "desc";
            const _sort = {key, order};
            setSort(_sort);
            if(props.onSort) props.onSort(_sort);
        }
    }

    return <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={props.selected > 0 && props.selected < props.total}
                    checked={props.selected === props.total}
                    onChange={handleSelectAll}
                />
            </TableCell>
            {props.cells.map((cell, index) => (
                <TableCell key={index}>
                    <TableSortLabel
                        active={cell === sort.key}
                        direction={sort.order}
                        onClick={handleSort(cell)}
                    >
                        {cell}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>;
};

export default AppTableHeader;




