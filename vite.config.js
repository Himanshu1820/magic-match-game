import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true, // This will automatically open the browser
  },
  plugins: [react(), tailwindcss()],
});
