import os
import re

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

# 4. Extract About Content
about_match = re.search(r'<!-- ── ORIGIN STORY ──────────────────────────────────────── -->(.*?)</section>', about_html, re.DOTALL)
if about_match:
    about_content = about_match.group(0)
    about_content = about_content.replace('<section class="about-origin section"', '<section id="about" class="about-origin section"')
else:
    about_content = "<!-- ERROR: ABOUT NOT FOUND -->"

# 5. Extract Minimal Contact Content
contact_match = re.search(r'<main[^>]*class="contact-minimal-layout"[^>]*>(.*?)</main>', contact_html, re.DOTALL)
if contact_match:
    contact_inner = contact_match.group(1)
else:
    contact_inner = "<!-- ERROR: CONTACT NOT FOUND -->"

globe_canvas_html = """
   <!-- GLOBE INTERACTION -->
   <div id="globe-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;">
      <canvas id="globe-canvas" style="display: block; width: 100%; height: 100%; opacity: 0; transition: opacity 2s ease;"></canvas>
   </div>
"""

new_contact_section = f"""
  <!-- ── GET IN TOUCH ────────────────────────────────────── -->
  <section id="contact" class="contact-minimal-layout" style="position: relative; overflow: hidden; min-height: 100vh;">
   {globe_canvas_html}
   {contact_inner}
  </section>
"""

# Replace CTA STRIP
cta_match = re.search(r'<!-- ── CTA STRIP ──────────────────────────────────────────── -->(.*?)</section>', index_html, re.DOTALL)
if cta_match:
    cta_full = cta_match.group(0)
    index_html = index_html.replace(cta_full, about_content + "\n" + new_contact_section)
    print("Replaced CTA STRIP with About and Contact sections.")
else:
    print("Could not find CTA STRIP to replace.")

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_html)
