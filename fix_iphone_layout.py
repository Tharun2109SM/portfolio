import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# We need to change the width of the iPhone back to something reasonable (50rem, taking up ~800px)
# But keep its height massive (108rem). A 50x108 is a 2.16 aspect ratio.
# The user wants "Increase iPhone size by 2x for both clicked and unclicked states" AND wants the specs closer.
# If something is 151rem tall, its aspect ratio box must physically have `100rem` in width if it's horizontal, but it's vertical.
# Oh! The image is rotating! Wait, the iPhone is vertically oriented. 
# Okay, the iPhone is vert. A width of 70rem (1120px) is just too wide for a vert phone. It leaves zero flex space.
# We changed it to w-[70rem] h-[151rem].
# Let's drop it to `w-[50rem] h-[108rem]` for both, and `scale: 1.2` or something?
# No, let's just make the bounding box of the device smaller so Flexbox gives space to the text!
# Specifically, the w-[] class is what pushes the text away. 

# Let's change the iphone container logic from this:
target = """className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${openDevice === 'iphone' ? 'w-[45rem] h-[97rem] lg:w-[70rem] lg:h-[151rem]' : 'w-[44rem] h-[96rem] lg:w-[70rem] lg:h-[151rem]'}"""

replacement = """className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${openDevice === 'iphone' ? 'w-[35rem] h-[75rem] lg:w-[48rem] lg:h-[103rem]' : 'w-[35rem] h-[75rem] lg:w-[48rem] lg:h-[103rem]'}"""

gig_content = gig_content.replace(target, replacement)

# Reduce the gap from lg:gap-32 xl:gap-40 to lg:gap-16 xl:gap-20 specifically for iphone
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'lg:justify-center lg:gap-32 xl:gap-40' : 'lg:justify-center'}",
    "${openDevice === 'iphone' ? 'lg:justify-center lg:gap-16 xl:gap-24' : 'lg:justify-center'}"
)


with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

