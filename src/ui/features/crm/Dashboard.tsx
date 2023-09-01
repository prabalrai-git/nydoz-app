import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";

const Dashboard = () => {
    return (
        <div>
            <CompanyBreadcrumb
                title='Customer Management Dashboard'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section>
                <div className='card card-custom'>
                    <div className='card-header'>
                        <h3 className='card-title'>Dashboard</h3>
                        <div className='card-toolbar'></div>
                    </div>
                    <div className='card-body'></div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
