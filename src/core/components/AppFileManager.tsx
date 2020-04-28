import React, {
  useState,
  useEffect,
  FunctionComponent,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  ComponentType,
} from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { useFirebase } from "react-redux-firebase";
import { v4 as uuid } from "uuid";
import get from "lodash/get";
import omit from "lodash/omit";
import isFunction from "lodash/isFunction";

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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import Grow from "@material-ui/core/Grow";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

import File from "../models/file";

interface Action {
  title: string;
  icon: ComponentType<any>;
  onClick: (file: File | null) => void;
}

export interface AppFileManagerProps {
  title?: string;
  accept: string | Array<string>;
  collection: string;
  setSubmit?: (handleSubmit: Function) => void;
  files?: Array<File>;
  onChange?: (files: Array<File>) => void;
  actions?: Array<Action>;
}

export const AppFileManager: FunctionComponent<AppFileManagerProps> = (
  props
) => {
  const firebase = useFirebase();
  const autoUpdate = !isFunction(props.setSubmit);
  const { t } = useTranslation();
  const [files, setFiles] = useState<Array<File>>(props.files || []);
  const [deleted, setDeleted] = useState<Array<File>>([]);
  const [selected, setSelected] = useState<Array<string>>([]);
  const [rename, setRename] = useState<object>({});
  const [menu, setMenu] = useState<{
    file: File | null;
    el: null | HTMLElement;
  }>({
    file: null,
    el: null,
  });
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: props.accept,
    noClick: true,
    onDrop,
  });

  useEffect(() => {
    if (isFunction(props.setSubmit)) {
      props.setSubmit(handleSubmit);
    }
    if (props.files) setFiles(props.files);
  }, [files, props]);

  function onDrop(acceptedFiles: Array<any>) {
    const _new = acceptedFiles.map((item) => ({
      id: uuid(),
      name: item.name,
      file: item,
      path: "",
      preview: URL.createObjectURL(item),
    }));
    if (autoUpdate) _new.map((file: File) => uploadFile(file));
    const _files = [...files, ..._new];
    setFiles(_files);
    if (isFunction(props.onChange)) props.onChange(_files);
  }

  async function uploadFile(file: File) {
    if (!file.file) return file;
    const path = `${props.collection}/${file.id}`;
    const snapshot = await firebase.storage().ref(path).put(file.file);
    // console.log("snapshot", snapshot);
    URL.revokeObjectURL(file.preview);
    return {
      id: file.id,
      name: file.name,
      path,
      preview: await snapshot.ref.getDownloadURL(),
    };
  }

  async function handleSubmit(): Promise<Array<File>> {
    let _uploaded: Array<File> = [];
    try {
      _uploaded = await Promise.all(
        files.map((file: File) => uploadFile(file))
      );
      // delete file on submit
      await Promise.all(deleted.map((file: File) => deleteFile(file)));
      setDeleted([]);
      setFiles(files);
    } catch (err) {
      console.error(err);
    }
    return _uploaded;
  }

  function handleOpenMenu(file: File) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      setMenu({
        file,
        el: event.currentTarget,
      });
    };
  }

  function handleCloseMenu() {
    setMenu({
      file: null,
      el: null,
    });
  }

  function handleSelect(file: File) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      if (selected.includes(file.id))
        setSelected(selected.filter((id) => id !== file.id));
      else setSelected([...selected, file.id]);
    };
  }

  async function deleteFile(file: File) {
    URL.revokeObjectURL(file.preview);
    if (file.file) return null;
    return await firebase.storage().ref().child(file.path).delete();
  }

  async function handleDeleteFile() {
    try {
      if (menu.file) {
        if (autoUpdate) await deleteFile(menu.file);
        else setDeleted([...deleted, menu.file]);
        setMenu({
          file: null,
          el: null,
        });
        const _files = files.filter(
          ({ id }) => id !== get(menu, "file.id", "")
        );
        setFiles(_files);
        if (isFunction(props.onChange)) props.onChange(_files);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteSelected() {
    const _deleted = files.filter((file) => selected.includes(file.id));
    const _files = files.filter((file) => !selected.includes(file.id));
    try {
      if (_deleted.length) {
        if (autoUpdate)
          await Promise.all(_deleted.map((file) => deleteFile(file)));
        else setDeleted([...deleted, ..._deleted]);
      }
    } catch (err) {
      console.error(err);
    }
    setSelected([]);
    setFiles(_files);
    if (isFunction(props.onChange)) props.onChange(_files);
  }

  function handleOpenRename(file: File | null) {
    if (!file) return false;
    if (get(rename, file.id, false)) setRename(omit(rename, file.id));
    else setRename({ ...rename, [`${file.id}`]: file.name });
    setMenu({
      el: null,
      file: null,
    });
  }

  function handleRenameChange(file: File) {
    return (event: ChangeEvent) => {
      const name = get(event, "target.value", file.name);
      if (name)
        setRename({
          ...rename,
          [`${file.id}`]: name,
        });
    };
  }

  function handleRenameKeyPress(file: File) {
    return (event: KeyboardEvent) => {
      const key = get(event, "key", false);
      if (key === "Enter") {
        event.preventDefault();
        handleRenameFile(file);
      }
    };
  }

  function handleRenameFile(file: File) {
    const name = get(rename, file.id, false);
    if (name) {
      const _files = files.map((f) => (f.id === file.id ? { ...f, name } : f));
      setFiles(_files);
      if (isFunction(props.onChange)) props.onChange(_files);
    }
    setRename(omit(rename, file.id));
  }

  return (
    <section {...getRootProps({ className: "dropzone" })}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input {...getInputProps()} />
          <Typography variant="body1" align="center">
            {props.title
              ? props.title
              : `Drag 'n' drop some files here, or click to select files`}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => open()}
              startIcon={<PublishIcon />}
              style={{ width: 150 }}
            >
              {t("app.upload")}
            </Button>
          </Box>
        </Grid>
        <Grow in={!!selected.length} mountOnEnter={true} unmountOnExit={true}>
          <Grid item xs={12}>
            <Toolbar color="primary">
              {selected.length ? (
                <>
                  <Typography variant="h6">
                    Selected: {selected.length}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleDeleteSelected}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Typography variant="h6">Title</Typography>
              )}
            </Toolbar>
          </Grid>
        </Grow>
        <Menu
          anchorEl={menu.el}
          keepMounted
          open={Boolean(menu.el)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleDeleteFile}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Delete</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleOpenRename(menu.file)}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Raname</Typography>
          </MenuItem>
          {props.actions
            ? props.actions.map((action: Action) => (
                <MenuItem
                  key={action.title}
                  onClick={() => {
                    action.onClick(menu.file);
                    handleCloseMenu();
                  }}
                >
                  <ListItemIcon>
                    {action.icon ? (
                      <action.icon fontSize="small" />
                    ) : (
                      <EditIcon fontSize="small" />
                    )}
                  </ListItemIcon>
                  <Typography variant="inherit">{action.title}</Typography>
                </MenuItem>
              ))
            : null}
        </Menu>
        {/* Files cards */}
        {files.map((file) => (
          <Zoom in={!!file}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card key={file.name} variant="outlined">
                <CardHeader
                  title={
                    get(rename, file.id, false) ? (
                      <TextField
                        variant="standard"
                        size="small"
                        margin="none"
                        defaultValue={file.name}
                        autoFocus={true}
                        fullWidth
                        onChange={handleRenameChange(file)}
                        onKeyPress={handleRenameKeyPress(file)}
                      />
                    ) : (
                      file.name
                    )
                  }
                  avatar={
                    get(rename, file.id, false) ? (
                      <IconButton
                        aria-label="settings"
                        size="small"
                        onClick={() => handleOpenRename(file)}
                      >
                        <CloseIcon />
                      </IconButton>
                    ) : (
                      <Checkbox
                        inputProps={{ "aria-label": "primary checkbox" }}
                        color="primary"
                        checked={selected.includes(file.id)}
                        onChange={handleSelect(file)}
                      />
                    )
                  }
                  action={
                    get(rename, file.id, false) ? (
                      <IconButton
                        aria-label="settings"
                        size="small"
                        onClick={() => handleRenameFile(file)}
                      >
                        <DoneIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="settings"
                        onClick={handleOpenMenu(file)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )
                  }
                />
                <CardMedia
                  image={file.preview}
                  title={file.name}
                  style={{ height: 150 }}
                />
              </Card>
            </Grid>
          </Zoom>
        ))}
      </Grid>
    </section>
  );
};

export default AppFileManager;
