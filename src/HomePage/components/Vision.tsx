import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface IVisionProps {
}

const Vision: FunctionComponent<IVisionProps> = () => {
    const {t, i18n} = useTranslation();

    return <Grid container spacing={2} style={{height: 'calc(100vh - 60px)'}}>
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
