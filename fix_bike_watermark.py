import cv2
import numpy as np

# Load the transparent image
img_path = '/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/assets/bike-side-transparent.png'
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)

# The watermark is in the center-left area, behind the downtube.
# Let's isolate the region: Roughly y=150 to 500, x=300 to 700
# We want to increase brightness and reduce contrast specifically in the watermark area to fade it out,
# without destroying the bike frame itself.

# Better yet, since we are dealing with a transparent PNG, we can use an Alpha mask trick.
# The watermark is slightly translucent gray pixels on what should be pure transparency.
# Let's target pixels that have low alpha (meaning they are partially transparent) and just wipe them to 0 alpha!
# The bike frame itself will have high alpha (solid).
# The watermark text "Bike Bargains.co.uk" is semi-transparent.

if img.shape[3] == 4:
    # Get alpha channel
    alpha = img[:, :, 3]
    
    # We want to target pixels where alpha is greater than 0 but less than say 200 (so it's not solid bike frame)
    # AND pixels that are relatively bright (not the black frame).
    
    # Alternatively, just threshold the alpha channel more aggressively.
    # Currently rembg might have extracted the watermark thinking it was an object.
    
    # Let's apply a threshold: any pixel with alpha < 200 becomes 0, alpha >= 200 remains.
    # We'll apply this only to the specific bounding box of the watermark to not ruin anti-aliasing on the rest of the bike.
    
    # Estimate of watermark bounding box
    h, w = img.shape[:2]
    # x approx 300 to 800, y approx 400 to 600
    y_start, y_end = int(h*0.4), int(h*0.6)
    x_start, x_end = int(w*0.3), int(w*0.7)
    
    region_alpha = alpha[y_start:y_end, x_start:x_end]
    
    # Increase transparency for pixels that aren't completely solid
    # The watermark seems to have alpha around 50-150.
    region_alpha[region_alpha < 240] = 0
    
    alpha[y_start:y_end, x_start:x_end] = region_alpha
    img[:, :, 3] = alpha
    
    # Also, we can see there's a big grey patch in the user's screenshot.
    # The easiest way to really destroy the watermark is just to physically replace the transparency.
    cv2.imwrite('/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/assets/bike-side-transparent.png', img)
    print("Watermark region cleaned!")

