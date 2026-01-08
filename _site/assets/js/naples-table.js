"use strict";

const width = 960,
      height = 600,
      // need radius to keep nodes on canvas - see ticked function below
      radius = 6;

// set viewBox dimensions for SVG
const svg = d3.select("#naples-network")
  .append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("aria-label", "Visualization of the network of correspondence concerning the Naples Table.")

svg.append('rect')
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('fill', 'transparent')
  // clear label styling on click
  .on('click', function() {
    d3.selectAll('.label').style('visibility', 'hidden');
    d3.selectAll('.link').style('stroke-opacity', 1);
    d3.selectAll('.node').style('fill-opacity', 1).classed('selected', false);
    d3.selectAll('.label').classed('selected', false);
  })

const color = d3.scaleLinear().domain([1,2,3])
  .range(["#FDC151", "#6BCFF6", "#F37465"]);

// configure physics simulation for network animation
const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(50))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    // .force('x', d3.forceX(width / 2).strength(0.25))
    // .force('y', d3.forceY(height / 2).strength(0.25))
    // set collisions to try to separate out nodes more
    .force("collide", d3.forceCollide(3).strength(100).iterations(0));

// create single container for visualization
const container = svg.append('g');

let link = container.append("g")
  .attr('class', 'links')
  .selectAll('.link');

let node = container.append('g')
  .attr('class', 'nodes')
  .selectAll('.node')

let label = container.append('g')
  .attr('class', 'labels')
  .selectAll('.label');

let graph, store;

//	filtered types
let filterToggle = [];

/*//	filter button event handlers
$(".filter-btn").on("click", function() {
	var id = $(this).attr("value");
	if (filterToggle.includes(id)) {
		filterToggle.splice(filterToggle.indexOf(id), 1)
	} else {
		filterToggle.push(id);
	}
	filter();
});
*/

// get data from checkboxes to run update

const checkbox = d3.selectAll(".role_cb")
checkbox.on("change", updateCheckboxes)

function updateCheckboxes() {
  filterToggle = []
  const boxes = d3.selectAll('input:checked')
  boxes.each(function() {
    filterToggle.push(this.value)
  });
  filter();
}


function loadJSON() {
  d3.json("/assets/datasets/naples.json").then(function(g) {
    const nodes = g.nodes;
    const links = g.links;

    graph = g;
    store = $.extend(true, {}, g);

    update(nodes, links);
  });
}

loadJSON();

