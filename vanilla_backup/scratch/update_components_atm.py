import re

with open('c:/Projects/techphonsa_web/css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Add atmospheric gradient styles
atm_css = """/* ── ATMOSPHERIC GRADIENTS ───────────────────────────────────── */
.atmosphere {
  position: absolute;
  inset: 0;
  z-index: var(--z-atm);
  pointer-events: none;
  overflow: hidden;
}

.atm-light {
  position: absolute;
  width: 60vw;
  height: 60vw;
  max-width: 800px;
  max-height: 800px;
  border-radius: 50%;
  filter: blur(120px);
  -webkit-filter: blur(120px);
  opacity: 0.15;
  mix-blend-mode: screen;
}

.atm-cyan    { background: var(--atm-cyan); }
.atm-blue    { background: var(--atm-blue); }
.atm-violet  { background: var(--atm-violet); }
.atm-magenta { background: var(--atm-magenta); }
.atm-coral   { background: var(--atm-coral); }

.atmosphere--globe .atm-light {
  width: 800px;
  height: 800px;
  opacity: 0.08; /* Very dim volumetric backlight */
}
"""
# Insert at the beginning after the first block comment
css = re.sub(r'(/\* =+ \*/\s*\n)', r'\1' + atm_css + '\n', css, count=1)


# 2. Update button styles (clean pill, off-white primary)
btn_css = """.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-3);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  padding: var(--s-3) var(--s-6);
  border-radius: 9999px; /* Pill shape */
  text-decoration: none;
  cursor: pointer;
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: 1px solid transparent;
}
.btn-primary:hover {
  transform: translateY(-1px);
  background: #ffffff;
}
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-mid);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--border-active);
}"""
css = re.sub(r'\.btn-primary\s*\{.*?\.btn-secondary:hover\s*\{.*?\}', btn_css, css, flags=re.DOTALL)


# 3. Update Cards / Glass Panels (Minimal translucent surfaces)
glass_css = """.glass-panel {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  border-radius: var(--r-lg);
  padding: var(--s-8);
  overflow: hidden;
  transition: border-color var(--t-normal), transform var(--t-normal);
}
.glass-panel--interactive:hover {
  border-color: var(--border-mid);
  transform: translateY(-2px);
  background: var(--surface-soft);
}"""
css = re.sub(r'\.glass-panel\s*\{.*?\.glass-panel--interactive:hover\s*\{.*?\}', glass_css, css, flags=re.DOTALL)

service_css = """.service-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  border-radius: var(--r-lg);
  padding: var(--s-8) var(--s-8);
  overflow: hidden;
  transition: border-color var(--t-normal), transform var(--t-normal), background-color var(--t-normal);
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
}
.service-card:hover {
  border-color: var(--border-mid);
  transform: translateY(-4px);
  background: var(--surface-soft);
}"""
css = re.sub(r'\.service-card\s*\{.*?\.service-card:hover\s*\{.*?\}', service_css, css, flags=re.DOTALL)


with open('c:/Projects/techphonsa_web/css/components.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated components.css")
