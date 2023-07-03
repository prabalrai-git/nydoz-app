import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import Heading from "../../shared/molecules/Heading";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";

const CompanyList = () => {
    const { data, fetchData, loading, error } = useFetch<ICompanyResponse[]>(
        API_ROUTE.GET_COMPANIES,
        true
    );

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Heading
                title='Company List'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section></section>
        </div>
    );
};

export default CompanyList;
