"use client";

import { LogoutButton } from "./logoutButton";
import { TransactionsItem } from "./transactionItem";
import { RevenueForm } from "./revenueForm";
import { ExpenseForm } from "./expenseForm";
import { useState } from "react";
import { Revenue, Expense, SelectedTransaction } from "@/types/finance";
import { EditModal } from "./editModal";

type Props = {
    revenues: Revenue[];
    expenses: Expense[];
    email: string;
};

const formatDate = (date: string) => {

    return new Date(date).toLocaleDateString("pt-BR");

}

export const DashboardClient = ({ revenues, expenses, email }: Props) => {
    const [revenuesState, setRevenuesState] = useState(revenues);
    const [expensesState, setExpensesState] = useState(expenses);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<SelectedTransaction | null>(null);

    const handleRevenueCreated = (revenue: Revenue) => {
        setRevenuesState((currentRevenues) => [
            ...currentRevenues,
            revenue,
        ]);
    }

    const handleExpenseCreated = (expense: Expense) => {

        setExpensesState((currentExpenses) => [
            ...currentExpenses,
            expense,
        ]);
    };

    const handleDeleted = (id: number, type: "revenue" | "expense") => {

        if (type === "revenue") {
            setRevenuesState((currentRevenues) =>
                currentRevenues.filter((revenue) => revenue.id !== id)
            );
        } else {
            setExpensesState((currentExpenses) =>
                currentExpenses.filter((expense) => expense.id !== id)
            );
        }

        setMessageType("success");

        setMessage(
            type === "revenue" ? "Receita excluida com sucesso!" : "Despesa excluída com sucesso!"
        )

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const handleEdit = (transaction: SelectedTransaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    }


    const handleError = (message: string) => {
        setMessageType("error");
        setMessage(message);
    };



    const transactions = [
        ...revenuesState.map((revenue) => ({
            ...revenue,
            type: "revenue" as const,
        })),
        ...expensesState.map((expense) => ({
            ...expense,
            type: "expense" as const,
        })),
    ];

    transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const latestTransactions = transactions.slice(0, 5);


    const totalRevenue = revenuesState.reduce(
        (total, revenue) => total + Number(revenue.value),
        0
    );

    const totalExpense = expensesState.reduce(
        (total, expense) => total + Number(expense.value),
        0
    );

    const balance = totalRevenue - totalExpense;




    return (
        <div className=" mx-auto max-w-6xl px-4">
            {message && (
                <div className={`fixed right-4 top-4 z-50 rounded-lg  px-4 py-3 text-sm shadow-lg ${messageType === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}>
                    {message}
                </div>
            )}

            <header className="flex items-center justify-between border-b border-zinc-800 py-6">

                <h1 className="text-2xl font-bold text-purple-400">Finance</h1>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-zinc-400">
                        {email}
                    </span>

                    <LogoutButton />
                </div>
            </header>

            <section className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 ">
                    <p className="text-sm text-gray-500">
                        Saldo atual
                    </p>
                    <strong className="mt-2 block text-3xl font-bold text-purple-400">
                        R$ {balance.toFixed(2)}
                    </strong>
                    <p className="mt-1 text-sm text-zinc-500">
                        Suas finanças em um só lugar
                    </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <p className="text-sm text-zinc-400">
                        Receitas
                    </p>
                    <strong className="mt-2 block text-2xl font-bold text-green-400">
                        R$ {totalRevenue.toFixed(2)}
                    </strong>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <p className="text-sm text-gray-500">
                        Despesas
                    </p>
                    <strong className="mt-2 block text-2xl font-bold text-red-400">
                        R$ {totalExpense.toFixed(2)}
                    </strong>
                </div>
            </section>

            <RevenueForm onRevenueCreated={handleRevenueCreated} />

            <ExpenseForm onExpenseCreated={handleExpenseCreated} />

            <hr className="my-8 border-zinc-800" />

            <section className="w-full mt-8 mb-10">
                <h2 className="text-xl font-semibold text-center text-zinc-100">
                    Ultimas movimentações
                </h2>

                <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 mx-auto">
                    {latestTransactions.map((transaction) => (
                        <TransactionsItem
                            key={`${transaction.type}-${transaction.id}`}
                            id={transaction.id}
                            description={transaction.description}
                            date={formatDate(transaction.date)}
                            value={`${transaction.type === "revenue" ? "+" : "-"} R$ ${transaction.value}`}
                            type={transaction.type}
                            onDeleted={handleDeleted}
                            onError={handleError}
                            onEdit={handleEdit}
                            transaction={transaction}

                        />
                    ))}
                </div>

            </section>

            {isEditModalOpen &&
                <EditModal
                    onClose={handleCloseEditModal}
                    transaction={selectedTransaction}

                />}

        </div>
    );
};