import {JetView} from "webix-jet";
import ContactActivitiesTab from "./ContactActivitiesTab";
import ContactFilesTab from "./ContactFilesTab";

export default class ContactsTabs extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{	
					view: "tabbar",
					id: "tabbar",
					value: "",
					multiview: true, 
					options: [
						{ value: _("Activities"), id: "activities" },
						{ value: _("Files"), id: "files" }
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
}