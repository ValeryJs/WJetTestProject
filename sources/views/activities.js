import {JetView} from "webix-jet";
import ActivitiesToolbar from "./activities/ActivitiesToolbar";
import ActivitiesDatatable from "./activities/ActivitiesDatatable";
import ActivityFilters from "../components/ActivityFilters";
import AddEditActivityWindow from "../components/AddEditActivityWindow";


export default class ActivitiesView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{$subview: ActivitiesToolbar, name: "toolbar"},
				{$subview: new ActivitiesDatatable(this.app, "", _), name: "datatable"}
			]
		};
	}

	ready() {
		this.windowActivity = this.ui(AddEditActivityWindow);
		this.filterActivities();

		this.on(this.app, "click:addActivityBtn", () => {
			this.windowActivity.show();
		});

		this.on(this.app, "edit:tableItem", (id) => {
			this.windowActivity.show(id);
		});

		this.on(this.windowActivity.getForm(), "onSubmit:activity", (formValue, isNew) => {
			if (isNew) {
				this.app.callEvent("table:addItem", [formValue]);
			} else {
				this.app.callEvent("table:updateItem", [formValue.id, formValue]);
			}
		});
	}

	filterActivities(){
		const toolbar = this.getSubView("toolbar").getRoot().queryView("segmented");
		const datatable = this.getSubView("datatable").getView();
		const filter = new ActivityFilters(datatable);
		this.on(toolbar, "onAfterTabClick", (id) => {
			filter[id]();
		});

	}
}