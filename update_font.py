import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/tailwind.config.js", "r") as f:
    content = f.read()

if "avenir:" not in content:
    content = content.replace(
        "extend: {",
        "extend: {\n      fontFamily: {\n        avenir: ['Avenir', 'Avenir Next', 'Helvetica Neue', 'Arial', 'sans-serif'],\n      },"
    )
    with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/tailwind.config.js", "w") as f:
        f.write(content)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Replace font-sans and font-subscript in the specs area with font-avenir or similar serif look from screenshot
gig_content = gig_content.replace('font-sans', 'font-serif') # The screenshot shows a serif font like Garamond or similar for the body text
gig_content = gig_content.replace('font-subscript tracking-widest text-xs mb-1 uppercase font-bold', 'font-sans tracking-[0.2em] text-[0.65rem] mb-2 uppercase font-bold text-[#888]')


with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

