import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "r") as f:
    gig_content = f.read()

# 1. Update the parent container's layout logic:
target_container = r"className=\{`w-full max-w-\[90rem\] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 mt-16 md:mt-0 \$\{openDevice === 'iphone' \? 'lg:justify-center lg:gap-16 xl:gap-24' : 'lg:justify-center'\}`\}"
replacement_container = r"className={`w-full max-w-[100vw] flex flex-col lg:flex-row items-center transition-all duration-700 mt-16 md:mt-0 ${openDevice === 'iphone' ? 'lg:justify-end lg:pr-[10vw] lg:gap-16 xl:gap-20' : 'lg:justify-center'}`}"
gig_content = re.sub(target_container, replacement_container, gig_content)

# 2. Update the iPhone size to TRUE 2x dimensions!
# The user wants clicked AND unclicked to be 2x.
# Original unclicked: 35x75. 2x = 70x150.
# Original clicked: 46x100. 2x = 92x200.
# The user said "Increase iPhone size by 2x for both clicked and unclicked states" AND "make it come near the iphone photo"
# We'll use 70x151 for unclicked, and 92x198 for clicked.
target_div = r"className=\{`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-\[cubic-bezier\(0\.25,0\.1,0\.1,1\.0\)\] \$\{openDevice === 'iphone' \? 'w-\[35rem\] h-\[75rem\] lg:w-\[48rem\] lg:h-\[103rem\]' : 'w-\[35rem\] h-\[75rem\] lg:w-\[48rem\] lg:h-\[103rem\]'\}`\}"
replacement_div = r"className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${openDevice === 'iphone' ? 'w-[50rem] h-[108rem] lg:w-[92rem] lg:h-[198rem]' : 'w-[45rem] h-[97rem] lg:w-[70rem] lg:h-[151rem]'}`}"
gig_content = re.sub(target_div, replacement_div, gig_content)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(gig_content)

