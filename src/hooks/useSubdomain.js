import { useState, useEffect } from "react";
function useSubdomain() {
    const [subdomain, setSubdomain] = useState(undefined);
    const url = window.location;
    const getSubdomain = (webUrl) => {
        const subdomain = webUrl.hostname.split(".")[0];
        if (subdomain === "localhost")
            return setSubdomain(undefined);
        setSubdomain(subdomain);
    };
    useEffect(() => {
        getSubdomain(url);
    }, [url]);
    return subdomain;
}
export default useSubdomain;
