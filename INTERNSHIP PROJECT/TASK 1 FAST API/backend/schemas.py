from pydantic import BaseModel

# ================================
# Trainer Models
# ================================

class TrainerBase(BaseModel):
    empId: str
    name: str
    subject: str

class TrainerCreate(TrainerBase):
    pass

class Trainer(TrainerBase):
    id: int

    model_config = {
        "from_attributes": True
    }

# ================================
# Subject Models
# ================================

class SubjectBase(BaseModel):
    name: str

class SubjectCreate(SubjectBase):
    pass

class Subject(SubjectBase):
    id: int

    model_config = {
        "from_attributes": True
    }
