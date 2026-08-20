export const SideBar = () => {
    return (
        <aside className="w-64 border-r border-zinc-800 p-6 text-white">
            <h2 className="text-xl font-bold text-purple-400">
                Finance
            </h2>

            <nav className="mt-8">
                <ul className="space-y-2">
                    <li>
                        <a
                            className="block rounded-lg px-3 py-2 hover:bg-zinc-800"
                            href="/dashboard">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            className="block rounded-lg px-3 py-2 hover:bg-zinc-800"
                            href="/dashboard/revenues">
                            Receitas
                        </a>
                    </li>
                    <li>
                        <a
                            className="block rounded-lg px-3 py-2 hover:bg-zinc-800"
                            href="/dashboard/expenses">
                            Despesas
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}