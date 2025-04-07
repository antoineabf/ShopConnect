from flask import request, jsonify
from ..model.user import User, user_schema

def createUserInfo(db):
    try:
        user_id = request.json.get("user_id", "") # TODO: VALIDATE THAT user_id EXISTS IN AUTH
        username = request.json.get("username", "")

        if not user_id or not username:
            return jsonify({"message": "Invalid Credentials"}), 400

        if User.query.filter_by(user_id=user_id).first():
            return jsonify({"message": "Username already taken"}), 409
        
        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Email already taken"}), 409
        
        user = User(user_id, username, None, None)
        db.session.add(user)
        db.session.commit()

        return jsonify(user_schema.dump(user)), 201
    
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
