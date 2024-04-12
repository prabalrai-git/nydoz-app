import CountryList from "../constants/Country.json";
const CountryArrayList = CountryList;
export const getSelectPropsFromCountryCallingCode = (callingCode) => {
    const selectedCountry = CountryArrayList.find((country) => country.code === callingCode);
    if (selectedCountry) {
        return {
            label: `(${selectedCountry.code}) ${selectedCountry.country} - ${selectedCountry.iso}`,
            value: selectedCountry.code,
        };
    }
    else {
        return undefined;
    }
};
export const getSelectPropsFromCountry = (countryValue) => {
    const selectedCountry = CountryArrayList.find((country) => country.country === countryValue);
    if (selectedCountry) {
        return {
            label: selectedCountry.country,
            value: selectedCountry.country,
        };
    }
    else {
        return undefined;
    }
};
