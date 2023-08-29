// home page no login

import ProductList from "../../shared/components/products/ProductList";

const Home = () => {
    return (
        <div className='bg-white h-100vh'>
            <section className='container-fluid my-3'>
                <div className='container my-3'>
                    <h3 className='py-6'>Welcome to Nydoz</h3>
                </div>
                <div className='container '>
                    <h3>Product List</h3>
                </div>
                <ProductList />
            </section>
        </div>
    );
};

export default Home;
