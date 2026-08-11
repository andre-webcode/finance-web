type Props = {
    description: string;
    date: string;
    value: string;
}

export const TransactionsItem = ({ description, date, value }: Props) => {
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

                <strong>
                    {value}
                </strong>
            </div>
        </div>
    )
}