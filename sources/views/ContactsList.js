import {JetView} from "webix-jet";
import {contacts} from "../models/contacts";
import {statuses} from "../models/statuses";

export default class ContactsList extends JetView {
	config() {
		return {
			cols: [
				{
					rows: [
						{
							view: "list",
							width: 300,
							localId: "contactList",
							css: "app-contacts",
							type: {
								height: 50
							},
							template(obj) {
								const userPhoto = obj.Photo || "sources/images/no_photo.png";
				
								return `
									<div class="app-contacts_item">
										<div class="app-contacts_photo">
											<img src="${userPhoto}" alt="">                    
										</div>
										<div class="app-contacts_body">
											<strong class="app-contacts_name">${obj.FirstName} ${obj.LastName}</strong>
											<span class="app-contacts_description">${obj.Company}</span>
										</div>
									</div>
								`;
							},
							select: true,
							scroll: false,
							on: {
								onItemClick: (id) => {
									this.setParam("id", id, true);
									this.app.callEvent("contactListItemClick", [id]);
								}
							}
						},
						{
							view: "toolbar",
							height: 40,
							cols: [
								{
									view: "button",
									borderless: true,
									label: "Add",
									click: () => {
										const id = this.getParam("id");
										this.show(`?id=${id}/add`);
									}
								}
							]
						}
					]
				},
				{
					$subview: true,
				}
			]
		};
	}

	getList() {
		return this.$$("contactList");
	}

	init(view, url) {
		webix.promise.all([
			statuses.waitData,
			contacts.waitData
		]).then(() => {
			this.getList().sync(contacts, function() {
				this.each((item) => {
					item.FullName = `${item.FirstName} ${item.LastName}`;
					item.Status = statuses.getItem(item.StatusID).Value;
				});
			});
			this._afterLoadData(view, url);
		});
	}
	
	_afterLoadData(view, [url]) {
		let {params} = url;
		const list = this.getList();
		if(!params.id) {
			params.id = list.getFirstId();
		}
		if(list.getItem(params.id)){
			list.select(params.id);
			this.show(`?id=${params.id}/details`);
		}
	}

	urlChange(view, url){	
		
		const list = this.getList();
		let {params} = url[0];
		if(list.getItem(params.id)){
			list.select(params.id);
		}
	}
	

	
}
