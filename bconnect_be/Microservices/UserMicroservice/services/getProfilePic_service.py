from flask import jsonify, send_file
from ..model.user import User, user_schema
from io import BytesIO
import base64

def getProfilePic(user_id):
    try:
        if not user_id:
            return jsonify({"message": "User ID is missing in the request"}), 400
        
        user = User.query.filter_by(user_id=user_id).first()
        
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        profile_pic_base64 = user.profile_pic
        if profile_pic_base64:
            profile_pic_data = base64.b64decode(profile_pic_base64)
            return send_file(BytesIO(profile_pic_data), mimetype='image/jpeg', as_attachment=True, download_name='profile_pic.jpg')
        
        return jsonify({"message": "Profile picture not found"}), 404
    
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
