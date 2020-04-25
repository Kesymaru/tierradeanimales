import INIT_DATA from "@core/constants/data";
import { INIT_ADDRESS } from "@app/user/constants";

import Adopt from "../models";

export const INIT_ADOPT: Adopt = {
  ...INIT_DATA,
  address: INIT_ADDRESS,
  caseId: null,
  descriptiopn: "",
};

export default INIT_ADOPT;
