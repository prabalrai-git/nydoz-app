export function hasSubdomain(url) {
    // Regular expression to match subdomains
    const subdomainRegex = /^(http[s]?:\/\/)?(?:www\.)?([^.]+)\./;
    // Extract the subdomain from the URL using the regular expression
    const match = url.match(subdomainRegex);
    // If match is found and subdomain is not 'www', return true
    return match !== null && match[2] !== undefined;
}
