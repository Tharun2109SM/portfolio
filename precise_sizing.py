import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# IPHONE TWEAK - OPEN STATE height to 70rem
# Current base: `openDevice === 'iphone' ? 'w-[30rem] h-[44rem] lg:w-[45rem] lg:h-[62rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'`
# Change open height from lg:h-[62rem] -> lg:h-[70rem] and update width proportionally (say 52rem)
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'w-[30rem] h-[44rem] lg:w-[45rem] lg:h-[62rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'}",
    "${openDevice === 'iphone' ? 'w-[34rem] h-[50rem] lg:w-[52rem] lg:h-[70rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'}"
)

# IPAD TWEAK - CLOSED (NOT CLICKED) STATE height to 45rem
# Current base: `openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[25rem] h-[32rem] lg:w-[38rem] lg:h-[48rem]'`
# Change closed height from lg:h-[48rem] -> lg:h-[45rem] and update width proportionally (say 35rem)
gig_content = gig_content.replace(
    "${openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[25rem] h-[32rem] lg:w-[38rem] lg:h-[48rem]'}",
    "${openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[24rem] h-[30rem] lg:w-[35rem] lg:h-[45rem]'}"
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

