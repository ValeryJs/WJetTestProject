import {JetView} from "webix-jet";
import ContactFilesTable from "./ContactFilesTable";
export default class ContactFilesTab extends JetView {
	config() {
		return {
			id: "contactFilesTable",
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
							link: "tableFiles",  
							autosend: false,
							accept: "image/png, image/gif, image/jpeg",
							on: {
								onBeforeFileAdd(item) {
									item.date = item.file.lastModifiedDate;
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