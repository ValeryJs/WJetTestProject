import BaseTable from "../../components/BaseTable";

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
		view.sync(activities);
	}
}
