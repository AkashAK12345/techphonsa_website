with open('c:/Projects/techphonsa_web/css/design-system.css', 'a', encoding='utf-8') as f:
    f.write("""
/* ── ATMOSPHERIC GRADIENTS ───────────────────────────────────── */
.atmosphere {
  position: absolute;
  inset: 0;
  z-index: 0;
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
""")
print("Appended atmosphere CSS to design-system.css")
