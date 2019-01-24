import {contacts} from "./contacts";
import {activitytypes} from "./activitytypes";

export const activities = new webix.DataCollection({
	url: "rest->http://localhost:8096/api/v1/activities/",
	save: "rest->http://localhost:8096/api/v1/activities/",
	scheme: {
		$init: function(obj) {
			const parser = webix.Date.strToDate("%d-%m-%Y %H:%i");
			obj.DueDate = obj.DueTime = parser(obj.DueDate);

			const type = activitytypes.getItem(obj.TypeID);
			const contact = contacts.getItem(obj.ContactID);

			obj.typeValue = type.Value;
			obj.contactUser = `${contact.FirstName} ${contact.LastName}`;
		},
		$save: function(obj) {
			const parserDate = webix.Date.dateToStr("%Y-%m-%d");
			const parserTime = webix.Date.dateToStr("%H:%i");

			let date = parserDate(obj.DueDate);
			let time = parserTime(obj.DueTime);
			
			obj.DueDate = date + " " + time;
		}
	}
});
