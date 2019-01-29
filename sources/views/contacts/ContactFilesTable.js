import BaseTable from "../../components/BaseTable";

export default class ContactFilesTable extends BaseTable {
	constructor(app, name) {
		super(app, name, {
			columns: [
				{
					id: "name",
					header: "Name",
					fillspace: true
				},
				{
					id: "date",
					header: "Change Date",
					format: webix.i18n.longDateFormatStr,
					width: 200
				},
				{
					id: "sizetext",
					header: "Size",
					width: 200
				},
				BaseTable.getRemoveColumn()
			],
			id: "tableFiles"
		});
	}

	removeItem(view, id) {
		webix.confirm({
			ok: "Yes",
			cancel: "No",
			text: "Do you really want to delete this item?",
			callback: (result) => {
				if (result) {
					view.remove(id.row);
				}
			}
		});
	}
}