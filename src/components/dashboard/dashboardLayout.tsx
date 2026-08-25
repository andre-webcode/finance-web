"use client";

import { ReactNode, useState } from "react";
import { SideBar } from "./sideBar";
import { MenuButton } from "./menuButton";

type Props = {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen ">
            <SideBar isOpen={isOpen} />

            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                >

                </div>
            )}

            <div className="hidden w-64 shrink-0 md:block" />

            <div className="min-w-0 flex-1">
                <header className="flex items-center border-b border-zinc-800 px-4">
                    <div className="md:hidden">
                        <MenuButton
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </div>
                </header>

                {children}
            </div>

        </div>
    );
};