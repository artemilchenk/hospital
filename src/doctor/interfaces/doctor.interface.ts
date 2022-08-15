export interface ISlot {
  taken: boolean,
  date: string
}

export interface IDoctor {
  name: string;
  spec: string;
  slots: ISlot[];
}