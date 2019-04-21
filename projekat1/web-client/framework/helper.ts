export class Helper{
  dateTimePresenter(value: Date){
    return value.toLocaleString();
  }
}

export const helper = new Helper();