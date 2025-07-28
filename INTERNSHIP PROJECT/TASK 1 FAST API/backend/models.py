from sqlalchemy import Column, Integer, String
from database import Base

class Trainer(Base):
    __tablename__ = "trainers"
    id = Column(Integer, primary_key=True, index=True)
    empId = Column(String(100), unique=True, index=True)  # 👈 Add length
    name = Column(String(100))                             # 👈 Add length
    subject = Column(String(100))                          # 👈 Add length

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)    # 👈 Add length
