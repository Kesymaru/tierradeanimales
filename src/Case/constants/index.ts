import { Case, CaseType, CaseStatus } from "../models";

export const INIT_CASE: Case = {
  type: CaseType.DOG,
  sex: "Male",
  status: CaseStatus.RESCUED,
  name: "",
  age: 1,
  description: "",
  public: false,
  fosterHomeId: "",
};

export default INIT_CASE;
