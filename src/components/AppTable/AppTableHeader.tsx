import React, {ChangeEvent, FunctionComponent, MouseEvent, useEffect, useState} from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export interface IAppTableSorting {
    sortBy: string;
    sortOrder: "desc" | "asc";
}

export interface IAppTableHeaderProps {
    selected: number;
    total: number;
    cells: string[];

    sorting?: IAppTableSorting;
    onSelectAll?: (checked: boolean) => void;
}

const AppTableHeader: FunctionComponent<IAppTableHeaderProps> = (props) => {
    const [sorting, setSorting] = useState<IAppTableSorting>(props.sorting || {sortBy: '', sortOrder: 'desc'});

    function handleSelectAll(event: ChangeEvent<HTMLInputElement>, checked: boolean) {
        if(props.onSelectAll) props.onSelectAll(checked);
    }

    function handleSort(cell: string) {
        return (event: MouseEvent<unknown>) => {
            console.log('sort by', cell);

            let sortOrder = sorting.sortOrder;
            if (cell === sorting.sortBy)
                sortOrder = sortOrder === "desc" ? "asc" : "desc";
            else sortOrder = "desc";

            setSorting({sortBy: cell, sortOrder});
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
                        active={cell === sorting.sortBy}
                        direction={sorting.sortOrder}
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




