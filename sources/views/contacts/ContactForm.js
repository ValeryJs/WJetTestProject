import {JetView} from "webix-jet";
import {statuses} from "../../models/statuses";

export default class ContactForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const _this = this;

		return {
			rows: [
				{
					cols: [
						{width: 50},
						{
							view: "label",
							height: 60,
							css: "app-user-name",
							localId: "headerTitle",
							align: "left"
						}
					]
				},
				{	
					paddingX: 0, 
					view:"form",
					localId: "contactForm",
					elements: [
						{
							cols: [
								{
									paddingX: 20,
									rows: [
										{ view:"text", label:_("FirstName"), name: "FirstName",
											invalidMessage: "\"First name\" must be filled in"  
										},
										{ view:"text", label:_("LastName"), name: "LastName", 
											invalidMessage: "\"Last name\" must be filled in"   
										},
										{ view:"datepicker", label:_("JoiningDate"), name: "StartDate",
										 value: new Date(),invalidMessage: "\"Date\" must be filled in"   
										},
										{ 
											view: "richselect",
											label: _("Status"), 
											name: "StatusID",
											invalidMessage: "\"Status\" must be filled in",  
											options: {
												data: statuses,
												body: {
													template: "#Value#"
												}
											}
										},
										{ view:"text", label:_("Job"), name: "Job",
										invalidMessage: "\"Job\" must be filled in"  
										},
										{ view:"text", label:_("Company"), name: "Company",
										invalidMessage: "\"Company\" must be filled in"  
										},
										{ view:"text", label:_("Website"), name: "Website",
									
										},
										{ view:"textarea", label:_("Address"), name: "Address",
											invalidMessage: "\"Address name\" must be filled in"  
										}
									] 
								},
								{
									paddingX: 20,
									rows: [
										{ view:"text", label:_("Email"), name: "Email",
											invalidMessage: "\"Email\" must be as name@mail.com"  
										},
										{ view:"text", label:_("Skype"), name: "Skype" },
										{ view:"text", label:_("Phone"), name: "Phone" },
										{ view:"datepicker", label:_("Birthday"), name: "Birthday" },
										{
											paddingY: 10,
											cols: [
												{
													css: "app-upload",
													width: 200,
													height: 186,
													borderless: true,
													localId: "templatePhoto",
													template(obj) {
														const userPhoto = obj.Photo || "sources/images/no_photo.png";

														return `
															<div class="app-upload-photo">
																<img src="${userPhoto}" alt="">
															</div>
														`;
													}
												},
												{
													rows: [
														{},
														{ 
															view: "uploader",
															label: _("ChangePhoto"),
															name: "Photo",
															autosend: false,
															multiple: false,
															accept: "image/png, image/gif, image/jpeg",
															on: {
																onBeforeFileAdd(uploadedFile) {
																	const reader  = new FileReader();
																	reader.addEventListener("load", () => {
																		const base64 = reader.result;
																		const values = _this.getForm().getValues();

																		_this.setFormValues({
																			...values,
																			Photo: base64
																		});
																	}, false);

																	if (uploadedFile) {
																		reader.readAsDataURL(uploadedFile.file);
																	}
																}
															}
														},
														{
															view: "button",
															value: _("DeletePhoto"), 
															type: "form",
															click() {
																const values = _this.getForm().getValues();

																_this.setFormValues({
																	...values,
																	Photo: ""
																});
															}
														}
													]
												}
											]
										}
									]
								}
							]
						}
					],
					rules: {
						"FirstName": webix.rules.isNotEmpty,
						"LastName": webix.rules.isNotEmpty,
						"StartDate": webix.rules.isNotEmpty,
						"StatusID": webix.rules.isNotEmpty,
						"Job": webix.rules.isNotEmpty,
						"Address": webix.rules.isNotEmpty,
						"Birthday": webix.rules.isNotEmpty,
						"Company": webix.rules.isNotEmpty,
						"Email": webix.rules.isEmail
					},
					elementsConfig: {
						labelWidth: 130
					}
				},
				{},
				{
					view: "toolbar",
					padding: 15,
					cols: [
						{},
						{
							view: "button",
							borderless: true,
							label: _("Cansel"),
							width: 100,
							align: "right",
							click: () => {
								const form = this.$$("contactForm");
								form.clearValidation();
								form.clear();
								this.show("details");
							}
						},
						{
							view: "button",
							localId: "addSaveButton",
							width: 100,
							align: "right",
							click: () => {
								const form = this.$$("contactForm");
								if(form.validate()){
									this.app.callEvent("contactFormBtnClick");
									webix.message("validate is successful!");
									form.clearValidation();
									form.clear();
								}
							}
						}
					]
				}
			]
		};
	}

	getForm() {
		return this.$$("contactForm");
	}

	getTemplatePhoto() {
		return this.$$("templatePhoto");
	}

	setFormValues(values) {	
		this.getTemplatePhoto().setValues({ Photo: values.Photo });
		this.getForm().setValues(values);
	}

	setHeaderTitle(value) {
		this.$$("headerTitle").setValue(value);
	}

	setButtonValue(value) {
		this.$$("addSaveButton").setValue(value);
	}
}
