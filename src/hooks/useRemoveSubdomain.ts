import { useEffect } from "react";

// a custom-hook to remove the subdomain  from the url and redirect in comman pages like: workspace, login, register, etc

const useRemoveSubdomain = () => {
  useEffect(() => {
    const { protocol, hostname, pathname, search, hash, href } =
      window.location;

    const subdomain = hostname.split(".")[0];
    // return console.log(
    //   "ran",
    //   "ran",
    //   protocol,
    //   hostname,
    //   pathname,
    //   search,
    //   "search",
    //   hash,
    //   "hash",
    //   href,
    //   "window.location",
    //   subdomain
    // );

    // Check if subdomain exists and is not 'localhost'

    // if (href) {
    //   window.location.replace(href);
    // }
    if (subdomain && subdomain !== "localhost") {
      // Construct new URL without subdomain
      const newUrl = `${protocol}//localhost:5174${pathname}${search}${hash}`;

      // return console.log(newUrl);

      // Redirect to the new URL
      window.location.replace(newUrl);
    }
  }, []);

  return true;
};

export default useRemoveSubdomain;
