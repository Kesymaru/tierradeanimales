import { Data, Role } from "@models";
import Address from "./address";

export interface User extends Data {
  role?: Role;
  address?: Address;
  firstName: string;
  lastName: string;
  email: string;
}

export type UsersResults = Array<User>;

export default User;
