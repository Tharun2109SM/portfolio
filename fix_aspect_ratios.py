import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# IPAD
# 1. Revert scale trick for iPad back to 1.0 (no crazy overlap)
gig_content = gig_content.replace(
    "animate={{ scale: isMobile ? (openDevice === 'ipad' ? 0.8 : 1) : (openDevice === 'ipad' ? 1.3 : 1) }}",
    "animate={{ scale: isMobile ? (openDevice === 'ipad' ? 0.8 : 1) : 1 }}"
)
# 2. Update iPad to perfect huge aspect ratio classes (0.75 w/h multiplier)
gig_content = gig_content.replace(
    "${openDevice === 'ipad' ? 'w-[26rem] h-[35rem] lg:w-[38rem] lg:h-[50rem]' : 'w-[22rem] h-[30rem] lg:w-[34rem] lg:h-[45rem]'}",
    "${openDevice === 'ipad' ? 'w-[24rem] h-[32rem] lg:w-[45rem] lg:h-[60rem]' : 'w-[21rem] h-[28rem] lg:w-[36rem] lg:h-[48rem]'}"
)

# IPHONE
# 1. Revert massive scale trick for iPhone back to 1.0
gig_content = gig_content.replace(
    "animate={{ scale: isMobile ? (openDevice === 'iphone' ? 1.6 : 2) : (openDevice === 'iphone' ? 2.8 : 2) }}",
    "animate={{ scale: isMobile ? (openDevice === 'iphone' ? 0.8 : 1) : 1 }}"
)
# 2. Update iPhone to perfect huge aspect ratio classes (0.46 w/h multiplier). Massive!
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'w-[25rem] h-[54rem] lg:w-[35rem] lg:h-[75rem]' : 'w-[22rem] h-[48rem] lg:w-[35rem] lg:h-[75rem]'}",
    "${openDevice === 'iphone' ? 'w-[25rem] h-[54rem] lg:w-[39rem] lg:h-[84rem]' : 'w-[25rem] h-[54rem] lg:w-[39rem] lg:h-[84rem]'}"
)

# Also let's guarantee `max-w-[85rem]` on containers doesn't choke out the massive iPhone!
# Change `max-w-[85rem]` to `max-w-[90rem]` to give max breathing room on XL monitors.
gig_content = gig_content.replace("max-w-[85rem]", "max-w-[90rem]")

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

