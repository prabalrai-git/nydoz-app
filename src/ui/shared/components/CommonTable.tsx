import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { IoMdPerson } from "react-icons/io";
import { FaEdit, FaPlane } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";

type InputRef = GetRef<typeof Input>;

interface DataType {
  key: string;
  name: string;
  goingAbroad: boolean;
  mobile: string;
  visitingCountry: string;
  agent: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    goingAbroad: true,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: "1",
    name: "John Brown",
    goingAbroad: false,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: "1",
    name: "John Brown",
    goingAbroad: true,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: "1",
    name: "John Brown",
    goingAbroad: false,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: "1",
    name: "John Brown",
    goingAbroad: true,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: "1",
    name: "John Brown",
    goingAbroad: true,
    mobile: "9818158172",
    visitingCountry: "China",
    agent: "hello world",
  },
];

const CommonTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            className="tw-bg-blue-400"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          {/* <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  let sn = 1;

  const columns: TableColumnsType<DataType> = [
    {
      title: "S.N",
      dataIndex: "S.N",
      key: "S.N",
      render: (a, b, c) => c + 1,
    },
    {
      title: () => {
        return (
          <div className="tw-flex tw-justify-left tw-items-center tw-gap-2">
            <IoMdPerson />
            <p>Name</p>
          </div>
        );
      },
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <div className="tw-h-[40px]">
          <p className="tw-text-base tw-font-semibold">{value}</p>
          <p className="tw-text-[12px] tw-text-gray-500 tw-lowercase">
            demo@gmail.com
          </p>
        </div>
      ),
      // width: "30%",
      // ...getColumnSearchProps("name"),
    },
    {
      title: () => {
        return (
          <div className="tw-flex tw-justify-left tw-items-center tw-gap-2 ">
            <FaPlane />
            <p>Going Abroad</p>
          </div>
        );
      },
      dataIndex: "goingAbroad",
      key: "goingAbroad",
      render: (text, a) => {
        console.log(text, a);
        // return <h1>hello</h1>;
        return !text ? <Tag color="red">No</Tag> : <Tag color="green">Yes</Tag>;
      },
    },
    {
      title: () => {
        return (
          <div className="tw-flex tw-justify-left tw-items-center tw-gap-2 ">
            <FaPhone />
            <p>Mobile Number</p>
          </div>
        );
      },
      dataIndex: "mobile",
      key: "mobile",
      ...getColumnSearchProps("mobile"),
    },
    {
      title: () => {
        return (
          <div className="tw-flex tw-justify-left tw-items-center tw-gap-2 ">
            <RiFlagFill />
            <p>Visiting Country</p>
          </div>
        );
      },
      dataIndex: "visitingCountry",
      key: "visitingCountry",
      ...getColumnSearchProps("visitingCountry"),
    },
    {
      title: () => {
        return (
          <div className="tw-flex tw-justify-left tw-items-center tw-gap-2 ">
            <BsPersonFillCheck />
            <p>Agent</p>
          </div>
        );
      },
      dataIndex: "agent",
      key: "agent",
      ...getColumnSearchProps("agent"),
    },
    {
      title: "Action",
      dataIndex: "goingAbroad",
      key: "goingAbroad",
      render: () => (
        <div className="tw-flex tw-gap-3 tw-justify-start">
          <div className="tw-bg-violet-500 tw-w-[35px] tw-flex tw-justify-center tw-p-2 tw-rounded-lg hover:tw-bg-violet-700 tw-cursor-pointer">
            <FaEdit color="white" size={14} />
          </div>
          <div className="tw-bg-red-500 tw-w-[35px] tw-flex tw-justify-center tw-p-2 tw-rounded-lg hover:tw-bg-red-700 tw-cursor-pointer">
            <RiDeleteBin5Line color="white" size={15} />
          </div>
        </div>
      ),
    },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    //   key: "age",
    //   // width: "20%",
    //   ...getColumnSearchProps("age"),
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   ...getColumnSearchProps("address"),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ["descend", "ascend"],
    // },
  ];

  return (
    <Table className="tw-uppercase " columns={columns} dataSource={data} />
  );
};

export default CommonTable;
