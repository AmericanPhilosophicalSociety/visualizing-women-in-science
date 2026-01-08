"use strict";
// set dimensions for graph
const w = window.innerWidth,
      h = window.innerHeight;

// set viewBox dimensions for SVG
const svg = d3.select("div#container")
  .append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", `0 0 ${w} ${h}`)
  .classed("svg-content", true);

svg.append('rect')
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('fill', 'transparent')
  // make labels disappear - if we keep it this way
  .on('click', function() {
    d3.selectAll('.label').style('visibility', 'hidden');
    d3.selectAll('.link').style('stroke-opacity', 1);
    d3.selectAll('.node').style('fill-opacity', 1).classed('selected', false);
    d3.selectAll('.label').classed('selected', false);
    // remove elements for biobox - somewhat buggy having both of these on the same event handler
    d3.select('.sidepanel').style('width', 0);
    d3.select('.openbtn').style('visibility', 'hidden');
  });

  let biobox = d3.select('#bio-content')

// set color palette for graph
// const color = d3.scaleOrdinal(d3.schemeCategory10);

const color = d3.scaleOrdinal()

// color.range(["#A2615D", "#9B7088", "#75889F", "#579C94", "#76A771", "#B2A758", "#EB9E6C"]);
// color.range(["#d7966f", "#a55428", "#b27d7a", "#e88d6c", "#955235", "#bd836e", "#cb7069"]);
// color.range(["rgb(255,194,81)", "rgb(110,208,247)", "rgb(244,116,101)", "rgb(104,100,156)", "rgb(147,49,28)", "rgb(218,185,255)"]);
// color.range(["rgb(255,194,81)", "rgb(110,208,247)", "rgb(244,116,101)", "rgb(58,101,102)", "rgb(73,64,110)", "rgb(136,7,95)"]);
color.range(["rgb(255,194,81)", "rgb(110,208,247)", "rgb(244,116,101)", "rgb(104,100,156)", "rgb(82, 209, 167)", "rgb(218, 185, 255)", "rgb(69, 115, 77)"])
// color.range(["rgb(255,194,81)", "rgb(110,208,247)", "rgb(244,116,101)", "rgb(147,49,28)", "rgb(157, 171, 166)", "rgb(218, 185, 255)"])

// configure physics simulation for network animation
const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(75))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(w / 2, h / 2))
    .force('x', d3.forceX(w / 2).strength(0.12))
    .force('y', d3.forceY(h / 2).strength(0.25))
    // set collisions to try to separate out nodes more
    .force("collide", d3.forceCollide(6).strength(60).iterations(0));
    // .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100))
    // .force("charge", d3.forceManyBody().strength(-300))
    // .force("center", d3.forceCenter(w / 2, h / 2))
    // .force('x', d3.forceX(w / 2).strength(0.25))
    // .force('y', d3.forceY(h / 2).strength(0.25))
    // set collisions to try to separate out nodes more
    // .force("collide", d3.forceCollide(6).strength(60).iterations(0));


    // add fisheye
    // var fisheye = d3.fisheye.circular()
    //   .radius(75)
    //   .distortion(2);

// create single container for visualization

const container = svg.append('g');

// Initialize links, nodes and edges

// data stores

let graph, store;

let collections;

let fields;

// toggle to indicate filter

let toggle = 0

let link = container.append("g")
  .attr('class', 'links')
  .selectAll('.link');

let node = container.append('g')
  .attr('class', 'nodes')
  .selectAll('.node')

let label = container.append('g')
  .attr('class', 'labels')
  .selectAll('.label');

// load JSON

function loadJSON() {
  d3.json("/assets/datasets/wis.json").then(function(g) {
    const nodes = g.nodes;
    const links = g.links;

    graph = g;
    // create deep copy using jQuery
    store = $.extend(true, {}, g);

    update();
  });
}

loadJSON()


// filters

let filterToggle;

// filter buttons

/*$('.filter-btn').on('click', function() {
  let id = $(this).attr('value');
  filterToggle = id
  filter();
  update();
});
*/
function filterClick() {
  let id = document.getElementById("collection-search").value;
  filterToggle = id
  filter();
  update();
  d3.selectAll('.collection-filter')
    .style('visibility', 'hidden')
  d3.select('#reset-button')
    .style('visibility', 'visible')
  d3.select('#collection-view')
    .append('h3')
    .html('Viewing: ' + id)
};

