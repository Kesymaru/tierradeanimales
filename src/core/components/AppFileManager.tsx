import React, {
  useState,
  useEffect,
  FunctionComponent,
  MouseEvent,
} from "react";
import { useDropzone } from "react-dropzone";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import PublishIcon from "@material-ui/icons/Publish";

export interface AppFileManagerProps {
  files?: Array<any>;
}

export const AppFileManager: FunctionComponent<{}> = (props) => {
  const [files, setFiles] = useState<Array<any>>([]);
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const [file, setFile] = useState<any | null>(null);
  const [selected, setSelected] = useState<boolean>(true);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  function handleOpenMenu(file: any) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      setFile(file);
      setMenuEl(event.currentTarget);
    };
  }

  function handleCloseMenu() {
    setFile(null);
    setMenuEl(null);
  }

  console.log("files", files);

  const cards = files.map((item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card key={item.name} variant="outlined">
        <CardHeader
          title={item.name}
          avatar={
            <Checkbox
              checked={selected}
              inputProps={{ "aria-label": "primary checkbox" }}
              color="primary"
            />
          }
          action={
            <IconButton aria-label="settings" onClick={handleOpenMenu(item)}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardMedia
          image={item.preview}
          title={item.name}
          style={{ height: 150 }}
        />
      </Card>
    </Grid>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section {...getRootProps({ className: "dropzone" })}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input {...getInputProps()} />
          <Typography variant="body1" align="center">
            Drag 'n' drop some files here, or click to select files
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => open()}
              startIcon={<PublishIcon />}
              style={{ width: 150 }}
            >
              Upload
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Menu
          anchorEl={menuEl}
          keepMounted
          open={Boolean(menuEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => console.log("delete", file)}>
            Delete
          </MenuItem>
        </Menu>
        {cards}
      </Grid>
    </section>
  );
};

export default AppFileManager;
