from ..model.product import Product, product_schema
from flask import jsonify

def get_product_by_id(product_id):
    try:
        if not product_id:
            return jsonify({"message": "Bad Request"}), 400
        
        product = Product.query.get(product_id)
        
        if not product:
                return jsonify({"message": "Product not found"}), 404
        
        return jsonify(product_schema.dump(product)), 200
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500