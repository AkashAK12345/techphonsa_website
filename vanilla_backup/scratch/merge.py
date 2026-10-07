import re

def extract_section(html, section_id):
    # Extract from <section id="..." down to </section> for the main section.
    # Note: about.html has a header section and an origin section. We can just take everything inside <main id="main-content"> ... </main>
    match = re.search(r'<main id="main-content"[^>]*>(.*?)</main>', html, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

with open('c:/Projects/techphonsa_web/about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()
about_content = extract_section(about_html, 'about')

# The about content includes a <header class="about-header section"> without an id. Let's add id="about" to it or wrap it.
# Actually, the single-page nav scrolls to #about.
about_content = about_content.replace('<header class="about-header section"', '<header id="about" class="about-header section"')

with open('c:/Projects/techphonsa_web/contact.html', 'r', encoding='utf-8') as f:
    contact_html = f.read()
contact_content = extract_section(contact_html, 'contact')

# Add id="contact" to the first section in contact content if it doesn't have it.
if 'id="contact"' not in contact_content:
    contact_content = contact_content.replace('<section class="contact-minimal-layout"', '<section id="contact" class="contact-minimal-layout"')


with open('c:/Projects/techphonsa_web/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Add id="services" to the services section
index_html = index_html.replace('<section class="home-services section"', '<section id="services" class="home-services section"')

# Insert about and contact content before </main>
main_end_pos = index_html.rfind('</main>')
if main_end_pos != -1:
    new_index = (
        index_html[:main_end_pos] +
        '\n\n<!-- MERGED ABOUT CONTENT -->\n' + about_content +
        '\n\n<!-- MERGED CONTACT CONTENT -->\n' + contact_content +
        '\n\n' + index_html[main_end_pos:]
    )
    with open('c:/Projects/techphonsa_web/index.html', 'w', encoding='utf-8') as f:
        f.write(new_index)
    print("Successfully merged into index.html")
else:
    print("Could not find </main> in index.html")