function fieldClick() {
  let id = document.getElementById("field-search").value;
  filterToggle = id
  fieldFilter();
  update();
  d3.selectAll('.collection-filter')
    .style('visibility', 'hidden')
  d3.select('#reset-button')
    .style('visibility', 'visible')
  d3.select('#collection-view')
    .append('h3')
    .html('Viewing: ' + id)
};

$('.reset-btn').on('click', resetNetwork);

function resetNetwork() {
  // need to completely remove all nodes and labels from DOM and re-declare
  // otherwise, it will use bad data stored in memory
  /* node = d3.selectAll('g .nodes').remove()
  node = container.append('g')
    .attr('class', 'nodes')
    .selectAll('.node')

  label = d3.selectAll('g .labels').remove()
  label = container.append('g')
    .attr('class', 'labels')
    .selectAll('.label');

  d3.select('h3').remove()
  d3.select('#reset-button').style('visibility', 'hidden')
  d3.selectAll('.collection-filter').style('visibility', 'visible')
  loadJSON();
  toggle = 0
  */
  // better to just brute-force reload (may need to add true in the parens...)
  window.location.reload()
}

function update() {

  // parameters for nodes
  // update
  node = node.data(graph.nodes, function(d) { return d.id; });

  // set size scale for nodes
  let sizeScale = d3.scaleSqrt()
  .range([10, 25]);

  let maxDegree = d3.max(graph.nodes, function(d) { return d.degree; })
  let minDegree = d3.min(graph.nodes, function(d) { return d.degree; })
  sizeScale.domain([minDegree, maxDegree]);

  // exit
  node.exit().remove();
  // enter
  const nodeEnter = node.enter().append('circle')
    .attr('class', 'node')
    .attr('r', function(d) { return sizeScale(d.degree); })
    .attr('fill', function(d) { return color(d.modularity); })
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

    /* can append title here */

    // enter and update
    node = node.merge(nodeEnter);

    const drag_handler = d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    drag_handler(node);

    // parameters for links //
    // update
    link = link.data(graph.links, function(d) {
      return d.target.id + d.source.id
    });
    // exit
    link.exit().remove()
    // enter
    const linkEnter = link.enter().append('path')
      .attr('class', 'link');

    link = link.merge(linkEnter);

    // parameters for labels
    // labels

    label = label.data(graph.nodes, function(d) {
      return d.id;
    });

    label.exit().remove();

    const labelEnter = label.enter().append('g')
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
        d.labelBBox = this.getBoundingClientRect();
      }
    });

    // size bounding box for text. Fiddle with numbers to improve appearance
    d3.selectAll('.label rect')
      .attr('x', function(d) {
        return 3 - d.labelBBox.x;
      })
      .attr('y', function(d) {
        return d.labelBBox.y - 5;
      })
      .attr('width', function(d) {
        return d.labelBBox.width + 8;
      })
      .attr('height', function(d) {
        return d.labelBBox.height + 5;
      })
    // update simulation nodes and links
    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    simulation.alpha(1).alphaTarget(0).restart();

    // trying to computationally extract each item
    /* const collections = d3.nest().key(function(d) {
      return d.collection
    })
      .entries(graph.nodes).map(function(d) {
        return d.key
    }); */

    // get a list of all the collections to populate drop-down
    collections = Object.keys(graph.nodes.reduce((acc, d) => {
      d.collection.forEach(n => acc[n] = true);
      return acc;
    }, {}));

    d3.select('#collections-list').selectAll('option')
      .data(collections)
      .enter()
      .append('option')
      .attr('value', function(d) { return d; });

    // populate collections dropdown

    const collectionsList = d3.select('.collections').append('a');

    collectionsList.selectAll('a')
      .data(collections, function(d) { return d })
      .enter()
      .append('a')
      .html(String)
    
    // rinse, wash, repeat with fields
    fields = Object.keys(graph.nodes.reduce((acc, d) => {
      d.field.forEach(n => acc[n] = true);
      return acc;
    }, {}));

    fields.sort()

    d3.select('#fields-list').selectAll('option')
      .data(fields)
      .enter()
      .append('option')
      .attr('value', function(d) { return d; });

    // populate collections dropdown

    const fieldsList = d3.select('.fields').append('a');

    fieldsList.selectAll('a')
      .data(fields, function(d) { return d })
      .enter()
      .append('a')
      .html(String)

    d3.select('#scientists-list').selectAll('option')
      .data(graph.nodes)
      .enter()
      .append('option')
      .attr('value', function(d) { return d.name; });

    const scientistsList = d3.select('.scientists').append('a')

    scientistsList.selectAll('a')
      .data(graph.nodes, function(d) { return d.name; })
      .enter()
      .append('a')
      .html(String)
}


