import re

with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make text colors slightly darker for contrast
css = css.replace('--text-sec: #3A3A3A;', '--text-sec: #2A2A2A;')
css = css.replace('--text-muted: #5A5A5A;', '--text-muted: #4A4A4A;')

# Increase font sizes for content text
replacements = [
    (r'\.hero-desc\s*\{\s*font-size:\s*12px;', '.hero-desc {\n  font-size: 15px;'),
    (r'\.about-text p\s*\{\s*font-size:\s*12px;', '.about-text p {\n  font-size: 15px;'),
    (r'\.about-card-body p\s*\{\s*font-size:\s*11px;', '.about-card-body p {\n  font-size: 14px;'),
    (r'\.track-desc\s*\{\s*font-size:\s*11px;', '.track-desc {\n  font-size: 14px;'),
    (r'\.tl-desc\s*\{\s*font-size:\s*11px;', '.tl-desc {\n  font-size: 14px;'),
    (r'\.faq-a p\s*\{\s*font-size:\s*11px;', '.faq-a p {\n  font-size: 14px;'),
    (r'\.step-desc\s*\{\s*font-size:\s*10px;', '.step-desc {\n  font-size: 14px;'),
    (r'\.register-note\s*\{\s*font-size:\s*10px;', '.register-note {\n  font-size: 12px;'),
    (r'\.prize-label\s*\{\s*font-size:\s*10px;', '.prize-label {\n  font-size: 12px;'),
    (r'\.prize-perk\s*\{\s*font-size:\s*10px;', '.prize-perk {\n  font-size: 12px;'),
    (r'\.footer-brand p\s*\{\s*font-size:\s*11px;', '.footer-brand p {\n  font-size: 13px;'),
    (r'\.footer-links a\s*\{\s*font-size:\s*11px;', '.footer-links a {\n  font-size: 13px;')
]

for pattern, replacement in replacements:
    css = re.sub(pattern, replacement, css)

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Typography updated for better readability.")
