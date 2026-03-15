import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    content = f.read()

# Clean up string duplicates
content = content.replace(
    "text-[#0d0d0d] font-['Avenir',_sans-serif] text-[#555] lg:text-lg text-base md:text-lg",
    "text-[#0d0d0d] font-['Avenir',_sans-serif] text-base md:text-lg"
)
content = content.replace(
    "text-[#888888] font-['Avenir',_sans-serif] text-[#555] lg:text-lg text-sm md:text-base",
    "text-[#888888] font-['Avenir',_sans-serif] text-sm md:text-base"
)

# And specifically make sure the main titles (that were mistakenly changed to font-sans in an earlier step) are correct!
# Wait, let's fix the titles to the standard blocky title if they aren't already:
content = content.replace(
    'className="text-2xl md:text-5xl font-sans font-bold tracking-tighter text-[#0f0f0f] mb-8 pb-4 border-b border-[#0d0d0d]/10 uppercase"',
    'className="text-2xl md:text-4xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4"'
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(content)

