import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            background: 'url(./images/dog1.jpg) no-repeat center',
            backgroundSize: 'cover',
            [theme.breakpoints.up('md')]: {
                height: 'calc(100vh - 42px)',
                backgroundAttachment: 'fixed',
            },
        },
    }),
);

const Vision: FunctionComponent<{}> = () => {
    const classes = useStyles();
    const {t, i18n} = useTranslation();

    return <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
            <Typography variant="h2">
                {t('home.vision')}
            </Typography>
            <Typography variant="body1">
                {t('home.visionBody')}
            </Typography>
        </Grid>
    </Grid>;
};

export default Vision;
