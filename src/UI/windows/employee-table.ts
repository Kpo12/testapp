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
                            let form: webix.ui.form = webix.$$("emplForm") as webix.ui.form
                            form.setValues((webix.$$("emplTable") as webix.ui.datatable).getSelectedItem())
                        }
                    }
                },
                {
                    view: "button", value: "Удалить", id: "removeEmployeeButton", disabled: true, on: {
                        "onItemClick": (): void => {
                            console.log((webix.$$("emplTable") as webix.ui.datatable).getSelectedItem().id)
                            emplEndPoint.delete((webix.$$("emplTable") as webix.ui.datatable).getSelectedItem().id).then((): void => {
                                (webix.$$("emplTable") as webix.ui.datatable).remove(
                                    (webix.$$("emplTable") as webix.ui.datatable).getSelectedItem().id
                                ); webix.message("Запись удалена")
                            })
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
    console.log((webix.$$("emplTable") as webix.ui.datatable).getSelectedItem())
    webix.$$("emplPopup").show(this.$view)
}

export function renderTable(): void {
    emplEndPoint.getAll().then((res: Response): void => {
        res.json().then((data: Employee[]) => {
            (webix.$$("emplTable") as webix.ui.datatable).parse(data, 'json');
            (webix.$$("emplTable") as webix.ui.datatable).refresh()
        })
    }
    )
}