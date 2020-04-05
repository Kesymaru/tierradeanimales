import { Role } from "@/Auth/models";

export default interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface Address {
  country: string;
  state: string;
  county: string;
  city: string;
  address: string;
}
