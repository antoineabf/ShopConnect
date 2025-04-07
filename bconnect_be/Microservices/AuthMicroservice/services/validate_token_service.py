from ..helper_functions import extract_auth_token, decode_token
from flask import request, jsonify
from ..model.auth import Auth
import datetime

def validate_token():
    checkReset = request.args.get('checkReset') == "true"
    
    try:
        token = extract_auth_token(request)
        
        if not token or token == "null":
            return jsonify({"message":"No Token Provided"}), 400
        payload = decode_token(token)
        user = Auth.query.filter_by(id=payload.get('sub', '')).first()
        if not user or (checkReset != payload.get('reset', '')) or (not payload.get('reset', False) and user.role != payload.get("role", "")) or datetime.datetime.utcnow().timestamp() >= payload.get('exp', ''):
            return jsonify({"message":"Invalid Token"}), 403

        resp = {"user_id": payload.get('sub', '')} 
        if not payload.get('reset', False):
            resp["role"] = payload.get("role", "")
        return jsonify(resp), 200
    except Exception as e:
        return jsonify({"message": "Invalid Token"}), 403
    
    