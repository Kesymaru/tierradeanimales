import React, {FunctionComponent} from "react";
import QRCode from"qrcode.react";

import {INewVersus} from "../../store";
import {VERSUS_ROUTE} from "../../constants";

interface IVersusPreviewProps {
    versus: INewVersus;
}

const VersusPreview: FunctionComponent<IVersusPreviewProps> = ({versus}) => {
    let url: string = VERSUS_ROUTE.path;
    console.log('url', url, versus);

    return <QRCode value={`http://myapp.com/${url}`} />
};

export default VersusPreview;
