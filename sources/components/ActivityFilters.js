export default class ActivityFilters {
	constructor() {
		this._currentDate = new Date();
		this._currentDay = webix.Date.dayStart(this._currentDate);
		this._tomorrow = webix.Date.add(this._currentDate, 1, "day", true);
		this._tomorrowStart = webix.Date.dayStart(this._tomorrow);
		this._currentWeek = webix.Date.weekStart(this._currentDate);
		this._currentMonth = webix.Date.monthStart(this._currentDate);
	}
  
	all() {
		return true;
	}
  
	overdue(item) {
		return this._currentDate > item.DueDate || item.State === "Close";
	}
  
	completed(item) {
		return item.State === "Close";
	}
  
	today(item) {
		const day = webix.Date.dayStart(item.DueDate);
		return webix.Date.equal(day, this._currentDay);
	}
  
	tomorrow(item) {
		const day = webix.Date.dayStart(item.DueDate);
		return webix.Date.equal(day, this._tomorrowStart);	
	}
  
	thisweek(item) {
		const week = webix.Date.weekStart(item.DueDate);
		return webix.Date.equal(week, this._currentWeek);
	}
  
	thismonth(item) {
		const month = webix.Date.monthStart(item.DueDate);
		return webix.Date.equal(month, this._currentMonth);
	}

}