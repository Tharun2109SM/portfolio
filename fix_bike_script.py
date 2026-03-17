import cv2
import numpy as np
img_path = '/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/assets/bike-side-transparent.png'
# Load with alpha channel explicitly
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
if img is not None and len(img.shape) == 3 and img.shape[2] == 4:
    alpha = img[:, :, 3]
    h, w = img.shape[:2]
    # Watermark is roughly in the middle left
    y_start, y_end = int(h*0.35), int(h*0.65)
    x_start, x_end = int(w*0.25), int(w*0.75)
    region_alpha = alpha[y_start:y_end, x_start:x_end]
    # Erase the semi-transparent watermark (alpha < 240) completely
    region_alpha[region_alpha < 240] = 0
    alpha[y_start:y_end, x_start:x_end] = region_alpha
    img[:, :, 3] = alpha
    cv2.imwrite('/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/assets/bike-side-transparent.png', img)
    print("Erased watermark completely")
else:
    print("Could not load image with alpha channel. Shape:", img.shape if img is not None else "None")
