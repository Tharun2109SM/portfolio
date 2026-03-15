import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# IPHONE TWEAK
# Increase iPhone open (specs visible) size. Base was: 
# `openDevice === 'iphone' ? 'w-[28rem] h-[40rem] lg:w-[40rem] lg:h-[55rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'`
# Let's bump the open side up! 
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'w-[28rem] h-[40rem] lg:w-[40rem] lg:h-[55rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'}",
    "${openDevice === 'iphone' ? 'w-[30rem] h-[44rem] lg:w-[45rem] lg:h-[62rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'}"
)

# IPAD TWEAK
# Decrease iPad closed (scrolling) size. Base was:
# `openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[28rem] h-[36rem] lg:w-[45rem] lg:h-[55rem]'`
# Let's shrink the closed side down slightly!
gig_content = gig_content.replace(
    "${openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[28rem] h-[36rem] lg:w-[45rem] lg:h-[55rem]'}",
    "${openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[25rem] h-[32rem] lg:w-[38rem] lg:h-[48rem]'}"
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

