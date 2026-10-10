import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        details: fileURLToPath(new URL("./details.html", import.meta.url)),
        watchlist: fileURLToPath(new URL("./watchlist.html", import.meta.url)),
      },
    },
  },
});
