# db.py
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import config

DATABASE_URL = f"mysql+pymysql://{config.DATABASE['USER']}:{config.DATABASE['PASSWORD']}@{config.DATABASE['HOST']}:{config.DATABASE['PORT']}/{config.DATABASE['DB_NAME']}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(String(50), primary_key=True, index=True)
    phone_number = Column(String(15), unique=True, nullable=False)

class Character(Base):
    __tablename__ = 'characters'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), nullable=False)  # Matches the User.id
    image_url = Column(String(255), nullable=False)
    theme = Column(String(50), nullable=False)
    color = Column(String(50), nullable=False)
    animal = Column(String(50), nullable=False)
    liked = Column(Boolean, default=False)

def init_db():
    Base.metadata.create_all(bind=engine)
