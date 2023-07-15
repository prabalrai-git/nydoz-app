import { useContext } from "react";
import { CompanyContext } from "../context/CompanyContext";

export function useCompanyAuth() {
    const value = useContext(CompanyContext);
    return value;
}
