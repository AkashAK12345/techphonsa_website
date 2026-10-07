with open('c:/Projects/techphonsa_web/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

hero_atm = """
    <!-- Background Atmosphere -->
    <div class="atmosphere" aria-hidden="true">
      <div class="atm-light atm-cyan" style="top: -20%; left: -10%;"></div>
      <div class="atm-light atm-violet" style="top: 10%; right: -20%; transform: scale(1.2);"></div>
      <div class="atm-light atm-magenta" style="bottom: -30%; left: 30%; transform: scale(1.5);"></div>
    </div>
"""

# Find the hero section opening tag and the next line (<div class="container">)
# and insert the atmosphere right after the <section> starts.
import re

if '<div class="atmosphere"' not in html:
    html = re.sub(
        r'(<section id="home" class="hero[^>]*>)',
        r'\1\n' + hero_atm,
        html
    )
    with open('c:/Projects/techphonsa_web/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected hero atmosphere")
else:
    print("Hero atmosphere already exists")
