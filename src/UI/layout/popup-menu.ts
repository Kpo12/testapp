import * as webix  from 'webix';

const data = {
    id: "root", value: "Films data", open: true, data: [
        {
            id: "1", open: true, value: "Справочник сотрудников"
        },
        {
            id: "2", open: true, value: "Отчеты", data: [
                { id: "2.1", value: "Отчет 1" },
                { id: "2.2", value: "Отчет 2" },
                { id: "2.3", value: "Отчет 3" },
                { id: "2.4", value: "Отчет 4" },
            ]
        },
        {
            id: "3", open: true, value: "Заказы"
        },
    ]

}

export const popupMenu = {
    view: "popup",
    id: "popupMenu",
    body: {
        view: "layout",
        height: 700,
        rows: [
            {
                view: "template",
                id: "greeting",
                template: "",
                height: 35,
            },
            {
                view: "grouplist",
                data: data,
                on:{'onItemClick': function(event: string){
                    switch (event) {
                        case "1": 
                            webix.$$("emplWindow").show()
                    }
                }}
            }
        ]
    },
}