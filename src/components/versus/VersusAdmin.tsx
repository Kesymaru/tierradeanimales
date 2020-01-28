import React, {FunctionComponent, MouseEvent} from "react";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import {IAppState, IUserState, IVersus, IVersusState, TStatus} from "../../store";
import VersusActions from "../../store/versus/versus.actions";
import Breadcrumbs from "../Navbar/Breadcrumbs";
import {VERSUS_EDIT_ADMIN_ROUTE} from "../../constants";

interface IVersusAdminProps extends Pick<IVersusState, 'all'>,
    Pick<IUserState, 'user'> {
}

const VersusAdmin: FunctionComponent<IVersusAdminProps> = ({all, user}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    console.log('admin versus');

    function handleRowClick(item: IVersus) {
        return (e: MouseEvent<HTMLTableRowElement>) =>
            VERSUS_EDIT_ADMIN_ROUTE.getPath && history.push(VERSUS_EDIT_ADMIN_ROUTE.getPath(item));
    }

    if (all.status === TStatus.Empty && user) dispatch(VersusActions.RequestAll(user.uid));
    if (all.status === TStatus.Fetching) return <LinearProgress color="primary"/>;

    return <Container maxWidth="sm">
        <Breadcrumbs/>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Participants</TableCell>
                        <TableCell align="right">Rounds</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {all.data.map(item => (
                        <TableRow key={item.id} onClick={handleRowClick(item)}>
                            <TableCell component="th" scope="row">{item.name}</TableCell>
                            <TableCell align="right">{item.participants.length}</TableCell>
                            <TableCell align="right">{item.rounds}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </Container>;
};

const mapStateToProps = (state: IAppState): IVersusAdminProps => ({
    all: state.versus.all,
    user: state.user.user,
});
export default connect(mapStateToProps)(VersusAdmin);
