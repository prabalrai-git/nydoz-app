import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { IProductResponse } from "../../../../types/payload.type";
import { toast } from "react-toastify";
import ImageAtom from "../../../shared/atoms/ImageAtom";
import useAuthContext from "../../../../context/auth/useAuthContext";
import { Link } from "react-router-dom";
import LoadingPage from "../../../features/utils/LoadingPage";
import ClientMgmtImage from "../../../../assets/products/clienthub.png";

interface IProps {
  partialPath: string;
}

const MyProductList = (props: IProps) => {
  const { partialPath } = props;
  const { companyInfo } = useAuthContext();

  // console.log(companyInfo, "yo");
  const companyId = companyInfo?.id;
  const proudctListUrl = `${API_ROUTE.GET_COMPANIES}/${companyId}/products`;

  const { data, fetchData, isloading } = useFetch<IProductResponse[]>(
    proudctListUrl,
    true
  );

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
          <div className="d-flex">
            {data.map((product) => (
              <Link
                to={`${partialPath}${product.slug}/dashboard`}
                key={product.id}
                className="flex-wrap cursor-pointer"
              >
                <div className="rounded-2 border border-secondary shadow shadow-sm m-3 p-6 shadow-sm  rounded text-center product-box mx-3">
                  <div className="symbol symbol-100px symbol-lg-100px symbol-fixed position-relative bg-light">
                    {/* <ImageAtom
                      src={ClientMgmtImage}
                      alt={product.name}
                      className="img-fluid card-img-top"
                    /> */}
                    <img
                      src={ClientMgmtImage}
                      alt=""
                      className="img-fluid card-img-top tw-object-contain"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mt-6 mb-4 text-primary">
                      {product.name}
                    </h5>
                  </div>
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
