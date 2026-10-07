import json

log_path = r'C:\Users\akash\.gemini\antigravity-ide\brain\b81219dc-4cd4-4dd3-8736-0f7e7d555cf2\.system_generated\logs\transcript.jsonl'

diff_content = None

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if 'content' in data:
            if 'The following changes were made by the multi_replace_file_content tool to: c:\\Projects\\techphonsa_web\\index2.html' in data['content']:
                diff_content = data['content']

if diff_content:
    restored = []
    lines = diff_content.split('\n')
    inside_diff = False
    for line in lines:
        if line.startswith('[diff_block_start]'):
            inside_diff = True
            continue
        if line.startswith('[diff_block_end]'):
            inside_diff = False
            continue
        
        if inside_diff:
            if line.startswith('@@ '):
                continue
            if line.startswith('-'):
                # Extract the deleted line (remove the first character '-')
                restored.append(line[1:])
            elif line.startswith(' '):
                # Context lines (remove the first character ' ')
                restored.append(line[1:])
    
    with open(r'c:\Projects\techphonsa_web\index2_restored.html', 'w', encoding='utf-8') as out:
        out.write('\n'.join(restored))
    print("Successfully restored to index2_restored.html")
else:
    print("Diff not found.")
