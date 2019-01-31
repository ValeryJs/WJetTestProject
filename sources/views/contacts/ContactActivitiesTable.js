import BaseTable from "../../components/BaseTable";

import {activities} from "../../models/activities";
import {activitytypes} from "../../models/activitytypes";

export default class ContactActivitiesTable extends BaseTable {
	constructor(app, name) {
		super(app, name, {
			columns: [
				BaseTable.getCheckboxColumn(),
				{
					id: "typeValue",
					header: [{content: "selectFilter"}],
					width: 150
				},
				{
					id: "DueDate",	
					header: [{content: "datepickerFilter"}],
					format: webix.i18n.longDateFormatStr,
					width: 170
				},
				{
					id: "Details",
					header: [{content: "textFilter"}],
					fillspace: true
				},
				BaseTable.getEditColumn(),
				BaseTable.getRemoveColumn()
			],
			collection: activities
		});
	}

	getContactItem(view, id) {
		webix.promise.all([
			activitytypes.waitData,
			activities.waitData
		]).then(() => {
			view.sync(activities, function() {
				this.each(item => {
					const type = activitytypes.getItem(item.TypeID);
					item.typeValue = type.Value;
				});
			});

			activities.filter(item => item.ContactID === id);
		});
	}

	ready(view) {
		this._ready();
		
		const paramId = +this.getParam("id", true);
		this.getContactItem(view, +paramId);

		this.on(this.app, "contactListItemClick", (id) => {
			this.getContactItem(view, +id);
		});
	}
}
