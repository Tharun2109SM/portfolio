import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# IPHONE EXPONENTIAL TWEAK - OPEN STATE
# The problem: Tailwind does not have classes like `h-[100rem]` out of the box unless using JIT mode properly or if it's considered valid arbitrary value.
# Also, the outer constraint `max-w-[85rem]` on the parent flex container limits how wide the iPhone can actually get. 
# If the container is 85rem max, and the iPhone is set to 46rem width, it takes up more than half. The text takes the rest.
# Let's use `scale` for exponential growth! It's an animation component, so scaling up is much cleaner than arbitrary rem sizes that might break container bounds.

# Instead of `h-[100rem]`, let's revert to a very large base size, and use the `animate={{ scale }}` prop to physically blow it up.
# Currently animate prop: `animate={{ scale: isMobile ? (openDevice === 'iphone' ? 0.8 : 1) : 1 }}`
# Let's change the animate prop to: `animate={{ scale: isMobile ? (openDevice === 'iphone' ? 0.8 : 1) : (openDevice === 'iphone' ? 1.5 : 1) }}`
gig_content = gig_content.replace(
    "animate={{ scale: isMobile ? (openDevice === 'iphone' ? 0.8 : 1) : 1 }}",
    "animate={{ scale: isMobile ? (openDevice === 'iphone' ? 0.8 : 1) : (openDevice === 'iphone' ? 1.4 : 1) }}"
)

# And let's fix the base classes back to something reasonable so the bounding box doesn't break Flexbox:
gig_content = gig_content.replace(
    "${openDevice === 'iphone' ? 'w-[32rem] h-[70rem] lg:w-[46rem] lg:h-[100rem]' : 'w-[22rem] h-[48rem] lg:w-[35rem] lg:h-[75rem]'}",
    "${openDevice === 'iphone' ? 'w-[25rem] h-[54rem] lg:w-[35rem] lg:h-[75rem]' : 'w-[22rem] h-[48rem] lg:w-[35rem] lg:h-[75rem]'}"
)

# Let's do the same trick for the iPad to ensure it's actually getting bigger visually without breaking flex bounds:
# iPad current animate prop: `animate={{ scale: isMobile ? (openDevice === 'ipad' ? 0.8 : 1) : 1 }}`
gig_content = gig_content.replace(
    "animate={{ scale: isMobile ? (openDevice === 'ipad' ? 0.8 : 1) : 1 }}",
    "animate={{ scale: isMobile ? (openDevice === 'ipad' ? 0.8 : 1) : (openDevice === 'ipad' ? 1.3 : 1) }}"
)
# iPad base classes revert to reasonable sizes:
gig_content = gig_content.replace(
    "${openDevice === 'ipad' ? 'w-[34rem] h-[45rem] lg:w-[52rem] lg:h-[70rem]' : 'w-[22rem] h-[30rem] lg:w-[34rem] lg:h-[45rem]'}",
    "${openDevice === 'ipad' ? 'w-[26rem] h-[35rem] lg:w-[38rem] lg:h-[50rem]' : 'w-[22rem] h-[30rem] lg:w-[34rem] lg:h-[45rem]'}"
)


with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

