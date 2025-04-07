from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from .db_config import DB_CONFIG


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_CONFIG
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)


from .services import register_service, login_service, validate_token_service, forgot_pass_service, reset_pass_service, get_permissions_service, make_seller_service

@app.route('/register', methods=['POST'])
def register():
    return register_service.register(db)

@app.route('/login', methods=['POST'])
def login():
    return login_service.login(bcrypt)

@app.route('/validate_token', methods=['GET'])
def validate_token():
    return validate_token_service.validate_token()

@app.route('/forgot_pass/<email>', methods=['POST'])
def forgot_pass(email):
    return forgot_pass_service.forgot_pass(email)

@app.route('/reset_pass', methods=['POST'])
def reset_pass():
    return reset_pass_service.reset_pass(db, bcrypt)

@app.route('/permissions', methods=['GET'])
def get_persmissions():
    return get_permissions_service.get_permissions()

@app.route('/make-seller/<user_id>', methods=["POST"])
def make_seller(user_id):
    return make_seller_service.make_seller(user_id, db);

if __name__ == "__main__":
    app.run(port=8080)
    