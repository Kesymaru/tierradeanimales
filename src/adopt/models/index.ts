import Data from "@core/models/data";

import { Address } from "@app/user/models";

export interface Adopt extends Data {
  address: Address;
  caseId: string | null;
  descriptiopn: string;
}

export type AdoptResults = Array<Adopt>;

export default Adopt;
