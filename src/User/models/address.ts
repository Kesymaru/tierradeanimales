import { GeonamesCountry, GeonamesChildren } from "@core/models";

export interface Address {
  country: GeonamesCountry | null;
  state: GeonamesChildren | null;
  county: GeonamesChildren | null;
  city: GeonamesChildren | null;
  address: string;
}

export default Address;
