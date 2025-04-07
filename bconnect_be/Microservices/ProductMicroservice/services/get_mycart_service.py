from flask import request, jsonify
import requests, base64

from ..model.cart import Cart, cart_schema
from ..model.product import Product, product_schema

from ..helper_functions import extract_auth_token
import os
def get_mycart():
    token = extract_auth_token(request)
    try:
        validate = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/validate_token", headers = {'Authorization': f'Bearer {token}'})
        if validate.status_code != 200: return jsonify({"message":"Invalid Token"}), 403
        user_id = validate.json()["user_id"]
        response = requests.get(f"{os.environ.get('AUTH_URL', 'http://localhost:8080')}/permissions", headers = {'Authorization': f'Bearer {token}'})
        if get_mycart.__name__ not in response.json().get("permissions", []): return jsonify({"message":"Unauthorized Request"}), 401
    except Exception as e:
        return jsonify({"message":"Unauthorized Request"}), 401
    
    try:
        cart = Cart.query.filter_by(buyer_id=user_id).all()
        cart_mod = [(product_schema.dump(Product.query.get(p.product_id)), p.count) for p in cart]
        for i, x in enumerate(cart_mod):
            x[0].update({"count":x[1]})
            cart_mod[i] = x[0]
        return jsonify(cart_mod), 200
        
    except:
        return jsonify({"message":"Internal Server Error"}), 500
    
    
    