import ContactForm from "./contacts/ContactForm";
import {contacts} from "../models/contacts";

export default class ContactAdd extends ContactForm {
	constructor(app, name) {
		super(app, name);
	}

	ready() {
		this.setHeaderTitle("Add new contact");
		this.setButtonValue("Add");

		this.on(this.app, "contactFormBtnClick", () => {
			contacts.add(this.getForm().getValues());
		});	

		contacts.attachEvent("onAfterAdd", () => {
			webix.message("New record was added!");

			const firstId = contacts.getFirstId();
			
			this.app.show(`/top/ContactsList?id=${firstId}/details`);
		});
	}

	afterLoadData(callback) {
		contacts.waitData.then(callback);
	}

}