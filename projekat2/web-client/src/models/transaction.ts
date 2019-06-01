export enum TransactionType{
  necessary, 
  unnecessary,
  none
}

export class Transaction{
  public date: Date;
  public currentFunds: number;
  public amount: number;
  public type:TransactionType
}