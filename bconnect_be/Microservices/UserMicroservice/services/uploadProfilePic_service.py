from flask import request, jsonify
import requests
from ..helper_functions import extract_auth_token
from ..model.user import User
import base64
import os
def uploadProfilePic(db):
    token = extract_auth_token(request)
    try:
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        user_id = response.json().get("user_id")
    except requests.RequestException as e:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except KeyError:
        return jsonify({"message" : "Unauthorized Request"}), 403
    except:
        return jsonify({"message" : "Bad Request"}), 400
    
    if "profile_pic" not in request.files:
        return jsonify({"message" : "Bad Request"}), 400
        
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({"message" : "Not Found"}), 404
        
        profile_pic = request.files["profile_pic"]
        profile_pic_data = profile_pic.read()
        encoded_image = base64.b64encode(profile_pic_data)
        user.profile_pic = encoded_image
        db.session.commit()
        return jsonify({"message": "Profile picture updated successfully."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal Server Error"}), 500
    