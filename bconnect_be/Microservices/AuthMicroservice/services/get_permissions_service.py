from ..helper_functions import extract_auth_token, decode_token
from flask import request, jsonify

from ..permissions import permissions

def get_permissions():
    try:
        token = extract_auth_token(request)
        
        payload = decode_token(token)

        if payload.get("reset", ""): return jsonify({"message":"Invalid Token"}), 403
        response = {"permissions":permissions.get(payload.get("role", ""), [])}
        return jsonify(response), 200
    except:
        return jsonify({"message":"Invalid Token"}), 400
        
    