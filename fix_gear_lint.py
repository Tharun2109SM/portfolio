import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gear.jsx", "r") as f:
    gear_content = f.read()

# Remove unused variables and imports
gear_content = gear_content.replace(
    "import bikeForest from '../assets/bike-forest.jpg';", 
    ""
)

gear_content = gear_content.replace(
    """  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalContainerRef = useRef(null);""", 
    ""
)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gear.jsx", "w") as f:
    f.write(gear_content)

