export interface Race {
  name: string;
}

export interface AnimalStatus {
  name: string;
}

export interface Animal {
  race: Race;
  name: string;
  age: number;
  status: AnimalStatus;
}
