import File from "@core/models/file";

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
  avatar?: any;
  start?: boolean;
  fosterHomeId: string;
  images?: Array<File>;
}

export default Case;
