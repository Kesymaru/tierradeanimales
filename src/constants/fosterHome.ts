import INIT_ADDRESS from "@constants/address";
import { FosterHome, FosterHomeContact } from "@models/fosterHome";

export const INIT_HOME_CONTACT: FosterHomeContact = {
  name: "",
  phone: "",
  email: "",
};

export const INIT_HOME: FosterHome = {
  name: "",
  active: true,
  address: INIT_ADDRESS,
  contacts: [{ ...INIT_HOME_CONTACT }],
};

export default INIT_HOME;
