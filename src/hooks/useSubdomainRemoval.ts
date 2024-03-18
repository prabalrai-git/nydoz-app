// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function useSubdomainRemoval() {
//   const navigate = useNavigate();
//   const [hostnameWithoutSubdomain, setHostnameWithoutSubdomain] = useState<
//     string | null
//   >(null);

//   useEffect(() => {
//     const currentHostname = window.location.hostname;
//     const parts = currentHostname.split(".");

//     // Handle cases with potential top-level domains (TLDs) containing dots (e.g., co.uk)
//     if (parts.length > 2 && parts[parts.length - 2].length > 2) {
//       setHostnameWithoutSubdomain(currentHostname);
//       return;
//     }

//     // Remove potential subdomain by keeping only the last two segments (domain and TLD)
//     const withoutSubdomain = parts.slice(-2).join(".");
//     setHostnameWithoutSubdomain(withoutSubdomain);

//     // Check if subdomain removal is necessary
//     if (withoutSubdomain !== currentHostname) {
//       const updatedUrl = `http://${withoutSubdomain}${window.location.pathname}`;
//       navigate(updatedUrl, { replace: true });
//     }
//   }, []);

//   return hostnameWithoutSubdomain;
// }

// export default useSubdomainRemoval;

import { useEffect, useState } from "react";

function useSubdomainRemoval(targetPath = "/") {
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (!isRedirected) {
      // Prevent infinite loop
      const currentUrl = window.location.host;
      const hasSubdomain = currentUrl.split(".").length >= 2;

      if (hasSubdomain) {
        const protocol = currentUrl.split(":")[0];
        const hostname = currentUrl.split("/")[2];
        const newUrl = `${protocol}://${hostname}${targetPath}`;
        window.location.replace(newUrl);
        setIsRedirected(true); // Mark as redirected to avoid loop
      }
    }
  }, [isRedirected, targetPath]);

  return true; // Custom hook doesn't return anything
}

export default useSubdomainRemoval;
