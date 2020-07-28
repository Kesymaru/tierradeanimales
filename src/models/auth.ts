import { CreateUserCredentials } from "react-redux-firebase";

export enum Providers {
  EMAIL = "Email",
  GOOGLE = "Google",
  FACEBOOK = "facebook",
  APPLE = "Apple",
}

export interface GoogleCredentials {
  provider: Providers.GOOGLE;
  type: "popup | redirect";
}

export interface FacebookCredentials {
  provider: Providers.FACEBOOK;
  type: "popup | redirect";
}

export interface AppleCredentials {
  provider: Providers.APPLE;
  type: "popup | redirect";
}

export interface EmailCredentials {
  email: string;
  password: string;
}

export type Credentials =
  | GoogleCredentials
  | FacebookCredentials
  | AppleCredentials
  | EmailCredentials;

export default Credentials;
