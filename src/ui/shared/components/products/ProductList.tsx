// @ desc Products list component in dashbaord
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { IProductResponse } from "../../../../types/payload.type";
import LoadingPage from "../../../features/utils/LoadingPage";
import ImageAtom from "../../atoms/ImageAtom";
import useHandleShowError from "../../../../hooks/useHandleShowError";

const ProductList = () => {
  const { data, error, isloading, fetchData } = useFetch<IProductResponse[]>(
    API_ROUTE.GET_PRODUCTS_LIST,
    true
  );

  useHandleShowError(error);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tw-w-full ">
      {isloading && <LoadingPage />}
      <section className="">
        <div className="d-flex justify-content-start tw-flex tw-w-full ">
          {data?.map((product: IProductResponse) => (
            <div key={product.id} className="flex-wrap cursor-pointer">
              <div className="rounded-2 border border-secondary  m-3 p-6  rounded text-center product-box mx-3 tw-shadow-sm hover:tw-shadow-md  tw-drop-shadow-sm">
                <div className="symbol symbol-100px symbol-lg-100px symbol-fixed position-relative tw-bg-gray-100 tw-w-full">
                  <ImageAtom
                    src={product.logo}
                    alt={product.name}
                    className="img-fluid card-img-top"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title tw-text-lg tw-font-medium">
                    {product.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductList;
