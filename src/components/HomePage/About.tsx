import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: 'calc(100vh - 42px)',
            background: 'url(./images/dog4.jpg) no-repeat center',
            backgroundSize: 'cover',
            [theme.breakpoints.up('md')]: {
                backgroundAttachment: 'fixed',
            },
        },
    }),
);

const About: FunctionComponent<{}> = (props) => {
    const classes = useStyles();
    const {t, i18n} = useTranslation();

    return <Grid container spacing={2} className={classes.container}>
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
