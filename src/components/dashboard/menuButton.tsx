"use client";

import { Menu } from "lucide-react";

type Props = {
    onClick: () => void;
};

export const MenuButton = ({ onClick }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-lg bg-orange-primary p-2 text-white hover:bg-orange-dark md:hidden"
        >
            <Menu size={24} />
        </button>
    );
};