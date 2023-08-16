import { NavLink } from "react-router-dom";
import useWebSetting from "../../../../context/useWebSetting";
import { ISidebarMenu } from "../../../../types/app.types";
import CMBoard from "../../../../assets/products/client-logo.png";
import { useState } from "react";

interface IProps {
    sidebarMenuList: ISidebarMenu[];
}

const ProductSideMenu = (props: IProps) => {
    const { sidebarMenuList } = props;
    const [showSidebar, setShowSidebar] = useState(true);

    const sidebarClassName = showSidebar ? "slide-in" : "slide-out";

    return (
        <div className={`docs-aside ${sidebarClassName}`}>
            <div className='docs-aside-menu flex-column-fluid p-3 bg-white'>
                <div
                    className='hover-scroll-overlay-y mt-5 mb-5 mt-lg-0 mb-lg-5 pe-lg-n2 me-lg-2'
                    id='kt_docs_aside_menu_wrapper'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-height='auto'
                    data-kt-scroll-dependencies='#kt_docs_aside_logo'
                    data-kt-scroll-wrappers='#kt_docs_aside_menu'
                    data-kt-scroll-offset='10px'>
                    <div
                        id='#kt_docs_aside_menu'
                        data-kt-menu='true'
                        className='menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500'>
                        <div className='menu-item'>
                            <NavLink
                                className='menu-link'
                                to='/workspace/sabkura/products/crm/dashboard'>
                                <span className='menu-title fs-3 fw-bolder'>
                                    <img
                                        className='img-fluid'
                                        src={CMBoard}
                                        alt='CM'
                                    />
                                </span>
                            </NavLink>
                        </div>
                        {sidebarMenuList.map((item: ISidebarMenu) => (
                            <div key={item.id} className='menu-item'>
                                <NavLink className='menu-link' to={item.link}>
                                    <span className='fs-6'>{item.icon}</span>
                                    <span className='menu-title'>
                                        {item.title}
                                    </span>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSideMenu;
