from app import db 
from .model.user import User
db.create_all()
try:
    user = User(1, "admin")
    db.session.add(user)
    db.session.commit()
except:
    pass