import { useEffect, useState } from "react";
import Select from "react-select";

import { ISelectProps } from "../../../types/react-select.type";
import useFetch from "../../../hooks/useFetch";

interface IProps {
    baseUrl: string;
    selectValue: ISelectProps | undefined;
    setSelectValue: (value: ISelectProps | undefined) => void;
    placeholder: string;
}

const SimpleSelect = (props: IProps) => {
    const { baseUrl, selectValue, setSelectValue, placeholder } = props;
    const [currentPage, setCurrentPage] = useState<number>(15);
    const [fetchUrl, setfetchUrl] = useState(baseUrl);
    const { data, isloading, fetchDataById } = useFetch(fetchUrl, true);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (!isloading) {
                setCurrentPage((prevPage) => prevPage + 1);
                setfetchUrl(`${baseUrl}?page=${currentPage}&per_page=15`);
            }
        }
    };

    useEffect(() => {
        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Clean up the scroll event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Fetch data when currentPage changes
    useEffect(() => {
        fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);

    const handleChange = (selectedOption: ISelectProps | null) => {
        if (selectedOption) {
            setSelectValue(selectedOption);
        }
    };

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectValue(data[0]);
        }
    }, [data]);

    return (
        <Select
            options={data}
            value={selectValue}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default SimpleSelect;
