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
	}

}