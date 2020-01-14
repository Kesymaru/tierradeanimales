import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

import {EDIT_ACCOUNT_ROUTE} from "../constants/routes";

const Account: FunctionComponent<{}> = () => (
    <>
        <p style={{marginTop: '70px'}}>
            here gos the account component
        </p>
        <Link to={EDIT_ACCOUNT_ROUTE.path}>{EDIT_ACCOUNT_ROUTE.name}</Link>
    </>
);

export default Account;


