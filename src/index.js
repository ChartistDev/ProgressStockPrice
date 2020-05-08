
import "./style.css";
import DropDown from "./Dropdown/index";
import { companyData } from "./Data/companies";
import {state} from "./manager";
import {drawChart} from "./Chart/index";
drawChart(null);
/*** Create dropdown instanc and populate with dropdown list */
const obj = new DropDown();
      obj.setData(companyData).setFilter("name").createDropDown();

/**Manage from and to date instances */
const fromInput = document.querySelector("#fromDate"),
      toInput = document.querySelector("#toDate"),
      dateButton = document.querySelector("#dateSubmit");

      dateButton.addEventListener("click", (e)=> {
          let date1 = new Date(fromInput.value),
             date2 = new Date(toInput.value);
             if(date1!=="Invalid date" && date2!== "Invalid date" && date1 < date2) {
                 if(state.data) {
                    state.clipData(date1, date2); ///clip data according to from and to dates
                    drawChart(state.getData());
                 } else {
                     drawChart(null)
                 }
             } else {
                 drawChart(null);
             }
      })
