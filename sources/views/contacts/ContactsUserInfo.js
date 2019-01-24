import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";
export default class ContactsUserInfo extends JetView {
	config() {
		return {
			rows: [
				{
					view: "toolbar",
					padding: 15,
					cols: [
						{
							view: "label",
							css: "app-user-name",
							localId: "contactName",
							align: "left"
						},
						{
							view: "button",
							label: "Delete",
							width: 100,
							type: "iconButton",
							icon: "mdi mdi-trash-can-outline",
							align: "right"
						},
						{
							view: "button",
							label: "Edit",
							width: 100,
							type: "iconButton",
							icon: "mdi mdi-square-edit-outline",
							align: "right"
						}
					]
				},
				{
					view: "template",
					localId: "contactDetails",
					css: "app-contact-details",
					template(obj) {
						const userPhoto = obj.Photo || "sources/images/no_photo.png";
        
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
				}
			]
		};
	}

	urlChange(view, url){
		const { params } = url[0];
        
		webix.promise.all([
			contacts.waitData
		]).then(() => {
			const contactItem = contacts.getItem(params.id);
			this.setDetailsValues(contactItem);
			this.setUserName(contactItem.FullName);
		});
	}
    
	getViewLabelName() {
		return this.$$("contactName");
	}

	setUserName(name) {
		this.getViewLabelName().setValue(name);
	}
	getViewDetails() {
		return this.$$("contactDetails");
	}

	setDetailsValues(values) {
		this.getViewDetails().setValues(values);
	}
}