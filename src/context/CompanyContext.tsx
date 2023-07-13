import { createContext } from "react";

export interface ICompanyInfo {
    id: string | undefined;
    name: string;
    subdomain: string;
    company_owner_id: string;
    status_id: string;
}

const initialCompanyInfo: ICompanyInfo = {
    id: undefined,
    subdomain: "",
    name: "",
    company_owner_id: "",
    status_id: "",
};

export interface ICompanyContextProps {
    companyInfo: ICompanyInfo;
    isCompanyAdmin: boolean;
}

const companyContextDefaults: ICompanyContextProps = {
    companyInfo: initialCompanyInfo,
    isCompanyAdmin: false,
};

export const CompanyContext = createContext<ICompanyContextProps>(
    companyContextDefaults
);
