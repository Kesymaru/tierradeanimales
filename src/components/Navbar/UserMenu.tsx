import React, {FunctionComponent, useState, MouseEvent} from "react";
import {Avatar, Button, Menu, MenuItem} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

import {AuthActions, IAuthState, IUserState, IAppState} from "../../store";
import {ACCOUNT_ROUTE, SIGN_IN_ROUTE} from "../../constants/routes";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

interface IUserMenuProps extends Pick<IUserState, 'user'>, Pick<IAuthState, 'logged'> {}
const UserMenu: FunctionComponent<IUserMenuProps> = ({logged, user}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (item: string | null) => (event: MouseEvent) => {
        setAnchorEl(null);

        switch (item) {
            case 'Profile':
                return history.push(ACCOUNT_ROUTE.path);

            case 'SignOut':
                return dispatch(AuthActions.SingOut());

            default:
                break;
        }
    };

    if (logged) {
        return (<>
            <Avatar
                style={{height: '40px', width: '40px', margin: '0 auto', cursor: 'pointer'}}
                onClick={handleClick}
            >
                {user && user.photoURL
                    ? <img
                        alt={user.displayName || "avatar"}
                        style={{height: '100%'}}
                        src={user.photoURL}/>
                    : <LockOutlinedIcon/>}
            </Avatar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose(null)}
            >
                <MenuItem onClick={handleClose('Profile')}>Profile</MenuItem>
                <MenuItem onClick={handleClose('SignOut')}>SignOut</MenuItem>
            </Menu>
        </>);
    } else if(location.pathname === SIGN_IN_ROUTE.path) return null;

    return (
        <Button
            color="inherit"
            onClick={() => history.push(SIGN_IN_ROUTE.path)}
        >
            SignIn
        </Button>
    );
};

const mapStateToProps = (state: IAppState): IUserMenuProps => ({
    logged: state.auth.logged,
    user: state.user.user,
});
export default connect(mapStateToProps)(UserMenu);
