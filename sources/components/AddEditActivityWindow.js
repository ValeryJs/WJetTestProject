import {JetView} from "webix-jet";
import {contacts} from "../models/contacts";
import {activitytypes} from "../models/activitytypes";


export default class AddEditActivityWindow extends JetView {
	config() {
		return {
			view: "window",
			modal: true,
			position: "center",
			width: 600,
			head: {
				view: "toolbar",
				css: "webix_dark",
				cols: [
					{
						view: "label",
						localId: "head-title",
						align: "center"
					}
				]
			},
			body: {
				view: "form",
				localId: "form",
				elements: [
					{
						view: "textarea",
						label: "Details",
						name: "Details",
						height: 100,
						invalidMessage: "\"Details\" must be filled in" 
					},
					{
						view: "richselect",
						label: "Type",
						name: "TypeID",
						invalidMessage: "\"Type\" must be filled in", 
						options: {
							data: activitytypes,
							body: {
								template: "#Value#"
							}
						}
					},
					{
						view: "richselect",
						label: "Contacts",
						localId: "contactSelect",
						name: "ContactID",
						invalidMessage: "\"Contacts\" must be filled in", 
						options: {
							data: contacts,
							body: {
								template: "#FirstName# #LastName#"
							}
						}
					},
					{
						cols: [
							{
								view: "datepicker",
								label: "Date",
								format: webix.i18n.longDateFormatStr,
								name: "DueDate"
							},
							{
								width: 15
							},
							{
								view: "datepicker",
								type: "time",
								label: "Time",
								format: webix.Date.dateToStr("%H:%i"),
								name: "DueTime",
								invalidMessage: "\"Date\" must be filled in" 
							}
						]
					},
					{
						view: "checkbox",
						labelRight: "Complited",
						name: "complited",
						value: 1
					},
					{
						cols: [
							{},
							{
								view: "button",
								localId: "add-save-btn",
								type: "form",
								width: 100,
								click: () => this.onSubmit()
							},
							{
								view: "button",
								value: "Cancel",
								width: 100,
								click: () => this.close()
							}
						]
					}
				],
				rules: {
					ContactID: webix.rules.isNotEmpty,
					TypeID: webix.rules.isNotEmpty,
					Details: webix.rules.isNotEmpty,
					DueDate: webix.rules.isNotEmpty,
					DueTime: webix.rules.isNotEmpty
				}
			}
		};
	}

	setHeaderTitle(text) {
		this.getHeader().setValue(text);
	}

	setAddSaveBtnValue(value) {
		this.getAddSaveBtn().setValue(value);
	}

	editActivity(activity) {
		this.getForm().setValues(activity);
		this.setHeaderTitle("Edit activity");
		this.setAddSaveBtnValue("Save");
		this.isNew = false;
	}

	addActivity() {
		const currentDate = new Date();

		this.getForm().setValues({
			DueDate: currentDate,
			DueTime: currentDate
		});

		this.setHeaderTitle("Add activity");
		this.setAddSaveBtnValue("Add");
		this.isNew = true;
	}

	show(activity) {
		if (activity) {
			this.editActivity(activity);
		} else {
			this.addActivity();
		}

		this.getRoot().show();
	}

	close() {
		this.getRoot().hide();
		this.getForm().clear();
		this.getForm().clearValidation();
	}

	getHeader() {
		return this.$$("head-title");
	}

	getForm() {
		return this.$$("form");
	}

	getContactSelect() {
		return this.$$("contactSelect");
	}

	getAddSaveBtn() {
		return this.$$("add-save-btn");
	}

	onSubmit() {
		const formValues = this.getForm().getValues();

		if (this.getForm().validate()) {
			this.close();
			this.getForm().callEvent("onSubmit:activity", [formValues, this.isNew]);
		}
	}
}