import {JetView} from "webix-jet";

export default class ActivitiesToolbar extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "toolbar",
			paddingX: 5,
			cols: [
				{
					view: "segmented",
					css: "ativity-filter-buttons",
					optionWidth: "auto",
					inputPadding: 10,
					value: "all",
					options: [
						{	id: "all",	value: _("All") },
						{ id: "overdue", value: _("Overdue") }, 
						{ id: "completed", value: _("Completed") }, 
						{ id: "today", value: _("Today") }, 
						{ id: "tomorrow", value: _("Tomorrow") }, 
						{ id: "thisweek", value: _("ThisWeek") }, 
						{ id: "thismonth", value: _("ThisMonth") }
					],
				},
				{
					view: "button",
					label: _("AddActivity"),
					localId: "add-activity-btn",
					autowidth: true,
					type: "iconButton",
					icon: "mdi mdi-plus-box",
					click: () => {
						this.app.callEvent("click:addActivityBtn");
					}
				}
			]
		};
	}
}