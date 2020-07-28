import Adopt from "@models/adopt";
import { INIT_DATA, INIT_ADDRESS } from "@constants";

export const INIT_ADOPT: Adopt = {
  ...INIT_DATA,
  address: INIT_ADDRESS,
  caseId: null,
  descriptiopn: "",
};

export default INIT_ADOPT;
