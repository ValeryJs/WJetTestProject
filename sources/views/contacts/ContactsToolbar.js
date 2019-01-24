import {JetView} from "webix-jet";

export default class ContactsToolbar extends JetView {
	config() {
		return {
			view: "toolbar",
			borderless: true,
			padding: 15,
			cols: [
				{
					view: "label",
					label: "Name Surname",
					css: "app-user-name",
					localId: "userName",
					align: "left"
				},
				{
					view: "button",
					label: "Delete",
					width: 100,
					type: "iconButton",
					icon: "mdi mdi-trash-can-outline",
					align: "right"
				},
				{
					view: "button",
					label: "Edit",
					width: 100,
					type: "iconButton",
					icon: "mdi mdi-square-edit-outline",
					align: "right"
				}
			]
		};
	}

	getUserNameLabel() {
		return this.$$("userName");
	}

	setUserName(name) {
		this.getUserNameLabel().setValue(name);
	}
}