import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";
export default class ContactsList extends JetView {
	config() {
		return {
			view: "list",
			width: 300,
			css: "app-contacts",
			type: {
				height: 50
			},
			template(obj) {
				const userPhoto = obj.Photo || "sources/images/no_photo.png";

				return `
                    <div class="app-contacts_item">
                        <div class="app-contacts_photo">
                            <img src="${userPhoto}" alt="">                    
                        </div>
                        <div class="app-contacts_body">
                            <strong class="app-contacts_name">${obj.FirstName} ${obj.LastName}</strong>
                            <span class="app-contacts_description">${obj.Company}</span>
                        </div>
                    </div>
                `;
			},
			select: true,
			scroll: false,
			on: {
				onItemClick: (id) => {
					this.app.callEvent("contactListItemClick", [id]);
				}
			}
		};
	}

	init(view) {
		view.sync(contacts);
	}

	waitDataContacts(callback) {
		webix.promise.all([
			contacts.waitData
		]).then(() => {
			callback();
		});
	}

	urlChange(view, url) {
		const {params} = url[0];
		this.waitDataContacts(() => {
			view.select(params.id);
		});
	}

	ready(view) {
		this.waitDataContacts(() => {
			const firsttemId = view.getFirstId();
			this.app.callEvent("contactList:firsttemId", [firsttemId]);
		});
	}
}
