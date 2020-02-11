import React, {FunctionComponent, ReactNode} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {PropTypes} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface AlertDialogProps {
    title: string;
    open: boolean;
    content?: string;
    onClose?: (reason: boolean) => void;
    okTitle?: string;
    okColor?: PropTypes.Color;
    okIcon?: ReactNode;
    cancelTitle?: string;
    cancelColor?: PropTypes.Color;
    cancelIcon?: ReactNode;
}

const AlertDialog: FunctionComponent<AlertDialogProps> = (props) => {
    return <Dialog
        open={props.open}
        TransitionComponent={Transition}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            {props.content
                ? <DialogContentText>{props.content}</DialogContentText>
                : props.children ? props.children : null}
        </DialogContent>
        <DialogActions style={{justifyContent: 'space-between'}}>
            <Button
                variant="outlined"
                color={props.cancelColor || "secondary"}
                onClick={() => props.onClose && props.onClose(false)}
                startIcon={props.cancelIcon ? props.cancelIcon : <CloseIcon/>}
            >
                {props.cancelTitle ? props.cancelTitle : 'Cancel'}
            </Button>
            <Button
                variant="outlined"
                color={props.okColor || "primary"}
                onClick={() => props.onClose && props.onClose(true)}
                startIcon={props.okIcon ? props.okIcon : <CheckIcon/>}
                autoFocus
            >
                {props.okTitle ? props.okTitle : 'OK'}
            </Button>
        </DialogActions>
    </Dialog>;
};

export default AlertDialog;
