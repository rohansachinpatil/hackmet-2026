import re

with open('app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the weird selector
content = content.replace('div[style*="grid-template-columns:repeat(3,1fr)"]', '.special-awards-grid')

# 2. Extract Hamburger Menu section (which is currently at the end of the file)
hamburger_start = content.find('/* ── Hamburger Menu ── */')
if hamburger_start != -1:
    hamburger_css = content[hamburger_start:]
    content = content[:hamburger_start]
else:
    hamburger_css = ""

# 3. Extract Responsive section
responsive_start = content.find('/* ───── RESPONSIVE ───── */')
if responsive_start != -1:
    responsive_css = content[responsive_start:]
    base_css = content[:responsive_start]
else:
    responsive_css = ""
    base_css = content

# 4. Add desktop grid rule for .special-awards-grid
base_css += "\n.special-awards-grid {\n  grid-template-columns: repeat(3, 1fr);\n}\n\n"

# 5. Combine in correct order: Base -> Hamburger -> Responsive
final_css = base_css + hamburger_css + responsive_css

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(final_css)

print("CSS fixed successfully!")
