/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/chrome',
        destination: 'https://chromewebstore.google.com/detail/skyshare-p2p-file-sharing/bamcpkombebdheapgcdeadnnminhicei',
        permanent: true, // Use true for permanent (308) redirect
      },
    ];
  },
};

export default nextConfig;
