import { INIT_DATA } from "@constants";
import { TableColumns } from "@components/AppTable";
import { Case, CaseBio, CaseType, CaseStatus } from "@models/case";

export const INIT_CASE_BIO: CaseBio = {
  title: "",
  description: "",
  date: new Date(),
};

export const INIT_CASE: Case = {
  ...INIT_DATA,
  type: CaseType.DOG,
  sex: "Male",
  status: CaseStatus.RESCUED,
  name: "",
  age: 1,
  description: "",
  public: false,
  fosterHomeId: "",
  bio: [],
};

export const CASE_COLUMNS: TableColumns = [
  {
    title: "Name",
    path: "name",
  },
  {
    title: "Type",
    path: "type",
  },
  {
    title: "Sex",
    path: "sex",
  },
  {
    title: "Status",
    path: "status",
  },
  {
    title: "Public",
    path: "public",
  },
];

export default INIT_CASE;