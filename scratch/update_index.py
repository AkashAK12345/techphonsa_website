import re

with open('c:/Projects/techphonsa_web/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the script reference
html = html.replace('<script src="./js/spiral.js"></script>', '<script src="./js/flow.js"></script>')

# 2. Update the HTML structure of the services section
# Replace spiral-carousel with services-content and add the SVG flow
# We need to extract the existing cards first.

cards_match = re.search(r'<div class="spiral-carousel container">(.*?)</div>\s*</div>\s*</section>', html, re.DOTALL)
if cards_match:
    existing_cards = cards_match.group(1)
    
    # We need to add the 4th card.
    card_4 = """
          <!-- Service 04 — What's Coming Next -->
          <article class="service-card spiral-card anim-fade-up anim-fade-up--delay-3" aria-labelledby="svc-next-title">
            <div class="service-card__bg" aria-hidden="true"></div>
            <span class="service-card__number">04</span>
            <h3 class="service-card__title" id="svc-next-title">What's Coming Next</h3>
            <p class="service-card__body">
              As we build out foundational systems for our early clients, we are developing a series of standardized, productized automation templates that can be deployed instantly for any small business.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">Productized Workflows</span>
              <span class="service-card__pill">Turnkey Systems</span>
            </div>
            <a href="./services.html#next" class="btn-primary btn-secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </article>
"""
    
    new_cards = existing_cards + card_4
    
    # Also change spiral-card to flow-card
    new_cards = new_cards.replace('spiral-card', 'flow-card')

    # SVG flow structure
    svg_flow = """
        <!-- The flowing spatial background -->
        <div class="services-flow" aria-hidden="true">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <g class="flow-paths">
              <!-- Topographical sweeping ribbons -->
              <path class="flow-path flow-path--1" d="M-200,500 C100,200 400,800 1200,300" stroke="var(--accent-primary)" fill="none" stroke-width="1.5"/>
              <path class="flow-path flow-path--2" d="M-200,550 C150,250 450,750 1200,350" stroke="var(--text-secondary)" fill="none" stroke-width="1"/>
              <path class="flow-path flow-path--3" d="M-200,600 C200,300 500,700 1200,400" stroke="var(--border-dim)" fill="none" stroke-width="0.5"/>
              
              <path class="flow-path flow-path--4" d="M-200,400 C300,700 600,200 1200,600" stroke="var(--accent-primary)" fill="none" stroke-width="2"/>
              <path class="flow-path flow-path--5" d="M-200,450 C350,650 650,250 1200,650" stroke="var(--text-secondary)" fill="none" stroke-width="1.5"/>
              
              <path class="flow-path flow-path--6" d="M-200,700 C100,600 500,300 1200,700" stroke="var(--accent-primary)" fill="none" stroke-width="1.5"/>
              <path class="flow-path flow-path--7" d="M-200,750 C150,650 550,350 1200,750" stroke="var(--border-dim)" fill="none" stroke-width="1"/>
            </g>
          </svg>
        </div>
        
        <!-- The foreground content -->
        <div class="services-content container">
""" + new_cards + """
        </div>"""
        
    html = html.replace(cards_match.group(0), svg_flow + "\n      </div>\n    </section>")
    
    # Also change .spiral-scroll-track to .flow-scroll-track
    html = html.replace('spiral-scroll-track', 'flow-scroll-track')
    # and .spiral-viewport to .flow-viewport
    html = html.replace('spiral-viewport', 'flow-viewport')
    
with open('c:/Projects/techphonsa_web/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html")
