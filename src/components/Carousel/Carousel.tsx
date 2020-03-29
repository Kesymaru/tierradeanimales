import Box from "@material-ui/core/Box";
import Container, { ContainerProps } from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Hidden from "@material-ui/core/Hidden";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Pagination from "@material-ui/lab/Pagination";
import React, { FunctionComponent, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface CarouselProps extends ContainerProps {
  showPagination?: boolean;
  //   children?: ReactElement;
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      padding: "0 10px"
    },
    pagination: {
      padding: "10px 0"
    }
  })
);

const Carousel: FunctionComponent<CarouselProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [index, _setIndex] = useState<number>(0);
  const [total] = useState<number>(React.Children.count(props.children));

  function setIndex(i: number) {
    if (i <= 0) return _setIndex(total - 1);
    if (i >= total) return _setIndex(0);
    _setIndex(i);
  }

  function handleChangeIndex(i: number) {
    _setIndex(i);
  }

  function handlePaginationChange(event: any, page: number) {
    _setIndex(page - 1);
  }

  return (
    <Container maxWidth={props.maxWidth ? props.maxWidth : false}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Hidden smDown>
          <Box display="flex" margin="0 16px">
            <Fab size="large" onClick={() => setIndex(index - 1)}>
              <ArrowBackIosIcon />
            </Fab>
          </Box>
        </Hidden>

        <Box display="flex" flex="1 1 auto" width="100%">
          <AutoPlaySwipeableViews
            index={index}
            interval={5000}
            style={{ width: "100%" }}
            onChangeIndex={handleChangeIndex}
          >
            {props.children ? props.children : null}
          </AutoPlaySwipeableViews>
        </Box>

        <Hidden smDown>
          <Box display="flex" margin="0 16px">
            <Fab size="large" onClick={() => setIndex(index + 1)}>
              <ArrowForwardIosIcon />
            </Fab>
          </Box>
        </Hidden>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="16px"
      >
        <Pagination
          color="primary"
          size={isMobile ? "large" : "small"}
          count={total}
          page={index + 1}
          hidePrevButton
          hideNextButton
          onChange={handlePaginationChange}
        />
      </Box>
    </Container>
  );
};

export default Carousel;
