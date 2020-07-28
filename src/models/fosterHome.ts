import Address from "@models/address";

export interface FosterHomeContact {
  name: string;
  phone: number | string;
  email: string;
}

export interface FosterHome {
  id?: string;
  name: string;
  active: boolean;
  address: Address;
  contacts?: FosterHomeContact[];
}

export default FosterHome;
