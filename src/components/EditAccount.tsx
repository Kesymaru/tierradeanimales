import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";
import {ACCOUNT_DETAILS_ROUTE} from "../constants";

const EditAccount: FunctionComponent<{}> = () => (<>
    <p style={{marginTop: '70px'}}>
        EDIT ACCOUNT
    </p>
    <Link to={ACCOUNT_DETAILS_ROUTE.path}>{ACCOUNT_DETAILS_ROUTE.name}</Link>
</>);

export default EditAccount;
