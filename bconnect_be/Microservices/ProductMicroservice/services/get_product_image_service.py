from flask import jsonify, send_file
from ..model.product import Product, product_schema
from io import BytesIO
import base64

def get_product_image(product_id):
    try:
        if not product_id:
            return jsonify({"message": "Product ID is missing in the request"}), 400
        
        prod = Product.query.get(product_id)
        
        if not prod:
            return jsonify({"message": "User not found"}), 404
        
        prod_image_base64 = prod.product_image
        if prod_image_base64:
            img_data = base64.b64decode(prod_image_base64)
            return send_file(BytesIO(img_data), mimetype='image/jpeg', as_attachment=True, download_name='product_image.jpg')
        
        return jsonify({"message": "Product picture not found"}), 404
    
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500