import re
import glob

# The proper Inter font string
inter_font = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">'

html_files = glob.glob('c:/Projects/techphonsa_web/*.html')

for file_path in html_files:
    if 'index2_restored' in file_path: continue # ignore backup
    
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Replace any Google fonts link that isn't the precise Inter string
    html = re.sub(
        r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*" rel="stylesheet">',
        inter_font,
        html
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

print("Updated fonts in all HTML files.")
