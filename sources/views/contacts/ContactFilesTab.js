import {JetView} from "webix-jet";
import ContactFilesTable from "./ContactFilesTable";
import {files} from "../../models/files";

export default class ContactFilesTab extends JetView {
	config() {
		const _this = this;

		return {
			localId: "contactFilesTable",
			rows: [
				ContactFilesTable,
				{
					view: "toolbar",
					height: 40,
					cols: [
						{},
						{ 
							view: "uploader",
							label: "Upload file",
							width: 150,
							name: "Photo", 
							autosend: false,
							accept: "image/png, image/gif, image/jpeg",
							on: {
								onBeforeFileAdd(item) {
									const {name, sizetext, file} = item;
									const date = file.lastModifiedDate;
									const ContactID = +_this.getParam("id", true);

									files.add({
										ContactID,
										name, 
										sizetext,
										date
									});
								}
							}
						},
						{}
					]
				}
			]
		};
	}
}