import {JetView} from "webix-jet";

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
				const userPhoto = obj.Photo ? obj.Photo : "sources/images/no_photo.png";

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
			scroll: false
		};
	}

	getView() {
		return this.getRoot();
	}

	getFirstId() {
		return this.getView().getFirstId();
	}

	selectItem(id) {
		this.getView().select(id);
	}

	getItem(id) {
		return this.getView().getItem(id);
	}

	sync(data) {
		this.getView().sync(data);
	}
}
