import {JetView} from "webix-jet";
import ContactsList from "./contacts/ContactsList";

export default class ContactsView extends JetView {
	config() {
		return {
			cols: [
				ContactsList,
				{
					$subview: true
				}
			]
		};
	}

	ready(view, url) {
		if (url.length === 1) {
			this.show("./details");
		}
	}
}
