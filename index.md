---
layout: default
---

{% for category in site.categories %}
<!-- category[0] is the category name, category[1] is the post list in the category -->
<h1 class="page-heading">{{category[0]}}</h1>
<ul class="post-list">
  {% assign post_list = category[1] %}
  {% for post in post_list %}
  <li>
    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

    <h2>
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
    </h2>
  </li>
  {% endfor %}
</ul>
{% endfor %}