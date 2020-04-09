import { Address } from "@/user/models";

export interface Contact {
  name: string;
  phone: number | string;
  email: string;
}

export interface FosterHome {
  name: string;
  active: boolean;
  address: Address;

  contacts?: Contact[];
}
