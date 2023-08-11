import { NavLink } from "react-router-dom";
import Images from "../../../../../../constants/Images";

const AllPublicProductsDropdown = () => {
    const productList = [
        {
            name: "Client Management",
            path: "client-management",
            imageLink: Images.ClientHubLogo,
        },
        {
            name: "Investment Management",
            path: "investment-mangement",
            imageLink: Images.InvestmentManagementLogo,
        },
    ];

    return (
        <>
            {productList.map((product, index: number) => (
                <div key={index}>
                    <NavLink to={product.imageLink}>
                        <div className='d-flex align-items-center  btn btn-bg-light btn-color-primary btn-sm mb-3'>
                            <img
                                className='dropdown-img'
                                src={product.imageLink}
                                alt='product'
                            />
                            <span className='fw-bold fs-7'>{product.name}</span>
                        </div>
                    </NavLink>
                </div>
            ))}
        </>
    );
};

export default AllPublicProductsDropdown;
