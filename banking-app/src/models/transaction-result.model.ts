export enum ResultType {
  SUCCESS,
  FAILURE
}

export interface TransactionResult {
  type: ResultType,
  reason?: any; // Bad form, I know. But I honestly don't know how to type this reactive form error structure at the moment.
}