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

export interface IMenubar {
    title: string;
    path: string;
}

export interface IMenubar2 {
    title: string;
    link: string;
}
