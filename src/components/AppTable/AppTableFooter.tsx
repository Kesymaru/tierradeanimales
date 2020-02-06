import React, {ChangeEvent, FunctionComponent} from "react";

import TablePagination from "@material-ui/core/TablePagination";

export interface IAppTableFooterProps {
    count: number;
    rowPerPage: number;
    page: number;

    rowsPerPageOptions?: number[];
    onChangePage: (event: unknown, page: number) => void;
    onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AppTableFooter: FunctionComponent<IAppTableFooterProps> = (props) =>
    <TablePagination
        rowsPerPageOptions={props.rowsPerPageOptions || [5, 10, 25]}
        component="div"
        count={props.count}
        rowsPerPage={props.rowPerPage}
        page={props.page}
        onChangePage={props.onChangePage}
        onChangeRowsPerPage={props.onChangeRowsPerPage}
    />;

export default AppTableFooter;
