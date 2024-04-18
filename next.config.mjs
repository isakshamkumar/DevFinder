/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: false, // React Strict Mode is off
 experimental:{
    missingSuspenseWithCSRBailout:false
 }
}

export default nextConfig;
