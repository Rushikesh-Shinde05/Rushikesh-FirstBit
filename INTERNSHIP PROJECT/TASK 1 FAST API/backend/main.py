from fastapi import FastAPI, HTTPException, Depends, Query # pyright: ignore[reportMissingImports]
from sqlalchemy.orm import Session # pyright: ignore[reportMissingImports]
import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/trainer", response_model=schemas.Trainer)
def create_trainer(trainer: schemas.TrainerCreate, db: Session = Depends(get_db)):
    db_trainer = models.Trainer(**trainer.dict())
    db.add(db_trainer)
    db.commit()
    db.refresh(db_trainer)
    return db_trainer

@app.get("/trainer", response_model=list[schemas.Trainer])
def get_trainers(db: Session = Depends(get_db)):
    return db.query(models.Trainer).all()

@app.delete("/trainer")
def delete_trainer(empId: str = Query(...), db: Session = Depends(get_db)):
    trainer = db.query(models.Trainer).filter(models.Trainer.empId == empId).first()
    if not trainer:
        raise HTTPException(status_code=404, detail="Trainer not found")
    db.delete(trainer)
    db.commit()
    return {"message": f"Trainer with empId {empId} deleted"}

@app.get("/trainer/{empId}", response_model=schemas.Trainer)
def get_trainer_by_empid(empId: str, db: Session = Depends(get_db)):
    trainer = db.query(models.Trainer).filter(models.Trainer.empId == empId).first()
    if not trainer:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return trainer

@app.get("/trainer/{subject}/topic", response_model=list[schemas.Trainer])
def get_trainers_by_subject(subject: str, db: Session = Depends(get_db)):
    return db.query(models.Trainer).filter(models.Trainer.subject.ilike(subject)).all()

@app.post("/subject", response_model=schemas.Subject)
def create_subject(subject: schemas.SubjectCreate, db: Session = Depends(get_db)):
    db_subject = models.Subject(**subject.dict())
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject

@app.get("/subject", response_model=list[schemas.Subject])
def get_subjects(db: Session = Depends(get_db)):
    return db.query(models.Subject).all()

@app.get("/subject/{id}")
def get_subject_and_trainers(id: int, db: Session = Depends(get_db)):
    subject = db.query(models.Subject).filter(models.Subject.id == id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    trainers = db.query(models.Trainer).filter(models.Trainer.subject == subject.name).all()
    return {
        "subject": subject.name,
        "trainers": [t.name for t in trainers]
    }