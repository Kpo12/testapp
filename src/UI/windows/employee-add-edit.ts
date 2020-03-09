import * as webix from 'webix';
import emplEndPoint from '../end-point/empl-end-point';
import Employee from '../types/employee';

let form = {
    view: "form",
    id: "emplForm",
    borderless: true,
    elements: [
        { view: "text", label: 'Имя', name: "name" },
        { view: "text", label: 'Возраст', name: "age" },
        { view: "text", label: 'Телефон', name: "phone" },
        {
            view: "button", value: "Принять", click: function () {
                // проверка существования ID сотрудника и вызов соответствующего метода
                // POST для новой записи, PUT для существующей записи
                if (this.getParentView().validate()) {
                    let employee: Employee = this.getParentView().getValues()
                    if (this.getParentView().getValues().id) {
                        emplEndPoint.put(employee).then((): void => { webix.message("Запись обновлена") })
                    } else emplEndPoint.post(employee).then((): void => { webix.message("Запись создана") })

                    this.getTopParentView().hide();
                }
                else
                    webix.message({ type: "error", text: "Form data is invalid" });
            }
        }
    ],
    rules: {
        // убраны для отладки, забьл раскоментить
        //"name":webix.rules.isNotEmpty,
        //"age":webix.rules.isNotEmpty,
        //"phone":webix.rules.isNotEmpty,
    },
    elementsConfig: {
        labelPosition: "top",
    }
};

export const emplPopup = {
    view: "popup",
    id: "emplPopup",
    body: webix.copy(form)
}
