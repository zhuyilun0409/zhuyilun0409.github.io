---
layout: profile
permalink: /
title: Academic Homepage
author_profile: false
redirect_from:
  - /about/
  - /about.html
---
{% assign profile = site.data.profile %}
<section class="hero" id="about" aria-labelledby="profile-name">
  <div class="hero-copy">
    <p class="eyebrow"><span class="status-dot"></span> ACADEMIC HOMEPAGE</p>
    <h1 id="profile-name">{{ profile.name }}<span class="blue-dot">.</span></h1>
    <p class="hero-focus">{{ profile.focus }}</p>
    <div class="biography">
      <p>I am an undergraduate in <strong>Computer Science and Technology</strong> at <a href="https://www.seu.edu.cn/">Southeast University</a>, Chien-Shiung Wu College.</p>
      <p>Starting in <strong>2027</strong>, I will pursue my master's degree at the <strong>School of Automation and Intelligent Sensing, Shanghai Jiao Tong University</strong>.</p>
      <p>My research interests lie in <strong>multimodal large language models</strong>, with a particular focus on video understanding and temporal fidelity.</p>
    </div>
    <div class="social-links" aria-label="Academic and social profiles">
      <a class="button button-primary" href="{{ profile.scholar }}">{% include profile-icon.html name='scholar' %} Google Scholar {% include profile-icon.html name='arrow' %}</a>
      <a class="button button-quiet" href="{{ profile.github }}">{% include profile-icon.html name='github' %} GitHub {% include profile-icon.html name='arrow' %}</a>
      {% if profile.email %}<a class="button button-quiet" href="mailto:{{ profile.email }}">{% include profile-icon.html name='mail' %} Email</a>{% endif %}
    </div>
  </div>
  <aside class="identity-panel" aria-label="Profile at a glance">
    {% if profile.portrait %}
    <div class="portrait-frame">
      <img class="portrait" src="{{ profile.portrait | relative_url }}" alt="{{ profile.name }}" width="3024" height="4032" fetchpriority="high">
    </div>
    {% else %}
    <div class="portrait-placeholder" aria-hidden="true">{{ profile.initials }}</div>
    {% endif %}
    <div class="identity-info"><span class="small-label">CURRENTLY</span><strong>Southeast University</strong><span>Chien-Shiung Wu College</span><div class="identity-location">{% include profile-icon.html name='pin' %} {{ profile.location }}</div></div>
  </aside>
</section>

<div class="academic-content">
    <section class="content-section research-section" id="research" aria-labelledby="research-title">
      <div class="section-heading"><h2 id="research-title">Research interests</h2></div>
      <ul class="research-list">
        {% for interest in profile.research %}
        <li><strong>{{ interest.title }}.</strong> {{ interest.description }}</li>
        {% endfor %}
      </ul>
    </section>

    <section class="content-section news-section" id="news" aria-labelledby="news-title">
      <div class="section-heading"><h2 id="news-title">News</h2></div>
      <ul class="news-list">
        {% for item in profile.news %}
        <li class="news-item"><time datetime="{{ item.datetime }}">{{ item.date }}</time><p>{{ item.text }} <a href="{{ item.url }}" aria-label="Read Moment-Video on arXiv">Read paper {% include profile-icon.html name='arrow' %}</a></p></li>
        {% endfor %}
      </ul>
    </section>

    <section class="content-section publication-section" id="publications" aria-labelledby="publications-title">
      <div class="section-heading"><h2 id="publications-title">Selected publications</h2><a class="text-link" href="{{ profile.scholar }}">Google Scholar {% include profile-icon.html name='arrow' %}</a></div>
      {% for paper in site.data.selected_publications %}
      <article class="publication" aria-labelledby="{{ paper.id }}-title">
        <div class="paper-meta"><span class="venue">{{ paper.venue }}</span><span>{{ paper.year }}</span></div>
        <h3 id="{{ paper.id }}-title"><a href="{{ paper.paper_url }}">{{ paper.title }}</a></h3>
        <p class="authors">{% for author in paper.authors %}{% if author.name == profile.name %}<strong>{{ author.name }}</strong>{% else %}{{ author.name }}{% endif %}{% if author.equal %}<sup>*</sup>{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}</p>
        <p class="equal-note">* Equal contribution</p>
        <p class="paper-summary">{{ paper.summary }}</p>
        {% if paper.image %}
        <figure class="paper-figure">
          <a class="paper-figure-link" href="{{ paper.image | relative_url }}" target="_blank" rel="noopener" aria-label="Open {{ paper.short_title }} overview at full resolution (opens in a new tab)">
            <img src="{{ paper.image | relative_url }}" alt="{{ paper.image_alt | escape }}" width="{{ paper.image_width }}" height="{{ paper.image_height }}" loading="lazy" decoding="async">
          </a>
          <figcaption><span>{{ paper.image_caption }}</span><a href="{{ paper.image | relative_url }}" target="_blank" rel="noopener" aria-label="View full-size {{ paper.short_title }} figure (opens in a new tab)">View full size {% include profile-icon.html name='arrow' %}</a></figcaption>
        </figure>
        {% endif %}
        <div class="paper-metrics">{% for metric in paper.metrics %}<span><strong>{{ metric.value }}</strong> {{ metric.label }}</span>{% endfor %}</div>
        <div class="paper-links"><a href="{{ paper.paper_url }}">Paper {% include profile-icon.html name='arrow' %}</a><a href="{{ paper.code_url }}">Code {% include profile-icon.html name='arrow' %}</a><a href="{{ paper.project_url }}">Project {% include profile-icon.html name='arrow' %}</a><a href="{{ paper.data_url }}">Dataset {% include profile-icon.html name='arrow' %}</a></div>
        <details class="citation"><summary>BibTeX <span aria-hidden="true">+</span></summary><div class="citation-body"><button type="button" class="copy-citation" hidden>Copy citation</button><pre><code>{{ paper.citation | escape }}</code></pre><span class="copy-status" role="status" aria-live="polite"></span></div></details>
      </article>
      {% endfor %}
    </section>

    <section class="content-section education-section" id="education" aria-labelledby="education-title">
      <div class="section-heading"><h2 id="education-title">Education</h2></div>
      <div class="education-list">
        {% for item in profile.education %}
        <article class="education-item"><div class="education-period">{{ item.period }}</div><div class="education-copy"><div class="education-title"><h3><a href="{{ item.url }}">{{ item.institution }}</a></h3><span class="education-status{% if item.upcoming %} incoming{% endif %}">{{ item.status }}</span></div><p class="degree">{{ item.degree }}</p><p>{{ item.school }}</p></div></article>
        {% endfor %}
      </div>
    </section>
</div>
