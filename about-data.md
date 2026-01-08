---
layout: default
title: About the Data
parallax: true
image:
  img_url: '/assets/img/Mss_B_Sl22-007.jpg'
  img_alt: Research negatives on the structure of indium phosphate from the Rose Mooney Slater Papers.
  caption_url: '/about-data'
  caption: Research negatives on the structure of indium phosphate from the Rose Mooney Slater Papers.
---

## {{ page.title }}

Starting in 2018, we began combing the collections of the American Philosophical Society for mention of women scientists. These efforts were spearheaded by Serenity Sutherland, who received a [Digital Humanities Fellowship](https://www.amphilsoc.org/grants/digital-humanities-fellowships){:target="_blank"}{:rel="noopener noreferrer"} to conduct this research.

We conducted a thorough survey of the correspondence in the following collections:
- [Florence Rena Sabin](https://search.amphilsoc.org/collections/view?docId=ead/Mss.B.Sa12-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}
- [Florence Barbara Seibert](https://search.amphilsoc.org/collections/view?docId=ead/Mss.B.Se41-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}
- [Barbara McClintock](https://search.amphilsoc.org/collections/view?docId=ead/Mss.Ms.Coll.79-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}
- [Mildred Cohn](https://search.amphilsoc.org/collections/view?docId=ead/Mss.Ms.Coll.17-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}
- [Rose Mooney-Slater](https://search.amphilsoc.org/collections/view?docId=ead/Mss.Ms.Coll.17-ead.xml){:target="_blank"}{:rel="noopener noreferrer"}

These represent the major papers of women scientists fully available for research at the time the research was conducted. 

A more cursory survey was conducted of the papers of male scientists. If a woman who we found in one of the core collections appeared in the finding aid of a male scientist’s papers, we surveyed the relevant folders. Otherwise, we generally did not survey the collections given the low likelihood of finding relevant connections.

### How are the data organized?
Network data are generally provided in two datasets. One dataset includes all of the relationships, called “edges.” The other dataset includes all of the individual agents in the network, called “nodes.” We recommend you read our [documentation](https://github.com/AmericanPhilosophicalSociety/Women-in-Science){:target="_blank"}{:rel="noopener noreferrer"} for a full overview of the data, but here are some general guidelines.

An edge indicates we have evidence of a connection between the two scientists in the APS collections. This connection could be very extensive—for example, several folders of correspondence—or it could be more ephemeral—for example, a scientist mentions she is going to lunch with someone in a letter to another scientist.

Each edge has an attribute that indicates the nature of the connection. We used the following categories: 

{% include lightbox.html id="image1"
                         align="right-box"
                         src="/assets/img/specimen-boxes.jpg"
                         height="296px"
                         width="400px"
                         caption="Women at specimen boxes at the Goldschmidt Lab, Kaiser Wilhelm Institute."
                         alt="Women working with plants at specimen boxes at the Goldschmidt Lab, Kaiser Wilhelm Institute."
                         link="https://diglib.amphilsoc.org/islandora/object/graphics:2219"
                         %}

- corresponded with
- recommended (e.g. wrote a letter of recommendation for, recommended for a job)
- received recommendation about
- asked for recommendation
- mentor relationship
- worked in lab with
- published with
- used this person’s scientific contribution
- asked for introduction
- asked for advice
- used each other’s research
- requested reprints
- collaborated with (e.g. organized an event or conference together, worked on project together)
- mentioned in letter (used when it can be established the scientists knew each other but no closer relationship can be determined)

Other data are also available in the edge dataset, including the item the connection was found in, the date, and a short summary of the relationship. These data are not provided for all edges.

Information about the individual scientists is in the node dataset. This includes a biography as well as biographical information provided as structured data. The data also list the fields the scientist was active in and which collections they appear in.

Bios were written using a wide variety of sources, including published biographies, obituaries, scientific publications, and archival materials. Specific sources for a particular scientist’s biography are available upon request.

[Read the documentation](https://github.com/AmericanPhilosophicalSociety/Women-in-Science){:target="_blank"}{:rel="noopener noreferrer"} for a more thorough explanation of the data structure and the data available.

### What these data are not
{% include lightbox.html id="image2"
                         align="left-box"
                         src="/assets/img/Mss_B_Sl22-005.jpg"
                         height="297px"
                         width="400px"
                         caption="Folder containing a research negative from the Rose Mooney-Slater papers."
                         alt="Folder cover with drawings containing a research negative from the Rose Mooney-Slater papers."
                         %}

These data do not provide a complete historical representation of the networks of these women. They only document those connections we were able to verify in the collections of the APS. Additionally, they are not exhaustive. Some potential names have been excluded due to uncertainty about the identity of the person, a lack of biographical information, or a low level of connections.

These data tell a particular story of the history of women in science, which includes plenty of [gaps and silences]({{ '/data-stories/gaps-silences' | relative_url}}). Additionally, as many of these women have been lost to the historical record, the information we have about them may be incomplete. We view this network as an invitation to further research about these women and their lives.

### Where are all the men?
We recognize fully that women’s achievements would not have been possible without the supportive men who mentored them, provided them with opportunities, and helped change the misogynistic atmosphere of science. For many of the scientists in our network, they may have often been the only woman in a room full of male scientists. Some scientists, such as Barbara McClintock, may have had long periods of their careers where their interactions with men were more significant for their research and advancement than their interactions with women.

Nonetheless, we believe that these men have sufficiently received their due in the historical record while many of the women have remained unknown. In order to highlight the achievements of these women and recover them for the historical record, we have kept the number of men in the network to a minimum, including only those who formed a necessary link between two women scientists. 

### Help expand the network!
Do you know one of the scientists in the network? Do you have information you can share about their lives? [Get in touch with us]({{ '/contact' | relative_url }}) so we can add this information to the network!