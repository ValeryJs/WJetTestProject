import { JetView } from "webix-jet";
import ActivityTypeEditView from "./settings/activityTypeEdit";
import ContactStatusesEditView from "./settings/contactStatusesEdit";
export default class SettingsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		return {
			rows: [
				{
					view: "toolbar",
					padding: 4,
					height: 70,
					cols: [
						{
							type:"space", rows:[
								{ name:"lang",
									view:"segmented",
									label:_("Language"),
									options:[
										{ id:"en", value:"English", width: 120 },
										{ id:"ru", value:"Русский", width: 120 }
									],
									click() { 
										const langs = this.$scope.app.getService("locale");
										const value = this.getValue();
										langs.setLang(value);
									},
									value: lang
								}
							]
						}
					]
				},
				{
					cols: [
						{
							$subview: ActivityTypeEditView
						},
						{
							$subview: ContactStatusesEditView
						}
					]
				}
			]
		};
	}
}
