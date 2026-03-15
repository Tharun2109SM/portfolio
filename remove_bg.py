from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=240):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if pixel is close to white
        if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_white_bg("src/assets/mac-closed.jpg", "src/assets/mac-closed-transparent.png", tolerance=235)
    remove_white_bg("src/assets/mac-open.png", "src/assets/mac-open-transparent.png", tolerance=235)
    print("Backgrounds removed.")
