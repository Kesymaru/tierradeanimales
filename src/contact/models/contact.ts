import Data from "@core/models/data";

export interface Contact extends Data {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactResults = Array<Contact>;

export default Contact;