// add zoom capabilities

// select a node via the search bar
function highlightScientists() {
    let sciId = document.getElementById("scientist-search").value;
    let selectSci = graph.nodes.filter(function(d) {
      return d.name === sciId
    })
    highlightNodes(event, selectSci[0], this)
}

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
    graph.links.forEach(function(l) {
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
    showBio(event, d)
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

  function showBio(event, d) {
    // reveal open button
    d3.select('.openbtn')
      .style('visibility', 'visible')
    // remove any old data
    d3.selectAll('figure').remove();
    d3.selectAll('.bio-title').remove();
    d3.selectAll('.biotext').remove();
    d3.selectAll('.biolink').remove();
    d3.select
    if (d.image !== "") {
      let picture = biobox.append('figure')
        picture.append('img')
          .attr('src', d.image)
        picture.append('figcaption')
          .html(d.caption)
    }
    if (d.dob !== "") {
      if (d.dod !== "") {
        biobox.append('h2')
          .attr('class', 'bio-title')
          .html(d.name + ' (' + d.dob + '&ndash;' + d.dod + ')')
        }
      else {
        biobox.append('h2')
          .attr('class', 'bio-title')
          .html(d.name + ' (b. ' + d.dob + ')')
      }
    }
    else {
      biobox.append('h2')
        .attr('class', 'bio-title')
        .html(d.name)
    }
    // biobox.append('h2')
    //   .attr('class', 'bio-title')
      // .html(d.name)
    biobox.append('p')
      .attr('class', 'biotext')
      .html(d.bio)
    biobox.append('p')
      .attr('class', 'biolink')
      .html('Stable link to this biography: <a href="/bios/' + d.id + '" target=_"blank">https://womeninscience.amphilsoc.org/bios/' + d.id + '</a>')
  }
const zoom = d3.zoom();

svg.call(zoom.on('zoom', zoomed))

// override default behavior to zoom on double click
svg.on("dblclick.zoom", null)

function zoomed(event, d) {
          container.attr("transform", "translate(" + event.transform.x + ", " + event.transform.y + ") scale(" + event.transform.k + ")");
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
      let dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      });


      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label.attr("transform", function(d) {
            return "translate(" + (d.x - 50) + "," + (d.y + 2.5) + ")"
          })
}

// collection filter function

function filter() {
  // add and remove nodes based on the filter
  const filteredNodes = []
  if (toggle === 1) {
    resetNetwork()
    store.nodes.forEach(function(d) {
      if (!d.collection.includes(filterToggle)) {
        graph.nodes.forEach(function(e, i) {
          if (d.id === e.id) {
            graph.nodes.splice(i, 1);
          }
        });
      }
      else if (d.collection.includes(filterToggle)) {
        graph.nodes.push(d)
        filteredNodes.push(d.id)
      }
    })
  } else {
    store.nodes.forEach(function(d) {
      if (!d.collection.includes(filterToggle)) {
        graph.nodes.forEach(function(e, i) {
          if (d.id === e.id) {
            graph.nodes.splice(i, 1);
          }
        });
        toggle = 1
      } else if (d.collection.includes(filterToggle)) {
        filteredNodes.push(d.id)
      }
    });
  }
  graph.links = []
  store.links.forEach(function (d) {
    if (filteredNodes.indexOf(d.source) !== -1 && filteredNodes.indexOf(d.target) !== -1) {
     graph.links.push(d)
    }
  })
}

// field filter function

function fieldFilter() {
  // add and remove nodes based on the filter
  const filteredNodes = []
  if (toggle === 1) {
    resetNetwork()
    store.nodes.forEach(function(d) {
      if (!d.field.includes(filterToggle)) {
        graph.nodes.forEach(function(e, i) {
          if (d.id === e.id) {
            graph.nodes.splice(i, 1);
          }
        });
      }
      else if (d.field.includes(filterToggle)) {
        graph.nodes.push(d)
        filteredNodes.push(d.id)
      }
    })
  } else {
    store.nodes.forEach(function(d) {
      if (!d.field.includes(filterToggle)) {
        graph.nodes.forEach(function(e, i) {
          if (d.id === e.id) {
            graph.nodes.splice(i, 1);
          }
        });
        toggle = 1
      } else if (d.field.includes(filterToggle)) {
        filteredNodes.push(d.id)
      }
    });
  }
  graph.links = []
  store.links.forEach(function (d) {
    if (filteredNodes.indexOf(d.source) !== -1 && filteredNodes.indexOf(d.target) !== -1) {
     graph.links.push(d)
    }
  })
}
