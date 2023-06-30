import Images from "../../../../constants/Images";
import SideMenu from "./SideMenu";

const Sidebar = () => {
    return (
        <div id='kt_docs_aside' className='docs-aside'>
            {/* <div
                className='docs-aside-logo flex-column-auto h-75px'
                id='kt_docs_aside_logo'>
                <a href='https://preview.keenthemes.com/html/metronic/docs/index'>
                    <img
                        alt='Logo'
                        src={Images.CompanyLogo}
                        className='theme-light-show h-25px'></img>
                </a>
            </div> */}
            <SideMenu />
        </div>
    );
};

export default Sidebar;
