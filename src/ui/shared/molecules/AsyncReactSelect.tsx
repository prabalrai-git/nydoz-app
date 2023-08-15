import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import useFetch from "../../../hooks/useFetch";
import Select from "react-select";

interface IProps<T> {
    baseUrl: string;
    selectValue: T | undefined;
    setSelectValue: Dispatch<SetStateAction<T | undefined>>;
    placeholder: string;
    showDataLabel: keyof T;
    dataId: keyof T;
}

interface IOption {
    value: string;
    label: string;
}

function AsyncSelect<T>(props: IProps<T>) {
    const {
        baseUrl,
        selectValue,
        setSelectValue,
        placeholder,
        dataId,
        showDataLabel,
    } = props;
    const [options, setOptions] = useState<IOption[] | []>([]);
    const { data, fetchDataById } = useFetch<T[]>(baseUrl, true);
    const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

    useEffect(() => {
        fetchDataById(baseUrl);
    }, [baseUrl, fetchDataById]);

    useEffect(() => {
        if (selectValue) {
            const temp: IOption = {
                value: selectValue[dataId] as string,
                label: selectValue[showDataLabel] as string,
            };
            setSelectedOption(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectValue]);

    useEffect(() => {
        if (data && data.length > 0) {
            const options: IOption[] = data.map((item: T) => {
                const temp: IOption = {
                    value: item[dataId] as string,
                    label: item[showDataLabel] as string,
                };
                return temp;
            });
            setOptions(options);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleChange = useCallback(
        (selectedOption: IOption | null) => {
            if (selectedOption == null) {
                setSelectedOption(null);
                setSelectValue(undefined);
            } else {
                setSelectedOption(selectedOption);
                const temp = data?.find(
                    (item: T) => item[dataId] === selectedOption.value
                );
                if (temp) {
                    setSelectValue(temp);
                }
            }
        },
        [data, dataId, setSelectValue]
    );

    return (
        <Select
            isSearchable
            isClearable
            className='react-select-container'
            classNamePrefix='react-select'
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}

export default AsyncSelect;
