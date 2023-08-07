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
                <div className='card-header'>
                    <div className='card-title'>My Products</div>
                    <div className='card-toolbar'>
                        <button className='btn btn-secondary text-primary btn-sm '>
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProducts;
