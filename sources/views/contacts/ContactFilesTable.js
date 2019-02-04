import BaseTable from "../../components/BaseTable";
import {files} from "../../models/files";

export default class ContactFilesTable extends BaseTable {
	constructor(app, name, locale) {
		super(app, name, {
			columns: [
				{
					id: "name",
					header: locale("Name"),
					fillspace: true
				},
				{
					id: "date",
					header: locale("ChangeDate"),
					format: webix.i18n.longDateFormatStr,
					width: 200
				},
				{
					id: "sizetext",
					header: locale("Size"),
					width: 200
				},
				BaseTable.getRemoveColumn()
			],
			collection: files
		});
	}

	urlChange(view) {
		const contactId = +this.getParam("id", true);

		files.waitData.then(() => {
			view.sync(files);
			files.filter(file => file.ContactID === contactId);
		});
	}
}