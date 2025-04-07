from flask import request, jsonify
import requests
from ..model.auth import Auth, auth_schema
import os
def register(db):
    try:
        username = request.json["username"]
        email = request.json["email"]
        password = request.json["password"]
    except KeyError:
        return jsonify({"message": "Invalid Credentials"}), 400
    try:
        if Auth.query.filter_by(username=username).first():
            return jsonify({"message": "Username already taken"}), 409
        
        if Auth.query.filter_by(email=email).first():
            return jsonify({"message": "Email already taken"}), 409
        
        auth = Auth(username, email, password)
        db.session.add(auth)
        db.session.commit()
        user_id = auth.id
        
        response = requests.post(f"{os.environ.get('USER_URL', 'http://127.0.0.1:8082')}/createUserInfo", json={'user_id': user_id, 'username': username})
        
        if response.status_code != 201:
            db.session.rollback()
            return jsonify(response.json()), response.status_code
        return jsonify(auth_schema.dump(auth)), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal Server Error"}), 500