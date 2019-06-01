import { Transaction, TransactionType } from "./transaction";
import { Spendings } from "./spendings";

export class Report implements IReport {
  public id: number;
  public availableFunds: number;
  public totalSpendings:Spendings;
  public selectedSpendings:Spendings;
  public transactions: Transaction[];
  public selectedTransactions: Transaction[];

  public constructor() {
    this.id = -1;
    this.availableFunds = 0;
    this.totalSpendings = new Spendings();
    this.totalSpendings.necessarySpendings = 0;
    this.totalSpendings.unnecessarySpendings = 0;
    this.selectedSpendings = new Spendings();
    this.selectedSpendings.necessarySpendings = 0;
    this.selectedSpendings.unnecessarySpendings = 0;
    this.transactions = [];
    this.selectedTransactions = [];
  }

  public initalizeFromTransactions(dateFrom: Date, dateTo: Date): Report {
    const ret = Report.copy(this);

    ret.selectedTransactions = ret.transactions.filter(x => x.date >= dateFrom && x.date <= dateTo);
    ret.selectedSpendings.necessarySpendings = ret.selectedTransactions.filter(x => x.type === TransactionType.necessary).reduce((acc, x) => acc += x.amount, 0);
    ret.selectedSpendings.unnecessarySpendings = ret.selectedTransactions.filter(x => x.type === TransactionType.unnecessary).reduce((acc, x) => acc += x.amount, 0);

    return ret;
  }

  public static copy(report: Report): Report {
    const ret = new Report();

    ret.id = report.id;
    ret.availableFunds = report.availableFunds;
    ret.transactions = report.transactions;
    ret.selectedTransactions = report.transactions;
    ret.totalSpendings.necessarySpendings = ret.transactions.filter(x => x.type === TransactionType.necessary).reduce((acc, x) => acc += x.amount, 0);
    ret.totalSpendings.unnecessarySpendings = ret.transactions.filter(x => x.type === TransactionType.unnecessary).reduce((acc, x) => acc += x.amount, 0);
    ret.selectedSpendings.necessarySpendings = ret.totalSpendings.necessarySpendings;
    ret.selectedSpendings.unnecessarySpendings = ret.totalSpendings.unnecessarySpendings;

    return ret;
  }
}

export interface IReport {
  id: number;
  availableFunds: number;
  transactions: Transaction[];
}