import React from "react";
import { NavLink } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";

interface INavMenu {
    id: number;
    title: string;
    link: string;
    icon: React.ReactNode;
    isCompanyOwnerRequired: boolean;
}

interface IProps {
    NavMenu: INavMenu[];
}

const CompanyMenu = (props: IProps) => {
    const { NavMenu } = props;
    const { isCompanyOwner } = useAuthContext();
    return (
        <ul className='nav nav-pills nav-pills-custom '>
            {NavMenu.map((item: INavMenu) => {
                if (item.isCompanyOwnerRequired) {
                    if (item.isCompanyOwnerRequired && isCompanyOwner) {
                        return (
                            <li
                                key={item.id}
                                className='nav-item my-6 me-3 me-lg-6'
                                role='presentation'>
                                <NavLink
                                    className='nav-link d-flex justify-content-between flex-column flex-center overflow-hidden  w-80px h-85px py-4 hover-green'
                                    data-bs-toggle='pill'
                                    to={item.link}
                                    aria-selected='true'
                                    role='tab'>
                                    <div className='nav-icon'>{item?.icon}</div>
                                    <span className='nav-text text-gray-700 fw-bold fs-6 lh-1'>
                                        {item?.title}
                                    </span>
                                    <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                                </NavLink>
                            </li>
                        );
                    } else {
                        return null;
                    }
                } else {
                    return (
                        <li
                            key={item.id}
                            className='nav-item my-6 me-3 me-lg-6'
                            role='presentation'>
                            <NavLink
                                className='nav-link d-flex justify-content-between flex-column flex-center overflow-hidden  w-80px h-85px py-4 hover-green'
                                data-bs-toggle='pill'
                                to={item.link}
                                aria-selected='true'
                                role='tab'>
                                <div className='nav-icon'>{item?.icon}</div>
                                <span className='nav-text text-gray-700 fw-bold fs-6 lh-1'>
                                    {item?.title}
                                </span>
                                <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                            </NavLink>
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default CompanyMenu;
