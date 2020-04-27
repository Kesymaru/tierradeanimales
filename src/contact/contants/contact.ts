import { TableColumns } from "@core/components/AppTable";
import { INIT_DATA } from "@core/constants/data";

import Contact from "../models/contact";

export const INIT_CONTACT: Contact = {
  ...INIT_DATA,
  name: "",
  email: "",
  phone: "",
  message: "",
};

export const CONTACT_COLUMNS: TableColumns = [
  {
    title: "Name",
    path: "name",
  },
  {
    title: "Email",
    path: "email",
  },
  {
    title: "Phone",
    path: "email",
  },
];

export default INIT_CONTACT;
