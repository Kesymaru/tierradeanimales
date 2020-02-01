import React, {FunctionComponent, useState, MouseEvent, ChangeEvent} from "react";
import {useHistory} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grow from '@material-ui/core/Grow';
import Checkbox from "@material-ui/core/Checkbox";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from "@material-ui/core/TablePagination";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';

import {STUDENTS_EDIT_ROUTE} from "../../constants";

interface ISorting {
    key: string;
    order: "desc" | "asc" | undefined;
}

interface IPagination {
    count: number;
    rowPerPage: number;
    page: number;
}

interface IStudentsSorting {
    [key: string]: ISorting
}

const PAGINATION: IPagination = {
    count: 100,
    rowPerPage: 10,
    page: 1,
};

const SORTING: IStudentsSorting = {
    name: {key: 'name', order: 'desc'},
    group: {key: 'group', order: 'desc'},
};

interface IStudentsProps {
}

const Students: FunctionComponent<IStudentsProps> = () => {
    const history = useHistory();

    const [selected, setSelected] = useState<number>(0);
    const [sorting, setSorting] = useState<ISorting>(SORTING.name);
    const [pagination, setPagination] = useState<IPagination>(PAGINATION);

    function handleAdd(event: MouseEvent<HTMLButtonElement>) {
        history.push(STUDENTS_EDIT_ROUTE.getPath())
    }

    function handleDelete(event: MouseEvent<HTMLButtonElement>) {
        console.log('delete student');
    }

    function handleChangePage(event: unknown, page: number){
        console.log('handleChangePage', page);
        setPagination({...pagination, ...{page}});
    }

    function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>){
        console.log('handleChangeRowsPerPage', event.target.value);

        setPagination({...pagination, ...{
            page: 0,
            rowPerPage: parseInt(event.target.value, 10)
        }});
    }

    return <Grow in={true}>
        <Paper>
            <Toolbar>
                {selected > 0
                    ? (<Typography color="inherit" variant="subtitle1" style={{flexGrow: 1}}>
                        {selected} selected
                    </Typography>)
                    : (<Typography variant="h6" style={{flexGrow: 1}}>
                        Nutrition
                    </Typography>)}

                <Tooltip title="Add">
                    <IconButton aria-label="add" onClick={handleAdd}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>

                {selected > 0
                    ? (<Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>)
                    : (<Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>)}
            </Toolbar>
            <TableContainer component={Paper}>
                <Table aria-label="Students table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Checkbox/></TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sorting === SORTING.name}
                                    direction={sorting.order}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sorting === SORTING.group}
                                    direction={sorting.order}
                                >
                                    Group
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...(new Array(100))].map((row, index) => (
                            <TableRow key={index}>
                                <TableCell><Checkbox/></TableCell>
                                <TableCell>{`Test ${index}`}</TableCell>
                                <TableCell>{`Group ${index}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination.count}
                rowsPerPage={pagination.rowPerPage}
                page={pagination.page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    </Grow>;
};

export default Students;
