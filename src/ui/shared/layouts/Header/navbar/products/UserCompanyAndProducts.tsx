import useAuthContext from "../../../../../../context/auth/useAuthContext";
import { Link } from "react-router-dom";

const UserCompanyAndProducts = () => {
    const { userCompanyAndItsProducts } = useAuthContext();

    return (
        <>
            {userCompanyAndItsProducts?.companies?.map((companyItem) => {
                if (companyItem?.products?.length === 0) return null;
                return (
                    <div
                        key={companyItem.id}
                        className=' border-secondary  border-bottom  py-2'>
                        <h6 className='fs-14 fw-bolder my-2'>
                            {companyItem.name}
                        </h6>
                        <div className='row'>
                            {companyItem?.products?.map((productItem) => (
                                <div
                                    className='col-12 col-md-6 cursor-pointer'
                                    key={productItem.id}>
                                    <div className='rounded-2 border border-secondary shadow shadow-sm m-1 p-3 shadow-sm  rounded text-center'>
                                        <div className='d-flex align-items-center'>
                                            <div className='symbol symbol-50px me-3'>
                                                <img
                                                    src={productItem.logo}
                                                    alt={productItem.name}
                                                />
                                            </div>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <Link
                                                    target='_blank'
                                                    to={`/${companyItem.subdomain}/${productItem.slug}/dashboard`}
                                                    className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                    {productItem.name}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default UserCompanyAndProducts;
