import os

filepath = 'c:/Projects/techphonsa_web/index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the first </html> and truncate the rest
if '</html>' in content:
    idx = content.find('</html>') + len('</html>')
    cleaned = content[:idx] + '\n'
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned)
    print("Fixed index.html duplication.")
