import re
with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Replace massive shadow on the parent container
gig_content = gig_content.replace(
    'className="relative w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"',
    'className="relative w-full h-full"'
)

# And replace drop-shadow-2xl on the img tags for iPhone
gig_content = gig_content.replace(
    'src={iphoneBack} alt="iPhone Back" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"',
    'src={iphoneBack} alt="iPhone Back" className="absolute inset-0 w-full h-full object-contain pointer-events-none"'
)
gig_content = gig_content.replace(
    'src={iphoneFront} alt="iPhone Front" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"',
    'src={iphoneFront} alt="iPhone Front" className="absolute inset-0 w-full h-full object-contain pointer-events-none"'
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)
