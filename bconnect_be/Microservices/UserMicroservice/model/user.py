from ..app import db, ma


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    bio = db.Column(db.String(500), nullable = True)
    profile_pic = db.Column(db.LargeBinary(length=(2**32)-1), nullable = True)
    id_pic = db.Column(db.LargeBinary(length=(2**32)-1), nullable = True)
    request_make_seller = db.Column(db.Boolean, default=False, nullable=False)
    agree_seller_terms = db.Column(db.Boolean, nullable=False, unique=False, default=False)

    def __init__(self, user_id, username, bio, profile_pic):
        self.user_id = user_id
        self.username = username
        self.bio = bio
        self.profile_pic = profile_pic


class UserSchema(ma.Schema):
    class Meta:
        fields = ("user_id", "username", "bio", "request_make_seller", "agree_seller_terms")
        model = User


user_schema = UserSchema()
