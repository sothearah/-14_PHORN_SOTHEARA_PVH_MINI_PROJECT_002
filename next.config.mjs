// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactCompiler: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**', //allows image from any https website
//       },
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  //allows image from any https website
      }, 
    ],
  },
};

export default nextConfig;