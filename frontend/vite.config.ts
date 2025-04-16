import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:9001",
        changeOrigin: true,
      },
      // "/apiv2": {
      //   target: "https://novapremiumcandles.vercel.app",
      //   changeOrigin: true,
      // },
    },
  },
});
