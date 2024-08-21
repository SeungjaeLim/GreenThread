# ai.py
import openai
import requests
import os
import config



IMAGE_STORAGE_PATH = "images/"

def translate_theme(theme: str) -> str:
    translations = {
        "귀여운": "cute",
        "멋있는": "cool",
        "우아한": "elegant",
    }
    return translations.get(theme, theme)


def generate_character_image(character_id: int, theme: str, color: str, animal: str) -> str:
    translated_theme = translate_theme(theme)  # Translate the theme
    client = openai.OpenAI(api_key=config.OPENAI_API_KEY)
    prompt = (
        f"Create a character design for a new Pokémon-style creature. It mean 2D Japanese animal style."
        f"You must give just only One character that acting some move. No description, no extra shape in image."
        f"The creature should be a "
        f"medium-sized, bipedal creature with a blend of animal and mythical elements. "
        f"This Pokémon is inspired by a {animal}, and its color scheme is {color}. "
        f"The Pokémon's mood is {translated_theme}."
        f"The environment around the creature should reflect a fantasy landscape, with swirling clouds and a hint of an enchanted forest in the background. "
        f"When you generate not Only one character in generated image, I will be fired."
    )   
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    
    # Download the image
    image_data = requests.get(image_url).content
    
    # Ensure the directory exists
    os.makedirs(IMAGE_STORAGE_PATH, exist_ok=True)
    
    # Save the image using the character_id
    filename = f"{character_id}.png"
    file_path = os.path.join(IMAGE_STORAGE_PATH, filename)
    
    # Save the image locally
    with open(file_path, "wb") as file:
        file.write(image_data)
    
    return file_path