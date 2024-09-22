import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [ 'f1.dikidi.net', 'gallery.alexandersakulin.com', "n1s1.hsmedia.ru" ]
  }
};

export default nextConfig;
