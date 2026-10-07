import re

with open('c:/Projects/techphonsa_web/css/design-system.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We will replace the entire :root block
new_root = """:root {
  /* Backgrounds */
  --bg-void:       #0A0A0B; /* Deep Obsidian */
  --bg-base:       #111113; /* Elevated charcoal */
  --bg-elevated:   #18181B; /* Panel background */

  /* Text */
  --text-primary:  #F8F9FA;
  --text-strong:   #FFFFFF;
  --text-secondary:#A1A1AA; /* Zinc 400 */
  --text-muted:    #71717A; /* Zinc 500 */

  /* Accents */
  --accent-primary: #818CF8; /* Trendy Indigo */
  --accent-warm:    #A78BFA; /* Violet/Purple */
  --blue-primary:   #818CF8; /* Keeping variable for compatibility */
  --blue-bright:    #C084FC;
  --blue-soft:      rgba(129, 140, 248, 0.1);

  /* Status */
  --status-ok:     #34D399; /* Emerald */
  --status-warn:   #FBBF24; /* Amber */
  --status-crit:   #F87171; /* Red */

  /* Borders */
  --border-dim:    rgba(255, 255, 255, 0.05);
  --border-mid:    rgba(255, 255, 255, 0.1);
  --border-active: rgba(129, 140, 248, 0.3);

  /* Shadows */
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 12px 30px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.4);

  /* Typography */
  --font-display: 'Outfit', 'Inter', system-ui, sans-serif;
  --font-mono:    'Inter', system-ui, -apple-system, sans-serif; /* We remove mono but keep variable for compatibility */
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;

  /* Type scale */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  2rem;       /* 32px */
  --text-4xl:  3rem;       /* 48px */
  --text-5xl:  4rem;       /* 64px */
  --text-6xl:  5rem;       /* 80px */
  --text-7xl:  6.5rem;     /* 104px */

  /* Spacing */
  --s-1:  4px;   --s-2:  8px;   --s-3: 12px;
  --s-4: 16px;   --s-5: 20px;   --s-6: 24px;
  --s-8: 32px;   --s-10: 40px;  --s-12: 48px;
  --s-16: 64px;  --s-20: 80px;  --s-24: 96px;
  --s-32: 128px;

  /* Geometry - Trendy Glassmorphism/Bento borders are large */
  --r-sm: 8px;
  --r-md: 16px;
  --r-lg: 24px;

  /* Transitions */
  --t-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --t-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --t-slow:   500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-index layers */
  --z-bg:      0;
  --z-content: 10;
  --z-ui:      20;
  --z-nav:     30;
  --z-overlay: 40;

  /* Layout */
  --container-max: 1200px;
  --container-px:  clamp(var(--s-4), 5vw, var(--s-10));
  --nav-h:         72px;
  --section-py:    clamp(var(--s-12), 8vw, var(--s-24));
}"""

css = re.sub(r':root\s*\{.*?\n\}', new_root, css, flags=re.DOTALL)

with open('c:/Projects/techphonsa_web/css/design-system.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated design-system.css")
