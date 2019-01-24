import {JetView} from "webix-jet";


export default class BaseTable extends JetView {
	constructor(app, name, configs) {
		super(app, name);
		this._columns = configs.columns;
		this._collection = configs.collection;
	}

	config() {
		return {
			view: "datatable",
			columns: this._columns,
			onClick: {
				removeBtn(e, id) {
					this.$scope.removeItem(this, id);
				},
				editBtn(e, id) {
					this.$scope.editItem(this, id);
				}
			}
		};
	}

	static getCheckboxColumn() {
		return {
			header: "",
			template: "{common.checkbox()}",
			width: 40
		};
	}

	static getEditColumn() {
		return {
			id: "edit",
			header: "",
			template: "<span class='mdi mdi-square-edit-outline editBtn'></span>",
			width: 40
		};
	}

	static getRemoveColumn() {
		return {
			id: "remove",
			header: "",
			template: "<span class='mdi mdi-trash-can-outline removeBtn'></span>",
			width: 40
		};
	}

	removeItem(view, id) {
		webix.confirm({
			ok: "Yes",
			cancel: "No",
			text: "Do you really want to delete this item?",
			callback: (result) => {
				if (result) {
					this._collection.remove(id);
				}
			}
		});
	}

	getView() {
		return this.getRoot();
	}

	editItem(view, id) {
		view.callEvent("edit:tableItem", [view.getItem(id)]);
	}

	updateItem(id, value) {
		this._collection.updateItem(id, value);
	}

	addItem(value) {
		this._collection.add(value);
	}
}
