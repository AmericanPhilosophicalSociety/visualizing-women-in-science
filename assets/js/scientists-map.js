"use strict";

const width = 960,
      height = 450;

// placeholder to grab target for graphic

let toggle = 0

const projection = d3.geoEqualEarth()
  .scale(450)
  .translate([750, 550]);

const path = d3.geoPath()
  .projection(projection);

let activeNode,
    selectedNode;

const svg = d3.select("#migration-map")
  .append("svg")
  .attr("id", "world-map")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", `0 0 ${width} ${height}`)

const g = svg.append("g")

const tooltip = d3.select("body")
  .append("div")
  .attr("class", "namebox");

const biobox = d3.select("#migration-map")
  .append("div")
  .attr("class", "biobox");

let explainToggle = 1;
const explainBox = d3.select("#migration-map")
  .append('div')
  .attr("class", "explain-box")
  .html("<p>This interactive map tells the stories of scientists displaced by war and totalitarianism between 1920 and 1950.</p><p>Click on this box to start the visualization.</p>")
  .on("click", function(event, d) {
    if (explainToggle === 1) {
      explainBox.html("<p>Click on a circle to start a scientist's journey. Click the map to advance the story.</p>");
      explainToggle = 2;
    }
    else {
      explainBox.style("visibility", "hidden")
    }
  })

const resetBtn = d3.select("#migration-map")
  .append("button")
  .attr("class", "reset-btn")
  .html("REFRESH")
  .on("click", function(event, d) {
    d3.selectAll("circle.active")
      .remove()
    d3.selectAll("circle.inactive")
      .remove()
    d3.selectAll(".migration.active")
      .remove()
    d3.selectAll(".migration.inactive")
      .remove()
    d3.selectAll(".migration.selected")
      .remove()
    biobox.style("visibility", "hidden")
    resetBtn.style("visibility", "hidden")
    toggle = 0
    update();
  })

update();

function update() {
Promise.all([
  d3.json("/assets/datasets/migration-points.json"),
  d3.json("/assets/datasets/migration-paths.json"),
  d3.json("/assets/datasets/world.json")
]).then(function(scientists) {
  g.selectAll("path")
    .data(topojson.feature(scientists[2], scientists[2].objects.countries).features)
  .join("path")
    .attr("d", path);
  g.selectAll("circle")
    .data(scientists[0].features)
  .join("circle")
    .attr('r', 5)
    .attr("fill", "#310c3d")
    .attr("id", function(d) { return d.properties.id; })
    .attr("rowid", function(d) { return d.properties.rowid; })
    .attr("target", function(d) { return d.properties.target; })
    .attr("cx", function(d) { return projection(d.geometry.coordinates)[0]; })
    .attr("cy", function(d) { return projection(d.geometry.coordinates)[1]; })
    .attr("class", function(d) {
      if (d.properties.order === 'first') {
        return "first";
      }
      else {
        return "other";
      }
    })
    .on('mouseover', function(event, d) {
      if (d.properties.order === 'first') {
        tooltip.text(d.properties.name); return tooltip.style("visibility", "visible");
      }
    })
    .on('mousemove', function(event, d) {
      if (d.properties.order === 'first') {
        return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
      }
    })
    .on('mouseout', function(event, d) {
      return tooltip.style("visibility", "hidden");
    })
    .on('click', function(event, d) {
      highlightPaths(event, d, this)
      explainBox.style("visibility", "hidden");
    });

  const migrationPath = g.selectAll("migration")
    .data(scientists[1].features)
    .join("path")
      .attr("d", function(d) { return path(d) })
      .attr('class', 'migration')
      .attr("id", function(d) { return d.properties.id; })
      .attr("rowid", function(d) { return d.properties.rowid; });

  function transition() {
    d3.select('.migration.selected').transition()
      .duration(1500)
      .attrTween("stroke-dasharray", tweenDash);
  }

  function tweenDash() {
    return function(t) {
      const l = d3.select(".migration.selected").node().getTotalLength();
      let interpolate = d3.interpolateString("0," + l, l + "," + 1);
      const p = migrationPath.node().getPointAtLength(t * 1);
      return interpolate(t)

    }
  }

  svg.on("click", function(event, d) {
      if (toggle === 'NULL') {
        biobox.html("You've reached the end of this story. Refresh the visualization?")
        resetBtn.style("visibility", "visible")
      }
      else if (!toggle == 0) {
        d3.selectAll("circle.inactive").each(function(e) {
          if (e.properties.rowid == toggle) {
            d3.select(this)
              .classed("active", true)
          }
        })
        activeNode = d3.selectAll("circle.active").data();
        selectedNode = activeNode.filter(e => e.properties.rowid == toggle)
        biobox.html(selectedNode[0].properties.narrative)
        setTimeout(function() {
          toggle = selectedNode[0].properties.target;
        }, 100);
        d3.selectAll(".migration.selected")
          .classed("selected", false)
          .classed("active", true)
        d3.selectAll(".migration.inactive").each(function(e) {
          if (e.properties.rowid == toggle) {
            d3.select(this)
              .style('opacity', 1)
              .classed("selected", true)
              .call(transition)
          }
        })
      }
    });

  function highlightPaths(event, d, selectedElement) {
    if (d.properties.order === 'first') {
      biobox.html(d.properties.narrative)
        .style("visibility", "visible")
      d3.selectAll("circle").classed("inactive", true)
      d3.selectAll(".migration").classed('inactive', true)
      d3.select(selectedElement).classed("active", true);
      setTimeout(function() {
        toggle = d.properties.target;
      }, 100);
    }
  }

  raiseFirst();
  })
}

function raiseFirst() {
  d3.selectAll(".first").raise();
}
