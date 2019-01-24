import {JetView} from "webix-jet";


export default class ContactsUserInfo extends JetView {
	config() {
		return {
			view: "template",
			borderless: true,
			template(obj) {
				const userPhoto = obj.Photo ? obj.Photo : "sources/images/no_photo.png";

				return `
                    <div class="app-user-info">
                        <div class="app-user-info_col">
                            <div class="app-user-info_photo">
                                <img src="${userPhoto}" alt="">
                            </div>
                            <div class="app-user-info_status">${obj.Status}</div>
                        </div>
                        <div class="app-user-info_col">
                            <div class="app-user-info_item">
                                <span class="mdi mdi-email"></span>
                                ${obj.Email}
                            </div>
                            <div class="app-user-info_item">
                                <span class="mdi mdi-skype"></span>
                                ${obj.Skype}
                            </div>
                            <div class="app-user-info_item">
                                <span class="mdi mdi-tag"></span>
                                ${obj.Job}
                            </div>
                            <div class="app-user-info_item">
                                <span class="mdi mdi-briefcase"></span>
                                ${obj.Company}
                            </div>
                        </div>
                        <div class="app-user-info_col">
                            <div class="app-user-info_item">
                                <span class="mdi mdi-calendar-range-outline"></span>
                                ${obj.Birthday}
                            </div>
                            <div class="app-user-info_item">
                                <span class="mdi mdi-map-marker-outline"></span>
                                ${obj.Address}
                            </div>
                        </div>
                    </div>
                `;
			}
		};
	}

	getView() {
		return this.getRoot();
	}

	setValues(values) {
		this.getView().setValues(values);
	}
}