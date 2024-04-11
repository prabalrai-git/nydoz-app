import { Statistic } from "antd";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import { MdAttachMoney, MdOutlinePayments } from "react-icons/md";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { GoArrowDown, GoArrowUp, GoPersonFill } from "react-icons/go";
import { ITransactionResponse } from "../../../types/products.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { AirplaneFill } from "react-bootstrap-icons";
import { RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import API_ROUTE from "../../../service/api";
import TanStackTable from "../../shared/molecules/TanStackTable";
import useFetch from "../../../hooks/useFetch";
import { dailyQuotes } from "../../../constants/DailyQuotes";

const Dashboard = () => {
  const navigate = useNavigate();

  const [quote, setQuote] = useState<string>("");

  const getListUrl = API_ROUTE.TRANSACTION;
  const { data, fetchData } = useFetch<ITransactionResponse[]>(
    getListUrl,
    true
  );

  useEffect(() => {
    fetchData();
    setQuote(dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]);
  }, []);

  const handleEditData = useCallback(
    (item: ITransactionResponse) => {
      navigate("edit", {
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
    ],
    [handleEditData]
  );
  const ClientTransaction = () => {
    return (
      <section className="tw-mt-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
          </div>
          <div className="card-body  ">
            {data && (
              <div className="tw-px-8">
                <TanStackTable columns={tableColumnsTransactions} data={data} />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };
  return (
    <div className="tw-mx-3">
      <CompanyBreadcrumb
        title="Client Management Dashboard"
        // btnText="Back"
        showBreadcrumb={true}
      />
      <section className="tw-flex tw-flex-col tw-gap-5">
        <div className="tw-grid tw-grid-rows-3 tw-grid-flow-col  tw-gap-7 lg:tw-grid-cols-2 md:tw-grid-cols-1">
          <div className="card card-custom tw-row-span-3">
            <div className="card-body tw-flex ">
              <div className="tw-flex tw-flex-col tw-gap-10">
                <div>
                  <h1 className="tw-text-2xl tw-font-semibold">
                    Greetings! How are you doing today?
                  </h1>
                  <p className="tw-mt-4 tw-text-gray-500">"{quote}"</p>
                </div>
                <div>
                  <Statistic title="Total Clients" value={112893} />
                  {/* <p className="tw-text-gray-500 tw-mt-5">
                    Manage your clients. Start by creating your client by
                    clicking the button below.
                  </p> */}
                </div>
                <button
                  onClick={() => navigate("../clients/add")}
                  className="tw-self-start tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover tw-text-white tw-p-4 tw-px-8 tw-font-semibold tw-rounded-lg"
                >
                  Create A New Client
                </button>
              </div>
            </div>
          </div>
          <div className="card card-custom ">
            {/* <div className="card-header">
            <h3 className="card-title">Dashboard</h3>
            <div className="card-toolbar"></div>
          </div> */}
            <div className="card-body tw-flex tw-gap-4  -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appBlue tw-flex tw-justify-center tw-items-center tw-px-4 tw-rounded-lg ">
                <MdAttachMoney size={20} color="white" />
              </div>
              <Statistic title="Total Earnings" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            {/* <div className="card-header">
            <h3 className="card-title">Dashboard</h3>
            <div className="card-toolbar"></div>
          </div> */}
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appBrown tw-flex tw-justify-center tw-items-center tw-px-4 tw-rounded-lg ">
                <HiOutlineReceiptRefund size={20} color="white" />
              </div>
              <Statistic title="Total Refunds" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            {/* <div className="card-header">
            <h3 className="card-title">Dashboard</h3>
            <div className="card-toolbar"></div>
          </div> */}
            <div className="card-body card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appRed tw-flex tw-justify-center tw-items-center tw-px-4 tw-rounded-lg ">
                <MdOutlinePayments size={20} color="white" />
              </div>
              <Statistic title="Total Payable Amount" value={112893} />
            </div>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-4 tw-gap-8 tw-mt-2 xsm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ">
                <GoArrowUp size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ">
                <GoArrowUp size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ">
                <GoArrowUp size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ">
                <GoArrowUp size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-4 tw-gap-7 xsm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ">
                <GoArrowDown size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ">
                <GoArrowDown size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ">
                <GoArrowDown size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
          <div className="card card-custom">
            <div className="card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ">
              <div className="tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ">
                <GoArrowDown size={20} />
              </div>
              <Statistic title="Total Sales" value={112893} />
            </div>
          </div>
        </div>
        <div className="card card-custom tw-mt-3">
          <ClientTransaction />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
