import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { ITransactionResponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { AirplaneFill } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { GoPersonFill } from "react-icons/go";
import { FaEdit, FaPhoneAlt } from "react-icons/fa";
import { BsPersonFillCheck } from "react-icons/bs";
import { Dropdown, DropdownButton } from "react-bootstrap";

const TransactionList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "last_name", "email", "mobile"];

  const handleEditData = useCallback(
    (item: ITransactionResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<ITransactionResponse>[] = useMemo(
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
                  <FaEdit color="blue" size={15} />
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
  return (
    <div className="px-3">
      <CompanyBreadcrumb
        title="Transactions List"
        btnText="Back"
        showBreadcrumb={true}
      />
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Transaction's List</h3>
            {/* <div className="card-toolbar">
              <Link
                to={`../add`}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover tw-text-white hover:tw-text-white tw-font-bold btn-sm"
              >
                <span className="mx-2">Add Transaction</span>
              </Link>
            </div> */}
          </div>
          <div className="card-body">
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.TRANSACTION}
              columns={tableColumns}
            />
            {/* <input type="text" /> */}
            {/* <CommonTable /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransactionList;
