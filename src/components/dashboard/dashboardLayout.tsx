"use client";

import { ReactNode, useState } from "react";
import { SideBar } from "./sideBar";
import { MenuButton } from "./menuButton";

type Props = {
    children: ReactNode;
    email:string;
}

export const DashboardLayout = ({ children, email }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen ">
            <SideBar isOpen={isOpen} email={email} />

            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                >

                </div>
            )}

            <div className="hidden w-64 shrink-0 md:block" />

            <div className="min-w-0 flex-1">
                <header className="flex items-center bg-gray-light border-b border-gray-light px-4">
                    <div className=" p-2 text-white md:hidden">
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