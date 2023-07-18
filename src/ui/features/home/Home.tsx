// home page no login

import ProductList from "../../shared/components/products/ProductList";

const Home = () => {
    return (
        <div>
            <section className='container-fluid my-3'>
                <div className='container my-3'>
                    <h3 className='py-6'>Welcom to Nydoz</h3>
                </div>

                <ProductList />
            </section>
        </div>
    );
};

export default Home;
