import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useRef,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { AppState, Copyright } from "@core";
import { User, INIT_USER } from "@app/user";

export const Account: FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const [touched, setTouched] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(INIT_USER);
  const [password, setPassword] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || !touched) return;
    // dispatch(UpdateProfile(user));
    // if (password.length) dispatch(UpdatePassword(password));
  }

  function handleUserChange(key: keyof User) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [`${key}`]: event.target.value } as User);
      setTouched(true);
    };
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setTouched(true);
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      !event.target.files[0]
    )
      return;
    // const avatar: IFile = Storage.newFile(event.target.files[0]);
    // setUser({ ...user, avatar } as IUser);
    // setTouched(true);
  }

  function handlerReset(event: FormEvent) {
    setUser(INIT_USER);
    setTouched(false);
  }

  function clickFileUpload() {
    if (fileInput && fileInput.current) fileInput.current.click();
  }

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit} onReset={handlerReset}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar"
              type="file"
              ref={fileInput}
              onChange={handleAvatarChange}
            />
            <Zoom in={true} style={{ transitionDelay: "250ms" }}>
              <Avatar
                alt="Profile Picture"
                style={{
                  height: 100,
                  width: 100,
                  margin: "0 auto",
                }}
                onClick={clickFileUpload}
              >
                <AccountCircleIcon />
              </Avatar>
            </Zoom>
          </Grid>
          <Grid item xs={12}>
            <Fade in={true}>
              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
              >
                {user ? user.firstName : ""}
              </Typography>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user ? user.email : ""}
              onChange={handleUserChange("email")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="Name"
              name="Name"
              variant="outlined"
              required
              fullWidth
              id="Name"
              label="Name"
              autoFocus
              value={user ? user.firstName : ""}
              onChange={handleUserChange("firstName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Change Password"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              type="reset"
              color="secondary"
              style={{ width: "100%" }}
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} container justify="flex-end">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={!touched}
              style={{ width: "100%" }}
              startIcon={<SaveIcon />}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
      <Copyright />
    </Container>
  );
};

export default Account;
