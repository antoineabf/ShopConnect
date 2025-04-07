from flask import request, jsonify
from ..helper_functions import create_token
from ..model.auth import Auth

def login(bcrypt):
    try:
        if "username" not in request.json or "password" not in request.json:
            return jsonify({"message":"Invalid Credentials"}), 400

        username = request.json["username"]
        password = request.json["password"]

        user = Auth.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message":"Incorrect Username or Password"}), 403

        if not bcrypt.check_password_hash(user.hashed_password, password):
            return jsonify({"message":"Incorrect Username or Password"}), 403
        
        token = create_token(user.id, role=user.role)
        
        return jsonify({"token": token, "user_id": user.id, "role":user.role}), 200
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500