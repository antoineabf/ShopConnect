from ..model.product import Product, product_schema
from flask import request, jsonify

from ..helper_functions import levDistance, suggest

def get_products(db):
    
    # TODO: FILTERS
    search_query = request.args.get('search', '')
    seller_id = request.args.get('seller_id', None)
    
    try:
        products = Product.query
        if seller_id: products=products.filter_by(seller_id=int(seller_id))
        if not search_query: products = products.order_by(db.cast(Product.name, db.Integer)).all()
        else:
            products = suggest({x for x in products.all()}, search_query, levDistance, 500)
        
        return jsonify({"products":[product_schema.dump(p) for p in products]}), 200
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
