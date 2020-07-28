import { GeonamesCountry, GeonamesChildren } from "@models";

export interface Address {
  country: GeonamesCountry | null;
  state: GeonamesChildren | null;
  county: GeonamesChildren | null;
  city: GeonamesChildren | null;
  address: string;
}

export default Address;
