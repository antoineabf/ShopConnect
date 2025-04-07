from flask import request, jsonify
import requests, base64

from ..model.product import Product, product_schema

from ..helper_functions import extract_auth_token
import os
def create_product(db):
    token = extract_auth_token(request)
    try:
        validate = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if validate.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        user_id = validate.json()["user_id"]
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})
        print(create_product.__name__, response.json())
        if create_product.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except Exception as e:
        return jsonify({"message":"Unauthorized Request"}), 401
    
    body = dict(request.form)
    for field in ("name", "description", "price"):
        if field not in body:
            return jsonify({"message":"Bad Request"}), 400
    try:
        body_price = float(body["price"])
        body_in_stock = int(body["in_stock"])
    except Exception as e:
        return jsonify({"message":"Bad Request"}), 400
    
    try:
        product = Product(body["name"], body["description"], body_price, user_id, body_in_stock)
        
        product_pic = request.files["product_pic"]
        product_pic_data = product_pic.read()
        encoded_image = base64.b64encode(product_pic_data)
        product.product_image = encoded_image
    except Exception as e:
        return jsonify({"message":"Bad Request"}), 400
    try:    
        db.session.add(product)
        db.session.commit()
        
        return jsonify(product_schema.dump(product)), 201
    except Exception as e:
        return jsonify({"message":"Internal Server Error"}), 500