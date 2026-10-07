import re

with open('c:/Projects/techphonsa_web/css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Rename hud-btn to btn-primary and update styling
css = css.replace('.hud-btn', '.btn-primary')
css = css.replace('.hud-btn--primary', '.btn-primary')
css = css.replace('.hud-btn--secondary', '.btn-secondary')
css = css.replace('.hud-btn--submit', '.btn-submit')

btn_css = """.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-3);
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 500;
  padding: var(--s-3) var(--s-6);
  border-radius: 9999px; /* Pill shape */
  text-decoration: none;
  cursor: pointer;
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  background: var(--text-primary);
  color: var(--bg-void);
  border: 1px solid transparent;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
}
.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid var(--border-dim);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--border-mid);
}
.btn-primary .btn-arrow, .btn-secondary .btn-arrow { transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1); }
.btn-primary:hover .btn-arrow, .btn-secondary:hover .btn-arrow { transform: translateX(4px); }"""

css = re.sub(r'\.btn-primary\s*\{.*?\.btn-primary:hover\s\.btn-arrow\s*\{.*?\}', btn_css, css, flags=re.DOTALL)


# 2. Rename hud-panel to glass-panel and update styling
css = css.replace('.hud-panel', '.glass-panel')
css = css.replace('.hud-panel--interactive', '.glass-panel--interactive')
css = css.replace('.hud-panel__label', '.glass-panel__label')

glass_panel_css = """.glass-panel {
  position: relative;
  background: rgba(24, 24, 27, 0.4);
  border: 1px solid var(--border-dim);
  border-radius: var(--r-lg);
  padding: var(--s-8);
  overflow: hidden;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: border-color var(--t-normal), box-shadow var(--t-normal), transform var(--t-normal);
}
.glass-panel--interactive:hover {
  border-color: var(--border-mid);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  background: rgba(24, 24, 27, 0.6);
}
.glass-panel__label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--accent-primary);
  font-weight: 500;
  margin-bottom: var(--s-4);
  display: flex;
  align-items: center;
  gap: var(--s-2);
}"""

css = re.sub(r'\.glass-panel\s*\{.*?\n\}\s*\.glass-panel--bordered.*?\n\}\s*\.glass-panel--flat.*?\n\}\s*\.glass-panel--interactive:hover.*?\n\}\s*\.glass-panel--interactive:hover \.glass-panel__corners::before,\s*\.glass-panel--interactive:hover \.glass-panel__corners::after.*?\n\}\s*\.glass-panel__corners,\s*\.glass-panel__corners-bottom.*?\n\}\s*\.glass-panel__label\s*\{.*?\n\}\s*\.glass-panel__label::before\s*\{.*?\n\}', glass_panel_css, css, flags=re.DOTALL)


# 3. Typography updates (remove uppercase and monospace)
css = css.replace('text-transform: uppercase;', '')
# Remove letter-spacing that was used for the hacker aesthetic
css = re.sub(r'letter-spacing:\s*0\.[0-9]+em;', '', css)

# 4. Service Card Glassmorphism
service_card_css = """.service-card {
  position: relative;
  background: rgba(24, 24, 27, 0.4);
  border: 1px solid var(--border-dim);
  border-radius: var(--r-lg);
  padding: var(--s-8) var(--s-8);
  overflow: hidden;
  transition:
    border-color var(--t-normal),
    box-shadow var(--t-normal),
    transform var(--t-normal),
    background-color var(--t-normal);
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.service-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  background: rgba(24, 24, 27, 0.6);
}"""
css = re.sub(r'\.service-card\s*\{.*?\n\}\s*\.service-card:hover\s*\{.*?\n\}', service_card_css, css, flags=re.DOTALL)

with open('c:/Projects/techphonsa_web/css/components.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated components.css")
