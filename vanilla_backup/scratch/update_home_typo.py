import re

with open('c:/Projects/techphonsa_web/css/pages/home.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update hero headline typography
hero_headline = """.hero__headline {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 7.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--text-primary);
  margin-bottom: var(--s-6);
}"""
css = re.sub(r'\.hero__headline\s*\{.*?\}', hero_headline, css, flags=re.DOTALL)

# 2. Update hero subhead
hero_subhead = """.hero__subhead {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: var(--s-10);
  font-weight: 400;
  letter-spacing: -0.01em;
}"""
css = re.sub(r'\.hero__subhead\s*\{.*?\}', hero_subhead, css, flags=re.DOTALL)

# 3. Update hero brand
hero_brand = """.hero__brand {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-bottom: var(--s-2);
}"""
css = re.sub(r'\.hero__brand\s*\{.*?\}', hero_brand, css, flags=re.DOTALL)

# 4. Remove .hero__bg and .hero__gradient (we are replacing with atmosphere)
css = re.sub(r'\.hero__bg\s*\{.*?\}\s*\.hero__gradient\s*\{.*?\}\s*@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.hero__bg\s*\{.*?\}\s*\}\s*@keyframes\s*bg-drift\s*\{.*?\}', '', css, flags=re.DOTALL)

with open('c:/Projects/techphonsa_web/css/pages/home.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated home.css")
