import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {

  env: {

    //Dev

    API_URL: 'https://beauty-back.ru.tuna.am'

  },
  images: {
    domains: ['f1.dikidi.net', 'gallery.alexandersakulin.com', "n1s1.hsmedia.ru", 'localhost', 'beauty-back.ru.tuna.am']
  }
};

export default nextConfig;
