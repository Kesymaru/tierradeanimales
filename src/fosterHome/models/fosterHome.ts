import Address from "@app/user/models/address";
import Contact from "./contact";

export interface FosterHome {
  id?: string;
  name: string;
  active: boolean;
  address: Address;
  contacts?: Contact[];
}

export default FosterHome;
