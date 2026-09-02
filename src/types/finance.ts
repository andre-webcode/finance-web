export type Transaction = {
    id: number;
    description: string;
    value: string;
    category: string;
    date: string;
};

export type Revenue = Transaction;
export type Expense = Transaction;


export type SelectedTransaction = (Revenue | Expense) & {
    type: "revenue" | "expense"
}