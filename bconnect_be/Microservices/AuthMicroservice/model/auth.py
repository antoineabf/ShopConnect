from ..app import db, ma, bcrypt
from ..permissions import roles
print(roles)
class Auth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    email = db.Column(db.String(50), unique = True)
    hashed_password = db.Column(db.String(128))
    role = db.Column(db.Enum(*roles), nullable=False, server_default='buyer')

    def __init__(self, username, email, password):
        super(Auth, self).__init__(username=username)
        super(Auth, self).__init__(email=email)
        self.hashed_password = bcrypt.generate_password_hash(password)


class AuthSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "email", 'role', 'agree_seller_terms')
        model = Auth


auth_schema = AuthSchema()
