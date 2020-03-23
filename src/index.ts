import * as webix from 'webix';
import { toolbar, clockStart } from './UI/layout/toolbar';
import { popupMenu } from './UI/layout/popup-menu';
import { emplWindow, renderTable } from './UI/windows/employee-table';
import { loginForm } from './UI/windows/login-form';
import { emplPopup } from './UI/windows/employee-add-edit';


webix.ready(function (): void {
  webix.ui(loginForm).show()
  webix.ui({
    view: "layout",
    id: "root",
    hidden: true,
    responsive: true,
    rows: [
      {
        view: "layout",
        cols: [
        ]
      },
      toolbar
    ]
  })
  webix.ui(popupMenu).hide()
  webix.ui(emplWindow).hide()
  webix.ui(emplPopup).hide()
  renderTable()
  clockStart()
})





