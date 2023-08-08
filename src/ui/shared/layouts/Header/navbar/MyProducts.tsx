interface IProps {
    showProduct: boolean;
    children?: React.ReactNode;
}

const MyProducts = (props: IProps) => {
    const { showProduct, children } = props;

    return (
        <div
            className={
                showProduct
                    ? "dropdown-content d-block"
                    : "dropdown-content d-none"
            }>
            <div className='dropdown-wrapper'>{children}</div>
        </div>
    );
};

export default MyProducts;
