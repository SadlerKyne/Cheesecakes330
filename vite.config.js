import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        order: resolve(__dirname, 'order/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        reviews: resolve(__dirname, 'reviews/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        checkout: resolve(__dirname, 'checkout/index.html'),
        productDetail: resolve(__dirname, 'product-detail/index.html'), // <-- ADD THIS LINE
      },
    },
  },
});
