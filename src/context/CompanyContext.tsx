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
    handleCompanyInfo: (value: ICompanyInfo) => void;
}

const companyContextDefaults: ICompanyContextProps = {
    companyInfo: initialCompanyInfo,
    handleCompanyInfo: () => null,
};

export const CompanyContext = createContext<ICompanyContextProps>(
    companyContextDefaults
);
