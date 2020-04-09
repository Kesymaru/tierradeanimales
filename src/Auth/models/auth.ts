import { CreateUserCredentials } from "react-redux-firebase";

export enum Providers {
  EMAIL = "Email",
  GOOGLE = "Google",
  FACEBOOK = "facebook",
}

export interface GoogleCredentials {
  provider: Providers.GOOGLE;
  type: "popup | redirect";
}

export interface FacebookCredentials {
  provider: Providers.GOOGLE;
  type: "popup | redirect";
}

export interface EmailCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export type Credentials =
  | GoogleCredentials
  | FacebookCredentials
  | EmailCredentials;

export default Credentials;
