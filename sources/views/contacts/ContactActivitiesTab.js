import {JetView} from "webix-jet";
import ContactActivitiesTable from "./ContactActivitiesTable";

import AddEditActivityWindow from "../../components/AddEditActivityWindow";

export default class ContactActivitiesTab extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const _this = this;

		return {
			localId: "contactActivitiesTable",
			rows: [
				ContactActivitiesTable,
				{
					view: "toolbar",
					height: 40,
					cols: [
						{},
						{
							view: "button",
							borderless: true,
							label: _("AddActivity"),
							width: 200,
							click() {
								_this.app.callEvent("click:addActivityBtn");
							}
						}
					]
				}
			]
		};
	}

	showWindow(id) {
		this.on(this.app, "click:addActivityBtn", () => {
			this.windowActivity.show();
			this._contactSelect.setValue(+id);
		});
	}

	ready() {
		this.windowActivity = this.ui(AddEditActivityWindow);
		const form = this.windowActivity.getForm();
		this._contactSelect = this.windowActivity.getContactSelect();

		this._contactSelect.disable();
		
		const contactId = this.getParam("id", true);
		this.showWindow(contactId);

		this.on(this.app, "contactListItemClick", (id) => {
			this.showWindow(id);
		});

		this.on(this.app, "edit:tableItem", (id) => {
			this.windowActivity.show(id);
		});

		this.on(form, "onSubmit:activity", (formValue, isNew) => {
			if (isNew) {
				this.app.callEvent("table:addItem", [formValue]);
			} else {
				this.app.callEvent("table:updateItem", [formValue.id, formValue]);
			}
		});
	}
}