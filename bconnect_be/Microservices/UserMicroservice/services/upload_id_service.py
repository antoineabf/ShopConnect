from flask import request, jsonify
import requests
from ..helper_functions import extract_auth_token
from ..model.user import User
import base64
import os
def uploadID(db):
    token = extract_auth_token(request)
    try:
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        user_id = response.json().get("user_id")
    except requests.RequestException as e:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except KeyError:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except Exception as e:
        return jsonify({"message" : "Bad Request"}), 400
    
    if "id_pic" not in request.files:
        return jsonify({"message" : "Bad Request"}), 400
        
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({"message" : "Not Found"}), 404
        
        id_pic = request.files["id_pic"]
        id_pic_data = id_pic.read()
        encoded_image = base64.b64encode(id_pic_data)
        user.id_pic = encoded_image
        db.session.commit()
        return jsonify({"message": "Identification image updated successfully."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal Server Error"}), 500