# api.py
from fastapi import APIRouter, Depends, HTTPException, File, Response
from sqlalchemy.orm import Session
from db import SessionLocal, User, Character
from ai import generate_character_image
from pydantic import BaseModel
from fastapi.responses import FileResponse

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserRegisterRequest(BaseModel):
    id: str
    phone_number: str

class CharacterGenerateRequest(BaseModel):
    user_id: str
    theme: str
    color: str
    animal: str


@router.post("/register")
def register_user(request: UserRegisterRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(id=request.id).first()
    if user:
        raise HTTPException(status_code=400, detail="ID already registered.")
    
    user_by_phone = db.query(User).filter_by(phone_number=request.phone_number).first()
    if user_by_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered.")

    new_user = User(id=request.id, phone_number=request.phone_number)
    db.add(new_user)
    db.commit()
    return {"id": new_user.id, "phone_number": new_user.phone_number}

@router.post("/login")
def login_user(request: UserRegisterRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(id=request.id, phone_number=request.phone_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found or incorrect credentials.")
    return {"id": user.id, "phone_number": user.phone_number}

@router.post("/generate")
def generate_character(request: CharacterGenerateRequest, db: Session = Depends(get_db)):
    # Ensure that the user_id exists
    user = db.query(User).filter_by(id=request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    image_path = generate_character_image(request.theme, request.color, request.animal)
    
    new_character = Character(
        user_id=request.user_id,  # Use the user_id from the request
        image_url=image_path,
        theme=request.theme,
        color=request.color,
        animal=request.animal
    )
    
    db.add(new_character)
    db.commit()
    return FileResponse(image_path, media_type="image/png")


@router.get("/view_user/{user_id}")
def view_user(user_id: str, db: Session = Depends(get_db)):  # Changed user_id to str
    characters = db.query(Character).filter_by(user_id=user_id).all()
    return [
        {
            "id": char.id,
            "image_url": char.image_url,
            "theme": char.theme,
            "color": char.color,
            "animal": char.animal
        } 
        for char in characters
    ]


@router.get("/view_all")
def view_all(db: Session = Depends(get_db)):
    characters = db.query(Character).all()
    return [
        {
            "id": char.id,
            "image_url": char.image_url,
            "theme": char.theme,
            "color": char.color,
            "animal": char.animal
        }
        for char in characters
    ]


@router.get("/image/{character_id}")
def get_image(character_id: int, db: Session = Depends(get_db)):
    character = db.query(Character).filter_by(id=character_id).first()
    if not character:
        raise HTTPException(status_code=404, detail="Character not found.")
    return FileResponse(character.image_url, media_type="image/png")
