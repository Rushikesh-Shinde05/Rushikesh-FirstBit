from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ✅ Use proper MySQL URL
DATABASE_URL = "mysql+pymysql://root:shinde%400513@localhost:3306/trainer"

# ✅ No connect_args needed for MySQL
engine = create_engine(DATABASE_URL)

# ✅ Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Base class for models
Base = declarative_base()
