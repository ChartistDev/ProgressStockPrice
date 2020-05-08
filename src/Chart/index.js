
import apiKey from '../constants';
import *  as d3 from "d3";
import {state} from "../manager";
import clearPage from "../helper/clearPage";
const drawChart = (JSONdata) => {
    let svg = document.querySelector("#chartCanvas");
    clearPage(svg);
    var data = Object.values(JSONdata);
    var dates = Object.keys(JSONdata);
    function getMinY() {
        return data.reduce((min, p) => +p["3. low"] < min ? +p["3. low"] : min, +data[0]["3. low"]);
      }
      function getMaxY() {
        return data.reduce((max, p) => +p["2. high"] > max ? +p["2. high"] : max, +data[0]["2. high"]);
      }
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    svg = d3.select(svg)
    var rect = svg.node().getBoundingClientRect(),
    width = rect.width - margin.left - margin.right,
    height = rect.height - margin.top - margin.bottom;
    svg = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, data.length-1]) // input
    .range([width, 0]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([getMinY(), getMaxY()]) // input 
    .range([height, 0]); // output 
    console.log(yScale.domain());
    console.log(yScale.range())

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { 

        return yScale(+d["4. close"]); 
    }) // set the y values for the line generator 

var text  = svg.append("text");

var xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(function(d) {
        return(dates[+d])
    })

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(data) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(data)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(+d["4. close"]) })
    .attr("r", 2)
      .on("mouseover", function(a) {
          text.text(a["4. close"]);
          let circle = d3.select(this)
          text.attr("transform", "translate(" + circle.attr("cx") + "," + circle.attr("cy") + ")");
		})
      .on("mouseout", function() {  })

}
const createChart = async function(data) {
    console.log(data);
    try {
    let fetchAPI = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+data.symbol+"&interval=5min&apikey="+apiKey);
    let fetchJSON = await fetchAPI.json();
        state.setData(fetchJSON["Time Series (Daily)"]);
        drawChart(fetchJSON["Time Series (Daily)"]);
    } catch (e) {
        console.log(e);
    }
}

 export  {createChart, drawChart};