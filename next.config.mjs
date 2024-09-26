/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: false, // React Strict Mode is off
 experimental:{
    missingSuspenseWithCSRBailout:false,
 },
 images:{
   remotePatterns:[
      {
         protocol: 'https',
         hostname: 'utfs.io',
       },
   ]
 }
}

export default nextConfig;
