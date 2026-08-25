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
            className="rounded-lg p-2 hover:bg-zinc-800"
        >
            <Menu size={24} />
        </button>
    );
};