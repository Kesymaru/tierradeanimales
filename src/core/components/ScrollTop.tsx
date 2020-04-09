import React, { MouseEvent } from "@/core/components/node_modules/react";
import useScrollTrigger from "@/core/components/node_modules/@material-ui/core/useScrollTrigger";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@/core/components/node_modules/@material-ui/core/styles";
import Fab from "@/core/components/node_modules/@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@/core/components/node_modules/@material-ui/icons/KeyboardArrowUp";
import Zoom from "@/core/components/node_modules/@material-ui/core/Zoom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export interface IScrollTopProps {
  anchorId: string;
}

export function ScrollTop({ anchorId }: IScrollTopProps) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(`#${anchorId}`);

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

export default ScrollTop;
