import Data from "@core/models/data";

import Role from "@app/auth/models/role";
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
