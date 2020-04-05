export interface CaseType {
  DOG = "Dog",
  CAT = "cat",
}

export type Sex = "male" | "female";

export enum CaseStatus {
  RESCUED = "Rescued",
  HOSPITALIZED = "Hospitalized",
  FOSTERHOME = "Foster Home",
  ADOPTED = "Adopted",
  DECEASED = "Deceased",
}

export interface Case {
  type: CaseType;
  sex: Sex;
  status: CaseStatus;
  name: string;
  age: number;
  description: string;
  public: boolean;
  avatar?: any;
  images?: any[];
  start?: boolean;
}
