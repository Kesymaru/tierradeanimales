import React, {FunctionComponent} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface AlertDialogProps {
    title: string;
    open: boolean;
    content?: string;
    onClose?: (reason: boolean) => void;
    okTitle?: string;
    cancelTitle?: string;
}

const AlertDialog: FunctionComponent<AlertDialogProps> = (props) => <Dialog
    open={props.open}
    TransitionComponent={Transition}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {props.content
                ? props.content
                : (props.children && props.children)}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button
            color="primary"
            onClick={() => props.onClose && props.onClose(false)}
        >
            {props.cancelTitle ? props.cancelTitle : 'Cancel'}
        </Button>
        <Button
            color="primary"
            onClick={() => props.onClose && props.onClose(true)}
            autoFocus
        >
            {props.okTitle ? props.okTitle : 'OK'}
        </Button>
    </DialogActions>
</Dialog>;

export default AlertDialog;
