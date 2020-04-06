export enum CaseType {
  DOG = "Dog",
  CAT = "Cat",
}

export type Sex = "Male" | "Female";

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
  images?: any[]; // TODO populate images
  start?: boolean;
}
