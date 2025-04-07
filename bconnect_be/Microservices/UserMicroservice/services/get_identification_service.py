from flask import request, jsonify, send_file
import requests
from ..helper_functions import extract_auth_token
from ..model.user import User
from io import BytesIO
import base64
import os
def get_identification(user_id):
    token = extract_auth_token(request)
    try:
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if response.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})
        
        if get_identification.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except requests.RequestException as e:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except KeyError:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except:
        return jsonify({"message" : "Bad Request"}), 400
    
    
    try:
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        id_base64 = user.id_pic
        if id_base64:
            id_data = base64.b64decode(id_base64)
            return send_file(BytesIO(id_data), mimetype='image/jpeg', as_attachment=True, download_name='identification_img.jpg')
        
        return jsonify({"message": "Identification Image not found"}), 404
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500