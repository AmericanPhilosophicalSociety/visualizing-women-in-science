"use strict";

// graph dimensions and margins
const margin = { left: 50, top: 10, right: 50, bottom: 100 },
      h = 250 - margin.top - margin.bottom,
      w = 600 - margin.left - margin.right;

// assign properties of svg
const chart = d3.select("#naples-fields")
  .append("svg")
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr(
      'viewBox',
      '0 0 ' +
        (w + margin.left + margin.right) +
        ' ' +
        (h + margin.top + margin.bottom)
      )
      .attr("aria-label", "Bar chart showing the distribution of scientific disciplines among applicants to the 1929 Ellen Richards Research Prize.")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// define x and y axes
const x = d3.scaleBand().range([0, w]).padding(0.1),
      y = d3.scaleLinear().range([h, 0]);
// load data
d3.csv("/assets/datasets/naples-fields.csv").then(function(data) {
  // format data
  data.forEach(function(d) {
    d.frequency = +d.frequency;
  });

  // define domain of both axes
  x.domain(data.map(function(d) { return d.field }));
  y.domain([0, d3.max(data, function(d) { return d.frequency })]);

  const bar = chart.append('g')
    .selectAll('rect')
    .data(data)
    .join("rect")
    .attr("class", "bar")
      .attr("x", function(d) { return x(d.field); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return h - y(d.frequency); });

  // add the x-axis
  chart.append("g")
    .attr("transform", "translate(0," + h + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // add the y-axis
  chart.append("g")
    .call(d3.axisLeft(y).ticks(d3.max(data, function(d) {return d.frequency })))
});
