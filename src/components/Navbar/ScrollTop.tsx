import React, {MouseEvent} from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

interface IScrollTopProps {
    anchorId: string;
}

function ScrollTop({anchorId}: IScrollTopProps) {
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    function handleClick(event: MouseEvent<HTMLDivElement>) {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document)
            .querySelector(`#${anchorId}`);

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }

    return <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon/>
            </Fab>
        </div>
    </Zoom>;
}

export default ScrollTop;
