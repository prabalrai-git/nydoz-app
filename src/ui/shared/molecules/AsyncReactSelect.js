import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState, } from "react";
import useFetch from "../../../hooks/useFetch";
import Select from "react-select";
function AsyncSelect(props) {
    const { baseUrl, selectValue, setSelectValue, placeholder, dataId, showDataLabel, setMultipleValues, isMulti, } = props;
    const [options, setOptions] = useState([]);
    const { data, fetchDataById } = useFetch(baseUrl, true);
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        fetchDataById(baseUrl);
    }, [baseUrl, fetchDataById]);
    useEffect(() => {
        if (selectValue) {
            const temp = {
                value: selectValue[dataId],
                label: selectValue[showDataLabel],
            };
            setSelectedOption(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectValue]);
    useEffect(() => {
        if (data && data.length > 0) {
            const options = data.map((item) => {
                const temp = {
                    value: item[dataId],
                    label: item[showDataLabel],
                };
                return temp;
            });
            setOptions(options);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    const handleChange = useCallback(isMulti
        ? (selectedOption, actionMeta) => {
            // setSelectedOption(null);
            if (setMultipleValues) {
                if (selectedOption == null) {
                    setSelectedOption(null);
                    setMultipleValues(undefined);
                }
                else {
                    setSelectedOption(selectedOption);
                    // setSelectedOption((prev) =>
                    //   prev ? [...prev, selectedOption[0]] : [selectedOption[0]]
                    // );
                    const idsArray = selectedOption.map((item) => item.value);
                    setMultipleValues(idsArray);
                    // data?.find((item) =>
                    // );
                    // const temp = data?.find(
                    //   (item: T) => item[dataId] === selectedOption.value
                    // );
                    // if (temp) {
                    //   setMultipleValues((prev) =>
                    //   );
                    // }
                }
            }
        }
        : (selectedOption, actionMeta) => {
            if (selectedOption == null) {
                setSelectedOption(null);
                setSelectValue(undefined);
            }
            else {
                setSelectedOption(selectedOption);
                const temp = data?.find((item) => item[dataId] === selectedOption.value);
                if (temp) {
                    setSelectValue(temp);
                }
            }
        }, [data, dataId, setSelectValue]);
    return (_jsx(Select, { isSearchable: true, isClearable: true, className: "react-select-container", classNamePrefix: "react-select", options: options, value: selectedOption, onChange: handleChange, placeholder: placeholder, isMulti: isMulti ? isMulti : false }));
}
export default AsyncSelect;
