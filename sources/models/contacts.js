import { statuses } from "./statuses";
export  const contacts = new webix.DataCollection( { 
	url: "rest->http://localhost:8096/api/v1/contacts/", 
	save: "rest->http://localhost:8096/api/v1/contacts/",
	scheme: {
		$init(obj){
			obj.FullName = `${obj.FirstName} ${obj.LastName}`;
			obj.Status = statuses.getItem(obj.StatusID).Value;
		}
	} 
} );