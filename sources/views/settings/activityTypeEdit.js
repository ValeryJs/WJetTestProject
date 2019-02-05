import { JetView } from "webix-jet";
import { activitytypes } from "../../models/activitytypes";
import  SettingsActivityStatusWnd  from  "../../components/settingsActivityStatusWnd";
import { activities } from "../../models/activities";
export default class ActivityTypeEditView extends JetView {
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
							label: _("ActivityTypes")
						},
						{
							view: "button",
							label: _("AddActivity"),
							autowidth: true,
							click() {
								this.$scope.wndActivity.addActivityStatus(":activitytypes");
							}
						}
					]
				},
				{
					view: "datatable",
					scroll: "y",
					columns:[
						{ 
							id:"Value",
							header:"Value", 
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
							let countActivity = 0;
							activities.data.each(item => {
								if(item.TypeID === row){
									countActivity++;
								}
							});
							if(countActivity){
								webix.alert({
									type:"alert-error",
									text:`Unable to delete! This type is in use in ${countActivity} activities`
								});
							}else{
								webix.confirm("Do you really want to delete this type activity?", (result) => {
									if(result) {
										activitytypes.remove(row);
									}
								});
							}
						},
						editBtn(e, id) {
							const actType = activitytypes.getItem(id);
							this.$scope.wndActivity.editActivityStatus(actType, ":activitytypes");
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
		activitytypes.waitData.then(() => {
			view.queryView("datatable").sync(activitytypes);
		});

		this.on(this.app, "Add:activitytypes", (formValue) => {
			activitytypes.add(formValue);
		});

		this.on(this.app, "Save:activitytypes", (formValue) => {
			const data = view.queryView("datatable");
			data.updateItem(formValue.id, formValue);
		});
	}
}