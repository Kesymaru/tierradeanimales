import INIT_ADDRESS from "@app/user/constants/address";
import INIT_CONTACT from "./contact";
import FosterHome from "../models/fosterHome";

export const INIT_HOME: FosterHome = {
  name: "",
  active: true,
  address: INIT_ADDRESS,
  contacts: [{ ...INIT_CONTACT }],
};

export default INIT_HOME;
