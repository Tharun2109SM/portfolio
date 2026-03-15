import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Replace the EB Garamond font with Avenir
gig_content = gig_content.replace(
    "font-['EB_Garamond'] text-[#555] lg:text-xl", 
    "font-['Avenir',_sans-serif] text-[#555] lg:text-lg"
) 
gig_content = gig_content.replace(
    "font-['EB_Garamond'] text-lg md:text-xl text-[#333]", 
    "font-['Avenir',_sans-serif] text-base md:text-lg text-[#0d0d0d]"
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)
