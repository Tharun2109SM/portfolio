import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/index.css", "r") as f:
    css_content = f.read()

if "@import '@fontsource/eb-garamond';" not in css_content:
    with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/index.css", "w") as f:
        f.write("@import '@fontsource/eb-garamond';\n" + css_content)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Make sure we don't accidentally replace ALL font-display instances, just the headings in the specs
# The device titles use font-display text-2xl md:text-4xl
gig_content = gig_content.replace('className="text-2xl md:text-4xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4"', 'className="text-2xl md:text-5xl font-sans font-bold tracking-tighter text-[#0f0f0f] mb-8 pb-4 border-b border-[#0d0d0d]/10 uppercase"')
gig_content = gig_content.replace('font-sans text-base md:text-lg', "font-['EB_Garamond'] text-lg md:text-xl text-[#333]") 
gig_content = gig_content.replace('text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold', 'text-[#888888] font-sans tracking-[0.1em] text-xs md:text-sm mb-2 uppercase font-bold')

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)
