import re

with open('c:/Projects/techphonsa_web/contact.html', 'r', encoding='utf-8') as f:
    contact_html = f.read()

# Extract from <!-- ── PAGE HEADER ───────────────────────────────────────── --> down to </section> of contact-section
match = re.search(r'(<!-- ── PAGE HEADER ───────────────────────────────────────── -->.*?</section>\s*</div>\s*</section>)', contact_html, re.DOTALL)
if not match:
    # Try another way
    match = re.search(r'(<header class="contact-header.*?</section>)', contact_html, re.DOTALL)

if match:
    contact_content = match.group(1)
else:
    print("Failed to extract contact content")
    exit(1)

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
   <div style="position:relative; z-index:1;">
       {contact_content}
   </div>
  </section>
"""

with open('c:/Projects/techphonsa_web/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace the broken section
broken_section_match = re.search(r'<!-- ── GET IN TOUCH ────────────────────────────────────── -->.*?</section>', index_html, re.DOTALL)
if broken_section_match:
    index_html = index_html.replace(broken_section_match.group(0), new_contact_section)
    with open('c:/Projects/techphonsa_web/index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    print("Successfully fixed contact section in index.html")
else:
    print("Could not find broken contact section to replace.")
