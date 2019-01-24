import {JetView} from "webix-jet";
import ActivitiesToolbar from "./activities/ActivitiesToolbar";
import ActivitiesDatatable from "./activities/ActivitiesDatatable";

import AddEditActivityWindow from "../components/AddEditActivityWindow";


export default class ActivitiesView extends JetView {
	config() {
		return {
			rows: [
				{$subview: ActivitiesToolbar, name: "activities-toolbar"},
				{$subview: ActivitiesDatatable, name: "activities-datatable"}
			]
		};
	}

	ready() {
		this._activitiesToolbar = this.getSubView("activities-toolbar");
		this._activitiesDatatable = this.getSubView("activities-datatable");

		this.windowActivity = this.ui(AddEditActivityWindow);

		this.on(this._activitiesToolbar.getAddActivityBtn(), "click:addActivityBtn", () => {
			this.windowActivity.show();
		});

		this.on(this._activitiesDatatable.getView(), "edit:tableItem", (id) => {
			this.windowActivity.show(id);
		});

		this.on(this.windowActivity.getForm(), "onSubmit:activity", (formValue, isNew) => {
			if (isNew) {
				this._activitiesDatatable.addItem(formValue);
			} else {
				this._activitiesDatatable.updateItem(formValue.id, formValue);
			}
		});
	}
}