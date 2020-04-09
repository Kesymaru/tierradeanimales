import React, {
  FunctionComponent,
  useState,
} from "@/core/components/node_modules/react";
import { useTranslation } from "@/core/components/node_modules/react-i18next";
import useTheme from "@/core/components/node_modules/@material-ui/core/styles/useTheme";
import useMediaQuery from "@/core/components/node_modules/@material-ui/core/useMediaQuery";

import Button from "@/core/components/node_modules/@material-ui/core/Button";
import Menu from "@/core/components/node_modules/@material-ui/core/Menu";
import MenuItem from "@/core/components/node_modules/@material-ui/core/MenuItem";
import Tooltip from "@/core/components/node_modules/@material-ui/core/Tooltip";

import TranslateIcon from "@/core/components/node_modules/@material-ui/icons/Translate";
import ExpandMoreIcon from "@/core/components/node_modules/@material-ui/icons/ExpandMore";

enum Language {
  English = "en",
  Español = "es",
}

const LanguageMenu: FunctionComponent<{}> = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>(Language.Español);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function changeLanguage(lng: Language) {
    return (event: React.MouseEvent<HTMLLIElement>) => {
      i18n.changeLanguage(lng);
      setLanguage(lng);
      setAnchorEl(null);
    };
  }

  return (
    <>
      <Tooltip title={t("app.changeLanguage")}>
        <Button
          aria-controls="language-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          startIcon={<TranslateIcon />}
          endIcon={<ExpandMoreIcon />}
          onClick={handleOpen}
        >
          {Language.English === language
            ? isMobile
              ? "En"
              : "English"
            : isMobile
            ? "Es"
            : "Español"}
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
    </>
  );
};

export default LanguageMenu;
