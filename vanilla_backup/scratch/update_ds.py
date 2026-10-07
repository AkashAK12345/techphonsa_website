import re

with open('c:/Projects/techphonsa_web/css/design-system.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We will replace the entire :root block
new_root = """:root {
  /* Backgrounds */
  --bg-primary:    #0A0A14; /* Deep blue-black base */
  --bg-secondary:  #070710; /* Darker variant */
  --surface:       #12121A; /* Card base */
  --surface-soft:  #161620; /* Slightly elevated card */
  --bg-void:       var(--bg-primary);
  --bg-base:       var(--bg-secondary);
  --bg-elevated:   var(--surface);

  /* Text */
  --text-primary:  #F4F4F2; /* Off-white */
  --text-secondary:#92919B; /* Cool gray */
  --text-muted:    #686873; /* Dimmer cool gray */
  --text-strong:   #FFFFFF;

  /* Atmospheric Lights (for gradients, not UI borders) */
  --atm-cyan:      #22D3EE;
  --atm-blue:      #3B82F6;
  --atm-violet:    #8B5CF6;
  --atm-magenta:   #D946EF;
  --atm-coral:     #FB7185;

  /* Legacy aliases for compatibility (mapping to new neutral/clean palette where needed) */
  --accent-primary: #F4F4F2; 
  --accent-warm:    #92919B;
  --blue-primary:   #F4F4F2;
  --status-ok:      #F4F4F2;
  --status-warn:    #92919B;
  --status-crit:    #686873;

  /* Borders */
  --border-dim:    rgba(255, 255, 255, 0.03);
  --border-mid:    rgba(255, 255, 255, 0.06);
  --border-active: rgba(255, 255, 255, 0.12);

  /* Shadows */
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 12px 30px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.6);

  /* Typography */
  --font-display: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:    'Inter', system-ui, -apple-system, sans-serif; 
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;

  /* Type scale */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  2.25rem;    /* 36px */
  --text-4xl:  3.5rem;     /* 56px */
  --text-5xl:  4.5rem;     /* 72px */
  --text-6xl:  5.5rem;     /* 88px */
  --text-7xl:  7rem;       /* 112px */

  /* Spacing */
  --s-1:  4px;   --s-2:  8px;   --s-3: 12px;
  --s-4: 16px;   --s-5: 20px;   --s-6: 24px;
  --s-8: 32px;   --s-10: 40px;  --s-12: 48px;
  --s-16: 64px;  --s-20: 80px;  --s-24: 96px;
  --s-32: 128px;

  /* Geometry */
  --r-sm: 6px;
  --r-md: 12px;
  --r-lg: 20px;

  /* Transitions */
  --t-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --t-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --t-slow:   500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-index layers */
  --z-bg:      0;
  --z-atm:     5;
  --z-content: 10;
  --z-ui:      20;
  --z-nav:     30;
  --z-overlay: 40;

  /* Layout */
  --container-max: 1200px;
  --container-px:  clamp(var(--s-4), 5vw, var(--s-10));
  --nav-h:         80px;
  --section-py:    clamp(var(--s-16), 12vw, var(--s-32));
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
}
"""

css = re.sub(r':root\s*\{.*?\n\}', new_root, css, flags=re.DOTALL)
# Make sure body inherits bg-primary
css = re.sub(r'body\s*\{.*?\}', '', css, flags=re.DOTALL) # remove old body if exists
css = css + "\nbody {\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  font-family: var(--font-body);\n  line-height: 1.6;\n}\n"

with open('c:/Projects/techphonsa_web/css/design-system.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated design-system.css")
