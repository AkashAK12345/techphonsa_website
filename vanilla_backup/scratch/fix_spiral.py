import re

with open('c:/Projects/techphonsa_web/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the section opening to add spiral-scroll-track
html = html.replace(
    '<section id="services" class="home-services section" aria-labelledby="services-heading">',
    '<section id="services" class="home-services section spiral-scroll-track" aria-labelledby="services-heading">'
)

# Remove the container and header rule divs inside the services section
# The structure is currently:
# <section id="services" class="home-services section spiral-scroll-track" aria-labelledby="services-heading">
#   <div class="container">
#     <div class="home-services__header-rule">
#       <header class="section-header" style="margin-bottom:0;">
#         <span class="section-header__eyebrow">// THREE CORE SYSTEMS</span>
#         <h2 class="section-header__title section-header__title--medium" id="services-heading">
#           What We Build
#         </h2>
#       </header>
#     </div>
#     <div class="home-services__grid">
#       <article class="service-card anim-fade-up" aria-labelledby="svc-websites-title">

# We will replace <div class="container"> \n <div class="home-services__header-rule"> \n <header...> \n ... \n </header> \n </div> \n <div class="home-services__grid">
# With <div class="spiral-viewport"> \n <header class="section-header"> ... </header> \n <div class="spiral-carousel container">

header_pattern = r'<div class="container">\s*<div class="home-services__header-rule">\s*<header class="section-header" style="margin-bottom:0;">\s*<span class="section-header__eyebrow">// THREE CORE SYSTEMS</span>\s*<h2 class="section-header__title section-header__title--medium" id="services-heading">\s*What We Build\s*</h2>\s*</header>\s*</div>\s*<div class="home-services__grid">'

replacement = """<div class="spiral-viewport">
        <header class="section-header" style="margin-bottom:0; text-align:center;">
          <span class="section-header__eyebrow">// THREE CORE SYSTEMS</span>
          <h2 class="section-header__title section-header__title--medium" id="services-heading">
            What We Build
          </h2>
        </header>

        <div class="spiral-carousel container">"""

html = re.sub(header_pattern, replacement, html, flags=re.DOTALL)

# Add spiral-card to all 3 service cards
html = html.replace('<article class="service-card anim-fade-up"', '<article class="service-card spiral-card anim-fade-up"')
html = html.replace('<article class="service-card anim-fade-up anim-fade-up--delay-1"', '<article class="service-card spiral-card anim-fade-up anim-fade-up--delay-1"')
html = html.replace('<article class="service-card anim-fade-up anim-fade-up--delay-2"', '<article class="service-card spiral-card anim-fade-up anim-fade-up--delay-2"')

# There are two closing </div></div> at the end of the services section.
# We replaced 3 opening divs with 2 opening divs (spiral-viewport, spiral-carousel).
# So the two closing divs at the end of the section are perfectly fine to close them.

with open('c:/Projects/techphonsa_web/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated spiral HTML in index.html")
