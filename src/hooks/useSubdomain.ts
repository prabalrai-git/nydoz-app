import { useState, useEffect } from "react";

function useSubdomain() {
    const [subdomain, setSubdomain] = useState<string | undefined>(undefined);
    const url = window.location;

    const getSubdomain = (webUrl: Location) => {
        const subdomain = webUrl.hostname.split(".")[0];
        console.log(subdomain, "subdomain fro URL");
        if (subdomain === "localhost") return setSubdomain(undefined);
        setSubdomain(subdomain);
    };
    useEffect(() => {
        getSubdomain(url);
    }, [url]);
    return subdomain;
}

export default useSubdomain;