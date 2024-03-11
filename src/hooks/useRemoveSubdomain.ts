import { useEffect } from "react";

// a custom-hook to remove the subdomain  from the url and redirect in comman pages like: workspace, login, register, etc

const useRemoveSubdomain = () => {
  useEffect(() => {
    const { protocol, hostname, pathname, search, hash, href } =
      window.location;

    // console.log(window.location, "window.location", href);

    const subdomain = hostname.split(".")[0];

    // Check if subdomain exists and is not 'localhost'

    // if (href) {
    //   window.location.replace(href);
    // }
    if (subdomain && subdomain !== "localhost") {
      // Construct new URL without subdomain
      const newUrl = `${protocol}//localhost:5174${pathname}${search}${hash}`;

      // Redirect to the new URL
      window.location.replace(newUrl);
    }
  }, []);

  return null;
};

export default useRemoveSubdomain;
