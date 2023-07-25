import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";

const Dashboard = () => {
    return (
        <div>
            <CompanyBreadcrumb
                title='Customer Management Dashboard'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section></section>
        </div>
    );
};

export default Dashboard;
