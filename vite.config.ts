import { defineConfig } from "vite";

export default defineConfig({
	root: "./src",
	build: {
		rollupOptions: {
			input: ["./src/index.html", "./src/new-tab.html"],
		},
		outDir: "../dist",
	},
	publicDir: "../public",
});
