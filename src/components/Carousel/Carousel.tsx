import React, { FunctionComponent, useState, ReactElement } from "react";

import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

import Zoom from "@material-ui/core/Zoom";
import Container, { ContainerProps } from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Pagination from "@material-ui/lab/Pagination";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

interface CarouselProps extends ContainerProps {
  showPagination?: boolean;
  //   children?: ReactElement;
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel: FunctionComponent<CarouselProps> = props => {
  const [index, _setIndex] = useState<number>(0);
  const [total, setTotal] = useState<number>(
    React.Children.count(props.children)
  );

  function setIndex(i: number) {
    if (i <= 0) return _setIndex(total);
    if (i >= total) return _setIndex(1);
    _setIndex(i);
  }

  function handleChangeIndex(i: number) {
    _setIndex(i);
  }

  function handlePaginationChange(event: any, page: number) {
    console.log("page", page);
    _setIndex(page - 1);
  }

  return (
    <Container
      maxWidth={props.maxWidth ? props.maxWidth : false}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box display="flex">
          <Fab size="small" onClick={() => setIndex(index - 1)}>
            <ArrowBackIosIcon />
          </Fab>
        </Box>
        <Box display="flex" flex="1 1 auto">
          <AutoPlaySwipeableViews
            index={index}
            interval={5000}
            onChangeIndex={handleChangeIndex}
          >
            {props.children ? props.children : null}
          </AutoPlaySwipeableViews>
        </Box>
        <Box display="flex">
          <Fab size="small" onClick={() => setIndex(index + 1)}>
            <ArrowForwardIosIcon />
          </Fab>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Pagination
          color="primary"
          size="small"
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