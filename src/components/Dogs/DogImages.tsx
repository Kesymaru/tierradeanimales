import React, {ChangeEvent, FunctionComponent, useState, MouseEvent, useEffect} from "react";

import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from "@material-ui/icons/Delete";

import {IDog} from "../../store/dogs/dogs.types";
import {IFile, IFileFactory} from "../../store";

const useStyles = makeStyles((theme: Theme) => createStyles({
    selected: {
        border: '2px solid blue'
    },
    disabled: {
        opacity: .5
    },
}));

interface IDogImagesProps {
    dog: IDog;
    loading: boolean;
    onImagesChange: (images: IFile[]) => void;
    onSelectAvatar?: (image: IFile) => void;
}

const DogImages: FunctionComponent<IDogImagesProps> = ({dog, loading, onImagesChange, onSelectAvatar}) => {
    const classes = useStyles();
    const [images, setImages] = useState<IFile[]>(dog.images || []);
    const [avatar, setAvatar] = useState<IFile | null>(dog.avatar || null);

    useEffect(() => {
        setImages(dog.images || []);
        setAvatar(dog.avatar || null);

        if (onSelectAvatar && !avatar && images.length)
            onSelectAvatar(images[0]);
    }, [dog, loading]);

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target || !event.target.files) return;

        let _images: IFile[] = [...images];
        for (let i = 0; i < event.target.files.length; i++) {
            _images.push(IFileFactory({
                id: images.length + i,
                file: event.target.files[i],
            }));
        }

        setImages(_images);
        onImagesChange(_images);
    }

    function handleSetAvatar(event?: MouseEvent<HTMLButtonElement>) {
        let avatar: IFile | null = null;
        let _images = images.map(img => avatar = img.selected
            ? {...img, ...{avatar: true}}
            : {...img, ...{avatar: false}});
        if (onSelectAvatar && avatar) onSelectAvatar(avatar);
        setImages(_images);
    }

    function handleSelectImage(image: IFile) {
        return (event: MouseEvent) => {
            if(loading) return;
            let _images = images.map(item => item === image
                ? {...item, ...{selected: !image.selected}}
                : item);
            setImages(_images);
        }
    }

    function handleDelete(event: MouseEvent<HTMLButtonElement>) {
        let _images = images.map(img => img.selected
            ? {...img, ...{deleted: true, selected: false}}
            : img);
        setImages(_images);
        onImagesChange(_images);
    }

    return <Grid container spacing={2}>
        <Grid item xs={6}>
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
                    startIcon={<PublishIcon/>}
                >
                    Images
                </Button>
            </label>
        </Grid>
        <Grid item
              xs={6}
              style={{display: 'flex', flexDirection: 'row-reverse'}}
        >
            <Fade in={!!images.filter(i => i.selected).length}>
                <IconButton
                    color="secondary"
                    disabled={loading}
                    onClick={handleDelete}
                >
                    <DeleteIcon/>
                </IconButton>
            </Fade>
            <Fade in={images.filter(i => i.selected).length === 1}>
                <IconButton
                    color="primary"
                    disabled={loading}
                    onClick={handleSetAvatar}
                >
                    <AccountCircleIcon/>
                </IconButton>
            </Fade>
        </Grid>

        {images.length
            ? <Grid item xs={12}>
                <GridList cellHeight={150} cols={2}>
                    {images.map((img, index) => (
                        <Zoom
                            in={!img.deleted}
                            key={index}
                            style={{
                                transitionDelay: img.deleted ? `${index * 250}ms` : `0ms`
                            }}
                        >
                            <GridListTile
                                hidden={img.deleted}
                                cols={1}
                                className={loading
                                    ? classes.disabled
                                    : img.selected ? classes.selected : ''}
                                onClick={handleSelectImage(img)}
                            >
                                <img src={img.src} alt={img.name}/>
                                <GridListTileBar
                                    title={img.name}
                                    titlePosition="top"
                                    actionPosition="left"
                                    actionIcon={
                                        <IconButton
                                            color="primary"
                                            style={{
                                                color: img !== dog.avatar ? '#FFF' : undefined
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        </Zoom>
                    ))}
                </GridList>
            </Grid>
            : null}
    </Grid>;
};

export default DogImages;
