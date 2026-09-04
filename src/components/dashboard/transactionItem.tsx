import { SelectedTransaction, Transaction } from "@/types/finance";
import { DeleteButton } from "./deleteButton";
import { EditeButton } from "./editeButton";

type Props = {
    transaction: SelectedTransaction;
    id: number;
    description: string;
    date: string;
    value: string;
    type: "revenue" | "expense";
    onDeleted: (id: number, type: "revenue" | "expense") => void;
    onError: (message: string) => void;
    onEdit: (Transaction: SelectedTransaction) => void;
}

export const TransactionsItem = ({ id, description, date, value, type, onDeleted, onError, onEdit, transaction }: Props) => {



    return (
        <div className="mt-3 rounded-lg border border-gray-light bg-gray-light/30 px-4 py-3 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-3 sm:flex-row  items-center justify-between">
                <div>
                    <p className="font-semibold text-gray-text">
                        {description}
                    </p>

                    <span className="text-xs font-normal text-gray-500">
                        {date}
                    </span>
                </div>

                <strong className={type === "revenue" ? "whitespace-nowrap font-bold text-green-600" : "whitespace-nowrap font-bold text-red-600"}>
                    {value}
                </strong>

                <div className="mt-2 flex items-center gap-6 sm:mt-0">
                    <div className="flex items-center gap-2">
                        <EditeButton
                            id={id}
                            type={type}
                            onEdit={onEdit}
                            transaction={transaction}
                        />

                        <DeleteButton
                            id={id}
                            type={type}
                            onDeleted={onDeleted}
                            onError={onError}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}