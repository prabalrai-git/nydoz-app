import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { IoMdPerson } from "react-icons/io";
import { FaEdit, FaPlane } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RiDeleteBin5Line, RiDeleteBin6Fill, RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import { Select } from "antd";
import { MdDeleteForever } from "react-icons/md";

type InputRef = GetRef<typeof Input>;

interface DataType {
  key: number;
  name: string;
  goingAbroad: boolean;
  mobile: string;
  visitingCountry: string;
  agent: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: 1,
    name: "John Brown",
    goingAbroad: true,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: 2,
    name: "John Brown",
    goingAbroad: false,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: 3,
    name: "John Brown",
    goingAbroad: true,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: 4,
    name: "John Brown",
    goingAbroad: false,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: 5,
    name: "John Brown",
    goingAbroad: true,
    mobile: "9818158172",
    visitingCountry: "India",
    agent: "Nydoz",
  },
  {
    key: 6,
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

  const columns: TableColumnsType<DataType> = [
    {
      title: "S.N",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key,
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
            <FaPlane size={14} />
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
            <FaPhone size={12} />
            <p>Mobile Number</p>
          </div>
        );
      },
      dataIndex: "mobile",
      key: "mobile",
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
    },
    {
      title: () => {
        return (
          <div className="tw-flex tw-justify-left tw-items-center tw-gap-2 ">
            <BsPersonFillCheck size={16} />
            <p>Agent</p>
          </div>
        );
      },
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "Action",
      dataIndex: "goingAbroad",
      key: "goingAbroad",
      render: () => (
        <div className="tw-flex tw-gap-3 tw-justify-center">
          <Tooltip title="Edit">
            <div className="tw-bg-appBlue tw-w-[35px] tw-flex tw-justify-center tw-p-2 tw-rounded-lg hover:tw-bg-appBlueHover tw-cursor-pointer">
              <FaEdit color="white" size={15} />
            </div>
          </Tooltip>
          <Tooltip title="Delete">
            <div className="tw-bg-red-500 tw-w-[35px] tw-flex tw-justify-center tw-p-2 tw-rounded-lg hover:tw-bg-red-700 tw-cursor-pointer">
              <MdDeleteForever color="white" size={18} />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="tw-flex tw-mb-5 tw-justify-end tw-gap-5 tw-h-[40px] tw-absolute tw-right-10 tw-z-50 ">
        <Select
          showSearch
          allowClear
          style={{ width: 350, height: 40 }}
          placeholder="Search by"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          options={[
            {
              value: "1",
              label: "Name",
            },
            {
              value: "2",
              label: "Mobile Number",
            },
          ]}
        />

        <Input allowClear style={{ width: 350 }} placeholder="Search value" />
        <button className="tw-bg-appBlue hover:tw-bg-appBlueHover tw-text-white tw-font-bold tw-px-6 tw-rounded-lg">
          Search
        </button>
      </div>
      <Table
        bordered={true}
        className="tw-uppercase "
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["topLeft"],
          pageSize: 5,
          total: 100,
        }}
      />
    </>
  );
};

export default CommonTable;
