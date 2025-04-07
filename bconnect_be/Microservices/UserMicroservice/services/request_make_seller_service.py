from flask import request, jsonify
import requests
from ..helper_functions import extract_auth_token
from ..model.user import User
import os
def request_make_seller(db):
    token = extract_auth_token(request)
    try:
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if response.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        user_id = response.json()["user_id"]
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})
        
        if request_make_seller.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except requests.RequestException as e:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except KeyError:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except:
        return jsonify({"message" : "Bad Request"}), 400
    
    
    try:
        user = User.query.get(user_id)
    except:
        return jsonify({"message" : "Not Found"}), 404
    
    if not user.agree_seller_terms:
        return jsonify({"message" : "Must agree to seller terms and policies"}), 401
    
    if not user.id_pic:
        return jsonify({"message" : "Must upload identification image"}), 401
    
    try:
        user.request_make_seller = True
        db.session.commit()
        
        return jsonify({"message": "Request Sent Successfully"}), 200
    except:
        return jsonify({"message" : "Internal Server Error"}), 500
    
    
    