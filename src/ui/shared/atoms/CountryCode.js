import { jsx as _jsx } from "react/jsx-runtime";
import Select from "react-select";
import { useMemo } from "react";
import COUNTRY_CALLING_CODE from "../../../constants/Country.json";
const CountryCode = (props) => {
    const { selectValue, setSelectValue, placeholder, forCountry } = props;
    const options1 = useMemo(() => {
        return COUNTRY_CALLING_CODE.map((countryItem) => {
            return {
                label: `(${countryItem.code}) ${countryItem.country} - ${countryItem.iso}`,
                value: countryItem.code,
            };
        });
    }, []);
    const options2 = useMemo(() => {
        return COUNTRY_CALLING_CODE.map((countryItem) => {
            return {
                label: countryItem.country,
                value: countryItem.country,
            };
        });
    }, []);
    const handleChange = (selectedOption) => {
        if (selectedOption == null) {
            setSelectValue(undefined);
        }
        else {
            setSelectValue(selectedOption);
        }
    };
    return (_jsx(Select, { options: forCountry ? options2 : options1, value: selectValue, className: "react-select-container", placeholder: placeholder, onChange: handleChange, isClearable: true }));
};
export default CountryCode;
