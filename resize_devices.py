import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# Increase iPad size even more:
# old closed: 'w-[20rem] h-[26rem] lg:w-[32rem] lg:h-[40rem]'
# new closed: 'w-[28rem] h-[36rem] lg:w-[45rem] lg:h-[55rem]'
# old open: 'w-[16rem] h-[21rem] lg:w-[22rem] lg:h-[28rem]'
# new open: 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]'
gig_content = gig_content.replace(
    "${openDevice === 'ipad' ? 'w-[16rem] h-[21rem] lg:w-[22rem] lg:h-[28rem]' : 'w-[20rem] h-[26rem] lg:w-[32rem] lg:h-[40rem]'}",
    "${openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[28rem] h-[36rem] lg:w-[45rem] lg:h-[55rem]'}"
)

# Increase iPhone size even more (it was already massive, let's go absolute unit):
# old closed: 'w-[28rem] h-[40rem] lg:w-[48rem] lg:h-[65rem]'
# new closed: 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'
# old open: 'w-[24rem] h-[34rem] lg:w-[32rem] lg:h-[48rem]'
# new open: 'w-[28rem] h-[40rem] lg:w-[40rem] lg:h-[55rem]'
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'w-[24rem] h-[34rem] lg:w-[32rem] lg:h-[48rem]' : 'w-[28rem] h-[40rem] lg:w-[48rem] lg:h-[65rem]'}",
    "${openDevice === 'iphone' ? 'w-[28rem] h-[40rem] lg:w-[40rem] lg:h-[55rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'}"
)


with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

