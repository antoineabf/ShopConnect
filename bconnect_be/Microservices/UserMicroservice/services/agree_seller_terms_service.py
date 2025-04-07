from flask import request, jsonify
import requests
from ..helper_functions import extract_auth_token
from ..model.user import User
import os
def agree_seller_terms(db):
    token = extract_auth_token(request)
    try:
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if response.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        user_id = response.json()["user_id"]
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})
        
        if agree_seller_terms.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
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
    
    try:
        user.agree_seller_terms = True
        db.session.commit()
        
        return jsonify({"message": "Request Sent Successfully"}), 200
    except:
        return jsonify({"message" : "Internal Server Error"}), 500
    