import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useFetch from "../../../hooks/useFetch";
import Select, { ActionMeta, MultiValue } from "react-select";

interface IProps<T> {
  baseUrl: string;
  selectValue: T | undefined;
  setSelectValue: Dispatch<SetStateAction<T | undefined>>;
  placeholder: string;
  showDataLabel: keyof T;
  dataId: keyof T;
  setMultipleValues?: Dispatch<SetStateAction<string[] | undefined>>;
  isMulti?: boolean;
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
    setMultipleValues,
    isMulti,
  } = props;
  const [options, setOptions] = useState<IOption[] | []>([]);
  const { data, fetchDataById } = useFetch<T[]>(baseUrl, true);
  const [selectedOption, setSelectedOption] = useState<
    IOption[] | IOption | null
  >(null);

  useEffect(() => {
    fetchDataById(baseUrl);
  }, [baseUrl, fetchDataById]);

  //   console.log(data, "here is data");

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
    isMulti
      ? (selectedOption: IOption[] | null, actionMeta: ActionMeta<IOption>) => {
          // setSelectedOption(null);
          if (setMultipleValues) {
            if (selectedOption == null) {
              setSelectedOption(null);
              setMultipleValues(undefined);
            } else {
              setSelectedOption(selectedOption);
              // setSelectedOption((prev) =>
              //   prev ? [...prev, selectedOption[0]] : [selectedOption[0]]
              // );

              const idsArray = selectedOption.map(
                (item: IOption) => item.value
              );

              setMultipleValues(idsArray);

              // data?.find((item) =>
              //   console.log(item["id"], selectedOption[0]["value"], "hihihihi")
              // );
              // const temp = data?.find(
              //   (item: T) => item[dataId] === selectedOption.value
              // );
              // console.log("yo", temp, selectedOption);
              // if (temp) {
              //   setMultipleValues((prev) =>
              //     console.log(prev, "yo this is prev")
              //   );
              // }
            }
          }
        }
      : (selectedOption: IOption | null, actionMeta: ActionMeta<IOption>) => {
          if (selectedOption == null) {
            setSelectedOption(null);
            setSelectValue(undefined);
          } else {
            setSelectedOption(selectedOption);
            const temp = data?.find(
              (item: T) => item[dataId] === selectedOption.value
            );
            console.log(selectedOption, temp, "hey yooo");
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
      className="react-select-container"
      classNamePrefix="react-select"
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      isMulti={isMulti ? isMulti : false}
    />
  );
}

export default AsyncSelect;
