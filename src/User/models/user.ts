import { Role } from "@/Auth/models";

export interface Address {
  country: string;
  state: string;
  county: string;
  city: string;
  address: string;
}

export interface User {
  role?: Role;
  address?: Address;
  firstName: string;
  lastName: string;
  email: string;
}

export default User;
