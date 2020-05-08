
import apiKey from '../constants';
import *  as d3 from "d3";
import {state} from "../manager";
import clearPage from "../helper/clearPage";
const drawChart = (JSONdata) => {
    let svg = d3.select(document.querySelector("#chartCanvas"));
    clearPage(document.querySelector("#chartCanvas"));
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var rect = svg.node().getBoundingClientRect(),
    width = rect.width - margin.left - margin.right,
    height = rect.height - margin.top - margin.bottom;
    svg = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var text  = svg.append("text");
    if(JSONdata!==null && Object.keys(JSONdata).length > 0) { 
    var data = Object.values(JSONdata);
    var dates = Object.keys(JSONdata);

    // Get minLow and maxhigh of stock data
    function getMinY() {
        return data.reduce((min, p) => +p["3. low"] < min ? +p["3. low"] : min, +data[0]["3. low"]);
      }
      function getMaxY() {
        return data.reduce((max, p) => +p["2. high"] > max ? +p["2. high"] : max, +data[0]["2. high"]);
      }


//  X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, data.length-1]) // input
    .range([width, 3]); // output

//  Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([getMinY(), getMaxY()]) // input 
    .range([height, 0]); // output 

//  d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { 

        return yScale(+d["4. close"]); 
    }) // set the y values for the line generator 


var xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(function(d) {
        return(dates[+d])
    })

//  Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis); // Create an axis component with d3.axisBottom

//  Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

//  Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(data) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

//  Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(data)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(+d["4. close"]) })
    .attr("r", 2)
    .style("cursor", "pointer")
      .on("mouseover", function(a) {
          text.text("Close: "+a["4. close"]).style("fill", a["4. close"]>=a["1. open"]? "green": "red");
          let circle = d3.select(this)
              circle.attr("r", 5);
          text.attr("transform", "translate(" + (width - 100) + ",0)");
		})
      .on("mouseout", function() {  
        text.text("");
        let circle = d3.select(this)
            circle.attr("r", 2);
        text.attr("transform", "translate(0,0)");
      })
    } else {
        text.text("No Data To Display");
        text.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
    }

}
const createChart = async function(data) {
    try {
    let fetchAPI = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+data.symbol+"&interval=5min&apikey="+apiKey);
    let fetchJSON = await fetchAPI.json();
        state.setData(fetchJSON["Time Series (Daily)"]);
        drawChart(fetchJSON["Time Series (Daily)"]);
    } catch (e) {
        drawChart(null)
    }
}

 export  {createChart, drawChart};