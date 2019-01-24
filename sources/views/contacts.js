import {JetView} from "webix-jet";
import ContactsList from "./contacts/ContactsList";
import ContactsToolbar from "./contacts/ContactsToolbar";
import ContactsUserInfo from "./contacts/ContactsUserInfo";

import {contacts} from "../models/contacts";
import {statuses} from "../models/statuses";


export default class ContactsView extends JetView {
	config() {
		return {
			cols: [
				{ $subview: ContactsList, name: "contacts-list" },
				{
					rows: [
						{ $subview: ContactsToolbar, name: "contacts-toolbar" },
						{ $subview: ContactsUserInfo, name: "user-info" }
					]
				}
			]
		};
	}

	_setParam(id) {
		this.setParam("id", id, true);
	}

	ready(view, [url]) {
		const {id} = url.params;

		this._userInfo = this.getSubView("user-info");
		this._contactsList = this.getSubView("contacts-list");
		this._contactsToolbar = this.getSubView("contacts-toolbar");

		webix.promise.all([
			contacts.waitData,
			statuses.waitData
		]).then(() => {
			this._contactsList.sync(contacts);

			if (id) {
				const listItem = this._contactsList.getItem(id);

				if (listItem) {
					this._contactsList.selectItem(id);
					listItem.Status = statuses.getItem(listItem.StatusID).Value;
					this._userInfo.setValues(listItem);
					this._contactsToolbar.setUserName(`${listItem.FirstName} ${listItem.LastName}`);
				}
			} else {
				const firstId = this._contactsList.getFirstId();
				const firstItem = this._contactsList.getItem(firstId);
				this._contactsList.selectItem(firstId);
				firstItem.Status = statuses.getItem(firstItem.StatusID).Value;
				this._userInfo.setValues(firstItem);
				this._contactsToolbar.setUserName(`${firstItem.FirstName} ${firstItem.LastName}`);
				this._setParam(firstId);
			}

			this.on(this._contactsList.getView(), "onItemClick", (id) => {
				const listItem = this._contactsList.getItem(id);
				this._contactsList.selectItem(id);
				listItem.Status = statuses.getItem(listItem.StatusID).Value;
				this._userInfo.setValues(listItem);
				this._contactsToolbar.setUserName(`${listItem.FirstName} ${listItem.LastName}`);
				this._setParam(id);
			});
		});
	}
}