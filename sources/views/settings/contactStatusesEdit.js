import { JetView } from "webix-jet";
import { statuses } from "../../models/statuses";
import  SettingsActivityStatusWnd  from  "../../components/settingsActivityStatusWnd";
// import { settingsActivityTypeWnd } from "../../components/settingsActivityTypeWnd";

export default class ContactStatusesEditView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "toolbar",
					padding: 3,
					height: 50,
					cols: [
						{
							view: "label",
							label: _("Statuses")
						},
						{
							view: "button",
							borderless: true,
							label: _("AddStatus"),
							autowidth: true,
							click() {
								this.$scope.wndActivity.addActivityStatus(":statuses");
							}
						},
					]
				},
				{
					view: "datatable",
					scroll: "y",
					columns:[
						{ 
							id:"Value",
							header:"Status",
							template: "<span class='webix_icon wxi-#Icon#'></span> #Value#", 
							fillspace: true
						},
						{
							id: "edit",
							header: "",
							template: "<span class='mdi mdi-square-edit-outline editBtn'></span>",
							width: 40
						},
						{
							id: "remove",
							header: "",
							template: "<span class='mdi mdi-trash-can-outline removeBtn'></span>",
							width: 40
						}	
					],
					onClick: {
						removeBtn(e, {row}) {
							webix.confirm("Do you really want to delete this type activity?", (result) => {
								if(result) {
									statuses.remove(row);
								}
							});
						},
						editBtn(e, id) {
							const status = statuses.getItem(id);
							this.$scope.wndActivity.editActivityStatus(status, ":statuses");
						}
					}
				}
				
			]	
		};
	}

	init() {
		this.wndActivity = this.ui(SettingsActivityStatusWnd);
	}
	ready(view){
		statuses.waitData.then(() => {
			view.queryView("datatable").sync(statuses);
		});

		this.on(this.app, "Add:statuses", (formValue) => {
			statuses.add(formValue);
		});

		this.on(this.app, "Save:statuses", (formValue) => {
			const data = view.queryView("datatable");
			data.updateItem(formValue.id, formValue);
		});
	}
}