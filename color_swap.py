import os
import glob

# Paths
css_dir = r"c:\Projects\techphonsa_web\css"
css_files = glob.glob(os.path.join(css_dir, "**", "*.css"), recursive=True)

# Replacements
replacements = {
    "rgba(75, 168, 255,": "rgba(148, 163, 184,",
    "rgba(3, 5, 7,": "rgba(10, 11, 14,"
}

for filepath in css_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old_str, new_str in replacements.items():
        new_content = new_content.replace(old_str, new_str)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

print("Done replacing rgb hardcoded colors.")
