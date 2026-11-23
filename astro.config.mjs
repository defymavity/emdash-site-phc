import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";
import { fileURLToPath } from "node:url";

// Local plugin: color picker for theme color fields (see plugins/color-picker)
const local_plugin = (file) => fileURLToPath(new URL(`./plugins/color-picker/${file}`, import.meta.url));
const phcColors = {
	id: "phc-colors",
	version: "1.0.0",
	format: "native",
	displayName: "PHC Color Picker",
	entrypoint: local_plugin("index.ts"),
	adminEntry: local_plugin("admin.tsx"),
	fieldWidgets: [{ name: "color", label: "Color picker", fieldTypes: ["string"] }],
};

export default defineConfig({
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: sqlite({ url: "file:./data.db" }),
			storage: local({
				directory: "./uploads",
				baseUrl: "/_emdash/api/media/file",
			}),
			plugins: [phcColors],
		}),
	],
	devToolbar: { enabled: false },
});
