import { ColumnDef } from "@tanstack/react-table";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { Tabs, Tag } from "antd";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import API_ROUTE from "../../../../service/api";
import {
  ITransactionResponse,
  IClientResponse,
} from "../../../../types/products.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GoPersonFill } from "react-icons/go";
import { AirplaneFill } from "react-bootstrap-icons";
import { FaEdit, FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import useFetch from "../../../../hooks/useFetch";
import { GrMoney } from "react-icons/gr";
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { INavPill } from "../../../../types/app.types";
import { SiGoogledocs } from "react-icons/si";
import ClientsDocuments from "./ClientsDocuments";

type TClientBasicInfo = {
  agent: string;
  applied_position: string;
  country: string;
  deal_amount: string;
  email: string;
  enroll_institute?: string;
  enroll_opening?: string;
  expected_salary_pa: string;
  expected_take_off_date: string;
  name: string;
  phone: string;
  salary_currency_code: string;
  state: string;
  street_address: string;
  visa_type: string;
  visiting_country: string;
  visiting_country_state: string;
};

interface IEachClientReponse extends IClientResponse {
  agent: {
    id: string;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
  };
  street_address: string;
  visa_type: {
    id: string;
    name: string;
  };
}

const ClientDetails = () => {
  const [clientBasicInfo, setClientBasicInfo] = useState<TClientBasicInfo>();

  const { clientId } = useParams();

  const { fetchData, isloading, data, pagination } =
    useFetch<IEachClientReponse>(
      `${API_ROUTE.GET_TRANSACTION}/${clientId}`,
      true
    );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && !isloading) {
      const clientData: TClientBasicInfo = {
        agent: `${data.agent.first_name} ${data.agent.last_name}`, // Concatenate agent first and last name
        applied_position: data.applied_position,
        country: data.country,
        deal_amount: numberWithCommas(data.deal_amount.toString()),
        salary_currency_code: data.salary_currency_code,
        // Convert deal_amount to string
        email: data.email.toString(),
        enroll_institute: "", // Set to empty string as data doesn't have it
        enroll_opening: "", // Set to empty string as data doesn't have it
        expected_salary_pa: numberWithCommas(
          data.expected_salary_pa.toString()
        ), // Convert expected_salary_pa to string
        expected_take_off_date: data.expected_take_off_date.split(" ")[0],
        name: `${data.first_name} ${data.last_name}`, // Concatenate client first and last name
        phone: data.phone_nos.toString(),
        state: data.state,
        street_address: data.street_address,
        visa_type: data.visa_type.name,
        visiting_country: data.visiting_country,
        visiting_country_state: data.visiting_country_state,
      };
      setClientBasicInfo(clientData);
    }
  }, [data]);

  const searchFilter: string[] = [
    "payment_method",
    "physical_bill_number",
    "financial_account",
    "transaction_type",
  ];

  function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const navigate = useNavigate();
  const handleEditData = useCallback(
    (item: ITransactionResponse) => {
      navigate("../../transactions/edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumnsTransactions: ColumnDef<ITransactionResponse>[] = useMemo(
    () => [
      {
        accessorKey: "sn",
        header: () => <div>S.N</div>,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "payment_method",
        header: () => (
          <div className="tw-flex tw-gap-2">
            <GoPersonFill size={16} />
            <p>Payment Method</p>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="d-flex align-items-center ">
              {info.getValue<Record<string, string>>().name}
            </div>
          );
        },
      },

      {
        accessorKey: "financial_account",
        header: () => (
          <div className="tw-flex tw-gap-2">
            <AirplaneFill size={14} />
            <p>Financial Account</p>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="text-center tw-flex tw-justify-start">
              {info.getValue<Record<string, string>>().institute_name}
            </div>
          );
        },
      },
      {
        accessorKey: "bill_number",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <i className="bi bi-telephone me-2 fs-7"></i> */}
            <FaPhoneAlt size={14} />
            <span>Bill Number</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },

      {
        accessorKey: "physical_bill_number",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={16} className="mx-2" /> */}
            <RiFlagFill size={16} />
            <span>Physical Bill Number</span>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="text-center tw-flex tw-flex-start">
              {info.getValue<string>()}
            </div>
          );
        },
      },
      {
        accessorKey: "amount",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={16} className="mx-2" /> */}
            <BsPersonFillCheck size={18} />
            <span>Amount</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      // {
      //   accessorKey: "payment_receipt_files",
      //   header: () => (
      //     <div className="tw-flex tw-gap-2">
      //       {/* <Flag size={16} className="mx-2" /> */}
      //       <BsPersonFillCheck size={18} />
      //       <span>Payment Receipt Files</span>
      //     </div>
      //   ),
      //   cell: (info) => {
      //     return <div>{info.getValue<string>()}</div>;
      //   },
      // },
      {
        accessorKey: "remarks",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={16} className="mx-2" /> */}
            <BsPersonFillCheck size={18} />
            <span>Remarks</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "transaction_type",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={16} className="mx-2" /> */}
            <BsPersonFillCheck size={18} />
            <span>Transaction Type</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<Record<string, string>>().name}</div>;
        },
      },
      // {
      //   accessorKey: "custom_field_values",
      //   header: () => (
      //     <div className="tw-flex tw-gap-2">
      //       {/* <Flag size={16} className="mx-2" /> */}
      //       <BsPersonFillCheck size={18} />
      //       <span>Custom Field Values</span>
      //     </div>
      //   ),
      //   cell: (info) => {
      //     return (
      //       <div>
      //         {info.getValue<Partial<IAgentResponse>>() ? (
      //           <div>
      //             <span>
      //               {" "}
      //               {info.getValue<Partial<IAgentResponse>>()?.first_name}
      //             </span>
      //             <span>
      //               {" "}
      //               {info.getValue<Partial<IAgentResponse>>()?.last_name}
      //             </span>
      //           </div>
      //         ) : (
      //           <Tag>NA</Tag>
      //         )}
      //       </div>
      //     );
      //   },
      // },

      {
        accessorKey: "action",
        header: () => (
          <div className="text-center">
            <span>Actions</span>
          </div>
        ),
        cell: (info) => (
          <div className="tw-flex tw-justify-center">
            <DropdownButton
              variant="secondary"
              size="sm"
              id="dropdown-basic-button"
              title="Action"
            >
              <Dropdown.Item
                onClick={() => handleEditData(info?.row?.original)}
              >
                {/* <button
                title="Edit"
                onClick={() => handleEditData(info?.row?.original)}
                className="tw-flex tw-justify-between tw-gap-2 tw-font-bold "
              >
                <FaRegEdit color="blue" size={15} />
              </button> */}
                <button
                  title="Edit"
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold "
                >
                  <FaRegEdit color="blue" size={15} />

                  <p>Edit</p>
                </button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => window.alert("will delete later")}>
                <button className="tw-flex tw-justify-between tw-gap-2 tw-font-bold">
                  <RiDeleteBin5Line color="red" size={15} />
                  <p>Delete</p>
                </button>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        ),
        footer: (info) => info.column.id,
      },
    ],
    [handleEditData]
  );

  const ClientTransaction = () => {
    return (
      <section className="tw-mt-10">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"> Transactions</h3>
          </div>
          <div className="card-body  ">
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={`${API_ROUTE.GET_TRANSACTION}/${clientId}/transactions`}
              columns={tableColumnsTransactions}
            />
          </div>
        </div>
      </section>
    );
  };

  const navpills: INavPill[] = [
    {
      id: 2,
      title: "Clients Douments",
      icon: <SiGoogledocs size={18} className="tw-mr-2 tw-self-center" />,
      children: <ClientsDocuments />,
    },
    {
      id: 1,
      title: "Clients Transactions",
      icon: <GrMoney size={18} className="tw-mr-2 tw-self-center" />,
      children: <ClientTransaction />,
    },
  ];
  return (
    <>
      {data ? (
        <>
          <CompanyBreadcrumb
            title="Clients Details"
            btnText="Back"
            showBreadcrumb={false}
          />
          <div className="tw-px-2">
            <section className="tw-mt-10">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Basic Information</h3>
                </div>
                <div className="card-body tw-grid xl:tw-grid-cols-5 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-9  ">
                  {clientBasicInfo &&
                    Object.entries(clientBasicInfo).map(
                      ([key, value], index) => (
                        <div key={index} className="  ">
                          <p className="tw-mr-2 tw-mb-2 tw-uppercase tw-text-sm tw-font-semibold tw-text-gray-400">
                            {key.replace(/_/g, " ")}
                          </p>
                          {value ? (
                            <p className="tw-text-base tw-capitalize">
                              {value.toString()}
                            </p>
                          ) : (
                            <Tag color="red">N/A</Tag>
                          )}{" "}
                        </div>
                      )
                    )}
                </div>
              </div>
            </section>

            <Tabs
              // type="card"
              className="tw-py-10 "
              defaultActiveKey="2"
              items={navpills.map((item) => {
                return {
                  key: item.id,
                  label: item.title,
                  children: item.children,
                  icon: item.icon,
                };
              })}
            />
          </div>
        </>
      ) : (
        isloading && (
          <div className="text-center my-6 px-3">
            <Spinner variant="warning" />
          </div>
        )
      )}
    </>
  );
};

export default ClientDetails;
