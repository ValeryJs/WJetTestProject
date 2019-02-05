import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const header = {
			view: "toolbar",
			css: "webix_dark",
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
				{value: _("Contacts"), id: "ContactsList", icon: "mdi mdi-account-group"},
				{value: _("Activities"), id: "activities", icon: "mdi mdi-calendar-multiselect"},
				{value: _("Settings"), id: "settings", icon: "mdi mdi-settings-outline"}
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
			const _ = this.app.getService("locale")._;
			this.$$("headerTitle").setValue(_(url[1].page));
		}
	}
}
