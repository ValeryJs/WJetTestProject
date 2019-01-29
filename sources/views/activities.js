import {JetView} from "webix-jet";
import ActivitiesToolbar from "./activities/ActivitiesToolbar";
import ActivitiesDatatable from "./activities/ActivitiesDatatable";

import AddEditActivityWindow from "../components/AddEditActivityWindow";


export default class ActivitiesView extends JetView {
	config() {
		return {
			rows: [
				ActivitiesToolbar,
				ActivitiesDatatable
			]
		};
	}

	ready() {
		this.windowActivity = this.ui(AddEditActivityWindow);

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
}