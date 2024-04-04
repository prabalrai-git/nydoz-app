const FooterLayout = () => {
  return (
    <footer className="py-3 my-4 tw-text-black ">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 tw-text-black ">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 tw-text-black ">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 tw-text-black">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 tw-text-black">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 tw-text-black">
            About
          </a>
        </li>
      </ul>
      <p className="text-center ">© 2022 Company, Inc</p>
    </footer>
  );
};

export default FooterLayout;
