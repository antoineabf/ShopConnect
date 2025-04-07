from flask import jsonify
from ..helper_functions import create_token, send_email
from ..model.auth import Auth

TEMP_FRONTEND_URL = "http://127.0.0.1:3000/"

def forgot_pass(email):
    # VERIFY AND FETCH
    try:
        user = Auth.query.filter_by(email=email).first()
        if not user:
            return jsonify({"message":f"Invalid Email"}), 404
    except Exception as e:
        return jsonify({"message":f"Invalid Email"}), 400

    # MAKE RESET TOKEN
    try:
        token = create_token(user.id, [0, 300], isReset=True)
    except:
        return jsonify({"message":"Internal Server Error"}), 500
    
    
    reset_link = f"{TEMP_FRONTEND_URL}reset_pass?reset_token={token}"
    
    # SEND EMAIL
    _subject = "Reset Your ShopConnect Password"
    _template = "forgot_password_template.html"
    _templateVars = {"[username]":user.username, "[reset_link]":reset_link, "[support_email]":'shop.connect.reply@gmail.com'}
    try:
        isSent, statCode = send_email(email, _subject, _template, _templateVars)
    except:
        return jsonify({"message":"Internal Server Error"}), 500
    
    return jsonify({"message":"Email Sent Successfully"}), 200