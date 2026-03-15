import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# MACBOOK ASPECT RATIO
# Currently: `openDevice === 'mac' ? 'w-[20rem] h-[15rem] lg:w-[32rem] lg:h-[20rem]' : 'w-[28rem] h-[22rem] lg:w-[48rem] lg:h-[30rem]'`
# Fix the open state. A MacBook Pro aspect is roughly 16:10 or 1.6 width-to-height.
# 'w-[32rem] h-[20rem]' is 1.6, which is good. Let's make it a bit smaller so specs fit nicely, say w-[28rem] h-[17.5rem] -> 'lg:w-[32rem] lg:h-[20rem]'
# Actually, the user says "get itself to a proper aspect ratio where the image and the specs can be seen clearly"
# So the images might be getting cut off or squished. The images have `object-contain`, so they shouldn't stretch, but the container size dictates how large it CAN get.

# Let's use `aspect-[whatever]` or simply give it a much wider proportional container so it shrinks naturally, but doesn't overflow.
# Actually, changing the width and height fixed classes to use `max-w-full` or something might be better. Or just better explicitly calculated rem pairs.

# Mac (1.6 width-to-height mostly) - was: lg:w-[32rem] lg:h-[20rem] 
# Let's change the closed state too to ensure it's proportional. 'lg:w-[48rem] lg:h-[30rem]' (1.6) - this is fine.
# We'll stick to 1.6 for Mac. Let's make the open state `lg:w-[36rem] lg:h-[22.5rem]` -> Tailwind doesn't have 22.5 out of box unless in JIT.
# Let's use `lg:w-[35rem] lg:h-[22rem]` (1.59 ratio, close enough)
gig_content = gig_content.replace(
    "${openDevice === 'mac' ? 'w-[20rem] h-[15rem] lg:w-[32rem] lg:h-[20rem]' : 'w-[28rem] h-[22rem] lg:w-[48rem] lg:h-[30rem]'}",
    "${openDevice === 'mac' ? 'w-[20rem] h-[12.5rem] lg:w-[35rem] lg:h-[22rem]' : 'w-[28rem] h-[17.5rem] lg:w-[48rem] lg:h-[30rem]'}"
)

# IPAD ASPECT RATIO (portrait mode mostly, maybe 3:4) - width should be 0.75 of height
# Currently open: 'lg:w-[32rem] lg:h-[40rem]' (0.8 ratio)
# Currently closed: 'lg:w-[35rem] lg:h-[45rem]' (0.77 ratio)
# Let's drop the width a bit to make it less wide and more properly portrait looking.
# Let's say closed is lg:h-[45rem] -> w should be ~33.75 -> `lg:w-[34rem]`
# Open is lg:h-[40rem] -> w should be ~30 -> `lg:w-[30rem]`
# Small screens: closed h-[30rem] w-[22.5rem] -> `w-[22rem] h-[30rem]`
# Small screens: open h-[28rem] w-[21rem] -> `w-[21rem] h-[28rem]`
gig_content = gig_content.replace(
    "${openDevice === 'ipad' ? 'w-[22rem] h-[28rem] lg:w-[32rem] lg:h-[40rem]' : 'w-[24rem] h-[30rem] lg:w-[35rem] lg:h-[45rem]'}",
    "${openDevice === 'ipad' ? 'w-[21rem] h-[28rem] lg:w-[30rem] lg:h-[40rem]' : 'w-[22rem] h-[30rem] lg:w-[34rem] lg:h-[45rem]'}"
)

# IPHONE ASPECT RATIO (tall portrait, usually 19.5:9 -> height is ~2.16x width)
# Currently open: 'w-[34rem] h-[50rem] lg:w-[52rem] lg:h-[70rem]' -> width is huge, scaling is way off!
# lg:h-[70rem] / 2.16 = ~32.4rem -> let's make it `lg:w-[32rem] lg:h-[70rem]`
# Small open: h-[50rem] / 2.16 = ~23rem -> `w-[23rem] h-[50rem]`
# Currently closed: 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]' 
# lg:h-[75rem] / 2.16 = ~34.7rem -> `lg:w-[35rem] lg:h-[75rem]`
# Small closed: h-[48rem] / 2.16 = ~22rem -> `w-[22rem] h-[48rem]`
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'w-[34rem] h-[50rem] lg:w-[52rem] lg:h-[70rem]' : 'w-[32rem] h-[48rem] lg:w-[56rem] lg:h-[75rem]'}",
    "${openDevice === 'iphone' ? 'w-[23rem] h-[50rem] lg:w-[32rem] lg:h-[70rem]' : 'w-[22rem] h-[48rem] lg:w-[35rem] lg:h-[75rem]'}"
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

