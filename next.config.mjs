import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {

  env: {

    // API_URL: 'http://localhost:8888'


    //Dev

    API_URL: 'https://beauty-back.ru.tuna.am'

  },
  images: {
    domains: ['f1.dikidi.net', 'gallery.alexandersakulin.com', "n1s1.hsmedia.ru", 'localhost', 'beauty-back.ru.tuna.am', 'api.mybeautybooking.ru']
  }
};

export default nextConfig;
