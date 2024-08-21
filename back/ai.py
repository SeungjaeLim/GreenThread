# ai.py
import openai
import requests
import os
import config



IMAGE_STORAGE_PATH = "images/"

def generate_character_image(theme: str, color: str, animal: str) -> str:
    client = openai.OpenAI(api_key=config.OPENAI_API_KEY)
    prompt = f"A {color} {animal} in the theme of {theme}"
    response = client.images.generate(
    model="dall-e-3",
    prompt= prompt,
    size="1024x1024",
    quality="standard",
    n=1,
    )
    image_url = response.data[0].url
    
    # Download the image
    image_data = requests.get(image_url).content
    
    # Ensure the directory exists
    os.makedirs(IMAGE_STORAGE_PATH, exist_ok=True)
    
    # Generate a unique filename
    filename = f"{theme}_{color}_{animal}.png"
    file_path = os.path.join(IMAGE_STORAGE_PATH, filename)
    
    # Save the image locally
    with open(file_path, "wb") as file:
        file.write(image_data)
    
    return file_path
