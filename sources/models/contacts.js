export const contacts = new webix.DataCollection(
	{ 
		url: "rest->http://localhost:8096/api/v1/contacts/", 
		save: "rest->http://localhost:8096/api/v1/contacts/",
		scheme: {
			$init: function(obj) {
				const parserDate = webix.Date.dateToStr("%d-%M-%Y");
				obj.Birthday = parserDate(obj.Birthday);
			},
			$save: function(obj) {
				const parser = webix.Date.strToDate("%d-%M-%Y");
				obj.Birthday = parser(obj.Birthday);
			}
		}
	} 
);

