import re

with open('c:/Projects/techphonsa_web/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Google Fonts to strictly Inter
html = re.sub(
    r'<link href="https://fonts.googleapis.com/css2[^"]*" rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">',
    html
)

# 2. Add atmospheric gradients to hero section
# We will insert a div for the atmosphere inside the hero section, before the container.
hero_atm = """
    <!-- Atmospheric Lighting -->
    <div class="atmosphere" aria-hidden="true">
      <div class="atm-light atm-cyan" style="top: -20%; left: -10%;"></div>
      <div class="atm-light atm-violet" style="top: 10%; right: -20%;"></div>
    </div>
"""
if '<div class="hero__container">' in html:
    html = html.replace('<div class="hero__container">', hero_atm + '\n    <div class="hero__container">')

# 3. Update Services SVG colors
html = html.replace('stroke="var(--accent-primary)"', 'stroke="var(--atm-cyan)"')
html = html.replace('stroke="var(--text-secondary)"', 'stroke="var(--atm-violet)"')
html = html.replace('stroke="var(--border-dim)"', 'stroke="var(--atm-blue)"')

# Wait, there are 7 paths, let's distribute the colors nicely:
html = html.replace('stroke="var(--atm-cyan)" fill="none" stroke-width="1.5"', 'stroke="var(--atm-cyan)" fill="none" stroke-width="1.5"')
html = html.replace('stroke="var(--atm-violet)" fill="none" stroke-width="1"', 'stroke="var(--atm-blue)" fill="none" stroke-width="1"')
html = html.replace('stroke="var(--atm-blue)" fill="none" stroke-width="0.5"', 'stroke="var(--atm-violet)" fill="none" stroke-width="0.5"')
html = html.replace('stroke="var(--atm-cyan)" fill="none" stroke-width="2"', 'stroke="var(--atm-magenta)" fill="none" stroke-width="2"')
html = html.replace('stroke="var(--atm-violet)" fill="none" stroke-width="1.5"', 'stroke="var(--atm-coral)" fill="none" stroke-width="1.5"')

# 4. Add atmosphere to contact section (Globe)
contact_atm = """
    <!-- Globe Atmosphere -->
    <div class="atmosphere atmosphere--globe" aria-hidden="true">
      <div class="atm-light atm-blue" style="top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5);"></div>
      <div class="atm-light atm-violet" style="top: 40%; left: 60%; transform: translate(-50%, -50%) scale(1.2);"></div>
    </div>
"""
if '<div id="globe-container"' in html:
    html = html.replace('<div id="globe-container"', contact_atm + '\n        <div id="globe-container"')

with open('c:/Projects/techphonsa_web/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html")
