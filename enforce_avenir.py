import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Make the MAIN panel titles Avenir (e.g. MacBook Pro — M4 Pro)
gig_content = gig_content.replace(
    'className="text-2xl md:text-4xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4"',
    'className="text-2xl md:text-4xl font-[\'Avenir\',_sans-serif] font-bold text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4 tracking-tighter"'
)
# And just in case they are still in that 'text-5xl border-b uppercase' state from earlier:
gig_content = gig_content.replace(
    'className="text-2xl md:text-5xl font-sans font-bold tracking-tighter text-[#0f0f0f] mb-8 pb-4 border-b border-[#0d0d0d]/10 uppercase"',
    'className="text-2xl md:text-4xl font-[\'Avenir\',_sans-serif] font-bold text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4 tracking-tighter"'
)

# Make the subheadings (e.g. CPU & GPU) Avenir 
gig_content = gig_content.replace(
    'font-sans tracking-[0.15em]',
    "font-['Avenir',_sans-serif] tracking-[0.15em]"
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

