from flask import request, jsonify
import requests

from ..helper_functions import extract_auth_token
import os

from ..model.user import User, user_schema

def dismiss_request(buyer_id, db):
    token = extract_auth_token(request)
    try:
        validate = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if validate.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})

        if dismiss_request.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except Exception as e:
        return jsonify({"message":"Unauthorized Request"}), 401
    
    try:
        user = User.query.get(buyer_id)
        if not user:
            return jsonify({"message":"Not Found"}), 404
        
        user.request_make_seller = False
        db.session.commit()
        return jsonify({"message":"Successful"}), 201
    except:
        return jsonify({"message":"Internal Server Error"}), 500
    