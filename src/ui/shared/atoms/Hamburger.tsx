import useWebSetting from "../../../context/useWebSetting";

const Hamburger = () => {
  const { dispatchWebSetting } = useWebSetting();

  const handleToggleSidebar = () => {
    dispatchWebSetting({
      type: "TOGGLE_PRODUCT_SIDEBAR",
    });
  };
  return (
    <div
      onClick={handleToggleSidebar}
      className="btn btn-icon btn-flex btn-active-color-primary"
      id="kt_docs_aside_toggle"
    >
      <i className="ki-duotone ki-abstract-14 fs-2">
        <span className="path1"></span>
        <span className="path2"></span>
      </i>
    </div>
  );
};

export default Hamburger;
