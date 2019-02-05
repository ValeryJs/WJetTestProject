import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";


if (!BUILD_AS_MODULE){
	webix.ready(() => {
		const app = new JetApp({
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: true,
			start 	: "/top/ContactsList"
		});

		app.render();
		app.use(plugins.Locale);

	});

}


