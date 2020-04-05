import React, {FunctionComponent, useState} from "react";
import {useTranslation} from "react-i18next";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";

import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

enum Language {
    English = 'en',
    Español = 'es',
}

const LanguageMenu: FunctionComponent<{}> = () => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState<Language>(Language.Español);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    };

    function changeLanguage(lng: Language) {
        return (event: React.MouseEvent<HTMLLIElement>) => {
            i18n.changeLanguage(lng);
            setLanguage(lng);
            setAnchorEl(null);
        }
    }

    return <>
        <Tooltip title={t('app.changeLanguage')}>
            <Button
                aria-controls="language-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                startIcon={<TranslateIcon/>}
                endIcon={<ExpandMoreIcon/>}
                onClick={handleOpen}
            >
                {Language.English === language
                    ? 'English'
                    : 'Español'}
            </Button>
        </Tooltip>
        <Menu
            id="language-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem
                selected={Language.English === language}
                onClick={changeLanguage(Language.English)}
            >
                English
            </MenuItem>
            <MenuItem
                selected={Language.Español === language}
                onClick={changeLanguage(Language.Español)}
            >
                Español
            </MenuItem>
        </Menu>
    </>;
};

export default LanguageMenu;
