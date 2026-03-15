import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Revert the main device titles in the spec panels back to `font-display` (which is The Gig font)
gig_content = gig_content.replace(
    'className="text-2xl md:text-4xl font-[\'Avenir\',_sans-serif] font-bold text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4 tracking-tighter"',
    'className="text-3xl md:text-5xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4"'
)


with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

