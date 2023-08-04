import { useEffect } from "react";
import { useBoolean } from "usehooks-ts";

interface IProps {
    showProduct: boolean;
}

const MyProducts = (props: IProps) => {
    const { showProduct } = props;

    useEffect(() => {
        console.log(showProduct, "showProduct");
    }, [showProduct]);

    return (
        <div className='dropdown-content '>
            <div className='card py-2 px-5'>
                <div className='card'>
                    <div className='card-header'>
                        <div className='card-title'>My Products</div>
                        <div className='card-toolbar'>
                            <button className='btn btn-info btn-sm '>
                                View All
                            </button>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='mh-450px scroll-y me-n5 pe-5'></div>
                </div>
            </div>
        </div>
    );
};

export default MyProducts;
