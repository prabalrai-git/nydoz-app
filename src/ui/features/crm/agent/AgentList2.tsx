import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { IAgentResponse } from "../../../../types/products.types";
import BASE_URL from "../../../../constants/AppSetting";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { GoPersonFill } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { RiFlagFill } from "react-icons/ri";
import { Image, Space } from "antd";
import { GrView } from "react-icons/gr";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";

const AgentList2 = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "email", "mobile"];

  const handleEditData = useCallback(
    (item: IAgentResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );
  const onDownload = (src: string) => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  const tableColumns: ColumnDef<IAgentResponse>[] = useMemo(
    () => [
      {
        accessorKey: "sn",
        header: () => <div>S.N</div>,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "Name",
        header: () => (
          <div className="tw-flex tw-gap-2">
            <GoPersonFill size={16} />
            <p>Name</p>
          </div>
        ),
        cell: (info) => {
          const url = `${BASE_URL}${info?.row?.original?.profile_picture}`;
          return (
            <div className="d-flex align-items-center">
              <div className="symbol symbol-40px me-3">
                <Image
                  className="tw-object-cover tw-rounded-lg"
                  width={40}
                  height={40}
                  preview={{
                    mask: <GrView />,
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <DownloadOutlined onClick={() => onDownload(url)} />
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                  src={url}
                />
                {/* <img src={url} className="" alt="profile picture" /> */}
              </div>
              <div className="d-flex justify-content-start flex-column">
                <a
                  href="#"
                  className="text-dark fw-bold text-hover-primary mb-1 fs-6"
                >
                  {info?.row?.original?.first_name}{" "}
                  {info?.row?.original?.last_name}
                </a>
                <span className="text-muted fw-semibold d-block fs-7">
                  {info?.row?.original?.email}
                </span>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "mobile",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <i className="bi bi-telephone me-2 fs-7"></i> */}
            <FaPhoneAlt size={14} />
            <span>Mobile Number</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },

      {
        accessorKey: "country",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={16} className="mx-2" /> */}
            <RiFlagFill size={16} />

            <span>Country</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
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
          <div className="text-center">
            <DropdownButton
              variant="secondary"
              size="sm"
              id="dropdown-basic-button"
              title="Action"
            >
              <Dropdown.Item>
                <div className="menu-link">
                  <span className="mx-2">View</span>
                  <i className="bi bi-box-arrow-up-right text-primary "></i>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div
                  onClick={() => handleEditData(info?.row?.original)}
                  className="menu-link"
                >
                  <span className="mx-2">Edit</span>
                  <i className="bi bi-pencil-square text-info"></i>
                </div>
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
    <div className=" px-3">
      <CompanyBreadcrumb title="Agents" btnText="Back" showBreadcrumb={true} />
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Agent's List</h3>
            <div className="card-toolbar">
              <Link
                to={`add`}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
              >
                <span className="mx-2 tw-text-white">Add Agent</span>
              </Link>
            </div>
          </div>
          <div className="tw-p-6 tw-px-8">
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.CM_AGENTS}
              columns={tableColumns}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentList2;
