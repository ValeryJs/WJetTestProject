import {JetView} from "webix-jet";
import {statuses} from "../../models/statuses";

export default class ContactForm extends JetView {
	config() {
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
										{ view:"text", label:"First name", name: "FirstName" },
										{ view:"text", label:"Last Name", name: "LastName" },
										{ view:"datepicker", label:"Joining date", name: "StartDate", value: new Date() },
										{ 
											view: "richselect",
											label: "Status", 
											name: "StatusID",
											options: {
												data: statuses,
												body: {
													template: "#Value#"
												}
											}
										},
										{ view:"text", label:"Job", name: "Job" },
										{ view:"text", label:"Company", name: "Company" },
										{ view:"text", label:"Website", name: "Website" },
										{ view:"textarea", label:"Address", name: "Address" }
									] 
								},
								{
									paddingX: 20,
									rows: [
										{ view:"text", label:"Email", name: "Email" },
										{ view:"text", label:"Skype	", name: "Skype" },
										{ view:"text", label:"Phone", name: "Phone" },
										{ view:"datepicker", label:"Birthday", name: "Birthday" },
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
															label: "Change photo",
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
															value: "Delete photo", 
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
							label: "Cansel",
							width: 100,
							align: "right",
							click: () => {
								this.show("details");
							}
						},
						{
							view: "button",
							localId: "addSaveButton",
							width: 100,
							align: "right",
							click: () => {
								this.app.callEvent("contactFormBtnClick");
								this.show("details");
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
