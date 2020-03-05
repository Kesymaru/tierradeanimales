import React, {FunctionComponent, useState, MouseEvent} from "react";
import {Avatar, Button, Menu, MenuItem} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import IAppState from "../../store/app.types.js";
import IAuthState from "../../store/auth/auth.types";
import IUserState from "../../store/user/user.types";
import {SingOut} from "../../store/auth/auth.actions";
import {ACCOUNT_ROUTE, SIGN_IN_ROUTE} from "../Login/Login.routes";

interface IUserMenuProps extends Pick<IUserState, 'user'>, Pick<IAuthState, 'logged'> {
}

const UserMenu: FunctionComponent<IUserMenuProps> = ({logged, user}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function handleClick(event: MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose(item: string | null) {
        return (event: MouseEvent) => {
            setAnchorEl(null);
            switch (item) {
                case 'Profile':
                    return history.push(ACCOUNT_ROUTE.path);
                case 'SignOut':
                    return dispatch(SingOut());
                default:
                    break;
            }
        };
    }

    if (logged) {
        return <div>
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
                <MenuItem onClick={handleClose('Profile')}>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose('SignOut')}>
                    {t('signOut.title')}
                </MenuItem>
            </Menu>
        </div>;
    } else if (location.pathname === SIGN_IN_ROUTE.path) return null;

    return <Button
        color="inherit"
        onClick={() => history.push(SIGN_IN_ROUTE.path)}
    >
        {t('signIn.title')}
    </Button>;
};

const mapStateToProps = (state: IAppState): IUserMenuProps => ({
    logged: state.auth.logged,
    user: state.user.user,
});
export default connect(mapStateToProps)(UserMenu);
