import re

files_with_motion = [
    "/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/About.jsx",
    "/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/CustomCursor.jsx",
    "/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx",
    "/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Hero.jsx"
]

for file_path in files_with_motion:
    with open(file_path, "r") as f:
        content = f.read()
    
    # Add eslint-disable comment for motion if not already there
    if "// eslint-disable-next-line no-unused-vars" not in content and "import { motion" in content:
        content = re.sub(r"(import \{ motion.*?\} from 'framer-motion';)", r"// eslint-disable-next-line no-unused-vars\n\1", content)
    
    with open(file_path, "w") as f:
        f.write(content)

# Fix Hero.jsx class
with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Hero.jsx", "r") as f:
    hero_content = f.read()

# Replace class Particle { ... } with function Particle() { ... }
class_pattern = """    class Particle {
      constructor(x, y) {"""
func_pattern = """    function Particle(x, y) {"""
hero_content = hero_content.replace(class_pattern, func_pattern)

draw_pattern = """      draw() {"""
draw_func = """    Particle.prototype.draw = function() {"""
hero_content = hero_content.replace(draw_pattern, draw_func)

update_pattern = """      update(time) {"""
update_func = """    Particle.prototype.update = function(time) {"""
hero_content = hero_content.replace(update_pattern, update_func)

hero_content = hero_content.replace("""      }

      draw()""", """      }

      draw()""") # This was already replaced partly, wait let's just use simple replaces.

# A more robust regex replacement for the class syntax inside Hero.jsx:
import os
os.system("git checkout /Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Hero.jsx") # revert if messy
with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Hero.jsx", "r") as f:
    hero_content = f.read()

# Make sure eslint comment is added again after git checkout
if "// eslint-disable-next-line no-unused-vars" not in hero_content and "import { motion" in hero_content:
    hero_content = re.sub(r"(import \{ motion.*?\} from 'framer-motion';)", r"// eslint-disable-next-line no-unused-vars\n\1", hero_content)

hero_content = hero_content.replace("class Particle {", "")
hero_content = hero_content.replace("      constructor(x, y) {", "    function Particle(x, y) {")
hero_content = hero_content.replace("      draw() {", "    Particle.prototype.draw = function() {")
hero_content = hero_content.replace("      update(time) {", "    Particle.prototype.update = function(time) {")
# we need to remove the closing bracket of the class
hero_content = hero_content.replace("""        this.draw();
      }
    }

    const init = () => {""", """        this.draw();
    };

    const init = () => {""")

# We also need to fix `draw = function() { ... }` closing bracket
hero_content = hero_content.replace("""        ctx.restore();
      }

    Particle.prototype.update = function(time) {""", """        ctx.restore();
    };

    Particle.prototype.update = function(time) {""")

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Hero.jsx", "w") as f:
    f.write(hero_content)

# Fix ImageReveal.jsx unused delay
with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/ImageReveal.jsx", "r") as f:
    ir_content = f.read()

ir_content = ir_content.replace("const delay = Math.random() * 0.5;", "")
with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/ImageReveal.jsx", "w") as f:
    f.write(ir_content)

