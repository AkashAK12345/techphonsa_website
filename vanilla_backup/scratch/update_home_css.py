import re

with open('c:/Projects/techphonsa_web/css/pages/home.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace the spiral CSS with the flow CSS
spiral_regex = r'/\* ── 3D SPIRAL CAROUSEL ─────────────────────────────────────── \*/.*'
flow_css = """/* ── CONTINUOUS SPATIAL FLOW ─────────────────────────────────── */
.flow-scroll-track {
  width: 100%;
}

@media (min-width: 768px) {
  .flow-scroll-track {
    /* 300vh gives us space to map progress from 0 to 1 across 4 cards */
    height: 300vh; 
  }
  
  .flow-viewport {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  /* The abstract background SVG field */
  .services-flow {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    perspective: 1000px;
  }
  
  .services-flow svg {
    width: 120vw;
    height: 120vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: visible;
  }

  .flow-paths {
    transform-style: preserve-3d;
    will-change: transform;
  }

  .flow-path {
    opacity: 0.08; /* Extremely subtle base opacity */
    transition: opacity 0.5s ease;
    stroke-linecap: round;
  }
  
  /* Give foreground paths slightly higher opacity */
  .flow-path--1, .flow-path--4, .flow-path--6 {
    opacity: 0.12;
  }
  
  /* Foreground content stacking */
  .services-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .flow-card {
    position: absolute;
    width: 100%;
    /* Cards are hidden by default, JS handles opacity/transform */
    opacity: 0;
    pointer-events: none;
    transform: translateY(30px);
    will-change: transform, opacity;
  }
  
  .flow-card.active {
    pointer-events: auto;
  }

  .flow-scroll-track .section-header {
    position: absolute;
    top: 15vh;
    left: 0;
    width: 100%;
    z-index: 20;
    pointer-events: none;
  }
}
"""

css = re.sub(spiral_regex, flow_css, css, flags=re.DOTALL)

with open('c:/Projects/techphonsa_web/css/pages/home.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated home.css")
