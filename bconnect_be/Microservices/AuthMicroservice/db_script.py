from app import db 
from .model.auth import Auth
db.create_all()
try:
    user = Auth("admin", "shop.connect.reply@gmail.com", "admin")
    db.session.add(user)
    db.session.commit()
except:
    pass