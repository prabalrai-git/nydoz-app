import { ISelectProps } from "../types/react-select.type";
import CountryList from "../constants/Country.json";

interface ICountryProps {
    country: string;
    code: string;
    iso: string;
}

const CountryArrayList = CountryList;

export const getSelectPropsFromCountryCallingCode = (
    callingCode: string
): ISelectProps | undefined => {
    const selectedCountry = CountryArrayList.find(
        (country: ICountryProps) => country.code === callingCode
    );

    if (selectedCountry) {
        return {
            label: `(${selectedCountry.code}) ${selectedCountry.country} - ${selectedCountry.iso}`,
            value: selectedCountry.code,
        };
    } else {
        return undefined;
    }
};

export const getSelectPropsFromCountry = (
    countryValue: string
): ISelectProps | undefined => {
    const selectedCountry = CountryArrayList.find(
        (country: ICountryProps) => country.country === countryValue
    );

    if (selectedCountry) {
        return {
            label: selectedCountry.country,
            value: selectedCountry.country,
        };
    } else {
        return undefined;
    }
};
