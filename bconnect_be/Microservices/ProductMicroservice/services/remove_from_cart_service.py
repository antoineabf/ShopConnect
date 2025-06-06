from flask import request, jsonify
import requests, base64

from ..model.product import Product, product_schema
from ..model.cart import Cart, cart_schema

from ..helper_functions import extract_auth_token
import os
def remove_from_cart(product_id, db):
    token = extract_auth_token(request)
    try:
        validate = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if validate.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        user_id = validate.json()["user_id"]
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})
        if remove_from_cart.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except Exception as e:
        return jsonify({"message":"Unauthorized Request"}), 401
    
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message":"Not Found"}), 404
    
    try:
        Cart.query.filter_by(buyer_id=user_id, product_id=product_id).delete()
        db.session.commit()
        return jsonify({"message":"Removed Item"}), 200
    except:
        return jsonify({"message":"Already Added"}), 500
        