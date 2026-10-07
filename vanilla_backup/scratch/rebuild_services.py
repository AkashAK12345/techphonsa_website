import re

with open('c:/Projects/techphonsa_web/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

OLD = '''    <!-- ── WHAT WE BUILD ─────────────────────────────────────── -->
    <section id="services" class="home-services section flow-scroll-track" aria-labelledby="services-heading">
      <div class="flow-viewport">
        <header class="section-header" style="margin-bottom:0; text-align:center;">
          <span class="section-header__eyebrow">Services</span>
          <h2 class="section-header__title section-header__title--medium" id="services-heading">
            What We Build
          </h2>
        </header>

        
        <!-- The flowing spatial background -->
        <div class="services-flow" aria-hidden="true">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <g class="flow-paths">
              <!-- Topographical sweeping ribbons -->
              <path class="flow-path flow-path--1" d="M-200,500 C100,200 400,800 1200,300" stroke="var(--atm-cyan)" fill="none" stroke-width="1.5"/>
              <path class="flow-path flow-path--2" d="M-200,550 C150,250 450,750 1200,350" stroke="var(--atm-blue)" fill="none" stroke-width="1"/>
              <path class="flow-path flow-path--3" d="M-200,600 C200,300 500,700 1200,400" stroke="var(--atm-violet)" fill="none" stroke-width="0.5"/>
              
              <path class="flow-path flow-path--4" d="M-200,400 C300,700 600,200 1200,600" stroke="var(--atm-magenta)" fill="none" stroke-width="2"/>
              <path class="flow-path flow-path--5" d="M-200,450 C350,650 650,250 1200,650" stroke="var(--atm-coral)" fill="none" stroke-width="1.5"/>
              
              <path class="flow-path flow-path--6" d="M-200,700 C100,600 500,300 1200,700" stroke="var(--atm-cyan)" fill="none" stroke-width="1.5"/>
              <path class="flow-path flow-path--7" d="M-200,750 C150,650 550,350 1200,750" stroke="var(--atm-blue)" fill="none" stroke-width="1"/>
            </g>
          </svg>
        </div>
        
        <!-- The foreground content -->
        <div class="services-content container">


          <!-- Service 01 — Websites -->
          <article class="service-card flow-card anim-fade-up" aria-labelledby="svc-websites-title">
            <!-- Background art: architectural wireframe SVG -->
            <div class="service-card__bg" aria-hidden="true">
            <div class="service-card__bg" aria-hidden="true">
              <!-- Removed technical SVG for minimal layout -->
            </div>
            </div>
            <span class="service-card__number">01</span>
            <h3 class="service-card__title" id="svc-websites-title">Websites</h3>
            <p class="service-card__body">
              A clean, fast, mobile-first website built to represent your business accurately — not a generic template with your logo dropped in. Every site includes on-page SEO fundamentals and a working lead capture form from day one, with an optional CMS if you'd like to manage content updates yourself going forward.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">Responsive design</span>
              <span class="service-card__pill">Basic SEO setup</span>
              <span class="service-card__pill">Lead capture forms</span>
              <span class="service-card__pill">Optional CMS</span>
            </div>
            <a href="./services.html#websites" class="btn-primary btn-primary--secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </article>

          <!-- Service 02 — Automation -->
          <article class="service-card flow-card anim-fade-up anim-fade-up--delay-1" aria-labelledby="svc-automation-title">
            <!-- Background art: workflow nodes -->
            <div class="service-card__bg" aria-hidden="true">
            <div class="service-card__bg" aria-hidden="true">
              <!-- Removed technical SVG for minimal layout -->
            </div>
            </div>
            <span class="service-card__number">02</span>
            <h3 class="service-card__title" id="svc-automation-title">Automation</h3>
            <p class="service-card__body">
              We build automated workflows that handle lead follow-up, routing, and record-keeping in the background — 24/7, without someone babysitting an inbox.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">n8n Workflows</span>
              <span class="service-card__pill">Lead Routing</span>
              <span class="service-card__pill">24/7</span>
            </div>
            <a href="./services.html#automation" class="btn-primary btn-primary--secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </article>

          <!-- Service 03 — AI Integration -->
          <article class="service-card flow-card anim-fade-up anim-fade-up--delay-2" aria-labelledby="svc-ai-title">
            <!-- Background art: neural network dots -->
            <div class="service-card__bg" aria-hidden="true">
              <!-- Removed technical SVG for minimal layout -->
            </div>
            <span class="service-card__number">03</span>
            <div style="display:flex;align-items:center;gap:var(--s-3);flex-wrap:wrap;">
              <h3 class="service-card__title" id="svc-ai-title">AI Integration</h3>
              <span class="service-card__tag">Early Access</span>
            </div>
            <p class="service-card__body">
              Support assistants trained on your documentation, automated document processing, or smart lead scoring — applied where it actually solves a problem.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">RAG Systems</span>
              <span class="service-card__pill">Vector Search</span>
              <span class="service-card__pill">Case-by-case</span>
            </div>
            <a href="./services.html#ai" class="btn-primary btn-primary--secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </article>

        
          <!-- Service 04 — What's Coming Next -->
          <article class="service-card flow-card anim-fade-up anim-fade-up--delay-3" aria-labelledby="svc-next-title">
            <div class="service-card__bg" aria-hidden="true"></div>
            <span class="service-card__number">04</span>
            <h3 class="service-card__title" id="svc-next-title">What\'s Coming Next</h3>
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

        </div>
      </div>
    </section>'''

NEW = '''    <!-- ── WHAT WE BUILD ─────────────────────────────────────── -->
    <section id="services" aria-labelledby="services-heading" class="services-scroll-track">
      <div class="services-viewport">

        <!-- LAYER 1: Section header — fixed at top of sticky viewport -->
        <header class="services-header">
          <div class="container">
            <span class="section-header__eyebrow">Services</span>
            <h2 class="section-header__title section-header__title--medium" id="services-heading">
              What We Build
            </h2>
          </div>
        </header>

        <!-- LAYER 2: Spatial spiral — JS generates SVG paths inside here -->
        <div class="services-flow" aria-hidden="true">
          <svg id="spiral-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          </svg>
        </div>

        <!-- LAYER 3: Service cards — all occupy the same content frame -->
        <div class="services-content">

          <article class="flow-card" id="flow-card-0" aria-labelledby="svc-websites-title">
            <span class="service-card__number">01</span>
            <h3 class="service-card__title" id="svc-websites-title">Websites</h3>
            <p class="service-card__body">
              A clean, fast, mobile-first website built to represent your business accurately — not a generic template with your logo dropped in. Every site includes on-page SEO fundamentals and a working lead capture form from day one, with an optional CMS if you\'d like to manage content updates yourself going forward.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">Responsive design</span>
              <span class="service-card__pill">Basic SEO setup</span>
              <span class="service-card__pill">Lead capture forms</span>
              <span class="service-card__pill">Optional CMS</span>
            </div>
            <a href="./services.html#websites" class="btn-primary btn-primary--secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">&#8594;</span>
            </a>
          </article>

          <article class="flow-card" id="flow-card-1" aria-labelledby="svc-automation-title">
            <span class="service-card__number">02</span>
            <h3 class="service-card__title" id="svc-automation-title">Automation</h3>
            <p class="service-card__body">
              We build automated workflows that handle lead follow-up, routing, and record-keeping in the background — 24/7, without someone babysitting an inbox.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">n8n Workflows</span>
              <span class="service-card__pill">Lead Routing</span>
              <span class="service-card__pill">24/7</span>
            </div>
            <a href="./services.html#automation" class="btn-primary btn-primary--secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">&#8594;</span>
            </a>
          </article>

          <article class="flow-card" id="flow-card-2" aria-labelledby="svc-ai-title">
            <span class="service-card__number">03</span>
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
              <h3 class="service-card__title" id="svc-ai-title">AI Integration</h3>
              <span class="service-card__tag">Early Access</span>
            </div>
            <p class="service-card__body">
              Support assistants trained on your documentation, automated document processing, or smart lead scoring — applied where it actually solves a problem.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">RAG Systems</span>
              <span class="service-card__pill">Vector Search</span>
              <span class="service-card__pill">Case-by-case</span>
            </div>
            <a href="./services.html#ai" class="btn-primary btn-primary--secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">&#8594;</span>
            </a>
          </article>

          <article class="flow-card" id="flow-card-3" aria-labelledby="svc-next-title">
            <span class="service-card__number">04</span>
            <h3 class="service-card__title" id="svc-next-title">What\'s Coming Next</h3>
            <p class="service-card__body">
              As we build out foundational systems for our early clients, we are developing a series of standardized, productized automation templates that can be deployed instantly for any small business.
            </p>
            <div class="service-card__tags">
              <span class="service-card__pill">Productized Workflows</span>
              <span class="service-card__pill">Turnkey Systems</span>
            </div>
            <a href="./services.html#next" class="btn-primary btn-secondary" style="width:fit-content;margin-top:auto;">
              Learn more <span class="btn-arrow" aria-hidden="true">&#8594;</span>
            </a>
          </article>

        </div><!-- /.services-content -->

      </div><!-- /.services-viewport -->
    </section>'''

if OLD in html:
    html = html.replace(OLD, NEW)
    with open('c:/Projects/techphonsa_web/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Services HTML restructured")
else:
    print("FAILED: Could not find target block. Trying partial match...")
    # Check what's actually there
    idx = html.find('<!-- ── WHAT WE BUILD')
    if idx >= 0:
        print("Found 'WHAT WE BUILD' at char", idx)
        snippet = html[idx:idx+200]
        print(repr(snippet))
    else:
        print("'WHAT WE BUILD' not found at all")
