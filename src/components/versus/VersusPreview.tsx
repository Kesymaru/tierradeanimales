import React, {FunctionComponent} from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {INewVersus} from "../../store";

interface IVersusPreviewProps {
    versus: INewVersus;
}

const VersusPreview: FunctionComponent<IVersusPreviewProps> = () => {
    return <form noValidate autoComplete="off">
        <Typography>
            Please fill the versus rounds
        </Typography>
        <TextField id="total" label="Total Rounds"/>
    </form>
};

export default VersusPreview;
