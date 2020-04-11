import Role from "@app/auth/models/role";
import Address from "./address";

export interface User {
  role?: Role;
  address?: Address;
  firstName: string;
  lastName: string;
  email: string;
}

export default User;
