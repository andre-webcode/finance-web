"use client";

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

    const handleUpdated = (transaction: SelectedTransaction) => {
        if (transaction.type === "revenue") {
            setRevenuesState((prev) => prev.map((item) =>
                item.id === transaction.id
                    ? transaction
                    : item
            ));

        } else {
            setExpensesState((prev) =>
                prev.map((item) =>
                    item.id === transaction.id
                        ? transaction
                        : item
                )
            );
        }
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
        <div className="min-h-screen bg-gray-light">
            <div className=" mx-auto max-w-6xl px-4">
                {message && (
                    <div className={`fixed right-4 top-4 z-50 rounded-lg  px-4 py-3 text-sm shadow-lg ${messageType === "success"
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}>
                        {message}
                    </div>
                )}

                <header className="flex items-center justify-between border-b border-orange-primary py-6">

                    <h1 className="text-2xl font-bold text-orange-primary md:hidden">Finance</h1>

                </header>

                <section className="mt-6 grid gap-4 lg:grid-cols-3">

                    <div className="rounded-xl bg-orange-primary border border-orange-dark p-6 shadow-lg transition hover:shadow-xl">
                        <p className="text-sm text-orange-light">
                            Saldo atual
                        </p>
                        <strong className="mt-2 block text-3xl font-bold text-white">
                            R$ {balance.toFixed(2)}
                        </strong>
                        <p className="mt-1 text-sm text-orange-light">
                            Suas finanças em um só lugar
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-light bg-white p-6 shadow-sm transition hover:shadow-md">
                        <p className="text-sm text-gray-500">
                            Receitas
                        </p>
                        <strong className="mt-2 block text-2xl font-bold text-green-600">
                            R$ {totalRevenue.toFixed(2)}
                        </strong>
                    </div>

                    <div className="rounded-xl border border-gray-light bg-white p-6 shadow-sm transition hover:shadow-md">
                        <p className="text-sm text-gray-500">
                            Despesas
                        </p>
                        <strong className="mt-2 block text-2xl font-bold text-red-600">
                            R$ {totalExpense.toFixed(2)}
                        </strong>
                    </div>
                </section>

                <RevenueForm onRevenueCreated={handleRevenueCreated} />

                <ExpenseForm onExpenseCreated={handleExpenseCreated} />

                <hr className="my-8 border-gray-light" />

                <section className="w-full mt-8 mb-10">
                    <h2 className="text-xl font-semibold text-center text-gray-text">
                        Ultimas movimentações
                    </h2>

                    <div className="mt-4 rounded-xl border border-gray-light bg-white p-6 mx-auto shadow-sm">
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
                        onUpdated={handleUpdated}

                    />}

            </div>
        </div>
    );
};