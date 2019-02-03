import {JetView} from "webix-jet";
import ContactsTabs from "./contacts/ContactsTabs";
import {contacts} from "../models/contacts";
import { activities } from "../models/activities";

export default class ContactsUserInfo extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
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
							label: _("Delete"),
							autoWidth: true,
							type: "iconButton",
							icon: "mdi mdi-trash-can-outline",
							align: "right",
							on: {
								onItemClick: () => {
									webix.confirm({
										title: "",
										ok:"Yes", 
										cancel:"No",
										text:"You really want to delete this user?",
										callback: (result) => { 
											if(result) {
												const id = +this.getParam("id", true);
												this.removeContact(id);
											}
										}
									});
								}
							}
						},
						{
							view: "button",
							label: _("Edit"),
							autoWidth: true,
							type: "iconButton",
							icon: "mdi mdi-square-edit-outline",
							align: "right",
							on: {
								onItemClick: () => {					
									this.show("./edit");
								}
							}
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
				},
				ContactsTabs
			]
		};
	}	

	urlChange(){
		const id = this.getParam("id", true);
		this.getContactItem(id);
	}

	getContactItem(id) {
		webix.promise.all([
			contacts.waitData
		]).then(() => {	
			const contactItem = contacts.getItem(id);
			this.setDetailsValues(contactItem);
			this.setUserName(contactItem.FullName);
		});
	}

	removeContact(id) {
		let newId = contacts.getPrevId(id, 1);
		if(!newId) {
			newId = contacts.getNextId(id, 1);
		}
		const activitiesArr = [];

		activities.data.each(item => {
			if (item.ContactID === id) {
				activitiesArr.push(item.id);
			}
		});
		
		activities.remove(activitiesArr);
		contacts.remove(id);
		this.app.show(`/top/ContactsList?id=${newId}/details`);
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


