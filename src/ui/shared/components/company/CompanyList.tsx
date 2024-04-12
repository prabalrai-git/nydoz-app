import { useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import { ICompanyResponse } from "../../../../types/payload.type";
import ImageAtom from "../../atoms/ImageAtom";
import { Link } from "react-router-dom";
import DynamicLink from "../../molecules/DynamicLink";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useFetchWithoutPagination from "../../../../hooks/useFetchWithoutPagination";

const CompanyListCard = () => {
  const { data, fetchData, isloading } = useFetchWithoutPagination<
    ICompanyResponse[]
  >(API_ROUTE.GET_COMPANIES, true);

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card h-xl-100">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-dark">Company Details</span>

          <span className="text-muted mt-2 fw-semibold fs-7 tw-capitalize">
            {data && data.length > 0
              ? `${data?.length} companies in total`
              : "0 company in total"}
          </span>
        </h3>
        {/* <div className='card-toolbar'>
                    <a className='btn btn-sm btn-light'>View All</a>
                </div> */}
      </div>
      <div className="tw-w-[87%] tw-mx-auto">
        <hr className="bg-light" />
      </div>
      <div className="card-body pt6 ">
        {/* <h3>hasSubdomain :{hasSubdomain.toString()}</h3> */}
        {data?.map((item: ICompanyResponse) => {
          return (
            <DynamicLink
              key={item.id}
              subdomain={item.subdomain}
              pathName={`company/dashboard?token=${localStorage.getItem(
                "token"
              )}`}
              // pathName={`dashboard`}
              className="d-flex flex-stack mb-3 cursor-pointer tw-bg-gray-100 tw-py-4 tw-px-4  hover:tw-shadow-md tw-rounded-lg"
            >
              <div className="symbol symbol-40px me-4">
                <ImageAtom
                  src={item.logo}
                  className="h-50px w-50px"
                  alt={item.name}
                />
              </div>

              <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                <div className="flex-grow-1 me-2 tw-flex tw-flex-col ">
                  <a className="text-gray-800   fw-bold tw-uppercase ">
                    {item.name.length > 15
                      ? item.name.slice(0, 15) + "..."
                      : item.name}
                  </a>
                  <p className="  tw-text-gray-500  ">
                    {item.website.length > 35
                      ? item.website.slice(0, 35) + "..."
                      : item.website}
                  </p>
                </div>

                <div className="btn btn-sm btn-icon  w-30px h-30px tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover">
                  <MdKeyboardDoubleArrowRight color="white" size={20} />
                </div>
              </div>
            </DynamicLink>
          );
        })}

        {!isloading && data?.length === 0 && (
          <div className="row">
            <div>
              <h4>No Company Found . Please create company to buy products.</h4>
              <div className="float-end">
                <Link className="btn btn-primary my-3" to="create-company">
                  Create Company
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyListCard;
