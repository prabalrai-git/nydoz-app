import { Image } from "react-bootstrap";
import { IProductResponse } from "../../../../types/payload.type";
import { Link } from "react-router-dom";

interface IProductItemProps {
    product: IProductResponse;
    link?: string;
}

const ProductItem2 = (props: IProductItemProps) => {
    const { product, link } = props;
    const { id, name, logo, description } = product;
    return (
        <Link
            to={link ? `${link}/${id}` : `product/${id}`}
            key={id}
            title="Click to view product's details"
            className='nav-link nav-link-border-solid  border '>
            <div className='card card-flush flex-row-fluid p-41 mw-100'>
                <div className='card-body text-center'>
                    <div className='symbol symbol-100px w-100px bg-light'>
                        <Image src={logo} alt={"logo"} />
                    </div>

                    <div className='mt-6 mb-2'>
                        <div className='text-center'>
                            <span className='fw-bold text-gray-800 cursor-pointer text-hover-primary fs-3 fs-xl-1 '>
                                {name}
                            </span>
                            <span className='text-gray-400 fw-semibold d-block fs-6 mt-n1'>
                                {description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem2;
