import setAttributes from "../helper/attributeSetter";
import {createChart} from "../Chart"; 
import throttle from "../helper/throttle";

class DropDown {
  constructor() {
    this.data = undefined;
    this.selected = document.querySelector(".selected");
    this.optionsContainer = document.querySelector(".options-container");
    this.searchBox = document.querySelector(".search-box input");
    this.optionsList = undefined;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  setFilter(filterName) {
    this.filterName = filterName;
    return this;
  }
  createDropDown() {
    if(!this.data || !this.filterName) {
      alert("Please insert data and valid filtername");
    } else {
      //Clear out optionsContainer
      var first = this.optionsContainer.firstElementChild; 
      while (first) { 
          first.remove(); 
          first = this.optionsContainer.firstElementChild; 
      } 
        
      this.createOptions();  
      this.optionsList = document.querySelectorAll(".option");

                this.selected.addEventListener("click", () => {
          this.optionsContainer.classList.toggle("active");

          this.searchBox.value = "";
          this.filterList("");

          this.optionsList.forEach(o => {
              o.style.backgroundColor= "";
            if(this.selected.innerHTML === o.querySelector("label").innerHTML) {
                o.style.backgroundColor="#57A0D3";
                o.scrollIntoView();
            }
          });

          if (this.optionsContainer.classList.contains("active")) {
            this.searchBox.focus();
          }
        });

          this.optionsList.forEach(o => {
        //   o.addEventListener("click", () => {
        //     let selectedData = this.data.find((value)=>{
        //         return(value[this.filterName] === o.querySelector("label").innerHTML);
        //     });
        //     createChart(selectedData);
        //     this.selected.innerHTML = o.querySelector("label").innerHTML;
        //     this.optionsContainer.classList.remove("active");
        //   });
        o.addEventListener("click", () => {
            let selectedData = this.data.find((value)=>{
                return(value[this.filterName] === o.querySelector("label").innerHTML);
            });
            throttle(createChart(selectedData), 12000); ///USe throttling while calling data
            this.selected.innerHTML = o.querySelector("label").innerHTML;
            this.optionsContainer.classList.remove("active");
          });
        });

        this.searchBox.addEventListener("keyup", (e)=> {
          this.filterList(e.target.value);
        });

    }
  }
  createOptions() {
          for(let i = 0;i<this.data.length;i++) {
          let option = document.createElement("div");
              setAttributes(option, {"class": "option"});
            let input = document.createElement("input");
              setAttributes(input, {type:"radio",
                                          class:"radio",
                                          id: this.data[i][this.filterName],
                                          name:"category"});
            let label = document.createElement("label")
              setAttributes(label, {"for": this.data[i][this.filterName]});
              option.appendChild(input);
              option.appendChild(label);
              this.optionsContainer.appendChild(option);
              label.innerHTML = this.data[i][this.filterName];
      }
  }
  filterList(searchTerm){
    searchTerm = searchTerm.toLowerCase();
    this.optionsList.forEach(option => {
      let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
      if (label.indexOf(searchTerm) != -1) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  };
}

export default DropDown;