import { Case, CaseType, CaseStatus } from "@/Case/models";

export const InitCase: Case = {
  type: CaseType.DOG,
  sex: "Male",
  status: CaseStatus.RESCUED,
  name: "",
  age: 1,
  description: "",
  public: false,
};
