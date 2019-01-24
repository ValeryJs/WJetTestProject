import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const header = {
			view: "toolbar",
			css:"webix_dark",
			cols: [
				{ width: 150 },
				{
					view: "label",
					css: "app-header-label",
					localId: "headerTitle",
					align: "left"
				}
			]
		};

		const menu = {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{value: "Contacts", id: "contacts", icon: "mdi mdi-account-group"},
				{value: "Activities", id: "activities", icon: "mdi mdi-calendar-multiselect"},
				{value: "Settings", id: "settings", icon: "mdi mdi-settings-outline"}
			]
		};

		return {
			css: "app_layout",
			rows: [
				header,
				{
					cols: [
						menu,
						{$subview: true}
					]
				}
			]
		};
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}

	urlChange(view, url) {
		if (url.length > 1) {
			this.$$("headerTitle").setValue(url[1].page);
		}
	}
}
