---
layout: default
title: "Women in Science at the APS"
#parallax: true
#image:
#  img_url: 'https://diglib.amphilsoc.org/islandora/object/graphics:1840/datastream/JPG/view'
#  img_alt: Black and white photograph of two women, one looking into microscope, the other working with a beaker, sitting at a table in a laboratory.
#  caption_url: https://diglib.amphilsoc.org/islandora/object/two-women-working-laboratory-seated
#  caption: Two women working in laboratory, seated. Milislav Demerec Papers
#  banner_text: Women in Science in the APS Collections
---

<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="{{ '/assets/img/network-screenshot.jpg'| relative_url }}" class="d-block w-100" style="opacity: 0.7;" alt="Network Visualization">
      <div class="carousel-caption d-md-block">
        <h5>Women in Science Network Visualization</h5>
        <p><a href="{{ '/network-vis'| relative_url }}" target="_blank" rel="noopener noreferrer">Launch and explore the network!</a></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="{{ '/assets/img/WomenInScience_003.jpeg'| relative_url }}" class="d-block w-100" alt="Women in Science List in the Florence Sabin Papers">
      <div class="carousel-caption d-md-block">
        <h5>Florence Sabin's Networks</h5>
        <p><a href="{{ '/data-stories/sabin'| relative_url }}">Learn more about Sabin's efforts to promote women scientists.</a></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="{{ '/assets/img/meitner.jpg' | relative_url }}" class="d-block w-100" alt="Lise Meitner with male scientists">
      <div class="carousel-caption d-md-block">
        <h5>Scientists Fleeing Totalitarianism</h5>
        <p><a href="{{ '/data-stories/totalitarianism'| relative_url }}">Explore how scientists migrated to escape war and totalitarian governments.</a></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="{{ '/assets/img/mcclintock-woods-hole.jpg' | relative_url }}" class="d-block w-100" alt="Barbara McClintock with male scientists">
      <div class="carousel-caption d-md-block">
        <h5>Gaps and Silences in the Archive</h5>
        <p><a href="{{ '/data-stories/gaps-silences'| relative_url }}">See what our project includes and what might be left out.</a></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="{{ '/assets/img/peiping.jpg' | relative_url }}" class="d-block w-100" alt="Men and women scientists at Peiping University">
      <div class="carousel-caption d-md-block">
        <h5>Transnational Connections</h5>
        <p><a href="{{ '/data-stories/transnationalism'| relative_url }}">Read about how women crossed borders in pursuit of science.</a></p>
      </div>
    </div>
    <div class="carousel-item">
      <picture>
        <source media="(min-width: 441px)" srcset="{{ '/assets/img/mcclintock-nobel-large.jpg' | relative_url }}">
        <img src="{{ '/assets/img/mcclintock-nobel.jpg' | relative_url }}" class="d-block w-100" alt="Barbara McClintock giving her Nobel Prize lecture">
      </picture>
      <div class="carousel-caption d-md-block">
        <h5>In Their Own Words</h5>
        <p><a href="{{ '/data-stories/in-their-own-words'| relative_url }}">Listen to the voices of women scientists describing their experience.</a></p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

# Visualizing Women Scientists in the APS Collections

Women in the nineteenth and twentieth centuries participated in science: a field that was sometimes open to them, but more often than not structural barriers inhibited their full participation. While some women scientists received notoriety and fame, there are many who have been historically marginalized and lost within the archival record. _Visualizing Women in Science_ uses the collections of the [American Philosophical Society](https://www.amphilsoc.org/){:target="_blank"}{:rel="noopener noreferrer"} to recover biographies and information about women in science not previously known. The network visualization at the heart of the project illustrates networks that were essential to sustaining women’s work in science.

Use the buttons below to launch the network visualization, read more about the project, and to learn more about the individuals found in the network.


{% include viz-button.html %}

<div class="navigation-cards">
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <a href="{{ '/about'| relative_url }}">
          <img src="{{ '/assets/img/chromosomes.jpg'| relative_url }}" width="300px" height="200px">
          <div class="card-banner">
            Project Overview
          </div>
        </a>
      </div>
      <div class="col">
        <a href="{{ '/about-data'| relative_url }}">
          <img src="{{ '/assets/img/sabin-technique.jpg'| relative_url }}" width="300px" height="200px">
          <div class="card-banner">
            The Data
          </div>
        </a>
      </div>
      <div class="col">
        <a href="{{ '/visualization'| relative_url }}">
          <img src="{{ '/assets/img/cohn-drawing.jpg'| relative_url }}" width="300px" height="200px">
          <div class="card-banner">
            The Visualization
          </div>
        </a>
      </div>
    </div>
  </div>
</div>