import Select from "react-select";
import { useMemo } from "react";
import COUNTRY_CALLING_CODE from "../../../constants/Country.json";
import { ISelectProps } from "../../../types/react-select.type";

interface ICountryCodeProps {
    selectValue: ISelectProps | undefined;
    setSelectValue: (value: ISelectProps | undefined) => void;
    placeholder: string;
    forCountry?: boolean;
}

interface ICountryProps {
    country: string;
    code: string;
    iso: string;
}

const CountryCode = (props: ICountryCodeProps) => {
    const { selectValue, setSelectValue, placeholder, forCountry } = props;

    const options1 = useMemo(() => {
        return COUNTRY_CALLING_CODE.map((countryItem: ICountryProps) => {
            return {
                label: `(${countryItem.code}) ${countryItem.country} - ${countryItem.iso}`,
                value: countryItem.code,
            };
        });
    }, []);

    const options2 = useMemo(() => {
        return COUNTRY_CALLING_CODE.map((countryItem: ICountryProps) => {
            return {
                label: countryItem.country,
                value: countryItem.country,
            };
        });
    }, []);

    const handleChange = (selectedOption: ISelectProps | null) => {
        console.log(selectedOption, "selectedOption");
        if (selectedOption == null) {
            setSelectValue(undefined);
        } else {
            setSelectValue(selectedOption);
        }
    };

    return (
        <Select
            options={forCountry ? options2 : options1}
            value={selectValue}
            placeholder={placeholder}
            onChange={handleChange}
            isClearable
        />
    );
};

export default CountryCode;
