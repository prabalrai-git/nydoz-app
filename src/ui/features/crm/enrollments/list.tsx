import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import API_ROUTE from "../../../../service/api";
import { IEnrollmentResponse } from "../../../../types/products.types";
import BASE_URL from "../../../../constants/AppSetting";

import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiAddBoxLine, RiFlagFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { Dropdown, DropdownButton } from "react-bootstrap";

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
import { MdOutlineAddToPhotos } from "react-icons/md";

const List = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "email", "mobile"];

  const handleEditData = useCallback(
    (item: IEnrollmentResponse) => {
      navigate("../edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const handleView = useCallback(
    (id: string) => {
      navigate(`../view/${id}/details`);
    },
    [navigate]
  );

  const handleOpening = useCallback(
    (id: string) => {
      navigate(`../view/${id}/add-enrollments-openings`);
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

  const tableColumns: ColumnDef<IEnrollmentResponse>[] = useMemo(
    () => [
      {
        accessorKey: "sn",
        header: () => <div>S.N</div>,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "Name",
        header: () => (
          <div className="tw-flex">
            <i className="bi bi-building-fill-add fs-7 me-2 tw-self-center"></i>
            <span>Institute's Name</span>
          </div>
        ),
        cell: (info) => {
          const url = `${BASE_URL}${info?.row?.original?.logo}`;
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
                {/* <img src={url} className="" alt="Logo" /> */}
              </div>
              <div className="d-flex justify-content-start flex-column">
                <div className="text-dark fw-bold text-hover-primary mb-1 fs-7">
                  {info?.row?.original?.name}
                </div>
                <a
                  href={info?.row?.original?.website}
                  className="text-muted fw-semibold d-block fs-7"
                >
                  {info?.row?.original?.website}
                </a>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "website",
        header: () => (
          <div className="tw-flex">
            <i className="bi bi-globe me-2 fs-7 tw-self-center"></i>
            <span>Website</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },

      {
        accessorKey: "state",
        header: () => (
          <div className="tw-flex">
            <i className="bi bi-geo-alt me-2 fs-7 tw-self-center"></i>
            <span>State</span>
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
            {/* <Flag size={14} className="mx-2 tw-self-center" /> */}
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
          <div className="d-flex justify-content-center tw-flex tw-gap-2">
            <DropdownButton
              variant="secondary"
              size="sm"
              id="dropdown-basic-button"
              title="Action"
            >
              <Dropdown.Item
                onClick={() => handleView(info?.row?.original?.id)}
              >
                {/* <button
                  title="Edit"
                  onClick={() => handleEditData(info?.row?.original)}
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold "
                >
                  <FaRegEdit color="blue" size={15} />
                </button> */}

                <button
                  title="view"
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold "
                >
                  {/* <i className="bi bi-box-arrow-up-right "></i> */}
                  <GoEye color={"green"} size={15} />
                  <p>View</p>
                </button>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleEditData(info?.row?.original)}
              >
                <button
                  title="Edit"
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold"
                >
                  {/* <i className="bi bi-pencil-square "></i> */}
                  <FaRegEdit color="blue" size={15} />
                  <p>Edit</p>
                </button>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleOpening(info?.row?.original?.id)}
              >
                {/* <button
                  title="Edit"
                  onClick={() => handleEditData(info?.row?.original)}
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold "
                >
                  <FaRegEdit color="blue" size={15} />
                </button> */}
                <button
                  title="view"
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold tw-items-center "
                >
                  <MdOutlineAddToPhotos color={"#3da7eb"} size={15} />

                  <p> Add Openings</p>
                </button>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        ),
        footer: (info) => info.column.id,
      },
    ],
    [handleEditData, handleOpening, handleView]
  );

  return (
    <div className=" px-3">
      <CompanyBreadcrumb
        title="Institute List"
        btnText="Back"
        showBreadcrumb={true}
      />
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Institute's List</h3>
            <div className="card-toolbar">
              <Link
                to={"../add"}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
              >
                <span className="mx-2 tw-text-white">Add Institute</span>
              </Link>
            </div>
          </div>
          <div className="card-body ">
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.CM_ENROLLMENT}
              columns={tableColumns}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default List;
