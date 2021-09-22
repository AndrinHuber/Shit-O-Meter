export class Entry {
  public date!: string;
  public time!: string;
  public valuation!: number;
  public bigOrSmall!: State;
}
export enum State {
  big,
  small
}
