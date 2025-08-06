import { createApp } from "vue";
import App from "@/App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { ConfigSchema } from "@/config";

window.config = await fetch("/config.json")
	.then((res) => res.json())
	.then((body) => ConfigSchema.parse(body));

const app = createApp(App);

app.use(
	createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes: [],
	}),
);

app.mount("#app");
