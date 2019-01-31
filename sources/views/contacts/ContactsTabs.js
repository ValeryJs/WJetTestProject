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
						{ value: "Activities", id: "activities" },
						{ value: "Files", id: "files" }
					]
				},
				{	
					cells: [
						{
							id: "activities",
							$subview: ContactActivitiesTab,
						},
						{
							id: "files",
							$subview: ContactFilesTab
						}
						
					]
				},
			]	
		};
	}

	getId(){
		return this.$$(ContactActivitiesTab);
	}
	getId2(){
		return this.$$(ContactFilesTab);
	}
}