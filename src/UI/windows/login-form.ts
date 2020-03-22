import * as webix from 'webix';

let form: webix.ui.formConfig = {
    view:"form",
    borderless:true,
    elements: [
        { view:"text", label:'Логин', name:"login" },
        { view:"text", label:'Пароль', name:"password" },
        { view:"button", value: "Войти", click:function(){
            if (this.getParentView().validate()){ 
                webix.message("Вы вошли как: " + this.getParentView().getValues().login);
                this.getTopParentView().hide(); 
                webix.$$("greeting").define("template", "Добро пожаловать, " + this.getParentView().getValues().login)
                webix.$$("root").show()
            }
            else
                webix.message({ type:"error", text:"Не все необходимые поля заполнены" });
        }}
    ],
    rules:{
        "login":webix.rules.isNotEmpty,
        "password":webix.rules.isNotEmpty,
    },
    elementsConfig:{
        labelPosition:"top",
    }
};

export const loginForm: webix.ui.windowConfig = {
    view:"window",
    id:"loginForm",
    width:300,
    position:"center",
    modal:true,
    head:"Вход на сайт",
    body:webix.copy(form)
}