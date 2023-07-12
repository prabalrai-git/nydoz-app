import { Image } from "react-bootstrap";
import { IProductResponse } from "../../../../types/payload.type";

interface IProductItemProps {
    product: IProductResponse;
}

const ProductItem = (props: IProductItemProps) => {
    const { product } = props;
    const { id, name, logo, description } = product;
    return (
        <div key={id} className='card border-hover-primary m-6'>
            <div className='card-header border-0 pt-9'>
                <div className='card-title m-0'>
                    <div className='symbol symbol-100px w-100px bg-light'>
                        <Image src={logo} alt={"logo"} />
                    </div>
                </div>

                <div className='card-toolbar'>
                    <span className='badge badge-light-primary fw-bold me-auto px-4 py-3'>
                        View More
                    </span>
                </div>
            </div>
            <div className='card-body p-9'>
                <div className='fs-3 fw-bold text-dark'>{name}</div>
                <p className='text-gray-400 fw-semibold fs-5 mt-1 mb-7'>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ProductItem;
