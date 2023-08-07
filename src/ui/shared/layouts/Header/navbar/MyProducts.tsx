interface IProps {
    showProduct: boolean;
}

const MyProducts = (props: IProps) => {
    const { showProduct } = props;

    return (
        <div
            className={
                showProduct
                    ? "dropdown-content d-block"
                    : "dropdown-content d-none"
            }>
            <div className='card'>
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
