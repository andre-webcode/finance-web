"use client";

import { ReactNode, useState } from "react";
import { SideBar } from "./sideBar";
import { Menu } from "lucide-react";
import { MenuButton } from "./menuButton";

type Props = {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            <SideBar isOpen={isOpen} />

            <div className="flex-1">
                <header className="flex items-center">
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        <MenuButton onClick={() => setIsOpen(!isOpen)} />
                    </button>
                </header>

                {children}
            </div>

        </div>
    );
};