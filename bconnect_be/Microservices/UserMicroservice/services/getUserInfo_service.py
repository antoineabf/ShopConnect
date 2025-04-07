from flask import jsonify
from ..model.user import User, user_schema

def getUserInfo(user_id):
    print(user_id)
    try:
        if not user_id:
            return jsonify({"message": "User ID is missing in the request"}), 400
        
        user = User.query.filter_by(user_id=user_id).first()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        
        return jsonify(user_schema.dump(user)), 200
    
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
