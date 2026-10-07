import re
import os

base_dir = 'c:/Projects/techphonsa_web'
index_path = os.path.join(base_dir, 'index.html')
about_path = os.path.join(base_dir, 'about.html')
contact_path = os.path.join(base_dir, 'contact.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

with open(about_path, 'r', encoding='utf-8') as f:
    about_html = f.read()

with open(contact_path, 'r', encoding='utf-8') as f:
    contact_html = f.read()

# 1. Extract About content
about_match = re.search(r'(<section class="about-origin.*?</section>)', about_html, re.DOTALL)
if about_match:
    about_content = about_match.group(1).replace('<section class="about-origin', '<section id="about" class="about-origin')
else:
    about_content = "<!-- ERROR: ABOUT NOT FOUND -->"

# 2. Extract Contact content
# Contact html has <main class="contact-minimal-layout"
contact_match = re.search(r'<main[^>]*class="contact-minimal-layout"[^>]*>(.*?)</main>', contact_html, re.DOTALL)
if contact_match:
    contact_inner = contact_match.group(1)
else:
    contact_inner = "<!-- ERROR: CONTACT NOT FOUND -->"

globe_canvas_html = """
    <!-- Globe Atmosphere -->
    <div class="atmosphere atmosphere--globe" aria-hidden="true">
      <div class="atm-light atm-blue" style="top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5);"></div>
      <div class="atm-light atm-violet" style="top: 40%; left: 60%; transform: translate(-50%, -50%) scale(1.2);"></div>
    </div>
   <!-- GLOBE INTERACTION -->
   <div id="globe-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;">
      <canvas id="globe-canvas" style="display: block; width: 100%; height: 100%; opacity: 0; transition: opacity 2s ease;"></canvas>
   </div>
"""

new_contact_section = f"""
  <!-- ── GET IN TOUCH ────────────────────────────────────── -->
  <section id="contact" class="contact-minimal-layout section" style="position: relative; overflow: hidden; min-height: 100vh;">
   {globe_canvas_html}
   {contact_inner}
  </section>
"""

# 3. Inject them into index.html before </main>
if '<section id="about"' not in index_html:
    # replace </main> with the new sections + </main>
    index_html = index_html.replace('</main>', about_content + "\n" + new_contact_section + "\n  </main>")
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_html)
    print("Successfully merged about and contact into index.html")
else:
    print("about and contact already seem to exist in index.html")
