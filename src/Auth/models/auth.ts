import { CreateUserCredentials } from "react-redux-firebase";

export interface EmailCredentials {
  email: string;
  password: string;
  remember?: boolean;
}
