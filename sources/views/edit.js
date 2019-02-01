import ContactForm from "./contacts/ContactForm";

import {contacts} from "../models/contacts";

export default class ContactEdit extends ContactForm {
	constructor(app, name) {
		super(app, name);
	}

	ready() {
		const id = this.getParam("id", true);
		this.getContactItem(id);
		this.setHeaderTitle("Edit contact");
		this.setButtonValue("Edit");

		this.on(this.app, "contactListItemClick", (id) => {
			this.getContactItem(id);
		});

		this.on(this.app, "contactFormBtnClick", () => {
			const value = this.getForm().getValues();
			contacts.data.updateItem(value.id, value);
		});
	}

	getContactItem(id) {
		webix.promise.all([
			contacts.waitData
		]).then(() => {
			const contactItem = contacts.getItem(id);
			this.setFormValues(contactItem);
		});
	}

}