import INIT_DATA from "@core/constants/data";
import { AppTableColumns } from "@core/components/AppTable";

import User from "../models/user";

export const INIT_USER: User = {
  ...INIT_DATA,
  firstName: "",
  lastName: "",
  email: "",
};

export const USERS_COLUMNS: AppTableColumns = [
  {
    title: "Role",
    path: "role",
    default: "user",
  },
  {
    title: "First Name",
    path: "firstName",
  },
  {
    title: "Last Name",
    path: "lastName",
  },
  {
    title: "Email",
    path: "email",
  },
];

export default INIT_USER;
