import { useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import { IProductResponse } from "../../../../types/payload.type";
import { toast } from "react-toastify";
import useAuthContext from "../../../../context/auth/useAuthContext";
import { Link } from "react-router-dom";
import LoadingPage from "../../../features/utils/LoadingPage";
import ClientMgmtImage from "../../../../assets/products/clienthub.png";
import InvestMgmtImage from "../../../../assets/products/investmentmanagement.png";
import { Badge } from "antd";
import useFetchWithoutPagination from "../../../../hooks/useFetchWithoutPagination";

interface IProps {
  partialPath: string;
}

const MyProductList = (props: IProps) => {
  const { partialPath } = props;
  const { companyInfo } = useAuthContext();

  const companyId = companyInfo?.id;
  const proudctListUrl = `${API_ROUTE.GET_COMPANIES}/${companyId}/products`;

  const { data, fetchData, isloading } = useFetchWithoutPagination<
    IProductResponse[]
  >(proudctListUrl, true);

  useEffect(() => {
    if (companyId) {
      fetchData();
    } else {
      toast.error("Company Id not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  return (
    <div>
      <section className="card ">
        {isloading && <LoadingPage />}
        {data && data.length > 0 && (
          <div className=" tw-grid xsm:tw-grid-cols-1 tw-gap-8 xl:tw-grid-cols-6 md:tw-grid-cols-3 sm:grid-cols-2  xsm:tw-mx-auto sm:tw-mx-0">
            {data.map((product, index) => (
              <Link
                to={`${partialPath}${product.slug}/dashboard`}
                key={product.id}
                className="flex-wrap cursor-pointer tw-w-[200px]   "
              >
                <div className=" border border-secondary  tw-rounded-md text-center  mx-3 tw-shadow-sm hover:tw-shadow-md tw-drop-shadow-sm tw-h-[155px]  ">
                  <Badge.Ribbon text="Purshased" className="tw-top-1">
                    <div className="  tw-bg-gray-100 tw-w-full tw-flex tw-justify-center tw-py-3  tw-rounded-t-lg tw-border-b-[0.5px] tw-border-gray-300 ">
                      {/* <ImageAtom
                      src={ClientMgmtImage}
                      alt={product.name}
                      className="img-fluid card-img-top"
                    /> */}

                      <img
                        src={index === 0 ? ClientMgmtImage : InvestMgmtImage}
                        alt=""
                        className="tw-object-contain tw-w-[130px] tw-h-[60px] "
                      />
                    </div>
                    {/* <div className="tw-mt-4 tw-bg-gray-300 tw-w-full tw-h-[0.5px] tw-rounded-lg" /> */}

                    <p className=" tw-text-base tw-font-medium tw-font-serif tw-mt-[20px] ">
                      {product.name}
                    </p>
                  </Badge.Ribbon>
                </div>
              </Link>
            ))}
          </div>
        )}
        {data && data?.length === 0 && (
          <div className="py-6">
            <h3 className="text-warning text-center">
              This company is not subscribed to any products .
            </h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyProductList;
