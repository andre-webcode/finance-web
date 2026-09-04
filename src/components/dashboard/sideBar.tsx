"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Receipt } from "lucide-react";
import { LogoutButton } from "./logoutButton";

type Props = {
    isOpen: boolean;
}

export const SideBar = ({ isOpen }: Props) => {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Receitas",
            href: "/dashboard/revenues",
            icon: Wallet,
        },
        {
            name: "Despesas",
            href: "/dashboard/expenses",
            icon: Receipt,
        },
    ]

    return (
        <aside className={`fixed left-0 top-0 z-50 flex h-screen flex-col w-64 border-r  border-gray-light p-6 bg-white text-gray-text transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
            <h2 className="text-xl font-bold text-orange-primary">
                Finance
            </h2>

            <nav className="mt-8">
                <ul className="space-y-2">

                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === item.href
                                        ? "bg-orange-primary text-white"
                                        : "hover:bg-gray-light transition"
                                        }`}
                                >
                                    <Icon size={20} />

                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}


                </ul>
            </nav>

            <div className="mt-auto">
                <LogoutButton />
            </div>
           
        </aside>
    )
}