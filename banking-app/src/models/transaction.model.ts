interface Transaction {
  id: number;
  amount: number;
  date: Date; // Considering whether or not to use built-in Date object or just a number for milliseconds.
}