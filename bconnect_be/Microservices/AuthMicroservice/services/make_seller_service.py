from ..permissions import permissions
from flask import request, jsonify
import requests

from ..helper_functions import extract_auth_token
import os

from ..model.auth import Auth, auth_schema

def make_seller(buyer_id, db):
    token = extract_auth_token(request)
    try:
        validate = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if validate.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        user_id = validate.json()["user_id"]
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})

        if make_seller.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except Exception as e:
        return jsonify({"message":"Unauthorized Request"}), 401
    
    try:
        user = Auth.query.get(buyer_id)
        if not user:
            return jsonify({"message":"Not Found"}), 404
        
        if user.role != "buyer":
            return jsonify({"message":"Invalid Request"}), 401
        
        user.role = "seller"
        db.session.commit()
        return jsonify({"message":"Successful"}), 201
    except:
        return jsonify({"message":"Internal Server Error"}), 500
    