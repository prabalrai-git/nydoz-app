import { createContext } from "react";

interface ICompanyContext {
    company: {
        id: string | undefined;
        name: string;
        subdomain: string;
        owner_id: string;
        status_id: string;
    };

    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompanyContext = createContext({
    company: {
        id: undefined,
        name: "",
        subdomain: "",
        owner_id: "",
        status_id: "",
    },
});
