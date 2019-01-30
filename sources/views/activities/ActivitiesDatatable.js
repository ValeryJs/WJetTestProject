import BaseTable from "../../components/BaseTable";

import {contacts} from "../../models/contacts";
import {activitytypes} from "../../models/activitytypes";
import {activities} from "../../models/activities";


export default class ActivitiesDatatable extends BaseTable {
	constructor(app, name) {
		super(app, name, {
			columns: [
				BaseTable.getCheckboxColumn(),
				{
					id: "typeValue",
					header: ["Activity type", {content: "selectFilter"}],
					width: 200,
					sort: "string"
				},
				{
					id: "DueDate",
					header: ["Due date", {content: "datepickerFilter"}],
					sort: "date",
					format: webix.i18n.longDateFormatStr,
					width: 170
				},
				{
					id: "Details",
					header: ["Details", {content: "textFilter"}],
					fillspace: true,
					sort: "string"
				},
				{
					id: "contactUser",
					header: ["Contact", {content: "selectFilter"}],
					width: 200,
					sort: "string"
				},
				BaseTable.getEditColumn(),
				BaseTable.getRemoveColumn()
			],
			collection: activities
		});
	}

	init(view) {
		webix.promise.all([
			contacts.waitData,
			activitytypes.waitData,
			activities.waitData
		]).then(() => {
			view.sync(activities, function() {
				this.each((item) => {
					const type = activitytypes.getItem(item.TypeID);
					const contact = contacts.getItem(item.ContactID);

					item.typeValue = type.Value;
					item.contactUser = `${contact.FirstName} ${contact.LastName}`;
				});
			});
		});
	}

	ready() {
		this._ready();
	}
}
