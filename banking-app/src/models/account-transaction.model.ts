export interface AccountTransaction {
  id: string; // Using js-guid library to generate random strings that IDEALLY won't conflict with each other.
  amount: number;
  date: Date; // Considering whether or not to use built-in Date object or just a number for milliseconds.
}