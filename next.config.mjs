/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [{
            hostname: 'res.cloudinary.com',
            protocol: 'https',
        }],
    },
    
};

export default nextConfig;
