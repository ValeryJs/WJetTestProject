import {JetView} from "webix-jet";
import ContactActivitiesTab from "./ContactActivitiesTab";
import ContactFilesTab from "./ContactFilesTab";

export default class ContactsTabs extends JetView {
	config() {
		return {
			rows: [
				{	
					view: "tabbar",
					id: "tabbar",
					value: "",
					multiview: "true", 
					options: [
						{ value: "Activities", id: "contactActivitiesTable" },
						{ value: "Files", id: "contactFilesTable" }
					]
				},
				{	
					cells: [
						ContactActivitiesTab,
						ContactFilesTab
					]
				},
			]	
		};
	}
}