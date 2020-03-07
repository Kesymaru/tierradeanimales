import React, {FunctionComponent, SyntheticEvent} from "react";
import {connect, useDispatch} from "react-redux";
import {Snackbar, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import IAppState from "../store/app.types";
import ISystemState, {INotification} from "../store/system/system.types";
import {CloseNotification} from "../store/system/system.actions";

interface INotifyProps extends Pick<ISystemState, 'notifications'> {
}

const Notify: FunctionComponent<INotifyProps> = ({notifications}) => {
    const dispatch = useDispatch();

    const handleClose = (item: INotification) => (event: SyntheticEvent, reason?: string) => {
        dispatch(CloseNotification(item));
    };

    return (<>
        {notifications
            .filter(({open}) => open)
            .map((item, index) => (
                <Snackbar
                    key={index}
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
            ))}
    </>);
};

const mapStateToProps = (state: IAppState): INotifyProps => ({
    notifications: state.system.notifications,
});
export default connect(mapStateToProps)(Notify);

