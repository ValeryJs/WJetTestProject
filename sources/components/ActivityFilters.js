export default class ActivityFilters {
	constructor(table) {
		this._table = table;
		this._currentDate = new Date();
	}
  
	all() {
		this._table.filter(() => true);
	}
  
	overdue() {
		this._table.filter(item => this._currentDate > item.DueDate);
	}
  
	completed() {
		this._table.filter(item => item.State);
	}
  
	today() {
		const currentDay = webix.Date.dayStart(this._currentDate);

		this._table.filter(item => {
			const day = webix.Date.dayStart(item.DueDate);
			return webix.Date.equal(day, currentDay);
		});
	}
  
	tomorrow() {
		const tomorrow = webix.Date.add(this._currentDate, 1, "day", true);
		const tomorrowStart = webix.Date.dayStart(tomorrow);

		this._table.filter(item => {
			const day = webix.Date.dayStart(item.DueDate);
			return webix.Date.equal(day, tomorrowStart);
		});
	}
  
	thisweek() {
		const currentWeek = webix.Date.weekStart(this._currentDate);

		this._table.filter(item => {
			const week = webix.Date.weekStart(item.DueDate);
			return webix.Date.equal(week, currentWeek);
		});
	}
  
	thismonth() {
		const currentMonth = webix.Date.monthStart(this._currentDate);

		this._table.filter(item => {
			const month = webix.Date.monthStart(item.DueDate);
			return webix.Date.equal(month, currentMonth);
		});
	}
}