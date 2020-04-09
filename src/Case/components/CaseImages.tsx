import React, {
  ChangeEvent,
  FunctionComponent,
  useState,
  MouseEvent,
  useEffect,
} from "react";

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from "@material-ui/icons/Delete";

import { Case } from "@app/case/models";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      border: "2px solid blue",
    },
    disabled: {
      opacity: 0.5,
    },
  })
);

interface CaseImagesProps {
  case: Case;
  loading: boolean;
  // onImagesChange: (images: IFile[]) => void;
  // onSelectAvatar?: (image: IFile | undefined) => void;
}

const CaseImages: FunctionComponent<CaseImagesProps> = (props) => {
  return <>Here goes the case image component</>;
  /* const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isXl = useMediaQuery(theme.breakpoints.down("xl"));
  const [images, setImages] = useState<IFile[]>(dog.images || []);
  const [avatar, setAvatar] = useState<IFile | undefined>(dog.avatar);
  const [cols, setCols] = useState<number>(_getGridSize());

  useEffect(() => {
    setImages(dog.images || []);
    setAvatar(dog.avatar);
    setCols(_getGridSize());

    if (
      onSelectAvatar &&
      !avatar &&
      images.filter((img) => !img._deleted).length
    )
      onSelectAvatar(images[0]);
  }, [dog, loading, isSm, isMd, isLg, isXl]);

  function _getGridSize(): number {
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 5;
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target || !event.target.files) return;

    let _images: IFile[] = [...images];
    for (let i = 0; i < event.target.files.length; i++) {
      _images.push(Storage.newFile(event.target.files[i]));
    }

    setImages(_images);
    onImagesChange(_images);
  }

  function handleSetAvatar(event?: MouseEvent<HTMLButtonElement>) {
    let avatar: IFile | null = null;
    let _images = images.filter((img) => img._selected);
    if (_images.length) avatar = _images[0];
    if (onSelectAvatar && avatar) onSelectAvatar(avatar);
  }

  function handleSelectImage(image: IFile) {
    return (event: MouseEvent) => {
      if (loading) return;
      let _images = images.map((item) =>
        item === image ? { ...item, _selected: !image._selected } : item
      );
      setImages(_images);
    };
  }

  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    let _images = images.map((img) =>
      img._selected ? { ...img, _deleted: true, _selected: false } : img
    );
    setImages(_images);
    onImagesChange(_images);

    if (
      _images.filter((img) => img._deleted).length === _images.length &&
      onSelectAvatar
    ) {
      setAvatar(undefined);
      onSelectAvatar(undefined);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <input
          accept="image/*"
          id="dog-images"
          multiple
          hidden
          type="file"
          disabled={loading}
          onChange={handleImageChange}
        />
        <label htmlFor="dog-images">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            disabled={loading}
            startIcon={<PublishIcon />}
          >
            Images
          </Button>
        </label>
      </Grid>
      <Grid
        item
        xs={6}
        md={8}
        style={{ display: "flex", flexDirection: "row-reverse" }}
      >
        <Fade in={!!images.filter((i) => i._selected && !i._deleted).length}>
          <IconButton
            color="secondary"
            disabled={loading}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Fade>
        <Fade
          in={images.filter((i) => i._selected && !i._deleted).length === 1}
        >
          <IconButton
            color="primary"
            disabled={loading}
            onClick={handleSetAvatar}
          >
            <AccountCircleIcon />
          </IconButton>
        </Fade>
      </Grid>

      {images.length ? (
        <Grid item xs={12}>
          <GridList cellHeight={150} cols={cols}>
            {images.map((img, index) => (
              <Zoom
                in={!img._deleted}
                key={index}
                style={{
                  transitionDelay: img._deleted ? `${index * 250}ms` : `0ms`,
                }}
              >
                <GridListTile
                  hidden={img._deleted}
                  cols={1}
                  className={
                    loading
                      ? classes.disabled
                      : img._selected
                      ? classes.selected
                      : ""
                  }
                  onClick={handleSelectImage(img)}
                >
                  <img src={img.src} alt={img.name} />
                  <GridListTileBar
                    title={img.name}
                    titlePosition="top"
                    actionPosition="left"
                    actionIcon={
                      <IconButton
                        color="primary"
                        style={{
                          color: img !== dog.avatar ? "#FFF" : undefined,
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              </Zoom>
            ))}
          </GridList>
        </Grid>
      ) : null}
    </Grid>
  ); */
};

export default CaseImages;
