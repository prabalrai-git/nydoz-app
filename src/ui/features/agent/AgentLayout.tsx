import { Outlet } from "react-router-dom";

const AgentLayout = () => {
    return (
        <div className='bg-white'>
            <Outlet />
        </div>
    );
};

export default AgentLayout;
