from flask import request, jsonify
import requests
from ..helper_functions import extract_auth_token
from ..model.user import User

def get_seller_terms():
    try:
        with open("terms_and_policies.txt", 'r') as file:
            terms = file.read().split("\n")
        return jsonify({"terms": terms}), 200
    except Exception as e:
        return jsonify({"message" : "Internal Server Error"}), 500
    