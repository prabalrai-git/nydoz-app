interface IProps {
    showProduct: boolean;
}

const MyAccount = (props: IProps) => {
    const { showProduct } = props;

    return (
        <div
            className={
                showProduct
                    ? "dropdown-content d-block"
                    : "dropdown-content d-none"
            }
            data-kt-menu='true'
            data-popper-placement='bottom-end'
            data-popper-reference-hidden=''>
            <div className='card'>
                <img
                    style={{ height: "200px" }}
                    src='https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                    className='card-img-top'
                    alt='...'
                />
                <div className='card-body'>
                    <h5 className='card-title'>Card title</h5>
                    <h6 className='card-subtitle mb-2 text-muted '>
                        Card subtitle
                    </h6>
                    <p className='card-text'>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    b5
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
