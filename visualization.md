---
layout: default
title: 'Visualizing Networks of Women Scientists at the APS'
parallax: true
image:
  img_url: '/assets/img/WomenInScience_003.jpeg'
  img_alt: List assembled by Florence Sabin of women scientists.
  caption_url: 'https://diglib.amphilsoc.org/islandora/object/women-science-nd/'
  caption: List of women scientists. Undated. Florence Rena Sabin Papers.
---

## {{ page.title }}

Click the button below to launch the network visualization in a new tab. Best viewed full screen on a laptop or desktop computer.

{% include viz-button.html %}

## About the visualization

Each circle or node in the visualization represents a woman scientist or a male scientist who contributed to women's advancement. All scientists are drawn from the collections of the [American Philosophical Society](https://www.amphilsoc.org/){:target="_blank"}{:rel="noopener noreferrer"}. Nodes are sized according to their degree, defined as the number of connections they have—the more connections, the larger the node.

A line between two nodes indicates that a connection between two scientists is documented in the collections of the APS. These connections include the following:
- corresponded with
- published together
- worked in a lab together or at the same institution
- recommended
- received a recommendation about
- mentioned in correspondence

The network only includes connections that could be verified in the APS's collections and is by no means exhaustive. In some cases, we know that two scientists knew each other or published together, but they were not included in the network because no evidence in the APS collections documents this connection. In the cases of Barbara McClintock and Rose Mooney-Slater, the network presents an [unusual slice of their scientific careers]({{ '/data-stories/gaps-silences'| relative_url }}). Additionally, some connections have been inferred, for example, in cases where only a first name was used. These inferences are noted in the [data]({{ '/about-data/' | relative_url }}).

{% comment %}
Each node has been assigned a color. Colors were assigned using [Louvain community detection](https://perso.uclouvain.be/vincent.blondel/research/louvain.html){:target="_blank"}{:rel="noopener noreferrer"}. In this method, an algorithm is run over the network. The algorithm will assign each node its own community and then join communities until the largest possible modularity is reached. In most cases, the algorithmically assigned modularity will correspond with the APS collection the connection was found in, but in some cases, such as the [community around the Naples Table]({{ site.url }}/data-stories/sabin), these communities reveal other patterns in the data.
{% endcomment %}

Each node has been assigned a color. Colors were assigned algorithmically using [Clauset-Newman-Moore greedy modularity maximalization](https://arxiv.org/abs/cond-mat/0408187){:target="_blank"}{:rel="noopener noreferrer"}. This method finds groups of nodes that have a higher number of connections between each other than they do with other parts of the network. In this method, an algorithm assigns each node a community. Communities are then combined until the largest possible modularity is reached. In most cases, the algorithmically assigned modularity will correspond with the APS collection the connection was found in, but in some cases, such as in [Florence Sabin's papers]({{ '/data-stories/sabin' | relative_url }}), these communities reveal other patterns in the data.

## How to use it

Clicking on a node will highlight all of that person's connections. Hover over a node to bring its label forward and read it. When you click on a node, a tab will appear to learn more about the scientist. Clicking on this will bring up a short biography of the scientist. You can also search for a scientist using the search bar labeled "Search for a scientist." This will immediately highlight her node and all connections.

There are two ways to filter the network to find more targeted information.
- Using the search bar labeled "Search for a collection" will show only those nodes found in that collection. Note that the connections are not filtered by collection. Connections show up if a connection exists anywhere in the APS collections.
- Using the search bar labeled "Search for a field" will show only those scientists who were active in a given field or discipline. We have taken a maximalist approach in assigning fields to try to reveal the greatest number of possible communities, so most scientists have been assigned several fields.

Biographies of women scientists are also available by selecting "Find a scientist" from the main navigation bar. These bios also contain links to relevant finding aids and image credits, where applicable.

## How we made it

For complete technical documentation as well as a project timeline, please see our [About page]({{ '/about' | relative_url }}).

Starting with the collections of [Florence Rena Sabin](https://search.amphilsoc.org/collections/view?docId=ead/Mss.B.Sa12-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}, [Florence Barbara Seibert](https://search.amphilsoc.org/collections/view?docId=ead/Mss.B.Se41-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}, and [Barbara McClintock](https://search.amphilsoc.org/collections/view?docId=ead/Mss.Ms.Coll.79-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}, we combed the APS archives for any evidence of women scientists helping other women scientists advance their career. We looked through every folder and paid careful attention to instances when a woman’s name appeared in the collections, including at the folder level and within individual documents. We searched for evidence of collaboration and exchange between scientists. Each time we found such a reference, it was entered into a spreadsheet along with data about the connection. The complete data is available for download [here](https://github.com/AmericanPhilosophicalSociety/Women-in-Science). After this initial survey, we also consulted the papers of [Mildred Cohn](https://search.amphilsoc.org/collections/view?docId=ead/Mss.Ms.Coll.17-ead.xml){:target="_blank"}{:rel="noopener noreferrer"} and [Rose Mooney-Slater](https://search.amphilsoc.org/collections/view?docId=ead/Mss.B.SL22-ead.xml){:target="_blank"}{:rel="noopener noreferrer"} in the same manner. We also conducted a limited, targeted survey of the papers of male scientists. In this survey, we searched for women already in our network and recorded any mention or evidence of their collaboration with other women.

The underlying data were gathered by Serenity Sutherland during several DH fellowships at the APS. These data were then restructured into network data, with assistance from David Ragnar Nelson. The data were transformed into network graphs by David Nelson, using the [NetworkX python module](https://networkx.org/){:target="_blank"}{:rel="noopener noreferrer"}. The visualization was built using [D3.js](https://d3js.org/){:target="_blank"}{:rel="noopener noreferrer"}, and this website was built with [Jekyll](https://jekyllrb.com/){:target="_blank"}{:rel="noopener noreferrer"}. Additional project support was provided by Bayard L. Miller, and Cynthia Heider worked on developing an earlier iteration of the project. Biographies of women scientists were written by Mackenzie Mahoney, David Nelson, Graziella Pierangeli, and Serenity Sutherland.
