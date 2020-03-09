import * as webix from 'webix';
import emplEndPoint from '../end-point/empl-end-point';
import Employee from '../types/employee';

export const emplWindow: webix.ui.windowConfig = {
    view: "window",
    id: "emplWindow",
    close: true,
    move: true,
    head: "Справочник сотрудников",
    position: "center",
    body: {
        rows: [{
            view: "datatable",
            id: "emplTable",
            columns: [
                { id: "name", header: "Имя", width: 200, sort: "string" },
                { id: "age", header: "Возраст", width: 80, sort: "int" },
                { id: "phone", header: "Телефон", width: 100, sort: "int" }
            ],
            select: "row",
            autoheight: true,
            autowidth: true,
            on: {
                "onItemClick": (): void => {
                    webix.$$("editEmployeeButton").enable()
                    webix.$$("removeEmployeeButton").enable()
                },
                'onAfterRender': webix.once(function (): void {
                    emplEndPoint.getAll().then((res: Response): void => {
                        res.json().then((data: Employee[])=>{
                            console.log(data)
                            let table: webix.ui.datatable = webix.$$("emplTable") as webix.ui.datatable
                            table.parse(data, 'json')
                        })
                    }
                    )
                })
            }
        },
        {
            cols: [
                {
                    view: "button", value: "Добавить", id: "addEmployeeButton",
                    on: {
                        "onItemClick":
                            function (): void {
                                showPopup.call(this)
                                let form: webix.ui.form = webix.$$("emplForm") as webix.ui.form
                                form.clear()
                            }
                    },
                },
                {
                    view: "button", value: "Редактировать", id: "editEmployeeButton", disabled: true, on: {
                        "onItemClick": function (): void {
                            showPopup.call(this)
                            let table: webix.ui.datatable = webix.$$("emplTable") as webix.ui.datatable
                            let form: webix.ui.form = webix.$$("emplForm") as webix.ui.form
                            form.setValues(table.getSelectedItem())
                        }
                    }
                },
                {
                    view: "button", value: "Удалить", id: "removeEmployeeButton", disabled: true, on: {
                        "onItemClick": (): void => {
                            let table: webix.ui.datatable = webix.$$("emplTable") as webix.ui.datatable
                            console.log(table.getSelectedItem().id)
                            emplEndPoint.delete(table.getSelectedItem().id)
                        }
                    }
                },
            ]
        }
        ]
    } as any,
}

// показать форму добавления/редактирования сотрудников
function showPopup() {
    let table: webix.ui.datatable = webix.$$("emplTable") as webix.ui.datatable
    console.log(table.getSelectedItem())
    webix.$$("emplPopup").show(this.$view)
}

