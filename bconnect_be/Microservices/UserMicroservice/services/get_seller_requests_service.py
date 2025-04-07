from flask import request, jsonify
import requests
from ..helper_functions import extract_auth_token
from ..model.user import User, user_schema
import os

def get_seller_requests():
    token = extract_auth_token(request)
    try:
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if response.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})
        
        if get_seller_requests.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except requests.RequestException as e:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except KeyError:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except:
        return jsonify({"message" : "Bad Request"}), 400
    
    
    try:
        users = User.query.filter_by(request_make_seller=True).all()
        
        return jsonify([user_schema.dump(u) for u in users]), 200
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500