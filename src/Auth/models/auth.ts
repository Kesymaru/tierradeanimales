import { CreateUserCredentials } from "@/auth/models/node_modules/react-redux-firebase";

export interface EmailCredentials {
  email: string;
  password: string;
  remember?: boolean;
}
