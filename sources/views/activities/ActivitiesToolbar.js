import {JetView} from "webix-jet";

export default class ActivitiesToolbar extends JetView {
	config() {
		return {
			view: "toolbar",
			paddingX: 30,
			cols: [
				{},
				{
					view: "button",
					label: "Add Activity",
					localId: "add-activity-btn",
					width: 150,
					type: "iconButton",
					icon: "mdi mdi-plus-box",
					click() {
						this.callEvent("click:addActivityBtn");
					}
				}
			]
		};
	}

	getAddActivityBtn() {
		return this.$$("add-activity-btn");
	}
}