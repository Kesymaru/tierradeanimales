import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";
import {DETAILS_ACCOUNT_ROUTE} from "../constants";

const EditAccount: FunctionComponent<{}> = () => (<>
    <p style={{marginTop: '70px'}}>
        EDIT ACCOUNT
    </p>
    <Link to={DETAILS_ACCOUNT_ROUTE.path}>{DETAILS_ACCOUNT_ROUTE.name}</Link>
</>);

export default EditAccount;
