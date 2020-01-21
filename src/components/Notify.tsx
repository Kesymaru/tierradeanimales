import React, {FunctionComponent, SyntheticEvent} from "react";
import {connect, useDispatch} from "react-redux";
import {Snackbar, Button, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import {INotification, ISystemState, SystemActions, TAppState} from "../store";
import {strict} from "assert";

interface INotifyProps extends Pick<ISystemState, 'notifications'> {
}

const Notify: FunctionComponent<INotifyProps> = ({notifications}) => {
    console.log('notifications', notifications);

    const dispatch = useDispatch();

    const handleClose = (item: INotification) => (event: SyntheticEvent, reason?: string) => {
        dispatch(SystemActions.CloseNotification(item));
    };

    return (<>
        {notifications.map(item => (
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={item.open}
                autoHideDuration={item.duration}
                onClose={handleClose(item)}
                message={item.message}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose(item)}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
            />
        ))
        }
    </>);
};

const mapStateToProps = (state: TAppState): INotifyProps => ({
    notifications: state.system.notifications,
});
export default connect(mapStateToProps)(Notify);

