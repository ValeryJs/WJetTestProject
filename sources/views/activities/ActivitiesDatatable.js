import BaseTable from "../../components/BaseTable";

import {activities} from "../../models/activities";
import {contacts} from "../../models/contacts";
import {activitytypes} from "../../models/activitytypes";


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
					id: "activityDate",
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
			activities.waitData,
			activitytypes.waitData,
			contacts.waitData
		]).then(() => {
			view.sync(activities, function() {
				this.each((item) => {
					const type = activitytypes.getItem(item.TypeID);
					const contact = contacts.getItem(item.ContactID);

					const parser = webix.Date.strToDate("%d-%m-%Y %h:%i");
					const date = parser(item.DueDate);

					item.activityDate = date;
					item.typeValue = type.Value;
					item.contactUser = `${contact.FirstName} ${contact.LastName}`;
				});
			});
		});
	}
}
