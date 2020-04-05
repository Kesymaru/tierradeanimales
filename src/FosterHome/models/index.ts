export interface Contact {
  name: string;
  phone: number | string;
  email: string;
}

export interface FosterHome {
  name: string;
  active: boolean;
  address: IAddress;

  contacts?: Contact[];
  dogs?: IDog[];
}
