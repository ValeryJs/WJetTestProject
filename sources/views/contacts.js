import {JetView} from "webix-jet";
import ContactsList from "./contacts/ContactsList";
import ContactsUserInfo from "./contacts/ContactsUserInfo";


export default class ContactsView extends JetView {
	config() {
		return {
			cols: [
				ContactsList,
				ContactsUserInfo
			]
		};
	}

	init(view, url) {
		const {params} = url[0];
		
		if (!params.id) {
			this.on(this.app, "contactList:firsttemId", (id) => {
				this.setParam("id", id, true);
			});
		}

		this.on(this.app, "contactListItemClick", (id) => {
			this.setParam("id", id, true);
		});
	}
}
