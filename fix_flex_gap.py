import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Instead of justifying between the far edges, we will justify center and use a specific gap when open.
# The original pattern looks like: ${openDevice === 'mac' ? 'lg:justify-between' : 'lg:justify-center'}

def replace_justify(match):
    device = match.group(1)
    return f"${{openDevice === '{device}' ? 'lg:justify-center lg:gap-32 xl:gap-40' : 'lg:justify-center'}}"

# Find pattern resembling openDevice === 'somedevice' ? 'lg:justify-between' : 'lg:justify-center'
# and replace it.
gig_content = re.sub(r"\$\{openDevice === '(\w+)' \? 'lg:justify-between' : 'lg:justify-center'\}", replace_justify, gig_content)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

