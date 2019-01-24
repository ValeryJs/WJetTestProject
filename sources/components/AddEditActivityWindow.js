import {JetView} from "webix-jet";
import {contacts} from "../models/contacts";
import {activitytypes} from "../models/activitytypes";


export default class AddEditActivityWindow extends JetView {
    config() {
        return {
            view: "window",
            modal: true,
            position: "center",
            width: 600,
            head: {
                view: "toolbar",
                css: "webix_dark",
                cols: [
                    {
                        view: "label",
                        localId: "head-title",
                        align: "center"
                    }
                ]
            },
            body: {
                view: "form",
                localId: "form",
                elements: [
                    {
                        view: "textarea",
                        label: "Details",
                        name: "Details",
                        height: 100
                    },
                    {
                        view: "richselect",
                        label: "Type",
                        name: "TypeID",
                        options: {
                            data: activitytypes,
                            body: {
                                template: "#Value#"
                            }
                        }
                    },
                    {
                        view: "richselect",
                        label: "Contacts",
                        name: "ContactID",
                        options: {
                            data: contacts,
                            body: {
                                template: "#FirstName# #LastName#"
                            }
                        }
                    },
                    {
                        cols: [
                            {
                                view: "datepicker",
                                label: "Date",
                                format: webix.i18n.longDateFormatStr,
                                stringResult: true,
                                name: "activityDate"
                            },
                            {
                                width: 15
                            },
                            {
                                view: "datepicker",
                                type: "time",
                                label: "Time",
                                format: webix.Date.dateToStr("%H:%i"),
                                stringResult: true,
                                name: "time"
                            }
                        ]
                    },
                    {
                        view: "checkbox",
                        labelRight: "Complited",
                        name: "complited",
                        value: 1
                    },
                    {
                        cols: [
                            {},
                            {
                                view: "button",
                                localId: "add-save-btn",
                                type: "form",
                                width: 100,
                                click: () => this.onSubmit()
                            },
                            {
                                view: "button",
                                value: "Cancel",
                                width: 100,
                                click: () => this.close()
                            }
                        ]
                    }
                ],
                rules: {
                    ContactID: webix.rules.isNotEmpty,
                    TypeID: webix.rules.isNotEmpty,
                    Details: webix.rules.isNotEmpty,
                    activityDate: webix.rules.isNotEmpty,
                    time: webix.rules.isNotEmpty
                }
            }
        };
    }

    setHeaderTitle(text) {
        this.getHeader().setValue(text);
    }

    setAddSaveBtnValue(value) {
        this.getAddSaveBtn().setValue(value);
    }

    editActivity(activity) {
        this.isNew = false;
        let time = activity.DueDate.split(" ")[1];

        this.getForm().setValues({
            ...activity,
            time
        });

        this.setHeaderTitle("Edit activity");
        this.setAddSaveBtnValue("Save");
    }

    addaAtivity() {
        this.isNew = true;
        this.setHeaderTitle("Add activity");
        this.setAddSaveBtnValue("Add");
    }

    show(activity) {
        if (activity) {
            this.editActivity(activity);
        } else {
            this.addaAtivity();
        }

        this.getRoot().show();
    }

    close() {
        this.getRoot().hide();
        this.getForm().clear();
        this.getForm().clearValidation();
    }

    getHeader() {
        return this.$$("head-title");
    }

    getForm() {
        return this.$$("form");
    }

    getAddSaveBtn() {
        return this.$$("add-save-btn");
    }

    onSubmit() {
        const formValue = this.getForm().getValues();
        let {activityDate, time} = formValue;
        let date = activityDate.split(" ")[0];
        formValue.DueDate = `${date} ${time}`;

        if (this.getForm().validate()) {
            this.close();
            this.getForm().callEvent("onSubmit:activity", [formValue, this.isNew]);
        }
    }
}