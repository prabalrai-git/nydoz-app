import { ReactElement } from "react";

export interface INavPill {
    id: number;
    title: string;
    link: string;
}

export interface ISidebarMenu {
    id: number;
    title: string;
    link: string;
    icon: ReactElement;
}
