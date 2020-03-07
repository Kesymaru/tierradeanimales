import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 40,
            paddingBottom: 40,
            background: 'url(./images/dog3.jpg) no-repeat center',
            backgroundSize: 'cover',
            [theme.breakpoints.up('md')]: {
                height: 'calc(100vh - 42px)',
                backgroundAttachment: 'fixed',
            },
        },
    }),
);

const Donate: FunctionComponent<{}> = () => {
    const classes = useStyles();
    const {t} = useTranslation();

    return <Container maxWidth={false} className={classes.container}>
        <article>
            <Typography variant="h1">
                {t('home.donate')}
            </Typography>
            <Typography variant="body1">
                {t('home.donateBody')}
            </Typography>
        </article>
    </Container>;
}

export default Donate;
