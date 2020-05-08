
import "./style.css";
import DropDown from "./Dropdown/index";
import { companyData } from "./Data/companies";
import {state} from "./manager";
import {drawChart} from "./Chart/index";
const obj = new DropDown();
      obj.setData(companyData).setFilter("name").createDropDown();
const fromInput = document.querySelector("#fromDate"),
      toInput = document.querySelector("#toDate"),
      dateButton = document.querySelector("#dateSubmit");

      dateButton.addEventListener("click", (e)=> {
          let date1 = new Date(fromInput.value),
             date2 = new Date(toInput.value);
             if(date1!=="Invalid date" && date2!== "Invalid date" && date1 < date2) {
                 if(state.data) {
                    state.clipData(date1, date2);
                    drawChart(state.getData());
                 }
             }
      })