function update(nodes, links) {

  // Make a shallow copy to protect against mutation
  const old = new Map(node.data().map(d => [d.id, d]));
  nodes = nodes.map(d => Object.assign(old.get(d.id) || {}, d));
  links = links.map(d => Object.assign({}, d));

  // set size scale for nodes
  let sizeScale = d3.scaleSqrt()
    .range([10, 25]);

  let maxDegree = d3.max(nodes, function(d) { return d.degree; })
  let minDegree = d3.min(nodes, function(d) { return d.degree; })
    sizeScale.domain([minDegree, maxDegree]);

  node = node
    .data(nodes, function(d) { return d.id; })
    .join(enter => enter.append("circle"))
      .attr('class', 'node')
      .attr('r', function(d) { return sizeScale(d.degree); })
      .attr('fill', function(d) { return color(d.color); })
      .attr('id', function(d) { return d.id; })
      // have label appear on mouseover
      .on('mouseenter', function(event, d) {
        showLabel(event, d)
      })
      .on('mouseleave', function(event, d) {
        hideLabel(event, d)
      })
      .on('click', function(event, d) {
        highlightNodes(event, d, this);
      })

    const drag_handler = d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    drag_handler(node);

    // parameters for links //
    // update
    link = link
      .data(links, function(d) {
        return d.target.id + d.source.id
      })
      .join(enter => enter.append("path"))
        .attr('class', 'link');

    label = label.data(nodes, function(d) {
      return d.id;
    });

    label.exit().remove();

    var labelEnter = label.enter().append('g')
      .attr('class', 'label')
      .attr('id', function(d) { return d.id; })

    label = labelEnter.merge(label)

    label.append('rect') // placeholder

    label.append('text')
      .text(function(d) {
        return d.name;
    })

    d3.selectAll('.label text').each(function(d, i){
      if (!d.labelBBox) {
        d.labelBBox = this.getBBox();
      }
    });

    // size bounding box for text. Fiddle with numbers to improve appearance
    d3.selectAll('.label rect')
      .attr('x', function(d) {
        return d.labelBBox.x - 4;
      })
      .attr('y', function(d) {
        return d.labelBBox.y + 3;
      })
      .attr('width', function(d) {
        return d.labelBBox.width + 8;
      })
      .attr('height', function(d) {
        return d.labelBBox.height + 5;
      })
    // update simulation nodes and links
    simulation
      .nodes(nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(links);

    simulation.alpha(1).alphaTarget(0).restart();

    // Inspired by SDFB's toggleClick function
    // Highlight neighboring nodes and links on click

      function highlightNodes(event, d, selectedElement) {

        // handle styling of selected node
        d3.selectAll('.node, .label').classed('selected', false);
        d3.select(selectedElement).classed('selected', true)
        d3.selectAll('.label').filter(function(e) {
          return e.id == d.id;
        }).classed('selected', true)

        var connectedNodes = {};
        connectedNodes[d.id] = true;
        links.forEach(function(l) {
          if (l.source.id == d.id) {
            connectedNodes[l.target.id] = true;
          } else if (l.target.id == d.id) {
            connectedNodes[l.source.id] = true;
          };
        });

        d3.selectAll('.link')
          .style('stroke-opacity', function(l) {
            if (l.target.id != d.id && l.source.id != d.id) {
              return 0.1;
            };
          })

        d3.selectAll('.node')
          .style('fill-opacity', function(n) {
            if (n.id in connectedNodes) {
              return 1
            } else {
              return 0.1;
            };
          })

        d3.selectAll('.label')
          .style('visibility', function(m) {
            if (m.id in connectedNodes) {
              return 'visible'
            };
          })
        }

      // parameters for showing labels based on their corresponding nodes
      function showLabel(event, d) {
        d3.selectAll('.label').each(function(e) {
          if (e.id == d.id) {
            d3.select(this).classed("show-label", true);
          }
        })
        // // sort elements so to bring the hovered one on top and make it readable.
        svg.selectAll(".label").each(function(e, i) {
          if (d == e) {
            var myElement = this;
            d3.select(myElement).remove();
            d3.select('.labels').node().appendChild(myElement);
          }
        })
      }
      function hideLabel(event, d) {
        d3.selectAll('.label').each(function(e) {
          if (e.id == d.id) {
            d3.select(this).classed("show-label", false);
          }
        })
      }
}

  // parameters for drag
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  // control simulation placement
  function ticked() {
    link
      .attr("d", function(d) {
        var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });


        node
            .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
            .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

        label.attr("transform", function(d) {
              return "translate(" + (d.x) + "," + (d.y + 2.5) + ")"
            })
  }

// filter function

function filter() {
  // add and remove nodes based on the filter
  const filteredNodes = []
  graph.nodes = store.nodes
    .filter(d => (filterToggle.includes(d.color)));
  graph.nodes.forEach(function(d) {
    filteredNodes.push(d.id)
  })
  /*
  store.nodes.forEach(function(d) {
    if (!d.color.includes(filterToggle)) {
      graph.nodes.forEach(function(e, i) {
        if (d.id === e.id) {
          graph.nodes.splice(i, 1);
        }
      });
    } else if (d.color.includes(filterToggle)) {
      filteredNodes.push(d.id)
    }
  });
  */
    graph.links = []
    store.links.forEach(function (d) {
      if (filteredNodes.indexOf(d.source) !== -1 && filteredNodes.indexOf(d.target) !== -1) {
       graph.links.push(d)
      }
    });
    update(graph.nodes, graph.links)
  }
