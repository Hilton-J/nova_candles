import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
      },
      // "/apiv2": {
      //   target: "https://novapremiumcandles.vercel.app",
      //   changeOrigin: true,
      // },
    },
  },
});