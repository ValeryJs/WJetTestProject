import { JetView } from "webix-jet";

export default class SettingsActivityStatusWnd extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "window",
			modal: true,
			position: "center",
			width: 350,
			head: {
				view: "toolbar",
				css: "webix_dark",
				cols: [
					{
						view: "label",
						localId: "head",
						align: "center"
					}
				]
			},
			body: {
				view: "form",
				localId: "form",
				elements: [
					{
						view: "text",
						label: _("Type"),
						name: "Value",
						invalidMessage: "\"Type\" must be filled in"
					},
					{
						view: "text",
						label: _("Icon"),
						name: "Icon",
						invalidMessage: "\"Type\" must be filled in"
					},
					{
						cols: [
							{},
							{
								view: "button",
								localId: "add-save-btn",
								type: "form",
								width: 100,
								click() {
									const form = this.$scope.$$("form");
									this.$scope.onSubmit(this.getValue(), form.getValues());
								}
								
							},
							{
								view: "button",
								value: _("Cancel"),
								width: 100,
								click: () => this.close()
							}
						]
					}
				],
				rules: {
					Type: webix.rules.isNotEmpty
				}
			}
		};
	}

	addActivityStatus(listener) {
		this.setBtnValue("Add");
		const label = this.getLabel();
		label.setValue("Add");
		this._eventName = listener;
		this.showWindow();
	}

	close() {
		this.getRoot().hide();
		this.$$("form").clear();
		this.$$("form").clearValidation();
	}

	editActivityStatus(item, listener) {
		this.setBtnValue("Save");
		const label = this.getLabel();
		label.setValue("Edit");
		this.$$("form").setValues(item);
		this._eventName = listener;
		this.showWindow();
	}

	getBtnId(){
		return this.$$("add-save-btn");
	}

	getLabel(){
		return this.getRoot().queryView("label");
	}

	onSubmit(eventName, formValue) {
		eventName += this._eventName;
		this.app.callEvent(eventName, [formValue]);
		this.close();	
	}
	setBtnValue(value) {
		this.getBtnId().setValue(value);
	}

	showWindow() {
		this.getRoot().show();
	}
}
