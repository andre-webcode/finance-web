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

export const TransactionsItem = ({ id, description, date, value, type, onDeleted, onError, onEdit,transaction }: Props) => {



    return (
        <div className="mt-3 rounded-lg border px-4 py-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium">
                        {description}
                    </p>

                    <span className="text-sm text-gray-500">
                        {date}
                    </span>
                </div>

                <strong className={type === "revenue" ? "text-green-400" : "text-red-400"}>
                    {value}
                </strong>

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
    )
}