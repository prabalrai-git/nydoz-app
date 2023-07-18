function getSubdomain(url: string) {
    // Regular expression pattern to match the subdomain
    // eslint-disable-next-line no-useless-escape
    const subdomainPattern = /^(?:https?:\/\/)?([^\/]+)/i;
    const match = url.match(subdomainPattern);
    return match ? match[1] : undefined;
}

export default getSubdomain;
