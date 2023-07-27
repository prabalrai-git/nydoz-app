import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";

const UserList = () => {
    return (
        <div>
            <CompanyBreadcrumb
                title='User List'
                showBreadcrumb={true}
                btnText='Back'
            />
            <section></section>
        </div>
    );
};

export default UserList;
