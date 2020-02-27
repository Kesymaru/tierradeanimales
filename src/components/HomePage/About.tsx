import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface IAboutProps {
}

const About: FunctionComponent<IAboutProps> = (props) => {
    const {t, i18n} = useTranslation();

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h2">
                {t('home.about')}
            </Typography>
            <Typography variant="body1">
                {t('home.aboutBody')}
            </Typography>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={4}>Facebook</Grid>
            <Grid item xs={4}>Instagram</Grid>
        </Grid>
    </Grid>;
}

export default About;
