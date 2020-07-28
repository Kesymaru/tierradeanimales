import { File, Data } from "@models";

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

export interface CaseBio {
  title: string;
  date: Date;
  description: string;
  files?: Array<File>;
}

export type CaseBioResults = Array<CaseBio>;

export interface Case extends Data {
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
  bio: CaseBioResults;
}

export type CaseResults = Array<Case>;

export default Case;
