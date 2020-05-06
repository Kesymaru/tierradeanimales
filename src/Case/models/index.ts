import { File, Data } from "@core/models";

export enum CaseType {
  DOG = "Dog",
  CAT = "Cat",
}

export type Sex = "Male" | "Female";

export enum CaseStatus {
  RESCUED = "Rescued",
  HOSPITALIZED = "Hospitalized",
  FOSTER_HOME = "Foster Home",
  ADOPTED = "Adopted",
  DECEASED = "Deceased",
}

export interface Case {
  id?: string;
  type: CaseType;
  sex: Sex;
  status: CaseStatus;
  name: string;
  age: number;
  description: string;
  public: boolean;
  avatar?: File | null;
  start?: boolean;
  fosterHomeId: string;
  images?: Array<File>;
}

export type CaseResults = Array<Case>;

export default Case;
