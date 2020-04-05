import { Role } from "@core/Auth/models";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
