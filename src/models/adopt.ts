import { Data, Address } from "@models";

export interface Adopt extends Data {
  address: Address;
  caseId: string | null;
  descriptiopn: string;
}

export type AdoptResults = Array<Adopt>;

export default Adopt;
