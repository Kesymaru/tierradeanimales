import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface IDopateProps {
}

const Donate: FunctionComponent<IDopateProps> = () => {
    const {t, i18n} = useTranslation();

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h2">
                {t('home.donate')}
            </Typography>
            <Typography variant="body1">
                {t('home.donateBody')}
            </Typography>
        </Grid>
    </Grid>;
}

export default Donate;
