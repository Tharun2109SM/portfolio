import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# IPHONE EXPONENTIAL TWEAK - OPEN STATE
# Current: `openDevice === 'iphone' ? 'w-[23rem] h-[50rem] lg:w-[32rem] lg:h-[70rem]' : 'w-[22rem] h-[48rem] lg:w-[35rem] lg:h-[75rem]'`
# The user wants it exponentially larger when clicked. Right now the ratio is ~2.16 (h/w).
# Let's take height from 70rem to 100rem! That's massive.
# lg:h-[100rem] -> width = 100 / 2.16 = ~46rem -> `lg:w-[46rem] lg:h-[100rem]`
# Small screen: h-[50rem] to h-[70rem] -> w=32rem -> `w-[32rem] h-[70rem]`
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'w-[23rem] h-[50rem] lg:w-[32rem] lg:h-[70rem]' : 'w-[22rem] h-[48rem] lg:w-[35rem] lg:h-[75rem]'}",
    "${openDevice === 'iphone' ? 'w-[32rem] h-[70rem] lg:w-[46rem] lg:h-[100rem]' : 'w-[22rem] h-[48rem] lg:w-[35rem] lg:h-[75rem]'}"
)

# IPAD EXPONENTIAL TWEAK - OPEN STATE
# Current: `openDevice === 'ipad' ? 'w-[21rem] h-[28rem] lg:w-[30rem] lg:h-[40rem]' : 'w-[22rem] h-[30rem] lg:w-[34rem] lg:h-[45rem]'`
# The user wants it exponentially larger when clicked. Ratio is currently 1.33 (h/w)
# Let's take height from 40rem to 70rem!
# lg:h-[70rem] -> width = 70 / 1.33 = ~52rem -> `lg:w-[52rem] lg:h-[70rem]`
# Small screen: from h-[28rem] to h-[45rem] -> w=34rem -> `w-[34rem] h-[45rem]`
gig_content = gig_content.replace(
    "${openDevice === 'ipad' ? 'w-[21rem] h-[28rem] lg:w-[30rem] lg:h-[40rem]' : 'w-[22rem] h-[30rem] lg:w-[34rem] lg:h-[45rem]'}",
    "${openDevice === 'ipad' ? 'w-[34rem] h-[45rem] lg:w-[52rem] lg:h-[70rem]' : 'w-[22rem] h-[30rem] lg:w-[34rem] lg:h-[45rem]'}"
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

